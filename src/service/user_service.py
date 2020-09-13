from service.login_service import get_user_by_email

def get_user_details(email):
    user_details = None
    print(email)
    user = get_user_by_email(email)
    print(user)
    if (user):
        user_details = {
            "firstname": user["firstname"],
            "lastname": user["lastname"],
            "gender": user["gender"],
            "email": user["email"]
        }
    return user_details