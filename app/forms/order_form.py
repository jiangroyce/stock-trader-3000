from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Stock, Portfolio

def stock_exists(form, field):
    stock = Stock.query.get(field.data)
    if not stock:
        raise ValidationError(f"{field.name.capitalize()}: {field.data} not found")

class OrderForm(FlaskForm):
    stock_ticker = StringField('stock_ticker', validators=[DataRequired("Stock Ticker is required"), stock_exists])
    cost_basis = FloatField('cost_basis', validators=[DataRequired("Cost Basis is required")])
    quantity = FloatField('quantity', validators=[DataRequired("Quantity is required")])
