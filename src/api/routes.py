"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member,  Home, Task, HumedityAndTemperature, Sokect, Appointment, Habits 
from api.utils import generate_sitemap, APIException
from sqlalchemy import exc

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@api.route('/')
def sitemap():
    return generate_sitemap(app)

@api.route('/task', methods=['GET'])
def get_task():
    tasks= Task.get_all()
    all_tasks=[task.to_dict() for task in tasks]
    return jsonify(all_tasks), 200

@api.route('/task/<int:id>', methods=['GET'])
def get_task_by_id(id):
    task= Task.get_by_id(id)

    if task:
        return jsonify(task.to_dict()), 200

        return jsonify({'error': 'task not found'}), 404

@api.route('/task', methods=['POST'])
def create_item():
    new_item=request.json.get('item',None)

    if not new_item:
        return jsonify({'error':'missing items'}), 400

    task= Task(item=new_item, done=False)
    try:
        task_created=task.create()
        return jsonify(task_created.to_dict()), 201
    except exc.IntegrityError:
        return jsonify({'error': 'fail in data'}), 400

@api.route('/task/<int:id>', methods=['PUT','PATCH'])
def update_task(id):
    new_item=request.json.get('item', None)

    if not new_item:
        return jsonify({'error': 'missing items'}), 400

    task= Task.get_by_id(id)
    if task:
        task=task.update(new_item)

    return jsonify({'error': 'task not found'}), 404

@api.route('/task/<int:id>', methods=['DELETE'])
def delete_task(id):
    task=Task.get_by_id(id)
    if task:
        task.delete()
        all_task = Task.get_all()
        all_task_dict = [task.to_dict() for task in all_task]
        return jsonify(all_task_dict), 200

    return jsonify({'error':'task not found'}), 404

