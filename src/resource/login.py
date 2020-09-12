from flask import request
from flask_restful import Resource
from service.login_service import validate_user

class Login(Resource):
        
    def post(self):
        data = request.get_json()
        print(data)
        is_valid = validate_user(data['email'], data['password'])
        return {'message': 'Found user'} if is_valid else {'message': 'User not found'}