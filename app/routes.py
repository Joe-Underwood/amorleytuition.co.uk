from flask import render_template, flash, request, redirect, url_for, jsonify
from app import app
from app.forms import ContactForm
from app.email import Email

@app.route('/', methods=['GET', 'POST'])
@app.route('/home', methods=['GET', 'POST'])
def home():
    form = ContactForm()
    if request.form:
        if form.validate_on_submit():
            nameValue = request.form['name']
            emailValue = request.form['email']
            messageValue = request.form['message']
            newEmail = Email(nameValue, emailValue, messageValue)
            newEmail.sendEmail()
            return {"success": True}

        return {"success": False}

    return render_template('home.html', form=form)
