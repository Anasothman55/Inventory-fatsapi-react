import uuid
from typing import Annotated, List

from fastapi import APIRouter, status, Depends, Path, Query, Form


from ..db.models import UserModel, EmployeeModel
from ..dependencies.auth import require_roles, get_current_user
from ..schema.employee import BaseEmployeeSchema, BaseEmployeeWithUidSchema, EmployeeWithUseSchema2, Order, OrderBy,EmployeeWithInfoSchema, EmployeeFullSchema, EmployeeWithUseSchema
from ..schema.auth import RoleBase
from ..utils.employee import EmployeeRepository, get_employee_repo
from ..services.employee import (
  get_one_employee_services,
  create_employee_services,
  update_employee_services,
  delete_employee_services
)

from rich import print

alter_role = [RoleBase.SUPER_ADMIN,RoleBase.ADMIN, RoleBase.MANAGER_ASSISTANT]
see_role = [RoleBase.SUPER_ADMIN,RoleBase.ADMIN, RoleBase.ACCOUNTANT, RoleBase.MANAGER, RoleBase.MANAGER_ASSISTANT]
see_role2 = [RoleBase.SUPER_ADMIN, RoleBase.ADMIN, RoleBase.ACCOUNTANT, RoleBase.MANAGER, RoleBase.MANAGER_ASSISTANT, RoleBase.STOCK_KIPPER]

alter_role_des = f"""this route can use by all {RoleBase.ADMIN} and { RoleBase.ACCOUNTANT} users"""
see_role_des = f"""this route can use by all {RoleBase.ADMIN} and {RoleBase.ACCOUNTANT} and {RoleBase.MANAGER} and {RoleBase.MANAGER_ASSISTANT} users"""
admin_des = f"""this route can use by all {RoleBase.ADMIN} users"""


from .employeeInfo import route as emp_info_route

route = APIRouter(
  dependencies=[Depends(get_current_user)],
  tags=["Employees"],
)

route.include_router(emp_info_route, prefix="/employee-info")

@route.get('/', response_model= List[EmployeeWithUseSchema], status_code= status.HTTP_200_OK, description=see_role_des)
async def get_all_employee(
    current_user: Annotated[UserModel, Depends(require_roles(see_role))],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
    order_by: Annotated[OrderBy, Query()] = OrderBy.CREATED_AT,
    order: Annotated[Order, Query()] = Order.ASC,
):
  res = await repo.get_all(order,order_by)
  return res

@route.get('/name', response_model= List[BaseEmployeeWithUidSchema], status_code= status.HTTP_200_OK)
async def get_all_employee_name(
    current_user: Annotated[UserModel, Depends(require_roles(see_role2))],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
    order_by: Annotated[OrderBy, Query()] = OrderBy.CREATED_AT,
    order: Annotated[Order, Query()] = Order.ASC,
):
  f"""this route can use by all users"""
  res = await repo.get_all(order,order_by)
  return res


@route.post("/",response_model=BaseEmployeeWithUidSchema, status_code=status.HTTP_201_CREATED, description=alter_role_des)
async def create_category(
    req_data: Annotated[BaseEmployeeSchema, Form()],
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
):
  result = await create_employee_services(current_user.uid,repo,req_data)
  return result


@route.get('/{uid}',  status_code= status.HTTP_200_OK, response_model=EmployeeWithUseSchema2)
async def get_one_categories(
    current_user: Annotated[UserModel, Depends(require_roles(see_role))],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
    uid: Annotated[uuid.UUID, Path(...)]
):
  result = await get_one_employee_services(repo,uid)
  return result


@route.patch("/{uid}", status_code=status.HTTP_200_OK, description=alter_role_des)
async def update_category(
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    uid: Annotated[uuid.UUID,Path(...)],
    new_data: Annotated[BaseEmployeeSchema, Form()],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
):
  result = await update_employee_services(repo, uid, new_data)
  return result

@route.delete("/{uid}", status_code=status.HTTP_204_NO_CONTENT, description=admin_des)
async def delete_category(
    current_user: Annotated[UserModel, Depends(require_roles([RoleBase.ADMIN, RoleBase.SUPER_ADMIN]))],
    uid: Annotated[uuid.UUID, Path(...)],
    repo: Annotated[EmployeeRepository, Depends(get_employee_repo)],
):
  await delete_employee_services(repo, uid)



