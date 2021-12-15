"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits  
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/home/<int:home_id>/member/<int:member_id>/event', methods=['POST'])
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


@api.route('/home/<int:home_id>/member',methods=['GET'])
def get_all_members(home_id):
    current_home = Home.get_by_id(home_id)

    if not current_home:
        return jsonify({'error':'home not found'}), 404
    
    members = Member.get_all_by_home(home_id)
    all_members = [member.to_dict() for member in members]

    return jsonify(all_members), 200