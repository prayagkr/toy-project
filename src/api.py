from resource.validate import Validate

def create_api(api):
    api.add_resource(Validate, '/validate')