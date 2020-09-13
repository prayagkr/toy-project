import jwt
from flask import request
from shared.custom_exception import AuthorizationException
from shared.internal_status import StatusCodes as SC, ErrorMessages as EM

SECRET_KEY = 'ournewtoyapp'

def encode_token(data):
    """ data should be of type dictionary"""
    token = jwt.encode(data, SECRET_KEY).decode('utf-8')
    return token

def decode_token(token):
    """token should be encrypted data"""
    data = jwt.decode(token, SECRET_KEY)
    return data

def internal_authenticate():
    """
    for authenticating analytics apis
    """
    key = request.headers.get('Authorization')
    if key is None:
        raise AuthorizationException(code=SC.IC_4001_UNAUTHORIZED,
                                     message=EM.IM_4001_UNAUTHORIZED.value)
    else:
        return key