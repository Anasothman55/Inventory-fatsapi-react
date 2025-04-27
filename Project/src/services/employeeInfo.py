from contextlib import AsyncExitStack
from rich import print

from ast import Dict
import uuid

import httpx

from src.db.models import EmployeeInfoModel, EmployeeModel
from src.exceptions.employee import EmployeeInfoIntigrity, EmployeeNotFound, EmployeeInfoDontExist
from src.schema.employee import EmployeeWithUseSchema

from ..utils.employeeInfo import EmployeeInfoRepository
from ..schema.employeeInfo import CreateEmpInfoModel, GetFullEmpInfoModel, UpdateEmpInfoModel

from sqlalchemy.exc import IntegrityError







async def check_employee_exists(uid: uuid.UUID, cookies: Dict)-> Dict:
  async with httpx.AsyncClient(cookies=cookies) as client:
    res = await client.get(f'http://127.0.0.1:8000/employees/{uid}')
    if (res.status_code == 404):
      raise EmployeeNotFound(uid)
    return res.json()

async def create_employee_info_service(
    userUid: uuid.UUID,
    employeeUid: uuid.UUID,
    user_info_data: CreateEmpInfoModel,
    repo : EmployeeInfoRepository,
    cookies: Dict
  )-> EmployeeInfoModel:
  try:
    await check_employee_exists(employeeUid, cookies)
    
    new_data = user_info_data.model_dump()
    new_data.update({"user_uid": userUid, "employee_uid": employeeUid})
    
    new_row = EmployeeInfoModel(**new_data)
    result = await repo.create_row(new_row)
    return result

  except IntegrityError as e:
    raise EmployeeInfoIntigrity(str(e))




async def update_employee_info_service(
    employeeUid: uuid.UUID,
    user_info_new_data: UpdateEmpInfoModel,
    repo: EmployeeInfoRepository,
    cookies: Dict
  
  )-> EmployeeInfoModel:
  
  try:
    res = await check_employee_exists(employeeUid, cookies)
    new_data = user_info_new_data.model_dump(exclude_none=True)
    row = await repo.get_by_employee_uid(res.get("uid"))
    if not row:
      raise EmployeeInfoDontExist(res.get("name"))
    
    result = await repo.update_row(new_data,row)
    return result
  except IntegrityError as e:
    raise EmployeeInfoIntigrity(str(e))




