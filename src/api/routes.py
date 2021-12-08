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
# from flask_jwt_extended import create_access_token, get_jwt_identity,  JWTManager
from flask_jwt_extended import jwt_required
from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


api = Blueprint('api', __name__)

@api.route('/family/<int:id>/event', methods=['POST'])
@jwt_required()
def create_event(id):
    id_user = get_jwt_identity()
    if id != id_user.get('home_id', None):
        return jsonify({'error': 'no esta autorizado'}), 403
    
    appointment = request.json.get('appointment', None)
    friend = request.json.get('friend', None)
    time_start = request.json.get('start', None)
    time_end = request.json.get('start', None)
    email = request.json.get('email', None)
    location = request.json.get('location', None)
    notes = request.json.get('notes', None)
  
    if not appointment:
        return jsonify({'error': 'Missing parameters'}), 400

    new_event = Appointment(appointment = appointment, time_start = time_start, time_end = time_end, email = email, location = location, notes = notes )

    try:
        event_created = new_event.create_event(friends, )
    
    except exc.IntegrityError:
        return jsonify({'error':'fail in data'}), 400

    return jsonify(new_event.to_dict()), 201

    
   
   
   
