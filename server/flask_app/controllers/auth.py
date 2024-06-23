from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt
from flask_app.models.user import User
from flask_app.extensions import jwt
from flask_app import bcrypt

auth = Blueprint("auth", __name__)


@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return User.is_blocked(jti)


@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    error = {"msg": "The token has been revoked.", "error": "token revoked"}
    response = make_response(jsonify(error))
    response.headers["Content-Type"] = "application/json"
    return response, 401


@auth.post("/api/auth/register")
def register():
    """Processes the register data."""

    data = request.get_json()
    errors = User.validate_register(data)

    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        return response, 400

    user = User.find_by_email(data["email"])
    if user != None:
        response = make_response(
            jsonify({"msg": "Email already exists. Please log in."})
        )
        response.headers["Content-Type"] = "application/json"
        return response, 400

    pw_hash = bcrypt.generate_password_hash(data["password"])
    user_data = {
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "email": data["email"],
        "password": pw_hash,
    }
    User.create(user_data)

    response = make_response(jsonify({"msg": "User registered."}))
    response.headers["Content-Type"] = "application/json"
    return response, 201


@auth.post("/api/auth/login")
def login():
    """Processes the login data."""

    data = request.get_json()
    errors = User.validate_login(data)

    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        return response, 400

    user = User.find_by_email(data["email"])
    if user == None:
        response = make_response(jsonify({"msg": "Invalid credentials."}))
        response.headers["Content-Type"] = "application/json"
        return response, 400

    if not bcrypt.check_password_hash(user["password"], data["password"]):
        response = make_response(jsonify({"msg": "Invalid credentials."}))
        response.headers["Content-Type"] = "application/json"
        return response, 400

    access_token = create_access_token(identity=data["email"])
    response = make_response(jsonify({"access_token": access_token}))
    response.headers["Content-Type"] = "application/json"
    return response, 200


@auth.get("/api/auth/logout")
@jwt_required()
def logout():
    jwt_dict = get_jwt()
    jti = jwt_dict["jti"]
    User.add_to_blocklist(jti)
    response = make_response(jsonify({"msg": "Successfully logged out"}))
    response.headers["Content-Type"] = "application/json"
    return response, 200
