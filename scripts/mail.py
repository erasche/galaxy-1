#!/usr/bin/env python

from datetime import datetime, timedelta

import argparse

import os

import sys



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

    print(ret)

    return ret



def send_email_to_users(sa_session,delete_ret,warn_ret,dry_run):
    #collecting user information by history user_id and then nescaery information to write an email


    # get info which history to warn or delete by which user
    # format {history.user_id {history.id:hisotry:name}}
    info_history_delete = (collect_users_to_mail(delete_ret))
    info_history_warn = (collect_users_to_mail(warn_ret))

    print (f" going to warn {len(info_history_warn.keys())} users")
    if len(info_history_warn.keys()) > 0:
       send_warning_email(info_history_warn,sa_session,"warn",dry_run)
    
    print (f" going to send a delete email to  {len(info_history_delete.keys())} users")
    if len(info_history_delete.keys()) > 0: 
        user_ret = get_user_info(sa_session,info_history_delete,dry_run)
        #lil check for me because i can :)
        for user in user_ret:
             print(user.id, user.email, user.username)


def send_warning_or_delete_email(info_history_warn,sa_session,modus,dry_run):
   
   #TODO
   # implement Dry function in here that it skips mailing
   # implement a will be deleted or warning string for in the email
   #get user information
   user_ret = get_user_info(sa_session,info_history_warn)
   for user in user_ret:
       print(user.id, user.email)

def get_user_info(sa_session,info_history):
    
    id_present = info_history.keys()
    print(id_present)
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
            if int(history.user_id) not in data.keys():
                data[int(history.user_id)] = { history.id : history.name}
            else:
                data[int(history.user_id)][ history.id ] = history.name
        return data

if __name__ == "__main__":



    #ansible modifiable settings
    #look for defaults or general groupvars, probably something
    warn_days = 0
    delete_days = 0



    print("Loading Galaxy model...")

    model, object_store, engine = init()
    sa_session = model.context.current

    wt = datetime.now() - timedelta(days=warn_days)
    dt = datetime.now() - timedelta(days=delete_days)

    warn_ret = get_warn_histories(sa_session, wt, dt)
    delete_ret = get_delete_histories(sa_session, wt, dt)

    send_email_to_users(sa_session,delete_ret,warn_ret,args.dryrun)
