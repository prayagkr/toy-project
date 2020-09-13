import traceback
from flask import request
from database import get_connection
from service.login_service import get_user_by_email

def change_password(data):
    try:
        user_id = None
        user = get_user_by_email(data['email'])
        if user['email'] == data['email']:
            reset_password(data)
            user = get_user_by_email(data['email'])
            user_id = user['id']

        return user_id
    except Exception as ex:
        print(traceback.print_exc())


def reset_password(data):

    try:
        email = data['email']
        password = data['password']

        con = get_connection()
        with con.cursor() as cursor:
            query = """ UPDATE user SET password1=%s WHERE email=%s;
                    """
            cursor.execute(query, (password, email))
            con.commit()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()