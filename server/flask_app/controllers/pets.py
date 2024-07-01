from flask_app.models.pet import Pet
from flask_app.utils.responses import make_json_response
from flask_jwt_extended import jwt_required
from flask import Blueprint, jsonify, make_response, request


pets = Blueprint("pets", __name__)


@pets.get("/api/pets")
@jwt_required()
def all_pets():
    """This route returns all pets."""

    pets = Pet.find_all()
    return make_json_response(pets, 200)


@pets.post("/api/pets/create")
@jwt_required()
def create_pet():
    """This route creates a new pet."""

    data = request.get_json()
    errors = Pet.validate_pet(data)

    if errors:
        return make_json_response(errors, 400)

    Pet.create(data)
    return make_json_response({"msg": "pet created"}, 201)


@pets.get("/api/pets/<int:pet_id>")
@jwt_required()
def pet_details(pet_id):
    """This route returns one pet."""

    pet = Pet.find_by_id(pet_id)
    if pet is None:
        return make_json_response({"msg": "pet not found"}, 404)

    return make_json_response(pet, 200)


@pets.patch("/api/pets/<int:pet_id>/update")
@jwt_required()
def update_pet(pet_id):
    """This route updates a pet."""

    pet = Pet.find_by_id(pet_id)
    if pet is None:
        return make_json_response({"msg": "pet not found"}, 404)

    data = request.get_json()
    errors = Pet.validate_pet(data)

    if errors:
        return make_json_response(errors, 400)

    Pet.update(pet_id, data)
    return make_json_response({"msg": "pet updated"}, 200)


@pets.post("/api/pets/<int:pet_id>/delete")
@jwt_required()
def delete_pet(pet_id):
    """This route deletes a pet."""

    pet = Pet.find_by_id(pet_id)
    if pet is None:
        return make_json_response({"msg": "pet not found"}, 404)

    Pet.delete_by_id(pet_id)
    return make_json_response({"msg": "pet deleted"}, 200)
