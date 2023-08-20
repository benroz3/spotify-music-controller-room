Spotify Music Controller Room Fullstack app using React, TypeScript, MUI and Django.

1. Create .env using the example
2. Open terminal
3. Type: 'python -m venv venv' / 'python3 -m venv venv'
4. Type: Windows - 'venv/Scripts/activate' | Mac -source './venv/bin/activate'
5. Type: 'pip install -r ./requirements.txt'
6. Type: 'python manage.py runserver'

client side runs on: http://127.0.0.1:8000
admin side runs on: http://127.0.0.1:8000/admin
api app runs on: http://127.0.0.1:8000/api
spotify app runs on: http://127.0.0.1:8000/spotify

- When installing additional packages use: 'pip freeze > ./requirements.txt' (make sure venv is activated)
- When changing models.py use: 'python manage.py makemigrations' and then 'python manage.py migrate' before running server
