from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

AppointmentUser = db.Table('appointment_member',
    db.Column( "member", db.Integer, db.ForeignKey('member.id'), primary_key=True),
    db.Column( "appointment", db.Integer, db.ForeignKey('appointment.id'), primary_key=True)
)

class Home(db.Model):
    __tablename__: "home"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    city = db.Column(db.String(), nullable=False)

    def __repr__(self):
        return f'home  {self.name} , id: {self.id}'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "city":self.city
        }

    def create_home(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def get_by_id(cls, home_id):
        home=cls.query.get(home_id)
        return home

class Member(db.Model):
    __tablename__: "member"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), unique=False, nullable=False)
    email = db.Column(db.String(), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    photo_user = db.Column(db.String(), unique=False, nullable=True)
    birth_date = db.Column(db.Date(), unique=False, nullable=True)
    home_id = db.Column(db.Integer(), db.ForeignKey('home.id'), unique=False, nullable=False)

    user_has_an_appointment = db.relationship("Appointment", secondary=AppointmentUser, back_populates="an_appointment_for_a_user")

    def __repr__(self):
        return f'member  {self.username} , id: {self.id}, password: {self.password}, email: {self.email}, is_active: {self.is_active}, birth_date: {self.birth_date},  id_home:  {self.home_id}'

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
            "birth_date": self.birth_date,
            "home_id": self.home_id,
            "photo_user": self.photo_user,  
            "appointment": [appointment.to_dict() for appointment in self.user_has_an_appointment]
        }

    @classmethod
    def get_by_id(cls, member_id):
        member=cls.query.get(member_id)
        return member

    @classmethod
    def get_all_by_home(cls, id):
        members= cls.query.filter_by(home_id = id)
        return members

    def create_member(self):
        db.session.add(self)
        db.session.commit()
        return self

    def validate_password(self, password):
        is_valid = check_password_hash(self._password, password)
        return is_valid


    @classmethod
    def get_by_email(cls,email):
        member = cls.query.filter_by(email=email).one_or_none()
        return member

    @classmethod 
    def get_member_by_id(cls,id): 
        member = cls.query.get(id)
        return member

    @classmethod 
    def get_all_member(cls):
        all_members = cls.query.all()
        return all_members

    def update(self, **kwargs):
        for key, value in kwargs.items():
            if key == "_password" and not value:
                continue
            setattr(self, key, value)
        db.session.commit()
        return self

    
    def validate_password(self,password):
        is_valid = check_password_hash(self._password,password)
        print(is_valid)
        return is_valid

    @classmethod
    def get_by_id(cls, member_id):
        member=cls.query.get(member_id)
        return member

    @classmethod
    def get_all_by_home(cls, id):
        members= cls.query.filter_by(home_id = id)
        return members

    def get_all_appointments_from_member(self):
        appointments = self.user_has_an_appointment
        return appointments
    
    
    def add_appointment_to_member(self, appointment):
        self.user_has_an_appointment.append(appointment)
        db.session.commit()
        return self.user_has_an_appointment
        

class Task(db.Model):
    __tablename__: "task"

    id = db.Column(db.Integer, primary_key=True)
    item = db.Column(db.String(), unique=False, nullable=False)
    done = db.Column(db.Boolean(), unique=False, nullable=False)
    home_id = db.Column(db.Integer(), db.ForeignKey('home.id'), unique=False, nullable=False)

    def __repr__(self):
        return f'Task  {self.item} , id: {self.id}, done: {self.done}, home_id  {self.home_id}'

    def to_dict(self):
        return {
            "id": self.id,
            "item": self.item,
            "done": self.done,
            "home_id": self.home_id
        }

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def get_all_by_home(cls, id):
        tasks= cls.query.filter_by(home_id = id)
        return tasks

    @classmethod
    def get_by_id(cls, id):
        task = cls.query.get(id)
        return task
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self


class HumedityAndTemperature(db.Model):
    __tablename__: "humedity_and_temperature"

    id = db.Column(db.Integer, primary_key=True)
    time_stamp = db.Column(db.DateTime, nullable=False)
    temperature = db.Column(db.Float(), unique=False, nullable=False)
    humedity = db.Column(db.Float(), unique=False, nullable=False)
    home_id = db.Column(db.Integer(), db.ForeignKey('home.id'), unique=False, nullable=False)

    def __repr__(self):
        return f'HumedityAndTemperature  {self.time_stamp} , id: {self.id}, temperature: {self.temperature}, humedity: {self.humedity},  id_home:  {self.home_id}'

    def to_dict(self):
        return {
            "id": self.id,
            "time_stamp": self.stamp,
            "temperature": self.temperature,
            "humedity": self.humedity,
            "home_id": self.home_id
        }

class Sokect(db.Model):
    __tablename__: "socket"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True, nullable=False)
    state = db.Column(db.Boolean(), unique=False, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    home_id = db.Column(db.Integer(), db.ForeignKey('home.id'), unique=False, nullable=False)

    def __repr__(self):
        return f'Sokect  {self.name} , id: {self.id}, state: {self.state}, start_date: {self.start_date}, end_date: {self.end_date},  id_home:  {self.home_id}'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "state": self.state,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "home_id": self.home_id
        }


class Appointment (db.Model):
    __tablename__: "appointment"

    id = db.Column(db.Integer, primary_key=True)
    appointment = db.Column(db.String(), nullable=False)
    time_start = db.Column(db.String(), nullable=True)
    time_ends = db.Column(db.String(),  nullable=True)
    location = db.Column(db.String(), nullable=True)
    notes   = db.Column(db.String(), nullable=True)
    date = db.Column(db.String(), nullable=False)
                                                
    an_appointment_for_a_user = db.relationship("Member", secondary=AppointmentUser, back_populates="user_has_an_appointment")

    def __repr__(self):
        return f'Appointment  {self.appointment} , id: {self.id} , time_start: {self.time_start}, time_ends: {self.time_ends}, location: {self.location}, notes: {self.notes}, date: {self.date}'

    def to_dict(self):
        return {
            "id": self.id,
            "appointment": self.appointment,
            "time_start": self.time_start,
            "time_ends": self.time_ends,
            "location": self.location,
            "notes": self.notes,
            "date": self.date
        }

    def create_event_friend(self,friends):
        db.session.add(self)
        for friend in friends:
            self.an_appointment_for_a_user.append(friend)
        db.session.commit()
        return self

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    @classmethod
    def get_by_id(cls,id_appointment):
        appointment= cls.query.filter_by(id=id_appointment).one_or_none()
        return appointment
    

    @classmethod
    def get_all(cls):
        appointments= cls.query.all()
        return appointments

    def update(self, item):
        self.item=item
        db.session.commit()
        return self

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self

class Habits(db.Model):
    __tablename__: "habits"

    id = db.Column(db.Integer, primary_key=True)
    habits = db.Column(db.String(), nullable=False)
    
    def __repr__(self):
        return f'Sokect  {self.habits} , id: {self.id} , habits: {self.habits}, data: {self.data}'

    def to_dict(self):
        return {
            "id": self.id,
            "habits": self.habits,
        }
    
    @classmethod 
    def get_habits_by_id (cls, id): 
        habit = cls.query.get(id)
        return habit

    @classmethod
    def get_all_habits (cls): 
        habits = cls.query.all()
        return habits
