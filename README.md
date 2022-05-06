
# Summary
ChatrPlanr is a web app that integrates a group calendar to chat, schedule and view events with friends or clubs.
Made with React.js, HTML, CSS and leveraged the FullCalendar and Getstream SDK to aid with calendar and chat integration.

# How to run the project locally
clone the repo using `git clone https://github.com/Surya123234/Where-Am-I.git` 

open up the command line and `cd` into the project directory

install the latest `python3` version if you haven't already

run `pip3 install -r requirements.txt` to install all dependencies

run `python manage.py runserver` to start the server and lauch the app locally

open up `http://127.0.0.1:8000/` on your broswer to access the app!

# Specifications

### Homepage
`GET /`: Where users see the main page and have get an idea of what the app is all about

### Register
`GET register/`: Allows users to register as a new user on a form
`POST register/`: Submits the register form fields and validates the information provided, and redirects to the homepage

### Login
`GET login/`: Allows users to enter login info on a form
`POST login/`: Submits the login form fields and validates the information provided, and redirects to the homepage

### Logout
`GET logout/`: Allows users to log out of their account


view story GET

create Story GET and POST

look at urls py and views.py for the rest







