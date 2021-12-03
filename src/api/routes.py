"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from datetime import timedelta

from flask import Flask, request, jsonify, url_for
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
# from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Member, Home, ToDoList, HumedityAndTemperature, Sokect, Appointment, Habits
from api.utils import generate_sitemap, APIException

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_CONNECTION_STRING')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = os.environ.get('JWI_KEY')
# jwt = JWTManager(app)

MIGRATE = Migrate(app, db)
db.init_app(app)
CORS(app)
# setup_admin(app)

api = Blueprint('api', __name__)


@api.route('/member', methods=['POST'])
def create_member():
    newMember = request.json.get('email', None)
    newMember = request.json.get('password', None)
    newMember = request.json.get('name', None)

    if not body:
        return jsonify({'error': 'Missing parameters'}), 400

    member = user( member = newMember)
    try:
        member_created = member.create()
        return jsonify(member_created.to.dict()), 201

    except exc.IntegrityError:
        return jsonify({'error': 'Fail in data'}), 400

    return '', 200


# @app.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)

#     if email and password:
#         member = member.get_by_email(email)

#         if member:
#             '''check password'''
#             access_token = create_access_token(identity=member.to_dict(), expires_delta=timedelta(hours=12))
#             return jsonify({'token': access_token}), 200

#         return jsonify({'error':'Not found'}), 200

#     return jsonify({"msg": "Wrong username or password"}), 401