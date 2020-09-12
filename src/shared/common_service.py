

def encrypt_password(password):
    """ need to encrypt password """
    return password

def decrypt_password(password):
    """ need to encrypt password """
    return password

def is_pass_valid(record_pass, user_pass):
    rec_pass = decrypt_password(record_pass)
    if rec_pass == user_pass:
        return True
    return False