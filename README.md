# Summary

Where Am I is an innovative full-stack app allowing users to learn about which **Indigenous** land they are on and about any Indigenous land across Canada and the rest of the world, and post tribe info to a feed with CRUD operations. It leverages the Geolocation API to get user lat/long, the Wikipedia API to get land summaries, and the Mapbox API to render an interactive map allowing users to select tribes. It was nade using Javascript, Django, REST API, SQLite, HTML, and CSS.

# How to run the project locally

clone the repo using `git clone https://github.com/Surya123234/Where-Am-I.git`

install the latest `python3` version if you haven't already

run `pip3 install django` to install the latest `django` version if you haven't already

open up the command line and `cd` into the project directory

run `pip3 install -r requirements.txt` to install all dependencies

run `python3 manage.py runserver` to start the server and lauch the app locally

open up `http://127.0.0.1:8000/` on your broswer to access the app!

_Note: If you have `python2` installed instead, simply replace `pip3` with `pip`, and `python3` with `python` in the above commands._

# Specifications, Routes, and Functionalities

###############

## API

### Base URL

`/api/v1/`

### Find Closest Territory

`GET /find_closest_territory/` (Internal): Calculates and returns the closest Indigenous territory compared to the user's location

- Request Paramaters:
  - `lat`: The user's latitude
  - `long`: The user's longitude

### Tribe/Territory Summary

`GET /tribe_summary/`: Returns the summary of the specified Indigenous tribe

- Request Paramaters:
  - `full_name`: The tribe's full name
  - `slug_name` (optional): The tribe's slugified name

### All Stories

`GET /view_stories/`: Returns all the existing stories about any Indigenous tribe or territory

### My Stories

`GET /my_stories/`: Returns all the existing stories created by the logged in user

### Create Story

`POST /create_story/`: Submits the story information, persists it to the DB, and returns it

- Request Body:
  - `created_by`: The user who created the story
  - `title`: The story's title
  - `content`: The content of the story

### Update Story

`PATCH /update_story/`: Submits the edited story information, updates it in the DB, and returns it

- Request Body:
  - `id`: The story's id
  - `created_by`: The user who created the story
  - `title`: The story's title
  - `content`: The content of the story

### Delete Story

`DELETE /delete_story/{id}/`: Deletes a story a user previously created in the DB

- Path Variable:
  - `id`: The story's id

###############

## Frontend

### Base URL

`/`

### Register

`GET /register/`: Allows users to register as a new user on a form
`POST /register/`: Submits the register form fields and validates the information provided, and redirects to the homepage

### Login

`GET /login/`: Allows users to enter login info on a form
`POST /login/`: Submits the login form fields and validates the information provided, and redirects to the homepage

### Logout

`GET /logout/`: Allows users to log out of their account

### Homepage

`GET /`: Where users see the main page and have get an idea of what the app is all about

### Explore Tribes

`GET /explore_tribes/`: Allows users to pick and view any Indigenous land across Canada and the United States

### View Closest Territory

`GET /view_closest_territory/`: Allows users to submit their location, in order to learn about the Indigenous territory they are on

### View Tribe/Territory Summary

`GET /tribe_summary/`: Displays the summary of the specified Indigenous tribe

- Request Paramaters:
  - `name`: The tribe's name
  - `summary`: The tribe's summary
  - `link`: The link to get more info about the tribe
  - `image`: An image of the tribe, if not null.

### View All Stories

`GET /view_stories/`: Allows users to view all the stories about any Indigenous tribe or territory

### View My Stories

`GET /my_stories/`: Allows users to view all the stories created by themselves

### Create Story

`GET /create_story/`: Allows users to enter story information on a form in order to create one

###############

### Error Handling and Permission Validation

Users will be automatically redirected to the login page, or a separate permission error page, depending on what action they try to do (e.g., user "A" trying to edit user "B"'s post by submitting an appropriate API request, or a user trying to create a post without being logged in). In the backend, appropriate JSON responses will be sent back to the frontend in the event of a failure.

# Future of the App

More updates are on the way, and an iOS app is soon to be made to allow for easy mobile access! Let's all make an effort to increase awareness of Canada's Indigenous communities!!
