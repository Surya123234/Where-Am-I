from csv import DictReader
from django.core.management import BaseCommand

# Import the model
from app.models import Tribe


ALREDY_LOADED_ERROR_MESSAGE = """
If you need to reload the tribe data from the CSV file,
first delete the db.sqlite3 file to destroy the database.
Then, run `python manage.py migrate` for a new empty
database with tables"""


class Command(BaseCommand):
    # Show this when the user types help
    help = "Loads data from First_Nations_Coordinates.csv"

    def handle(self, *args, **options):

        # Show this if the data already exist in the database
        if Tribe.objects.exists():
            print("tribe data already loaded...exiting.")
            print(ALREDY_LOADED_ERROR_MESSAGE)
            return

        # Show this before loading the data into the database
        print("Loading tribes data")

        # Code to load the data into database
        for row in DictReader(open("./First_Nations_Coordinates.csv")):
            tribe = Tribe(
                name=row["name"], longitude=row["longitude"], latitude=row["latitude"]
            )
            tribe.save()
