from flask_wtf import FlaskForm
from wtforms import fields, StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
import re
import json

class JSONField(fields.StringField):
    def _value(self):
        return json.dumps(self.data) if self.data else ''

    def process_formdata(self, valuelist):
        if valuelist:
            try:
                self.data = json.loads(valuelist[0])
            except ValueError:
                raise ValueError('This field contains invalid JSON')
        else:
            self.data = None

    def pre_validate(self, form):
        super().pre_validate(form)
        if self.data:
            try:
                json.dumps(self.data)
            except TypeError:
                raise ValueError('This field contains invalid JSON')

def no_special_char(form, field):
    specialChars = re.compile('[@_!$%^&*()<>?/\|}{~:]')
    if specialChars.search(field.data):
        if (field.data[specialChars.search(field.data).start()+1:specialChars.search(field.data).start()+8] == "Default"):
            raise ValidationError(f"Cannot create/edit/delete Screeners")
        raise ValidationError(f"{field.name.capitalize()} must not contain special characters")

class ScreenerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired("Name is required"), Length(min=3, max=40), no_special_char])
    params = JSONField("params", validators=[DataRequired("Parameters are required")])
