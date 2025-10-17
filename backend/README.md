# Car Rental App API
The RESTful API for managing the car rental webapp of Team-Miro.

## Feature
1. Car Inventory
- Users can browse available cars
- Admin can add, update and delete cars

2. Reservation System
- Guest users can soft reserve cars which can be overriden by a registered user

3. User Accounts
- Users sign up with their email and gets an email afterwards to activate their account
- Users can change their password via an email that will be sent
- Users can view and edit their profile

4. Booking Management
- Users can view, modify or cancel their reservations
- Admin can view all, modify, cancel and confirm reservations
- Users get an email whenever their reservation is confirmed, modified, cancelled or overriden


## Tech Stack Used
- Python, Django and Django Rest Framework
- MySQL Database
- Djoser for Authentication
- PythonAnywhere for deployment

## Setup and Installation (Local Development)
Follow the steps below to install the project on your local machine;

### Prerequisites
You need the following istalled:
- Python 3.10+
- pip

1. Clone the repository

```bash
git clone https://github.com/Wasem1209/team-miro.git
```

2. Navigate into the backend directory
```bash
cd backend
```

3. Create and Activate Virtual Environment

```bash
python -m venv venv
```
Activate the environment (Linux/macos)
```bash
source venv/bin/activate
```

Activate the environment (Windows)
```bash
.\venv\Scripts\activate
```

4. Install Dependencies
Install all required Python packages from the requirements.txt file.

```bash
pip install -r requirements.txt
```

5. Configure Environment Variables
Create a file named .env in the root directory and add your secret keys, database and email configuration

6. Database Migrations
Apply database migrations

```bash
python manage.py migrate
```

7. Create a Superuser
```bash
python manage.py createsuperuser
```

8. Run the Server
Start the local development server
```bash
python manage.py runserver
```

## API Documentation
The full API documentation is available at:
https://driveeasy.pythonanywhere.com/api/v1/schema/swagger-ui/

## Deployment Details
This API is hosted on PythonAnywhere
- Base URL: https://driveeasy.pythonanywhere.com/api/v1/

## Backend Team
- David Gift (Backend Lead)
