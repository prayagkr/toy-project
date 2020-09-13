from resource.validate import Validate
from resource.login import Login
from resource.register import Register
from resource.forgot_password import ForgotPassword
from resource.user import User
from resource.quiz import Quiz

def create_api(api):
    api.add_resource(Validate, '/validate')
    api.add_resource(Login, '/login')
    api.add_resource(Register, '/register')
    api.add_resource(ForgotPassword, '/forgot-password')
    api.add_resource(User, '/user')
    api.add_resource(Quiz, '/quiz')