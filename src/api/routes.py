"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException

import os
from datetime import timedelta

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
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


api = Blueprint('api', __name__)

@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['POST'])
# @jwt_required()
def create_event(home_id, member_id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    print("estoy dentro de la ruta", request.json)

    body = request.get_json()
   

    appointment = request.json.get("appointment", None)
    friend = request.json.get('friend', None)
    time_start = request.json.get('time_start', None)
    time_ends = request.json.get('time_ends', None)
    email = request.json.get('email', None)
    location = request.json.get('location', None)
    notes = request.json.get('notes', None)

    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)

    if not home and member:
        return jsonify({'error':'onloading event'}), 400
    
        if not appointment:
            return jsonify({'error': 'Missing parameters'}), 400

    new_event = Appointment(appointment = appointment, time_start = time_start, time_ends = time_ends, email = email, location = location, notes = notes )
    
    # try:
    event_created = new_event.create()
    
    # except exc.IntegrityError:
    #     return jsonify({'error':'fail in data'}), 400

    return jsonify(event_created.to_dict()), 201

@api.route('/event', methods=['GET'])
# @jwt_required()
def get_event():
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403

    appointments= Appointment.get_all()

    all_appointments=[appointment.to_dict() for appointment in appointments]
    return jsonify(all_appointments), 200

@api.route('/event/<int:id>/', methods=['GET'])
# @jwt_required()
def get_event_by_id(id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    
    appointment= Appointment.get_by_id(id)

    if appointment:
        return jsonify(appointment.to_dict()), 200

        return jsonify({'error': 'appointment not found'}), 404

@api.route('/appointment/<int:id>', methods=['PUT','PATCH'])
# @jwt_required()
def update_appointment(id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    
    new_item=request.json.get('item', None)

    if not new_item:
        return jsonify({'error': 'missing items'}), 400

    appointment= Appointment.get_by_id(id)
    if appointment:
        appointment=appointment.update(new_item)

    return jsonify({'error': 'appointment not found'}), 404

@api.route('//home/<int:home_id>/member/<int:member_id>/event/<int:id>', methods=['DELETE'])
# @jwt_required()
def delete_appointment(id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    
    appointment=Appointment.get_by_id(id)
    if appointment:
        appointment.delete()
        return jsonify(appointment.to_dict()), 200

    return jsonify({'error':'appointment not found'}), 404

