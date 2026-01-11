import os
import base64

def generate_secret_key():
    return base64.urlsafe_b64encode(os.urandom(32)).decode("utf-8")

SECRET = generate_secret_key()  # Used for password hashing
JWT_SEC = generate_secret_key()  # Used for JWT signing
JWT_REFRESH_SEC = generate_secret_key()  # Used for JWT refresh tokens

print("SECRET for password hashing:", SECRET)
print("JWT_SEC for JWT signing:", JWT_SEC)
print("JWT_REFRESH_SEC for refresh tokens:", JWT_REFRESH_SEC)