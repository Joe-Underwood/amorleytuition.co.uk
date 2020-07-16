import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from threading import Thread
import os
from dotenv import load_dotenv

load_dotenv("/amorleytuition/.env")
to_address = os.getenv("EMAIL_TO_ADDRESS")
from_address = os.getenv("EMAIL_FROM_ADDRESS")
smtp_name = os.getenv("EMAIL_SMTP_NAME")
smtp_port = os.getenv("EMAIL_SMTP_PORT")
password = os.getenv("EMAIL_PASSWORD")

class Email:
    def __init__(self, name, emailAddress, msgContent):
        self.name = name
        self.emailAddress = emailAddress
        self.msgContent = msgContent

    def createMessage(self):
        msg = MIMEMultipart()
        msg["From"] = "website"
        msg["To"] = to_address
        msg["Subject"] = "Contact Form Submission: %s" % (self.name)
        body = """
          <html>
            <body>
              <p>Name: %s</p>
              <p>Email Address: %s</p><br>
              <p>Message:</p>
              <p>%s</p>
            </body>
          </html>  """ % (self.name, self.emailAddress, self.msgContent)


        msg.attach(MIMEText(body, "html"))
        return str(msg)

    def sendEmail(self):
        server = smtplib.SMTP(smtp_name, smtp_port)
        server.connect(smtp_name, smtp_port)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(from_address, password)
        server.sendmail(from_address, to_address, self.createMessage())
        server.quit()

    def sendAsyncEmail(self):
        Thread(target=self.sendEmail, args=(self))
