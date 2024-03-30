from flask_login import current_user
from functools import wraps
from app.models import db, Portfolio
from flask import request
import json

def enough_funds(f):
    @wraps(f)
    def check_funds():
        pass
