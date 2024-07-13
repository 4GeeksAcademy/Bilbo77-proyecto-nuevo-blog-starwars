"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Comments, Followers, Planets, Characters, Starships, Films, CharactersFilms


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
    # Lógica de validación de email y contraseña
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
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


@api.route('/users', methods=['GET', 'POST'])
def handle_users():
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


@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
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


@api.route('/posts', methods=['GET', 'POST'])
def handle_posts():
    response_body = {}
    if request.method == 'GET':
        posts = db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in posts]
        response_body['results'] = results
        response_body['message'] = 'Listado de posts'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_post = Posts(
            title=data['title'],
            description=data['description'],
            date_publication=data['date_publication'],
            image_url=data['image_url'],
            author_id=data['author_id'],
            user_id=data['user_id']
        )
        db.session.add(new_post)
        db.session.commit()
        response_body['message'] = 'Post creado'
        response_body['results'] = new_post.serialize()
        return response_body, 201


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_post(id):
    response_body = {}
    if request.method == 'GET':
        post = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
        if post:
            response_body['results'] = post.serialize()
            response_body['message'] = 'Post encontrado'
            return response_body, 200
        response_body['message'] = 'Post no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        post = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
        if post:
            post.title = data['title']
            post.description = data['description']
            post.date_publication = data['date_publication']
            post.image_url = data['image_url']
            post.author_id = data['author_id']
            db.session.commit()
            response_body['message'] = 'Datos del post actualizados'
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = 'Post no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        post = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
        if post:
            db.session.delete(post)
            db.session.commit()
            response_body['message'] = 'Post eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Post no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/comments', methods=['GET', 'POST'])
def handle_comments():
    response_body = {}
    if request.method == 'GET':
        comments = db.session.execute(db.select(Comments)).scalars()
        results = [row.serialize() for row in comments]
        response_body['results'] = results
        response_body['message'] = 'Listado de comentarios'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_comment = Comments(
            title=data['title'],
            description=data['description'],
            date_publication=data['date_publication'],
            author_id=data['author_id'],
            user_id=data['user_id'],
            post_id=data['post_id']
        )
        db.session.add(new_comment)
        db.session.commit()
        response_body['message'] = 'Comentario creado'
        response_body['results'] = new_comment.serialize()
        return response_body, 201


@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_comment(id):
    response_body = {}
    if request.method == 'GET':
        comment = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
        if comment:
            response_body['results'] = comment.serialize()
            response_body['message'] = 'Comentario encontrado'
            return response_body, 200
        response_body['message'] = 'Comentario no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        comment = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
        if comment:
            comment.title = data['title']
            comment.description = data['description']
            comment.date_publication = data['date_publication']
            comment.author_id = data['author_id']
            db.session.commit()
            response_body['message'] = 'Datos del comentario actualizados'
            response_body['results'] = comment.serialize()
            return response_body, 200
        response_body['message'] = 'Comentario no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        comment = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            response_body['message'] = 'Comentario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Comentario no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/followers', methods=['GET', 'POST'])
def handle_followers():
    response_body = {}
    if request.method == 'GET':
        followers = db.session.execute(db.select(Followers)).scalars()
        results = [row.serialize() for row in followers]
        response_body['results'] = results
        response_body['message'] = 'Listado de seguidores'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_follower = Followers(
            email=data['email'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            user_id=data['user_id']
        )
        db.session.add(new_follower)
        db.session.commit()
        response_body['message'] = 'Seguidor creado'
        response_body['results'] = new_follower.serialize()
        return response_body, 201


@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_follower(id):
    response_body = {}
    if request.method == 'GET':
        follower = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
        if follower:
            response_body['results'] = follower.serialize()
            response_body['message'] = 'Seguidor encontrado'
            return response_body, 200
        response_body['message'] = 'Seguidor no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        follower = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
        if follower:
            follower.email = data['email']
            follower.first_name = data['first_name']
            follower.last_name = data['last_name']
            db.session.commit()
            response_body['message'] = 'Datos del seguidor actualizados'
            response_body['results'] = follower.serialize()
            return response_body, 200
        response_body['message'] = 'Seguidor no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        follower = db.session.execute(db.select(Followers).where(Followers.id == id)).scalar()
        if follower:
            db.session.delete(follower)
            db.session.commit()
            response_body['message'] = 'Seguidor eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Seguidor no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/planets', methods=['GET', 'POST'])
