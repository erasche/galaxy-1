#!/usr/bin/env python

from datetime import datetime, timedelta

import argparse

import os
from re import template

import sys
from typing_extensions import TypeVarTuple
from datetime import datetime, timedelta

# Import smtplib for the actual sending function
import smtplib
# Import the email modules we'll need
from email.message import EmailMessage
from jinja2 import Template
sys.path.insert(

    1, os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, "lib"))

)



import galaxy.config

from galaxy.model.mapping import init_models_from_config

from galaxy.objectstore import build_object_store_from_config

from galaxy.util.script import app_properties_from_args, populate_config_args



default_config = os.path.abspath(

    os.path.join(os.path.dirname(__file__), os.pardir, "config/galaxy.ini")

)



parser = argparse.ArgumentParser()

parser.add_argument(

    "--dry-run",

    dest="dryrun",

    help="Dry run (show changes but do not email)",

    action="store_true",

    default=False,

)

parser.add_argument(

    "--warn",

    action="store_true",

    help="Do a history scan and send warning emails to affected user",

)

parser.add_argument(

    "--delete",

    action="store_true",

    help="Do a history scan, send emails and delete eligible histories.",

)

# commenting out since we are not purging, there are other scripts for that

#parser.add_argument(

#    "--purge", action="store_true", help="Purges previously deleted histories."

#)



#parser.add_argument("--warn-days", type=int, default=365)

#parser.add_argument("--delete-days", type=int, default=385)





populate_config_args(parser)

args = parser.parse_args()





def init():

    app_properties = app_properties_from_args(args)

    config = galaxy.config.Configuration(**app_properties)

    object_store = build_object_store_from_config(config)

    engine = config.database_connection.split(":")[0]

    return (

        init_models_from_config(config, object_store=object_store),

        object_store,

        engine,

    )





def get_warn_histories(sa_session, warn, delete):

    histories = (

        sa_session.query(model.History)

        .filter(model.History.update_time <= warn)

        .filter(model.History.update_time > delete)

        .enable_eagerloads(False)

        .yield_per(1000)

    )

    yield from histories





def get_delete_histories(sa_session, warn, delete):

    histories = (

        sa_session.query(model.History)

        .filter(model.History.update_time <= delete)

        .enable_eagerloads(False)

        .yield_per(1000)

    )

    yield from histories





def culm_days(days):

    culm_size = 0.0

    ret = {}

    for day in days.keys():

        culm_size += days[day]

        ret[day] = culm_size



    return ret





def sizeof_fmt(num, suffix="B"):

    for unit in ["", "K", "M", "G", "T", "P"]:

        if abs(num) < 1024.0:

            return "%3.1f%s%s" % (num, unit, suffix)

        num /= 1024.0

    return "%.1f%s%s" % (num, "Yi", suffix)





def culminate_histories_size(histories):

    history_bytes = 0.0

    for history in histories:

        history_bytes += history["size"]

    return history_bytes





def process_size(histories, label="delete eligible"):

    ret = (

        "Total space used by "

        + label

        + " histories: "

        + sizeof_fmt(culminate_histories_size(histories))

    )

    return ret



def send_email_to_users(sa_session,delete_ret,warn_ret,dry_run,allow_emailing):
    #collecting user information by history user_id and then nescaery information to write an email


    # get info which history to warn or delete by which user
    # format {history.user_id {history.id:hisotry:name}}
    info_history_delete = (collect_users_to_mail(delete_ret))
    info_history_warn = (collect_users_to_mail(warn_ret))

    if len(info_history_warn.keys()) > 0:
       if allow_emailing:
        send_warning_or_delete_email(info_history_warn,sa_session,"warn",dry_run)
    else:
        print("no histories detected to warn users about")
    
    if len(info_history_delete.keys()) > 0:
        if allow_emailing:
            send_warning_or_delete_email(info_history_delete,sa_session,"delete",dry_run)
    else:
        print("no histories detected to warn users about")


def send_warning_or_delete_email(info_history,sa_session,modus,dry_run):
   
   #TODO
   # implement Dry function in here that it skips mailing
   # implement a will be deleted or warning string for in the email
   #get user information
   user_ret = get_user_info(sa_session,info_history)
   if dry_run:
       print(f"dry run activated not sending {modus} email to {len(list(user_ret))} users")
   else:
       print (f"going to {modus} {len(info_history.keys())} users about hisotrie")
       for user in user_ret:
           #generating list of histories
           user_histories = list(info_history[user.id].values())
           #print(user.id, user.email,user_histories,modus)
           send_email(user.id,user.email,user_histories,modus)

def get_user_info(sa_session,info_history):
    
    id_present = info_history.keys()
    user_info = (
        sa_session.query(model.User)
        .filter(model.User.id.in_(id_present))
        .enable_eagerloads(False)
        .yield_per(1000)
    )

    yield from user_info

def collect_users_to_mail(history_query):
        
        data = {}        
        for history in history_query:
            #makes sure it skips the userless histories
            print(type(history._update_time))
            if history.user_id == None:
                continue
            elif int(history.user_id) not in data.keys():
                data[int(history.user_id)] = { history.id :{"name": str(history.name),
                                                            "id": str(history.id),
                                                            "h_update_time":str((history._update_time).strftime("%Y-%m-%d")),
                                                            #TODO modify this to ansible variables
                                                            "h_del_time":  str((history._update_time + timedelta(days=10)).strftime("%Y-%m-%d"))}}
            else:
                data[int(history.user_id)][ history.id ] = {"name": str(history.name),
                                                            "id": str(history.id),
                                                            "h_update_time":str((history._update_time).strftime("%Y-%m-%d")),
                                                            #TODO modify this to ansible variables
                                                            "h_del_time":  str((history._update_time + timedelta(days=10)).strftime("%Y-%m-%d"))}
        return data

