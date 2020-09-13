from flask import request
from flask_restful import Resource
from service.forgot_service import change_password
from shared.response import get_response

class ForgotPassword(Resource):
                
    def post(self):
        try:
            data = request.get_json()
            changed_id = change_password(data)
            if (changed_id):
                return get_response(data={'id': changed_id})
            else:            
                return get_response(message="Invalid email id", code=1001), 400
        except Exception as ex:
            return get_response(message="Server Error", code=5000), 500