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

@api.route('/member/', methods=['GET'])
def get_member_by_id():
    members = Member.get_all_member()

    if members:
        all_members = [member.to_dict() for member in members]
        return jsonify(all_members), 200
    
    return jsonify({'error':'Not member found'}), 200

@api.route('/member/', methods=['POST'])
def create_member(): 
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    name = request.json.get('name', None)
   
    if not (email and password and name):

        return jsonify({'error': 'Missing parameters'}), 409

    new_member = Member(  email = email , password = password, username = name, is_active = True )

    # new_member.email = email
    # new_member.password = password
    # new_member.username = name
    # new_member.is_active = True
    
    try:
        new_member.create_member()

    except Exception as err:
        print(Exception, err)   

    return jsonify({"data": new_member.to_dict()}), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email and password:
        member = member.get_by_email(email)

        if member:
            '''check password'''
            access_token = create_access_token(identity=member.to_dict())
            return jsonify({'token': access_token}), 200

        return jsonify({'error':'Not found'}), 200

    return jsonify({"msg": "Wrong username or password"}), 401