import uuid
from typing import Annotated, List

from fastapi import APIRouter, status, Depends, Path, Request, responses, Query, Form
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from ..db.models import UserModel
from ..dependencies.auth import require_roles, get_user_repo, get_current_user
from ..exceptions.auth import CreateSuperUserError
from ..schema.auth import RoleBase, OrderBy, Order, GetFullUser, CreateIUserDict, UpdateUserSchema, \
  AdminCreateIUserDict, GetBySchema
from ..utils.auth import UserRepositoryUtils
from ..services.auth import register_crud
from ..services.admin import get_one_user_services, update_user_services, delete_user_services

from rich import print
from datetime import datetime, timezone
import orjson
import json
from pathlib import Path as FilePath


route = APIRouter(
  dependencies=[Depends(require_roles([RoleBase.ADMIN, RoleBase.SUPER_ADMIN]))],
  tags=["Admin"]
)



rolepath = FilePath(r'D:\Project\fa-ra\Inventory\Project') / 'rolebase.json'

@route.get('/rolebase')
async def get_privilage():
  with open(rolepath, 'r') as f:
    data = json.load(f)
  return data


@route.get('/', response_model=List[GetFullUser], status_code= status.HTTP_200_OK)
async def get_all_users(
    user_repo: Annotated[UserRepositoryUtils, Depends(get_user_repo)],
    filters: Annotated[GetBySchema, Depends()],
    order_by: Annotated[OrderBy, Query()] = OrderBy.CREATED_AT,
    order: Annotated[Order, Query()] = Order.ASC,
) :
  res = await user_repo.get_all(order, order_by, filters)
  return res


@route.post('/', status_code= status.HTTP_201_CREATED, response_model=GetFullUser)
async def create_user(
    user_repo: Annotated[UserRepositoryUtils, Depends(get_user_repo)],
    user_model: Annotated[AdminCreateIUserDict, Form()],
):
  if user_model.role.index(RoleBase.SUPER_ADMIN):
    raise CreateSuperUserError
  result = await register_crud(user_model,user_repo)
  return result


@route.get('/{uid}', response_model=GetFullUser, status_code= status.HTTP_200_OK)
async def get_user(
    repo: Annotated[UserRepositoryUtils, Depends(get_user_repo)],
    uid: Annotated[uuid.UUID, Path()]
):
  res = await get_one_user_services(repo, uid)
  return res


@route.patch('/{uid}', status_code= status.HTTP_200_OK, response_model=GetFullUser)
async def update_user(
    repo: Annotated[UserRepositoryUtils, Depends(get_user_repo)],
    uid: Annotated[uuid.UUID, Path()],
    new_data: Annotated[UpdateUserSchema, Form()]
):
  if new_data.role.index(RoleBase.SUPER_ADMIN):
    raise CreateSuperUserError
  res = await update_user_services(repo, uid, new_data)
  return res


@route.delete('/{uid}', status_code= status.HTTP_204_NO_CONTENT)
async def delete_user(
    current_admin: Annotated[UserModel , Depends(get_current_user)],
    repo: Annotated[UserRepositoryUtils, Depends(get_user_repo)],
    uid: Annotated[uuid.UUID, Path()],
):
  await delete_user_services(repo, uid, current_admin)



