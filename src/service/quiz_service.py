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

def get_user_score(email):
    query="""SELECT id, category, difficulty, score, submiteddate 
            from profile where 
            userid = (select id from user where email=%s)
          """
    scores = []
    try:
        con = get_connection()
        with con.cursor() as cursor:
            cursor.execute(query, (email,))
            rows = cursor.fetchall()
            for row in rows:
                record = {}
                record["id"] = row["id"]
                record["category"] = row["category"]
                record["difficulty"] = row["difficulty"]
                record["score"] = row["score"]
                record["submiteddate"] = row["submiteddate"].isoformat()
                scores.append(record)
                print(row)

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()

    return scores
