# (C) Copyright IBM Corp. 2022.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

from flask import Flask, render_template, request, redirect, session, url_for

from config.config import PORT, SESSION_SECRET_KEY
from config.constants import *
from sdk import initialize, check_left_nav_menu_flag, flight_button, get_discount_value
import config.vars as cv

app = Flask(__name__)
app.secret_key = SESSION_SECRET_KEY


def logincheck(mail_id, password):
    if mail_id != "" and password != "":
        return True
    return False


@app.route("/")
def home():
    if EMAIL in session:
        email = session[EMAIL]
        return render_template(INDEX_HTML, left_nav_menu=check_left_nav_menu_flag(email), flight_booking_button=flight_button(email), is_valid_user=cv.is_validuser, user_mail=email)
    return render_template(INDEX_HTML, left_nav_menu=check_left_nav_menu_flag('defaultUser'))


@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        password = request.form[LOGIN_PASSWORD]
        cv.email_id = request.form[LOGIN_EMAIL]
        session[EMAIL] = request.form[LOGIN_EMAIL]
        session[PASSWORD] = password
        email = session[EMAIL]
        cv.is_validuser = logincheck(email, password)
        if cv.is_validuser:
            return redirect(url_for(HOME))
    # else:
        # if cv.is_validuser:
    return render_template(INDEX_HTML, left_nav_menu=check_left_nav_menu_flag('defaultUser'))
    # else:
    # return render_template(INDEX_HTML, left_nav_menu=check_left_nav_menu_flag())


@app.route("/logout")
def logout():
    session.pop(EMAIL, None)
    session.pop(PASSWORD, None)
    return redirect(url_for(HOME))


@app.route("/flights")
def flights():
    if EMAIL in session:
        email = session[EMAIL]
    return render_template(FLIGHTS_HTML, left_nav_menu=check_left_nav_menu_flag(email), is_valid_user=cv.is_validuser, user_mail=email, discount_value=get_discount_value(email))


if __name__ == "__main__":
    initialize()
    app.run(host='localhost', port=PORT)
