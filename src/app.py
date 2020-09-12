from flask import Flask
from flask_restful import Resource, Api
from api import create_api

app = Flask(__name__)
api = Api(app)
create_api(api)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)