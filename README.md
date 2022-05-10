
# Summary
Where Am I is an innovative full-stack app allowing users to learn about which **Indigenous** land they are on and about any Indigenous land across Canada and the rest of the world, and post tribe info to a feed with CRUD operations. It leverages the Google Geolocation API to get user lat/long, the Wikipedia API to get land summaries, and the Mapbox API to render an interactive map allowing users to select tribes. It was nade using Javascript, Django, SQLite, HTML, and CSS.

# How to run the project locally
clone the repo using `git clone https://github.com/Surya123234/Where-Am-I.git` 

open up the command line and `cd` into the project directory

install the latest `python3` version if you haven't already

run `pip3 install -r requirements.txt` to install all dependencies

run `python3 manage.py runserver` to start the server and lauch the app locally

open up `http://127.0.0.1:8000/` on your broswer to access the app!

_Note: If you have `python2` installed instead, simply replace `pip3` with `pip`, and `python3` with `python` in the above commands._

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

`GET /find_closest_territory/` (Internal): Calculates the closest Indigenous territory compared to the user's location
  - Request Paramaters:
    - `lat`: The user's latitude
    - `long`: The user's longitude

### View Tribe/Territory Summary
`GET /tribe_summary/`: Displays the summary of the specified Indigenous tribe
  - Request Paramaters:
    - `name`: The tribe's name
   
### View All Stories
`GET /view_stories/`: Allows users to view all the stories about any Indigenous tribe or territory

### View My Stories
`GET /my_stories/`: Allows users to view all the stories created by themselves

### Create Story
`GET /create_story/`: Allows users to enter story information on a form

`POST /create_story/`: Submits the story information, saves it to the DB, and redirects the user to view their stories

### Update Story
`GET /update_story/{id}/`: Allows users to edit and save the content of a story they previously created on a form

`POST /update_story/{id}/`: Submits the edited story information, updates it in the DB, and redirects the user to view their stories
  - Path Variable:
    - `id`: The story's id

### Delete Story
`GET /delete_story/{id}/`: Deletes a story a user previously created, and redirects them to view their stories 
  - Path Variable:
    - `id`: The story's id

### Error Handling and Permission Validation
Users will be automatically redirected to the login page, or a separate permission error page, depending on what action they try to do (e.g., user "A" trying to edit user "B"'s post by visiting the appropriate GET endpoint, or a user trying to create a post without being logged in).

# Future of the App
More updates are on the way, and an iOS app is soon to be made to allow for easy mobile access! Let's all make an effort to increase awareness of Canada's Indigenous communities!!








