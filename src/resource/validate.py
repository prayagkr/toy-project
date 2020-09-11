from flask import request
from flask_restful import Resource

class Validate(Resource):

    def get(self):
        return {'message': 'successfull'}