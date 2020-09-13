from flask import request
from flask_restful import Resource
from service.quiz_service import process_quiz_record
from shared.response import get_response
from shared.token import internal_authenticate, decode_token
from shared.custom_exception import AuthorizationException

class Quiz(Resource):
        
    def get(self):
        try:
            key = internal_authenticate()
            data = decode_token(key)
            return get_response(message="Server Error", code=5000), 500
        except AuthorizationException as message:
            return get_response(message=str(message.message),
                                code=int(message.code.value),
                                success=False), 403
        except Exception as ex:
            return get_response(message="Server Error", code=5000), 500
    
        
    def post(self):
        try:
            key = internal_authenticate()
            user_data = decode_token(key)
            print(user_data)
            quiz_data = request.get_json()
            print(quiz_data)
            process_quiz_record(quiz_data, user_data)
            return get_response(message="Record Processed", code=2001), 201
        except AuthorizationException as message:
            return get_response(message=str(message.message),
                                code=int(message.code.value),
                                success=False), 403
        except Exception as ex:
            return get_response(message="Server Error", code=5000), 500
