

from datetime import date, datetime
from decimal import Decimal
from typing import Optional
import uuid
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

import re





class BaseEmpInfoModel(BaseModel):
  email: str | None = None
  phone_number: str = Field(None, pattern=r"^07\d{9}$")
  address: str 
  hire_date: date
  job_title : str 
  
  model_config = ConfigDict(
    extra='forbid',
    str_strip_whitespace=True
  )

class CreateEmpInfoModel(BaseEmpInfoModel):
  date_of_birth : date | None = None
  salary: Decimal = Field(default=0.0,ge=0, )
  note: str | None = None
  


class GetFullEmpInfoModel(CreateEmpInfoModel):
  uid : uuid.UUID
  fired_date: date | None = None


class UpdateEmpInfoModel(BaseEmpInfoModel):
  email: str | None = None
  phone_number: str | None = None
  address: str | None = None
  hire_date: date | None = Field(default=None, le=date.today())
  job_title : str | None = None
  date_of_birth: date | None = Field(default=None, le=date.today())
  salary: Decimal | None = Field(default=None, ge=0)
  note: str | None = None
  fired_date: date | None = None

  @field_validator("phone_number", mode="before")
  @classmethod
  def validate_phone(cls, v):
    if v is None or v.strip() == "":
      return None
    if not re.fullmatch(r"^07\d{9}$", v):
      raise ValueError("Phone number must match ^07\\d{9}$")
    return v

    # Example validator for email format (optional)
  @field_validator("email",mode="before")
  @classmethod
  def validate_email(cls, v):
    if not v.strip():
      return None
    try:
      EmailStr._validate(v)
    except ValueError as ex:
      raise ValueError(str(ex))
    return v


  @field_validator("hire_date", "date_of_birth", "fired_date", mode="before")
  @classmethod
  def validate_date_fields(cls, v):
    if v is None or (isinstance(v, str) and v.strip() == ""):
      return None
    if isinstance(v, str):
      try:
            return datetime.strptime(v, "%Y-%m-%d").date()
      except ValueError:
              raise ValueError("Date must be in YYYY-MM-DD format")
    return v
  
  
  @field_validator("salary", mode="before")
  @classmethod
  def validate_salary(cls, v):
      if v is None:
          return None
      if isinstance(v, str) and v.strip() == "":
          return None
      return v
  
  
  model_config = ConfigDict(
    extra='forbid',
    str_strip_whitespace=True
  )