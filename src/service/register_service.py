import traceback
from flask import request
from database import get_connection
from service.login_service import get_user_by_email

def register_user(data):
    create_user(data)
    user = get_user_by_email(data['email'])
    print(user)
    return user['id']

def create_user(data):

    try:
        firstName = data['firstName']
        lastName = data['lastName']
        gender = data['gender']
        email = data['email']
        password = data['password']

        con = get_connection()
        with con.cursor() as cursor:
            query = """ INSERT INTO user 
                        (firstname, lastname, gender, email, password1) 
                        VALUES (%s, %s, %s, %s, %s);
                    """
            cursor.execute(query, (firstName, lastName, gender, email, password))
            con.commit()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()