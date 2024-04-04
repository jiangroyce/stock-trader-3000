from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def password_format(form, field):
    notAllowedChars = re.compile('[/^&*()<>?/\|}{~:]')
    allowedChars = re.compile('[@_!$%]')
    hasCapital = re.compile('[A-Z]')
    hasLower = re.compile('[a-z]')
    hasNumber = re.compile('[0-9]')
    if notAllowedChars.search(field.data):
        raise ValidationError("Password can only contain these '@_!$%' special characters")
    if not allowedChars.search(field.data):
        raise ValidationError("Password must have at least 1 of these '@_!$%' special characters")
    if not hasCapital.search(field.data):
        raise ValidationError("Password must have at least 1 Capital Letter")
    if not hasLower.search(field.data):
        raise ValidationError("Password must have at least 1 lowercase letter")
    if not hasNumber.search(field.data):
        raise ValidationError("Password must have at least 1 number")

class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=3, max=40)])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=40), password_format])