def handle_planets():
    response_body = {}
    if request.method == 'GET':
        planets = db.session.execute(db.select(Planets)).scalars()
        results = [row.serialize() for row in planets]
        response_body['results'] = results
        response_body['message'] = 'Listado de planetas'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_planet = Planets(
            name=data['name'],
            diameter=data['diameter'],
            image_url=data['image_url']
        )
        db.session.add(new_planet)
        db.session.commit()
        response_body['message'] = 'Planeta creado'
        response_body['results'] = new_planet.serialize()
        return response_body, 201


@api.route('/planets/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_planet(id):
    response_body = {}
    if request.method == 'GET':
        planet = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
        if planet:
            response_body['results'] = planet.serialize()
            response_body['message'] = 'Planeta encontrado'
            return response_body, 200
        response_body['message'] = 'Planeta no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        planet = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
        if planet:
            planet.name = data['name']
            planet.diameter = data['diameter']
            planet.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Datos del planeta actualizados'
            response_body['results'] = planet.serialize()
            return response_body, 200
        response_body['message'] = 'Planeta no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        planet = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
        if planet:
            db.session.delete(planet)
            db.session.commit()
            response_body['message'] = 'Planeta eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Planeta no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/characters', methods=['GET', 'POST'])
def handle_characters():
    response_body = {}
    if request.method == 'GET':
        characters = db.session.execute(db.select(Characters)).scalars()
        results = [row.serialize() for row in characters]
        response_body['results'] = results
        response_body['message'] = 'Listado de personajes'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_character = Characters(
            name=data['name'],
            image_url=data['image_url'],
            description=data['description'],
            home_world=data['home_world'],
            planet_id=data['planet_id']
        )
        db.session.add(new_character)
        db.session.commit()
        response_body['message'] = 'Personaje creado'
        response_body['results'] = new_character.serialize()
        return response_body, 201


@api.route('/characters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_character(id):
    response_body = {}
    if request.method == 'GET':
        character = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
        if character:
            response_body['results'] = character.serialize()
            response_body['message'] = 'Personaje encontrado'
            return response_body, 200
        response_body['message'] = 'Personaje no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        character = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
        if character:
            character.name = data['name']
            character.image_url = data['image_url']
            character.description = data['description']
            character.home_world = data['home_world']
            character.planet_id = data['planet_id']
            db.session.commit()
            response_body['message'] = 'Datos del personaje actualizados'
            response_body['results'] = character.serialize()
            return response_body, 200
        response_body['message'] = 'Personaje no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        character = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
        if character:
            db.session.delete(character)
            db.session.commit()
            response_body['message'] = 'Personaje eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Personaje no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/starships', methods=['GET', 'POST'])
def handle_starships():
    response_body = {}
    if request.method == 'GET':
        starships = db.session.execute(db.select(Starships)).scalars()
        results = [row.serialize() for row in starships]
        response_body['results'] = results
        response_body['message'] = 'Listado de naves'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_starship = Starships(
            name=data['name'],
            capacity=data['capacity'],
            image_url=data['image_url']
        )
        db.session.add(new_starship)
        db.session.commit()
        response_body['message'] = 'Nave creada'
        response_body['results'] = new_starship.serialize()
        return response_body, 201


@api.route('/starships/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_starship(id):
    response_body = {}
    if request.method == 'GET':
        starship = db.session.execute(db.select(Starships).where(Starships.id == id)).scalar()
        if starship:
            response_body['results'] = starship.serialize()
            response_body['message'] = 'Nave encontrada'
            return response_body, 200
        response_body['message'] = 'Nave no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        starship = db.session.execute(db.select(Starships).where(Starships.id == id)).scalar()
        if starship:
            starship.name = data['name']
            starship.capacity = data['capacity']
            starship.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Datos de la nave actualizados'
            response_body['results'] = starship.serialize()
            return response_body, 200
        response_body['message'] = 'Nave no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        starship = db.session.execute(db.select(Starships).where(Starships.id == id)).scalar()
        if starship:
            db.session.delete(starship)
            db.session.commit()
            response_body['message'] = 'Nave eliminada'
            response_body['results'] = {}
        response_body['message'] = 'Nave no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/films', methods=['GET', 'POST'])
