"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from datetime import timedelta

from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import check_password_hash, generate_password_hash
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException
from datetime import timedelta

from sqlalchemy import exc


api = Blueprint('api', __name__)


@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['POST']) 
def create_event(home_id, member_id):
    appointment = request.json.get("appointment", None)
    friend = request.json.get('friend', None)
    time_start = request.json.get('time_start', None)
    time_ends = request.json.get('time_ends', None)
    location = request.json.get('location', None)
    notes = request.json.get('notes', None)
    date = request.json.get('date', None)


    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)
    

    if not home and member:
        return jsonify({'error':'onloading event'}), 400
    
        if not appointment:
            return jsonify({'error': 'Missing parameters'}), 400

    new_event = Appointment(appointment = appointment, time_start = time_start, time_ends = time_ends, location = location, notes = notes, date = date )
    
    
    event_created = new_event.create()
    appointment_to_be_assigned = Appointment.get_by_id(event_created.id)

    if member and appointment_to_be_assigned:

        added_appointment = member.add_appointment_to_member(appointment_to_be_assigned)
       

        return jsonify(event_created.to_dict()), 200
       
    return jsonify({"error":"fail on adding appointment"}), 400


@api.route('/home/<int:home_id>/member/',methods=['GET']) #¡LISTO! para obtener todos los miembros de una casa
def get_all_members(home_id):
    current_home = Home.get_by_id(home_id)

    if not current_home:
        return jsonify({'error':'home not found'}), 404
    
    members = Member.get_all_by_home(home_id)
    all_members = [member.to_dict() for member in members]

    return jsonify(all_members), 200


@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['GET']) 
def get_event(home_id,member_id):
    
    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)

    if home and member:
        member_appointments= member.get_all_appointments_from_member()

        all_appointments=[appointment.to_dict() for appointment in member_appointments]
        return jsonify(all_appointments), 200

    return jsonify({'error','missing appointments'}),400

@api.route('/home/<int:home_id>/member/<int:member_id>/event/<int:event_id>', methods=['GET'])
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


@api.route('/home/<int:home_id>/member/<int:member_id>/event/<int:event_id>', methods=['DELETE'])   
def delete_appointment(home_id, member_id,event_id):

    
    home= Home.get_by_id(home_id)
    member = Member.get_by_id(member_id)
    
    appointment=Appointment.get_by_id(event_id)
    if appointment:
        appointment.delete()
        all_appointments = Appointment.get_all()
        all_appointments_dict = [appointment.to_dict() for appointment in all_appointments]
        return jsonify(all_appointments_dict), 200

    return jsonify({'error':'appointment not found'}), 404


@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@api.route('/')
def sitemap():
    return generate_sitemap(app)

@api.route('/member/', methods=['GET'])
def get_member_by_id():
    members = Member.get_all_member()

    if members:
        all_members = [member.to_dict() for member in members]
        return jsonify(all_members), 200
    
    return jsonify({'error':'Not member found'}), 404

@api.route('/member/', methods=['POST'])
def create_member(): 
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    username = request.json.get('username', None)
    home_status = request.json.get('home_status', None)
    home = request.json.get("home", None)
    condition = request.json.get('condition', None)
    new_city = ""
    new_name = ""

    if not (email and password and username and home_status and home and condition):
        return jsonify({'error': 'Missing parameters'}), 409
        
    if not condition:
        return jsonify({'error': 'Yoy should accept de Terms'}), 403

        if home_status == 'existing_home':
                email = email, 
                is_active = True,
                home_id = home.id, 
            
        else:
            return jsonify({'error': "Home doesn't exist"}), 404

    elif home_status == 'new_home':
        new_city = request.json.get("city", None)
        new_name = home

    if not new_city and new_name:
        return jsonify({'error': 'Missing parameters'}), 409

    new_home = Home(city = new_city, name = home)

    new_home_created = new_home.create_home()

    if new_home: 
        new_member = Member (
            username = username,
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

@api.route('home/<int:home_id>/task', methods=['GET'])
def get_task(home_id):
    home = Home.get_by_id(home_id)
    if not home:
        return jsonify({'error': 'home not found'}), 404

    tasks= Task.get_all_by_home(home_id)
    all_tasks=[task.to_dict() for task in tasks]
    return jsonify(all_tasks), 200

@api.route('home/<int:home_id>/task/<int:task_id>', methods=['GET'])
def get_task_by_id(home_id, task_id):
    home = Home.get_by_id(home_id)
    task = Task.get_by_id(task_id)

    if not home and task:
        return jsonify({'error': 'task not found'}), 404
    
    return jsonify(task.to_dict()), 200

@api.route('home/<int:home_id>/task', methods=['POST'])
def create_item(home_id):

    home=Home.get_by_id(home_id)
    new_item=request.json.get('item',None)
    

    if not home and new_item:
        return jsonify({'error':'missing items'}), 400

    task= Task(item=new_item, done=False, home_id=home_id)
  
    task_created=task.create()
    return jsonify(task_created.to_dict()), 201
    
@api.route('home/<int:home_id>/task/<int:task_id>', methods=['DELETE'])
def delete_task(home_id, task_id):
    home = Home.get_by_id(home_id)
    task = Task.get_by_id(task_id)

    if not home and task:
        return jsonify({'error':'task not found'}), 404

    task.delete()
    all_task = Task.get_all_by_home(home_id)
    all_task_dict = [task.to_dict() for task in all_task]
    
    return jsonify(all_task_dict), 200

@api.route("/habits", methods=["GET"])
def get_habits_by_id(): 
    habits = Habits.get_all_habits()

    if habits:
        all_habits = [habit.to_dict() for habit in habits]
        return jsonify(all_habits), 200
    
    return jsonify({'error':'Not habits found'}), 404
