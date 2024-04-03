from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, ValidationError


class CashForm(FlaskForm):
    amount = FloatField('amount', validators=[DataRequired("Amount is required")])
