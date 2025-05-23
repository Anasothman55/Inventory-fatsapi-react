from rich import  print

from typing import Annotated, List
from fastapi import APIRouter,  Query, Request, status, HTTPException, Form, Depends, Path

import uuid

from src.utils.items import ItemsRepository, get_items_repo
from src.utils.purchase_items import PurchasesItemsRepository, get_purchases_items_repo
from ..utils.purchase import PurchasesRepository, get_purchases_repo
from ..schema.auth import RoleBase
from ..schema.purchase import (
  BasePurchaseSchema,
  CreatePurchaseSchema,
  GetPurchaseItemsSchema,
  GetFullPurchaseSchema,
  UpdatePurchaseSchema,
  OrderBy,
  Order,
)
from ..db.models import UserModel
from ..dependencies.auth import get_current_user, require_roles
from ..services.purchase import (
  get_one_purchase_services,
  create_purchase_services,
  update_purchase_services,
  delete_purchase_services
)


alter_role = [RoleBase.ADMIN, RoleBase.ACCOUNTANT, RoleBase.STOCK_KIPPER]
see_role = [RoleBase.ADMIN, RoleBase.ACCOUNTANT, RoleBase.MANAGER]

alter_role_des = f"""this route can use by all {RoleBase.ADMIN} and { RoleBase.ACCOUNTANT} and {RoleBase.STOCK_KIPPER} users"""
see_role_des = f"""this route can use by all {RoleBase.ADMIN} and {RoleBase.ACCOUNTANT} and {RoleBase.MANAGER} users"""
admin_des = f"""this route can use by all {RoleBase.ADMIN} users"""


route = APIRouter(
  dependencies= [Depends(require_roles(see_role))],
  tags=["Purchases"]
)


@route.get('/',description=see_role_des, status_code= status.HTTP_200_OK, response_model=List[GetFullPurchaseSchema])
async def get_all_purchase(
    repo: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
    order_by: Annotated[OrderBy, Query()] = OrderBy.CREATED_AT,
    order: Annotated[Order, Query()] = Order.ASC,
):
  res = await repo.get_all(order, order_by)
  return res


@route.post("/", description=alter_role_des,status_code=status.HTTP_201_CREATED, response_model=GetFullPurchaseSchema)
async def create_purchase(
    req_data: Annotated[CreatePurchaseSchema, Form()],
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    repo: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
):
  res = await create_purchase_services(current_user.uid, repo, req_data)
  return res

@route.get('/{uid}', description=see_role_des, status_code= status.HTTP_200_OK, response_model=GetPurchaseItemsSchema)
async def get_one_purchase(
    uid: Annotated[uuid.UUID, Path()],
    repo: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
):
  res = await get_one_purchase_services(repo,uid)
  return res
  
@route.patch("/{uid}",description=alter_role_des, status_code=status.HTTP_200_OK, response_model=BasePurchaseSchema)
async def update_purchase(
    current_user: Annotated[UserModel, Depends(require_roles(alter_role))],
    uid: Annotated[uuid.UUID, Path()],
    new_data: Annotated[UpdatePurchaseSchema, Form()],
    repo: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
):
  res = await update_purchase_services(repo,uid,new_data)
  return res

@route.delete("/{uid}",description=admin_des, status_code=status.HTTP_204_NO_CONTENT)
async def delete_purchase(
    request: Request,
    current_user: Annotated[UserModel, Depends(require_roles([RoleBase.ADMIN]))],
    uid: Annotated[uuid.UUID, Path()],
    repo: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
    item_purchase_repo: Annotated[PurchasesItemsRepository, Depends(get_purchases_items_repo)],
):
  await delete_purchase_services(repo, uid,item_purchase_repo, request.cookies)