
def get_response(message='operation successful', data="No data found", code=2000, success=True):
    """
       for sending response along with status codes in case of success
    """
    response = dict(data=data, code=code, success=success, message=message)
    return response