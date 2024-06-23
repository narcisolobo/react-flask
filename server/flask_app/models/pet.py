from flask_app.config.mysqlconnection import connectToMySQL
from datetime import datetime


class Pet:
    """Represents a pet."""

    _db = "pets_db"

    @staticmethod
    def validate_pet(data):
        """Validates a pet."""

        errors = {}

        if len(data["name"].strip()) == 0:
            errors["name"] = "Please enter pet name."
        elif len(data["name"].strip()) < 2:
            errors["name"] = "Pet name must be at least two characters."

        if len(data["type"].strip()) == 0:
            errors["type"] = "Please enter pet type."
        elif len(data["type"].strip()) < 2:
            errors["type"] = "Pet type must be at least two characters."

        if len(data["birthday"].strip()) == 0:
            errors["birthday"] = "Please enter pet birthday."
        else:
            try:
                datetime.strptime(data["birthday"], "%Y-%m-%d")
            except:
                errors["birthday"] = "Invalid date format."

        if data["is_derpy"] not in ["0", "1"]:
            errors["is_derpy"] = "Invalid derpiness."

        return errors

    @classmethod
    def find_all(cls):
        """Finds all pets in the database."""

        query = "SELECT * FROM pets;"
        return connectToMySQL(Pet._db).query_db(query)

    @classmethod
    def create(cls, form_data):
        """Inserts a new pet into the database."""

        query = """
        INSERT INTO pets
        (name, type, birthday, is_derpy)
        VALUES
        (%(name)s, %(type)s, %(birthday)s, %(is_derpy)s);
        """
        connectToMySQL(Pet._db).query_db(query, form_data)
        return

    @classmethod
    def find_by_id(cls, pet_id):
        """Finds one pet by id in the database."""

        query = "SELECT * FROM pets WHERE id = %(pet_id)s;"
        data = {"pet_id": pet_id}
        list_of_dicts = connectToMySQL(Pet._db).query_db(query, data)
        if len(list_of_dicts) == 0:
            return None
        return list_of_dicts[0]

    @classmethod
    def update(cls, pet_id, form_data):
        """Updates a pet from a form."""

        query = """
        UPDATE pets
        SET
        name=%(name)s,
        type=%(type)s,
        birthday=%(birthday)s,
        is_derpy=%(is_derpy)s
        WHERE id = %(pet_id)s;
        """

        form_data["pet_id"] = pet_id
        connectToMySQL(Pet._db).query_db(query, form_data)
        return

    @classmethod
    def delete_by_id(cls, pet_id):
        """Deletes a pet by id."""

        query = "DELETE FROM pets WHERE id = %(pet_id)s;"
        data = {"pet_id": pet_id}
        connectToMySQL(Pet._db).query_db(query, data)
        return
