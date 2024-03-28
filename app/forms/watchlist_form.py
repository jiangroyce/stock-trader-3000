from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
import re

def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if (specialChars.search(field.data) != None):
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")

class WatchlistForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), no_special_char])

class AddStockForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), no_special_char])
    list_number = IntegerField('list_number', validators=[DataRequired("List Number is required")])
    stock_ticker = StringField('stock_ticker', validators=[DataRequired("Stock Ticker is required")])