def handle_films():
    response_body = {}
    if request.method == 'GET':
        films = db.session.execute(db.select(Films)).scalars()
        results = [row.serialize() for row in films]
        response_body['results'] = results
        response_body['message'] = 'Listado de películas'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_film = Films(
            name=data['name'],
            image_url=data['image_url'],
            release=data['release'],
            director=data['director']
        )
        db.session.add(new_film)
        db.session.commit()
        response_body['message'] = 'Película creada'
        response_body['results'] = new_film.serialize()
        return response_body, 201


@api.route('/films/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_film(id):
    response_body = {}
    if request.method == 'GET':
        film = db.session.execute(db.select(Films).where(Films.id == id)).scalar()
        if film:
            response_body['results'] = film.serialize()
            response_body['message'] = 'Película encontrada'
            return response_body, 200
        response_body['message'] = 'Película no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        film = db.session.execute(db.select(Films).where(Films.id == id)).scalar()
        if film:
            film.name = data['name']
            film.image_url = data['image_url']
            film.release = data['release']
            film.director = data['director']
            db.session.commit()
            response_body['message'] = 'Datos de la película actualizados'
            response_body['results'] = film.serialize()
            return response_body, 200
        response_body['message'] = 'Película no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        film = db.session.execute(db.select(Films).where(Films.id == id)).scalar()
        if film:
            db.session.delete(film)
            db.session.commit()
            response_body['message'] = 'Película eliminada'
            response_body['results'] = {}
        response_body['message'] = 'Película no existe'
        response_body['results'] = {}
        return response_body, 200


@api.route('/charactersfilms', methods=['GET', 'POST'])
def handle_charactersfilms():
    response_body = {}
    if request.method == 'GET':
        charactersfilms = db.session.execute(db.select(CharactersFilms)).scalars()
        results = [row.serialize() for row in charactersfilms]
        response_body['results'] = results
        response_body['message'] = 'Listado de personajes y películas'
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        new_characterfilm = CharactersFilms(
            name=data['name'],
            image_url=data['image_url'],
            role=data['role'],
            director=data['director'],
            character_id=data['character_id'],
            film_id=data['film_id']
        )
        db.session.add(new_characterfilm)
        db.session.commit()
        response_body['message'] = 'Personaje y película creados'
        response_body['results'] = new_characterfilm.serialize()
        return response_body, 201


@api.route('/charactersfilms/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_characterfilm(id):
    response_body = {}
    if request.method == 'GET':
        characterfilm = db.session.execute(db.select(CharactersFilms).where(CharactersFilms.id == id)).scalar()
        if characterfilm:
            response_body['results'] = characterfilm.serialize()
            response_body['message'] = 'Personaje y película encontrados'
            return response_body, 200
        response_body['message'] = 'Personaje y película no existen'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        characterfilm = db.session.execute(db.select(CharactersFilms).where(CharactersFilms.id == id)).scalar()
        if characterfilm:
            characterfilm.name = data['name']
            characterfilm.image_url = data['image_url']
            characterfilm.role = data['role']
            characterfilm.director = data['director']
            characterfilm.character_id = data['character_id']
            characterfilm.film_id = data['film_id']
            db.session.commit()
            response_body['message'] = 'Datos del personaje y película actualizados'
            response_body['results'] = characterfilm.serialize()
            return response_body, 200
        response_body['message'] = 'Personaje y película no existen'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        characterfilm = db.session.execute(db.select(CharactersFilms).where(CharactersFilms.id == id)).scalar()
        if characterfilm:
            db.session.delete(characterfilm)
            db.session.commit()
            response_body['message'] = 'Personaje y película eliminados'
            response_body['results'] = {}
        response_body['message'] = 'Personaje y película no existen'
        response_body['results'] = {}
        return response_body, 200

