from flask import request
from flask_restful import Resource
from service.register_service import register_user
from service.user_service import get_user_details
from shared.response import get_response
from shared.token import encode_token, decode_token, internal_authenticate
from shared.custom_exception import AuthorizationException

class User(Resource):
        
    def get(self):
        try:
            key = internal_authenticate()
            data = decode_token(key)
            user_details = get_user_details(data['email'])
            if (user_details):
                return get_response(data=user_details)
            else:            
                return get_response(message="Invalid user", code=1002), 400
        except AuthorizationException as message:
            return get_response(message=str(message.message),
                                code=int(message.code.value),
                                success=False), 403
        except Exception as ex:
            return get_response(message="Server Error", code=5000), 500
