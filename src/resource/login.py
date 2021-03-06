from flask import request
from flask_restful import Resource
from service.login_service import validate_user, update_token
from shared.response import get_response
from shared.token import encode_token

class Login(Resource):
        
    def post(self):
        try:
            data = request.get_json()
            is_valid = validate_user(data['email'], data['password'])
            if (is_valid):
                token = encode_token(data)
                update_token(data['email'], token)
                return get_response(data={'token': token})
            else:            
                return {'message': 'User is not Authorized'}, 401
        except Exception as ex:
            return {'message': 'Server Error'}, 500