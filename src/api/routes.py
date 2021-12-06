"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, ToDoList, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException

import os
from datetime import timedelta

from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

MIGRATE = Migrate(app,db)
db.init_app(app)
CORS(app)

api = Blueprint('api', __name__)

@api.route('/event', methods=['POST'])
def create_event():
    appoitment = request.json.get('appoitment', None)
    friend = request.json.get('friend', None)
    time_start = request.json.get('start', None)
    time_end = request.json.get('start', None)
    email = request.json.get('email', None)
    location = request.json.get('location', None)
    notes = request.json.get('notes', None)
  
    if not appoitment:
        return jsonify({'error': 'Missing parameters'}), 400

    new_event = Event()
    new_event.appoitment = appoitment
    new_event.friend = friend
    new_event.time_start = time_start 
    new_event.time_end = time_end
    new_event.email = email
    new_event.location = location
    new_event.notes = notes
  

    try:
        event_created = new_event.create_event()
    
     except exc.IntegrityError:
        return jsonify({'error':'fail in data'}), 400

    return jsonify(new_event.to_dict()), 201

    
   
   
   
