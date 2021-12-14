from datetime import date
import datetime

data = {


    "Home": [
        {
            "id":1 ,
            "name":"GAW",
            "city":"Madrid"
        },
        {
            "id": 2,
            "name":"Jumbotronas",
            "city": "Barcelona"
        }
    ],

    "Member":[
        {
            "id":1,
            "username":"Ana Gonzales",
            "password":"1234",
            "email":"ana@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":date(1999,5,5),
            "home_id":1
        },
        {
            "id":2,
            "username": "Gloria Silvia",
            "password": "1234",
            "email": "gloria@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/3366753/pexels-photo-3366753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":date(2001,5,5),
            "home_id": 1
        },
        {
            "id":3,
            "username":"Williams Padilla",
            "password":"1234",
            "email":"willy@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/2765557/pexels-photo-2765557.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":date(1994,12,5),
            "home_id":1
        },
        {
            "id":4,
            "username":"Jaime Sotomayor",
            "password":"1234",
            "email":"soto@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/4061551/pexels-photo-4061551.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":date(1995,10,3),
            "home_id":2
        },
        {
            "id":5,
            "username":"Carol Chan",
            "password":"1234",
            "email":"carol@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":date(1999,5,28),
            "home_id":2
        },
        {
            "id":6,
            "username":"Limones Chan",
            "password":"1234",
            "email":"limones@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/3807713/pexels-photo-3807713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":date(1990,6,2),
            "home_id": 2
        }
    ],

    "Task":[
        {
            "id":1,
            "item":"poner la navidad",
            "done":False,
            "home_id":1
        },
        {
            "id":2,
            "item":"limpiar el baño",
            "done":False,
            "home_id":1
        },
        {
            "id":3,
            "item":"recoger la haitaciones de los peques",
            "done":False,
            "home_id":1
        },
        {
            "id":4,
            "item":"limpiar la nevera",
            "done":False,
            "home_id":2
        },
        {
            "id":5,
            "item":"ir al mercadona",
            "done":False,
            "home_id":2
        },
        {
            "id":6,
            "item":"terminar de lavar la ropa",
            "done":False,
            "home_id":2
        }
    ],

    "HumedityAndTemperature":[
        {
            "id":1,
            "time_stamp":datetime.datetime.now(),
            "temperature": 25.4,
            "humedity": 85.5,
            "home_id":1
        },
        {
            "id":2,
            "time_stamp":datetime.datetime.now(),
            "temperature": 23.4,
            "humedity": 95.5,
            "home_id":2
        },
    ],

    "Sokect":[
        {
            "id":1,
            "name":"laundry",
            "state":True,
            "start_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "end_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "home_id":1
        },
        {
            "id":2,
            "name":"tv",
            "state":True,
            "start_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "end_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "home_id":1
        },
        {
            "id":3,
            "name":"air flow",
            "state":False,
            "start_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "end_date":datetime.datetime(2020, 5, 6, 15, 25,25),
            "home_id":2
        }
    ],

    "Appointment":[
        {
            "id":1,
            "appointment":"Ir al cine",
            "time_start":"20:15",
            "time_ends":"20:15",
            "email":"willy@hotmail.com",
            "location":"Cine de principe Pio",
            "notes":"si no terminaos los deberes no va ni el tato"
        },
        {
            "id":2,
            "appointment":"limpiar el garage",
            "time_start":"20:15",
            "time_ends":"20:15",
            "email":"ana@hotmail.com",
            "location":"Mi casa",
            "notes":"tiene que quedar muuuuy limpito"
        },
        {
            "id":3,
            "appointment":"ir a donar libros",
            "time_start":"20:15",
            "time_ends":"20:15",
            "email":"gloria@hotmail.com",
            "location":"biblioteca de villaverde",
            "notes":"me sobran libros"
        },
    ],

    "Habits":[
        {
            "id":1,
            "habits":"lavate los dientes",
        },
        {
            "id":2,
            "habits":"duerme 8 horas todos los dias",
        },
        {
            "id":3,
            "habits":"Comer frutas y verduras todos los dias",
        },
        {
            "id":4,
            "habits":"corre al menos 30 minutos diariamente",
        },
        {
            "id":5,
            "habits":"reduce el consumo de frituras",
        },
        {
            "id":6,
            "habits":"bebe 2 litros de agua diario",
        },        
    ],
    
    "AppointmentUser":[
        {
            "member":2,
            "appointment":2,
        },
        {
            "member":3,
            "appointment":2,
        },
        {
            "member":5,
            "appointment":1,
        },
        {
            "member":6,
            "appointment":1,
        }
    ]
}