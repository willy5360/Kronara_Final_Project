"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from datetime import timedelta

from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member, Home, ToDoList, HumedityAndTemperature, Sokect, Appointment, Habits
from api.utils import generate_sitemap, APIException
from sqlalchemy import exc

# app = Flask(__name__)
# app.url_map.strict_slashes = False
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_CONNECTION_STRING')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config["JWT_SECRET_KEY"] = os.environ.get('JWI_KEY')
# jwt = JWTManager(app)

# MIGRATE = Migrate(app, db)
# db.init_app(app)
# CORS(app)
# setup_admin(app)

api = Blueprint('api', __name__)

@api.route('/member/', methods=['POST'])
def create_member(): 
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    name = request.json.get('name', None)
   
    if not email:
        return jsonify({'error': 'Missing parameters'}), 400

    new_member = Member()
    new_member.email = email
    new_member.password = password
    new_member.username = name
    new_member.is_active = True

    try:
        member_created = new_member.create_member()

    except exc.IntegrityError:
        return jsonify({'error': 'Fail in data'}), 400

    return jsonify(new_member.to_dict()), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email and password:
        member = member.get_by_email(email)

        if member:
            '''check password'''
            access_token = create_access_token(identity=member.to_dict(), expires_delta=timedelta(hours=12))
            return jsonify({'token': access_token}), 200

        return jsonify({'error':'Not found'}), 200

    return jsonify({"msg": "Wrong username or password"}), 401