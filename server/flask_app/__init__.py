from os import environ
from flask import Flask
from flask_app.extensions import bcrypt, jwt
from flask_app.controllers.pets import pets
from flask_app.controllers.auth import auth

app = Flask(__name__)
app.secret_key = environ.get("SECRET_KEY")
app.register_blueprint(pets)
app.register_blueprint(auth)

bcrypt.init_app(app)
jwt.init_app(app)
