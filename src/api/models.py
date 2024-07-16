from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    # Atributos
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=True)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
            'is_admin': self.is_admin,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

class Posts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    date_publication = db.Column(db.Date(), unique=False, nullable=True)
    image_url = db.Column(db.String(), unique=False, nullable=True)
    author_id = db.Column(db.Integer(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date_publication': self.date_publication,
            'image_url': self.image_url,
            'author_id': self.author_id,
        }

class Comments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(100), unique=False, nullable=False)
    description = db.Column(db.String(), unique=False, nullable=False)
    date_publication = db.Column(db.Date(), unique=False, nullable=True)
    author_id = db.Column(db.Integer(), unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])

    def __repr__(self):
        return f'<Comment: {self.description}>'

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date_publication': self.date_publication,
            'author_id': self.author_id,
        }

class Followers(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(), unique=True, nullable=False)
    last_name = db.Column(db.String(), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Follower: {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

class Planets(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    diameter = db.Column(db.String(), unique=False, nullable=True)
    image_url = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<Planet: {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'diameter': self.diameter,
            'image_url': self.image_url,
        }

class Characters(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    image_url = db.Column(db.String(), unique=False, nullable=True)
    description = db.Column(db.String(), unique=False, nullable=True)
    home_world = db.Column(db.String(), unique=False, nullable=True)
    planet_id = db.Column(db.Integer(), db.ForeignKey('planets.id'))
    planets_to = db.relationship('Planets', foreign_keys=[planet_id])

    def __repr__(self):
        return f'<Character: {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'description': self.description,
            'home_world': self.home_world,
        }

class Starships(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    capacity = db.Column(db.Integer(), unique=False, nullable=True)
    image_url = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<Starship: {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'capacity': self.capacity,
            'image_url': self.image_url,
        }

class Films(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    image_url = db.Column(db.String(), unique=False, nullable=True)
    release = db.Column(db.String(), unique=False, nullable=True)
    director = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<Film: {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'release': self.release,
            'director': self.director,
        }

class CharactersFilms(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    image_url = db.Column(db.String(), unique=False, nullable=True)
    role = db.Column(db.String(), unique=False, nullable=True)
    director = db.Column(db.String(), unique=False, nullable=True)
    character_id = db.Column(db.Integer(), db.ForeignKey('characters.id'))
    character_to = db.relationship('Characters', foreign_keys=[character_id])
    film_id = db.Column(db.Integer(), db.ForeignKey('films.id'))
    film_to = db.relationship('Films', foreign_keys=[film_id])

    def __repr__(self):
        return f'<CharacterFilm: {self.name}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'role': self.role,
            'director': self.director,
        }
