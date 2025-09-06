from typing import List
from fastapi import HTTPException, status


class PydanticException(HTTPException):
  def __init__(self, error):
    super().__init__(status_code= status.HTTP_422_UNPROCESSABLE_ENTITY, detail=error)



class UserError(HTTPException):
  """Base exception for user-related errors"""
  pass


class UserNotFoundError(UserError):
  def __init__(self, user_id=None):
    message = "User not found" if user_id is None else f"User with id {user_id} not found"
    super().__init__(
      status_code=status.HTTP_404_NOT_FOUND,
      detail= {
        "error": message
        
      }
    )


class AuthenticateEx(UserError):
  def __init__(self):
    super().__init__(
      status_code=status.HTTP_404_NOT_FOUND,
      detail= {
        "error": "Invalide Email address"
        
      }
    )

class InvalidPasswordError(UserError):
  def __init__(self):
    super().__init__(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail={
        "error": "Invalid password",
        "loc": "password"
      }
    )


class AuthorizationError(UserError):
  def __init__(self, allowed_roles):
    super().__init__(
      status_code=status.HTTP_403_FORBIDDEN,
      detail={
        "error": f"Access denied"
      }
    )

class DeleteAdminError(UserError):
  def __init__(self):
    super().__init__(
      status_code=status.HTTP_403_FORBIDDEN,
      detail={
        "error": "you can not delete an admin"
      }
    )

class AlterAdminError(UserError):
  def __init__(self):
    super().__init__(
      status_code=status.HTTP_403_FORBIDDEN,
      detail={
        "error": "You can not alter an admin"
      }
    )


class CreateSuperUserError(UserError):
  def __init__(self):
    super().__init__(
      status_code=status.HTTP_403_FORBIDDEN,
      detail={
        "error": "No one can create super user"
      }
    )


class JWTEx(HTTPException):
  def __init__(self, detail="JWT authentication error", status_code=status.HTTP_403_FORBIDDEN):
    super().__init__(status_code=status_code, detail={"error": detail})

