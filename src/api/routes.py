"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException
from sqlalchemy import exc

api = Blueprint('api', __name__)



@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
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
    print("aqui esta el new item", new_item)
  
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


