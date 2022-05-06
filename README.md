
# Summary
Where Am I is an innovative full-stack app allowing users to learn about which Indigenous land they are on and about any Indigenous land across Canada and America, and post tribe info to a feed with CRUD operations. It leverages the Google Geolocation API to get user lat/long and the Wikipedia API to get land summaries. It was nade using Javascript, Django, and SQLite

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
`GET /register/`: Allows users to register as a new user on a form
`POST /register/`: Submits the register form fields and validates the information provided, and redirects to the homepage

### Login
`GET /login/`: Allows users to enter login info on a form
`POST /login/`: Submits the login form fields and validates the information provided, and redirects to the homepage

### Logout
`GET /logout/`: Allows users to log out of their account

### Explore Tribes
`GET /explore_tribes/`: Allows users to pick and view any Indigenous land across Canada and the United States

### View Closest Territory
`GET /view_closest_territory/`: Allows users to submit their location, in order to learn about the Indigenous territory they are on

`GET /ajax_filter/` (Internal): Calculates the closest Indigenous territory compared to the user's location
  - Request Paramaters:
    - `lat`: The user's latitude
    - `long`: The user's longitude

### View Tribe/Territory Summary
`GET /view_result/`: Displays the summary of the specified Indigenous tribe
  - Request Paramaters:
    - `name`: The tribe's name
   
### View All Stories
`GET /view_stories/`: Allows users to view all the stories about any Indigenous tribe or territory

### View My Stories
`GET /my_stories/`: Allows users to view all the stories created by them

### Create Story
`GET /create_story/`: Allows users to enter story information on a form

`POST /create_story/`: Submits the story information, saves it to the DB, and redirects the user to view all stories


# Future of the App
More updates are on the way, and an iOS app is soon to be made to allow for easy mobile access! Let's all make an effort to increase awareness of Canada's Indigenous communities!!








