from http import cookies
from rich import  print

from typing import Annotated, List
from fastapi import APIRouter,  Query, Request, status, HTTPException, Form, Depends, Path

import uuid

from src.services.employeeInfo import create_employee_info_service, update_employee_info_service

from ..utils.employeeInfo import EmployeeInfoRepository, get_emp_info_repo
from ..db.models import UserModel
from ..dependencies.auth import require_roles
from ..schema.employeeInfo import CreateEmpInfoModel, GetFullEmpInfoModel, UpdateEmpInfoModel
from ..schema.auth import RoleBase



alter_role = [RoleBase.ADMIN, RoleBase.MANAGER_ASSISTANT, RoleBase.SUPER_ADMIN]

alter_role_des = f"""this route can use by all {RoleBase.ADMIN} and { RoleBase.MANAGER_ASSISTANT} users"""


route = APIRouter(

  tags=["Employee Info"],
)




@route.post('/{employeeUid}', status_code=status.HTTP_201_CREATED , response_model=GetFullEmpInfoModel, description=alter_role_des)
async def create_employee_info(
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    employeeUid: Annotated[uuid.UUID, Path()],
    user_info_data: Annotated[CreateEmpInfoModel, Form()],
    repo: Annotated[EmployeeInfoRepository,Depends(get_emp_info_repo) ],
    request: Request
  ):
  res = await create_employee_info_service(
    userUid=current_user.uid,
    employeeUid=employeeUid,
    user_info_data=user_info_data,
    repo=repo,
    cookies=request.cookies
  )
  
  return res


@route.patch('/{employeeUid}', status_code=status.HTTP_200_OK , response_model=GetFullEmpInfoModel, description=alter_role_des)
async def update_employee_info(
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    employeeUid: Annotated[uuid.UUID, Path()],
    user_info_new_data: Annotated[UpdateEmpInfoModel, Form()],
    repo: Annotated[EmployeeInfoRepository,Depends(get_emp_info_repo) ],
    request: Request
  ) :
  res = await update_employee_info_service(
    employeeUid=employeeUid,
    user_info_new_data=user_info_new_data,
    repo=repo,
    cookies=request.cookies
  )
  return res








