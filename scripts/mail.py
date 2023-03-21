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
parser.add_argument(
    "--purge", action="store_true", help="Purges previously deleted histories."
)

parser.add_argument("--warn-days", type=int, default=365)
parser.add_argument("--delete-days", type=int, default=385)


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


if __name__ == "__main__":
    print("Loading Galaxy model...")
    model, object_store, engine = init()
    sa_session = model.context.current

    wt = datetime.now() - timedelta(days=args.warn_days)
    dt = datetime.now() - timedelta(days=args.delete_days)

    warn_ret = get_warn_histories(sa_session, wt, dt)
    delete_ret = get_delete_histories(sa_session, wt, dt)

    print(list(warn_ret))
    print(list(delete_ret))
