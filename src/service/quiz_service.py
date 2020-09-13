import traceback
from flask import request
from database import get_connection
from service.login_service import get_user_by_email

def process_quiz_record(quiz_data, user_data):
    email = user_data['email']
    create_quiz_record(quiz_data, email)


def create_quiz_record(quiz_data, email):

    query="""INSERT INTO profile 
            (category, difficulty, score, userid) VALUES 
            (%s, %s, %s, 
                (select id from user where email=%s)
            )"""

    try:
        category = quiz_data['category']
        difficulty = quiz_data['difficulty']
        score = quiz_data['score']

        con = get_connection()
        with con.cursor() as cursor:
            cursor.execute(query, (category, difficulty, score, email))
            con.commit()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()
