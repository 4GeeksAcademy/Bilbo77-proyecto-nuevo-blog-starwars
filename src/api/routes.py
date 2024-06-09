"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


# Create a route to authenticate your users and return JWTs. The
# The create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Lógica de valicadión de email y contraseña
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, User.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id': user.id, 'user_is_admin': user.is_admin})
        response_body['message'] = 'User logueado'
        response_body['access_token'] = access_token
        return response_body, 200
    response_body['message'] = 'Bad username or password'
    return response_body, 401


# Protect a route with jwt_required, which will kick out requests without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body['message'] = f'User logueado: {current_user}'
    return response_body, 200

    # if email != "test" or password != "test":
    #    return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/users', methods=['GET','POST'])
def handle_users1():
    response_body = {}
    if request.method == 'GET':
        users = db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in users]
        response_body['results'] = results
        response_body['message'] = 'Listado de usuarios'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Este endpoint no es válido, deberá hacer un /signup'
        return response_body, 200
        

@api.route('/users/<int:id>', methods=['GET','PUT','DELETE'])
def handle_users2(id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usuario no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.first_name = data['first_name']
            user.last_name = data['last_name']
            db.session.commit()
            response_body['message'] = 'Datos del usuario actualizados'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'Usuario no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario no existe'
        response_body['results'] = {}
        return response_body, 200

