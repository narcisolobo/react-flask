from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_app.models.user import User
from flask_app.extensions import jwt
from flask_app.utils.responses import make_json_response

auth = Blueprint("auth", __name__)


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    return User.is_blocked(jwt_payload["jti"])


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return make_json_response(
        {"msg": "The token has been revoked.", "error": "token revoked"}, 401
    )


@auth.post("/api/auth/register")
def register():
    """Processes the register data."""

    data = request.get_json()
    errors = User.validate_register(data)

    if errors:
        return make_json_response(errors, 400)

    if User.find_by_email(data["email"]) is not None:
        return make_json_response({"msg": "Email already exists. Please log in."}, 409)

    pw_hash = User.generate_hash(data["password"])
    user_data = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "email": data["email"],
        "password": pw_hash,
    }
    User.create(user_data)

    return make_json_response({"msg": "User registered."}, 201)


@auth.post("/api/auth/login")
def login():
    """Processes the login data."""

    data = request.get_json()
    errors = User.validate_login(data)

    if errors:
        return make_json_response(errors, 400)

    user = User.find_by_email(data["email"])
    if user is None or not User.check_hash(user["password"], data["password"]):
        return make_json_response({"msg": "Invalid credentials."}, 401)

    access_token = create_access_token(identity=data["email"])
    return make_json_response({"access_token": access_token}, 200)


@auth.get("/api/auth/logout")
@jwt_required()
def logout():
    User.add_to_blocklist(get_jwt()["jti"])
    return make_json_response({"msg": "Successfully logged out"}, 200)
