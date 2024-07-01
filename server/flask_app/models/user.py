from re import compile
from flask_app import bcrypt
from flask_app.config.mysqlconnection import connectToMySQL

EMAIL_REGEX = compile(r"^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$")


class User:
    """Represents a user."""

    _db = "pets_db"

    @staticmethod
    def validate_register(data):
        """Validates the register data."""

        errors = {}
        if len(data["first_name"].strip()) == 0:
            errors["first_name"] = "Please enter first name."
        elif len(data["first_name"].strip()) < 2:
            errors["first_name"] = "First name must be at least two characters."

        if len(data["last_name"].strip()) == 0:
            errors["last_name"] = "Please enter last name."
        elif len(data["last_name"].strip()) < 2:
            errors["last_name"] = "Last name must be at least two characters."

        if len(data["email"].strip()) == 0:
            errors["email"] = "Please enter email."
        elif not EMAIL_REGEX.match(data["email"]):
            errors["email"] = "Invalid email address."

        if len(data["password"].strip()) == 0:
            errors["password"] = "Please enter password."
        elif len(data["password"].strip()) < 8:
            errors["password"] = "Password must be at least eight characters."
        else:
            if data["password"] != data["confirm_password"]:
                errors["confirm_password"] = "Passwords must match."

        return errors

    @staticmethod
    def validate_login(data):
        """Validates the login data."""

        errors = {}
        if len(data["email"].strip()) == 0:
            errors["email"] = "Please enter email."
        elif not EMAIL_REGEX.match(data["email"]):
            errors["email"] = "Invalid email address."

        if len(data["password"].strip()) == 0:
            errors["password"] = "Please enter password."
        elif len(data["password"].strip()) < 8:
            errors["password"] = "Password must be at least eight characters."

        return errors

    @staticmethod
    def generate_hash(password):
        """Generates a hashed password."""
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def check_hash(hashed_password, entered_password):
        """Checks an entered password against the hashed password."""

        return bcrypt.check_password_hash(hashed_password, entered_password)

    @classmethod
    def create(cls, data):
        """Creates a new user."""

        query = """
        INSERT INTO users
        (first_name, last_name, email, password)
        VALUES
        (%(first_name)s, %(last_name)s, %(email)s, %(password)s);
        """
        connectToMySQL(User._db).query_db(query, data)
        return

    @classmethod
    def find_by_email(cls, email):
        """Finds a user by email address."""

        query = "SELECT * FROM users WHERE email=%(email)s;"
        data = {"email": email}
        list_of_dicts = connectToMySQL(User._db).query_db(query, data)

        if len(list_of_dicts) == 0:
            return None

        return list_of_dicts[0]

    @classmethod
    def add_to_blocklist(cls, jti):
        """Creates a new database row with jti. Invoked when a user logs out."""

        query = """
        INSERT INTO blocked_tokens (jti) VALUES (%(jti)s);
        """
        data = {"jti": jti}
        connectToMySQL(User._db).query_db(query, data)
        return

    @classmethod
    def is_blocked(cls, jti):
        """Queries the blocked_tokens table. Returns True if token is blocked."""

        query = """SELECT * FROM blocked_tokens WHERE jti=%(jti)s;"""
        data = {"jti": jti}

        list_of_dicts = connectToMySQL(User._db).query_db(query, data)
        if len(list_of_dicts) == 0:
            # token not in blocked_tokens
            return False

        # token blocked (user logged out)
        return True
