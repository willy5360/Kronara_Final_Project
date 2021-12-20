
import os
from datetime import timedelta

from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Flask, request, jsonify, url_for, Blueprint

from api.models import db, Member, Home, ToDoList, HumedityAndTemperature, Sokect, Appointment, Habits
from api.utils import generate_sitemap, APIException
from sqlalchemy import exc

app = Flask(__name__)

JWTManager(app)

api = Blueprint('api', __name__)

@api.route('/member/', methods=['GET'])
def get_member_by_id():
    members = Member.get_all_member()

    if members:
        all_members = [member.to_dict() for member in members]
        return jsonify(all_members), 200
    
    return jsonify({'error':'Not member found'}), 404

#solo registra
@api.route('/member/', methods=['POST'])
def create_member(): 
    print ("estas en el back", request.json)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    name = request.json.get('name', None)
    home_status = request.json.get('home_status', None)
    home = request.json.get("home", None)
    condition = request.json.get('condition', None)
    new_city = ""
    new_name = ""

    if not (email and password and name and home_status and home and condition):
        print("en este validamos el email, password , name...")
        return jsonify({'error': 'Missing parameters'}), 409
        
    if not condition:
        return jsonify({'error': 'Yoy should accept de Terms'}), 403

    if home_status == 'existing_home':
        home = Home.get_home_by_name(home)
        if home:
            new_member = Member( 
                username = name, 
                password =  generate_password_hash(password, method='pbkdf2:sha256', salt_length=8),
                email = email, 
                is_active = True,
                home_id = home.id, 
            )
        else:
            return jsonify({'error': "Home doesn't exist"}), 404

    elif home_status == 'new_home':
        new_city = request.json.get("city", None)
        new_name = request.json.get("name", None)

    if not new_city and new_name:
        print("este es el error de validacion de city y name")
        return jsonify({'error': 'Missing parameters'}), 409

    new_home = Home(city = new_city, name = new_name)

    new_home_created = new_home.create_home()

    if new_home: 
        new_member = Member (
            username = name,
            password =  generate_password_hash(password, method='pbkdf2:sha256', salt_length=8), 
            email = email, 
            is_active = True, 
            home_id = new_home_created.id, 
        )
    else: 
        return jsonify({'error': "Home already exist"}), 404
    
    try:
        new_member.create_member()
        access_token = create_access_token(identity=new_member.to_dict(), expires_delta = timedelta(minutes=100))
        return jsonify({"token": access_token, "member" : new_member.to_dict()}), 201


    except exc.IntegrityError:
        return {'error': 'Something is wrong'}, 409

    

@api.route("/login/", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    member = Member.get_by_email(email)

    if member and check_password_hash(member.password, password):
        access_token = create_access_token(identity=member.to_dict(), expires_delta= timedelta(minutes=100))
        return jsonify({'token': access_token}), 200

    return jsonify({"msg": "Wrong username or password"}), 401