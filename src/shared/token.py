import jwt

SECRET_KEY = 'ournewtoyapp'

def encode_token(data):
    """ data should be of type dictionary"""
    token = jwt.encode(data, SECRET_KEY)
    return token

def decode_token(token):
    """token should be encrypted data"""
    data = jwt.decode(token, SECRET_KEY)
    return data