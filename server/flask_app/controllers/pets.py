from flask_app.models.pet import Pet
from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, make_response, request


pets = Blueprint("pets", __name__)


@pets.route("/api/pets")
@jwt_required()
def all_pets():
    """This route returns all pets."""

    pets = Pet.find_all()
    response = make_response(jsonify(pets))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@pets.post("/api/pets/create")
@jwt_required()
def create_pet():
    """This route creates a new pet."""

    data = request.get_json()
    errors = Pet.validate_pet(data)

    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 400
        return response

    Pet.create(data)
    response = make_response(jsonify({"msg": "pet created"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 201
    return response


@pets.get("/api/pets/<int:pet_id>")
@jwt_required()
def pet_details(pet_id):
    """This route returns one pet."""

    pet = Pet.find_by_id(pet_id)
    if pet == None:
        response = make_response(jsonify({"msg": "pet not found"}))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 404
        return response

    response = make_response(jsonify(pet))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@pets.post("/api/pets/<int:pet_id>/update")
@jwt_required()
def update_pet(pet_id):
    """This route updates a pet."""

    data = request.get_json()
    errors = Pet.validate_pet(data)
    if len(errors) != 0:
        response = make_response(jsonify(errors))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 400
        return response

    Pet.update(pet_id, data)
    response = make_response(jsonify({"msg": "pet updated"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response


@pets.post("/api/pets/<int:pet_id>/delete")
@jwt_required()
def delete_pet(pet_id):
    """This route deletes a pet."""

    pet = Pet.find_by_id(pet_id)
    if pet == None:
        response = make_response(jsonify({"msg": "pet not found"}))
        response.headers["Content-Type"] = "application/json"
        response.status_code = 404
        return response

    Pet.delete_by_id(pet_id)
    response = make_response(jsonify({"msg": "pet deleted"}))
    response.headers["Content-Type"] = "application/json"
    response.status_code = 200
    return response
