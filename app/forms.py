from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.fields.html5 import EmailField
from wtforms.validators import InputRequired, Email, Length, ValidationError

class ContactForm(FlaskForm):
    name = StringField('Name', validators=[InputRequired()])
    email = EmailField('Email', validators=[InputRequired()])
    message = TextAreaField('Message', validators=[InputRequired(), Length(min=0, max=500)])
    submitButton = SubmitField('Submit')
