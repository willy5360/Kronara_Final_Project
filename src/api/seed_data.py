from werkzeug.security import generate_password_hash
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
            "username":"Ana",
            "password":generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email":"ana@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":datetime.date(1999,5,5),
            "home_id":1
        },
        {
            "id":2,
            "username": "Gloria",
            "password": generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email": "gloria@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/3366753/pexels-photo-3366753.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":datetime.date(2001,5,5),
            "home_id": 1
        },
        {
            "id":3,
            "username":"Williams",
            "password":generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email":"willy@jumbotrona.com",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/2765557/pexels-photo-2765557.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":datetime.date(1994,12,5),
            "home_id":1
        },
        {
            "id":4,
            "username":"Jaime Sotomayor",
            "password":generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email":"soto@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/4061551/pexels-photo-4061551.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":datetime.date(1995,10,3),
            "home_id":2
        },
        {
            "id":5,
            "username":"Carol Chan",
            "password":generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email":"carol@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "birth_date":datetime.date(1999,5,28),
            "home_id":2
        },
        {
            "id":6,
            "username":"Limones Chan",
            "password":generate_password_hash("12345678", method='pbkdf2:sha256', salt_length=8),
            "email":"limones@pythonera.es",
            "is_active":True,
            "photo_user":"https://images.pexels.com/photos/3807713/pexels-photo-3807713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
            "birth_date":datetime.date(1990,6,2),
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
            "item":"recoger la habitaciones de los peques",
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
            "location":"Cine de principe Pio",
            "notes":"si no terminaos los deberes no va ni el tato",
            "date":datetime.datetime(2022,1,5)
        },
        {
            "id":2,
            "appointment":"limpiar el garage",
            "time_start":"20:15",
            "time_ends":"20:15",
            "location":"Mi casa",
            "notes":"tiene que quedar muuuuy limpito",
            "date":datetime.datetime(2022,1,15)
        },
        {
            "id":3,
            "appointment":"ir a donar libros",
            "time_start":"20:15",
            "time_ends":"20:15",
            "location":"biblioteca de villaverde",
            "notes":"me sobran libros",
            "date":datetime.datetime(2022,1,18)
        },
    ],

    "Habits":[
         {
            "id":1,
            "habits":" See beauty in the simple things",
        },
        {
            "id":2,
            "habits":"Be kind to yourself",
        },
        {
            "id":3,
            "habits":"Identify important-but-not-urgent tasks.",
        },
        {
            "id":4,
            "habits":"Never go to bed angry. Never. Always kiss and hug before you fall asleep and express your appreciate for your one another.",
        },
        {
            "id":5,
            "habits":"Understand the other person's point of view and find some common ground. ",
        },
        {
            "id":6,
            "habits":"An apple each day really will keep the doctor away. That fiber goes a long way in your system to help with blood-sugar levels, digestion and more. ",
        },
        {
            "id":7,
            "habits":" You need to drink a lot of water throughout the day. ",
        },
        {
            "id":8,
            "habits":"Work to rewire the habitual negative thinking in your mind and blow past limiting behaviors and thoughts ",
        },   
        {
            "id":9,
            "habits":" Find ways you can add value to the lives of others. Don't seek something in return. Just add value.",
        },   
        {
            "id":10,
            "habits":"Ask questions and look for synergies where you can help them solve a problem or fill a void in their lives. ",
        },   
        {
            "id":11,
            "habits":"Spend five minutes each day organizing your workspace. Even if it's just a drawer or a shelf at a time, you'll build momentum by enacting this habit.  ",
        },   
        {
            "id":12,
            "habits":"Take responsibility for your actions. If you make mistakes, own up to them.",
        },   
        {
            "id":13,
            "habits":"Never discount the importance of being friendly with others. Not fake. Not rude. Just friendly. ",
        },   
        {
            "id":14,
            "habits":" Declutter and organize your inbox if you're looking to make progress towards things. ",
        },   
        {
            "id":15,
            "habits":"Don't overdo it, but say yes to things from time to time that you would normally dismiss.",
        },   
        {
            "id":16,
            "habits":"Start journaling. This self-care practice can be therapeutic and can help clear your mind.",
        },   
        {
            "id":17,
            "habits":" Breathe deeply for at least two minutes. Focus on your breaths. ",
        },             
        {
            "id":18,
            "habits":"   Find something that makes you a little nervous, like talking to strangers, and strive to do it one time every day to build your confidence.",
        },   
         {
            "id":19,
            "habits":" Write out how a person you encountered that day could enrich your life journey.",
        },  
        {
            "id":20,
            "habits":"Be sure to speak up at least once in every meeting. You need to be noticed and heard.",
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