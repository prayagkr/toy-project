from flask import request
from flask_restful import Resource
from service.register_service import register_user
from service.login_service import get_user_by_email
from shared.response import get_response
from shared.token import encode_token

class Register(Resource):
        
    def post(self):
        try:
            data = request.get_json()
            register_id = register_user(data)
            if (register_id):
                return get_response(data={'id': register_id})
            else:            
                return get_response(message="Failed to create user",
                    code=1000), 400
        except Exception as ex:
            return get_response(message="Server Error", code=5000), 500