"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, ToDoList, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException

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
    invite = request.json.get('invite', None)
    email = request.json.get('email', None)
    location = request.json.get('location', None)
    # NewEvent = request.json.get('', None)
    # NewEvent = request.json.get('', None)
    
    if not body:
        return jsonify({'error': 'Missing parameters'}), 400

    event = user( event = event)
    try:
        event_created = event.create()
        return jsonify(event_created.to_dict()), 201

    )
    
   
    new_user = User(username = new_user_username, password = new_user_password, _is_active = True)

    try:
        new_use_created = new_user.adding_new_user()
        return jsonify(new_user_created.to_dict()), 201
    except exc.IntegrityError:
        return jsonify({'error':'can not create new user'}), 400
