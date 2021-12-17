"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException
from datetime import timedelta

from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
# from flask_jwt_extended import create_access_token, get_jwt_identity,  JWTManager
from flask_jwt_extended import jwt_required
from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['POST']) #¡LISTO! un miembro de una casa añade un evento y agrega a otros miembros LISTO!
# @jwt_required()
def create_event(home_id, member_id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    print("estoy dentro de la ruta", request.json)

    appointment = request.json.get("appointment", None)
    friend = request.json.get('friend', None)
    time_start = request.json.get('time_start', None)
    time_ends = request.json.get('time_ends', None)
    location = request.json.get('location', None)
    notes = request.json.get('notes', None)


    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)
    

    if not home and member:
        return jsonify({'error':'onloading event'}), 400
    
        if not appointment:
            return jsonify({'error': 'Missing parameters'}), 400

    new_event = Appointment(appointment = appointment, time_start = time_start, time_ends = time_ends, location = location, notes = notes )
    
    # try:
    event_created = new_event.create()
    appointment_to_be_assigned = Appointment.get_by_id(event_created.id)

    if member and appointment_to_be_assigned:

        added_appointment = member.add_appointment_to_member(appointment_to_be_assigned)
       

        return jsonify(event_created.to_dict()), 200
        # return jsonify(member_appointments), 200


    # except exc.IntegrityError:
    #     return jsonify({'error':'fail in data'}), 400

    return jsonify({"error":"fail on adding appointment"}), 400


@api.route('/home/<int:home_id>/member/',methods=['GET']) #¡LISTO! para obtener todos los miembros de una casa
def get_all_members(home_id):
    current_home = Home.get_by_id(home_id)

    if not current_home:
        return jsonify({'error':'home not found'}), 404
    
    members = Member.get_all_by_home(home_id)
    all_members = [member.to_dict() for member in members]

    return jsonify(all_members), 200


@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['GET']) #¡LISTO! ver todos los eventos de un miembro de una casa
# @jwt_required()
def get_event(home_id,member_id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403
    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)

    if home and member:
        member_appointments= member.get_all_appointments_from_member()

        all_appointments=[appointment.to_dict() for appointment in member_appointments]
        return jsonify(all_appointments), 200

    return jsonify({'error','missing appointments'}),400

@api.route('/home/<int:home_id>/member/<int:member_id>/event/<int:event_id>', methods=['GET'])
# @jwt_required()
def get_event_by_id(home_id,member_id,event_id):
    appointment= Appointment.get_by_id(event_id)
    print("aqui esta el event id",event_id)
    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)

    if home and member and appointment:
        member_appointment= member.get_event_by_id()



        one_appointment=[appointment.to_dict() for appointment in member_appointment]
        return jsonify(one_appointment), 200

    return jsonify({'error','missing appointments'}),400



# @api.route('/event/<int:id>/', methods=['GET']) #entrega todos las citas de todos los usuarios de todas las casas (esta mal, solo para pruebas)
# # @jwt_required()
# def get_event_by_id(id):
#     # id_user = get_jwt_identity()
#     # if id != id_user.get('home_id', None):
#     #     return jsonify({'error': 'no esta autorizado'}), 403
    
#     appointment= Appointment.get_by_id(id)

#     if appointment:
#         return jsonify(appointment.to_dict()), 200

#         return jsonify({'error': 'appointment not found'}), 404

# @api.route('/appointment/<int:id>', methods=['PUT','PATCH'])
# # @jwt_required()
# def update_appointment(id):
#     # id_user = get_jwt_identity()
#     if id != id_user.get('home_id', None):
#         return jsonify({'error': 'no esta autorizado'}), 403
    
#     new_item=request.json.get('item', None)

#     if not new_item:
#         return jsonify({'error': 'missing items'}), 400

#     appointment= Appointment.get_by_id(id)
#     if appointment:
#         appointment=appointment.update(new_item)

#     return jsonify({'error': 'appointment not found'}), 404

@api.route('/home/<int:home_id>/member/<int:member_id>/event/<int:event_id>', methods=['DELETE'])   #FUNCIONA
# @jwt_required()
def delete_appointment(home_id, member_id,event_id):
    # id_user = get_jwt_identity()
    # if id != id_user.get('home_id', None):
    #     return jsonify({'error': 'no esta autorizado'}), 403

    
    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)
    
    appointment=Appointment.get_by_id(event_id)
    if appointment:
        appointment.delete()
        all_appointments = Appointment.get_all()
        all_appointments_dict = [appointment.to_dict() for appointment in all_appointments]
        return jsonify(all_appointments_dict), 200

    return jsonify({'error':'appointment not found'}), 404

