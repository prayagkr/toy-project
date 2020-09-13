import traceback
from flask import request
from database import get_connection

def validate_user(email, password):
    is_valid_user = False
    user = get_user_by_email(email)

    if user is not None and user['password1'] == password:
        is_valid_user = True

    return is_valid_user

def get_user_by_email(email):
    user = None
    try:
        con = get_connection()
        with con.cursor() as cursor:
            cursor.execute("SELECT * FROM user WHERE email = %s", (email,))
            user = cursor.fetchone()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()

    return user

def get_all_users():
    rows = []
    try:
        con = get_connection()
        with con.cursor() as cursor:
            cursor.execute("SELECT * FROM user")
            rows = cursor.fetchall()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()

    return rows

def update_token(email, token):
    try:
        con = get_connection()
        with con.cursor() as cursor:
            cursor.execute("UPDATE user SET token=%s WHERE email=%s", (token, email))
            con.commit()

    except Exception as ex:
        print(traceback.print_exc())
    finally:
        con.close()

