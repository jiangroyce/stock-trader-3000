from flask.cli import AppGroup
from .users import seed_users, undo_users
from .stocks.stocks import seed_stocks, undo_stocks
from .portfolios import seed_portfolios, undo_portfolios
from .orders import seed_orders, undo_orders
from .strategies import seed_strategies, undo_strategies
from .watchlists import seed_watchlists, undo_watchlists
from .screeners import seed_screeners, undo_screeners

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_stocks()
        undo_portfolios()
        undo_orders()
        undo_strategies()
        undo_watchlists()
        undo_screeners()
    seed_users()
    seed_stocks()
    seed_portfolios()
    seed_orders()
    seed_strategies()
    seed_watchlists()
    seed_screeners()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_stocks()
    undo_portfolios()
    undo_orders()
    undo_strategies()
    undo_watchlists()
    undo_screeners()
    # Add other undo functions here
