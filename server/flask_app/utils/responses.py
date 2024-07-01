from flask import jsonify


def make_json_response(message, status):
    return jsonify(message), status
