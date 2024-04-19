from flask_wtf import FlaskForm
from wtforms import FloatField
from wtforms.validators import DataRequired, ValidationError


class CashForm(FlaskForm):
    quantity = FloatField('quantity', validators=[DataRequired("Quantity is required")])
