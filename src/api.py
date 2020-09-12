from resource.validate import Validate
from resource.login import Login

def create_api(api):
    api.add_resource(Validate, '/validate')
    api.add_resource(Login, '/login')