def read_in_template(modus):

    #TODO, 
    #make it read in the template instead of hard coded but it has to work somehow in testing enviorment

    if modus == "warn":
        msg = """
        <html>
        <body>
        <p>Dear {{ user_name }},</p>
        <p>You are receiving this email as one or more of your histories on {{ Galaxy_Brand }} have not been updated for {{ warn_weeks }} weeks or more. They will be beyond the User Data Storage time limits soon ({{ delete_weeks }} weeks). Displayed next to each history in the table below is the date that it will be deleted. If you do not run a job in that history or update it before that date, it will be automatically deleted and then purged from disk.</p>

        <p>You should download any files you wish to keep from each history before the date specified. Instructions for doing so can be found at:</p>

        <p><a href='https://training.galaxyproject.org/training-material/topics/galaxy-data-manipulation/tutorials/download-delete-data/tutorial.html'>Galaxy Training Material - Downloading and Deleting Data</a></p>

        <p>Please note that if you have received a warning email in the past, new histories could have been added to the following table and they will have a different scheduled deletion date.</p>

        <p>Please see the {% if histories|length > 1 %}histories{% else %}history{% endif %} in question below:</p>
        <p>
            <table>
                <tr style="color:white;background-color:gray"><th>History Name</th><th>Date last updated</th><th>Size</th><th>Deletion Date</th></tr>
                {% for h in histories | sort(attribute='h_update_time') %}
                    <tr style="background-color:#eee"><td><a target="_blank" href="{{ hist_view_base }}{{ h['id'] }}">{{ h['name'] }}</a></td><td>{{ h['h_update_time'] }}</td><td>{{ h['h_size'] }}</td><td>{{ h['h_del_time'] }}</td></tr>
                {% endfor %}
            </table>
        </p>



        <p>{{ Galaxy_Brand }} is a data analysis platform and stores data in accordance with the <a href="{{ data_policy_url }}">User Data Storage Policy</a></p>
        <p>If you have any queries regarding this email, please don't hesitate to contact us at: <a href="mailto:{{ email_sender }}">{{ email_sender }}</a></p>
        Yours,
        <br/>
        <br/>
        {{ Galaxy_Brand }} Administrators.
        <p></p>
        </body>
        </html>"""
    elif modus == "delete":
        msg = """
        <html>
        <body>
        <p>Dear {{ user_name }},</p>
        <p>You are receiving this email as one or more of your histories on {{ Galaxy_Brand }} have not been updated for {{ delete_weeks }} weeks or more and have now been marked as deleted. They and their associated data will be purged from our disk in 5 days time (from the date of this email).

        <p>Please see the {% if histories|length > 1 %}histories{% else %}history{% endif %} in question below:</p>
        <p>
            <table>
                <tr style="color:white;background-color:gray"><th>History Name</th><th>Date last updated</th><th>Size</th></tr>
                {% for h in histories %}
                    <tr style="background-color:#eee"><td><a target="_blank" href="{{ hist_view_base }}{{ h['id'] }}">{{ h['name'] }}</a></td><td>{{ h['h_update_time'] }}</td><td>{{ h['h_size'] }}</td></tr>
                {% endfor %}
            </table>
        </p>
        <p>If you have any queries regarding this email, please don't hesitate to reply to: <a href="mailto:{{ email_sender }}">{{ email_sender }}</a></p>
        Yours,
        <br/>
        <br/>
        {{ Galaxy_Brand }} Administrators.
        <p></p>
        </body>
        </html>"""

    return msg

def mutate_message(message,username,histories):
    print(message)
    print(histories)
    j2_template = Template(message)
    #TODO,. make it ansible variables
    print("\n#########################################\n")
    message = (j2_template.render({"user_name": username,
                             "hist_view_base":"127.0.0.1/histories/view?="
                              "Galaxy_Brand": "Avans Galaxy",#standard settings in groupvars or brand?>>>????
                               "delete_weeks": "180",#standard settings in group vars
                               "warn_weeks": "170", #standart settings in groupvars
                               "email_sender": "Bioinformatics_atgm.nl", #ansibe change galaxy var or something else idk 
                               "histories": histories}))
    return message
def send_email(user_email,user_name,histories,modus):

    #this is a test setting before i put it in an ansible role
    
    message = read_in_template(modus)
    message = mutate_message(message,user_name,histories)
    print(user_email,user_name)
    print(message)
    #msg = EmailMessage()
    #msg.set_content("Hello, world")

    # me == the sender's email address
    # you == the recipient's email address
    #msg["Subject"] = "lol"
    #msg["From"] = "bioinformatics-team@bioinformatics-atgm.nl"
    #msg["To"] = user_email

    # Send the message via our own SMTP server.
    #server = smtplib.SMTP("smtp.strato.com", 587)
    #server.starttls()
    #server.login("galaxy@bioinformatics-atgm.nl", "e632...")
    #server.send_message(msg)
    #server.quit()

if __name__ == "__main__":



    #ansible modifiable settings
    #look for defaults or general groupvars, probably something
    warn_days = 0
    delete_days = 1000

    #exstra ansible setting i want since not all instances are allowed to email
    allow_emailing = True


    print("Loading Galaxy model...")

    model, object_store, engine = init()
    sa_session = model.context.current

    wt = datetime.now() - timedelta(days=warn_days)
    dt = datetime.now() - timedelta(days=delete_days)

    warn_ret = get_warn_histories(sa_session, wt, dt)
    delete_ret = get_delete_histories(sa_session, wt, dt)

    send_email_to_users(sa_session,delete_ret,warn_ret,args.dryrun,allow_emailing)
