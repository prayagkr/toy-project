
class AuthorizationException(Exception):

    def __init__(self, message, code):
        self.code = code
        self.message = message

    def __str__(self):
        return repr(self.message), repr(self.code)