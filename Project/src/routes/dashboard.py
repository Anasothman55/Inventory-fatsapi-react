from xml.dom.expatbuilder import theDOMImplementation
from fastapi.encoders import jsonable_encoder
from httpcore import AnyIOBackend
from pydantic import BaseModel
from rich import  print

from typing import Annotated, Any, List
from fastapi import APIRouter,  Query, status, HTTPException, Form, Depends, Path

import uuid

from src.schema.item_transactions import GetAllTransaction
from src.utils.item_tranactions import ItemTransactionsRepository, get_items_transactions_repo
from src.utils.items import ItemsRepository, get_items_repo
from src.utils.purchase import PurchasesRepository, get_purchases_repo
from src.utils.purchase_items import get_purchases_items_repo

from ..utils.categories import CategoryRepository,get_category_repo
from ..db.models import UserModel
from ..dependencies.auth import get_current_user,require_roles
from ..schema.auth import RoleBase
from ..schema.categories import  Order, CategoriesItemSchema,BaseCategoriesSchema,OrderBy, CategoriesItemMainSchema
from ..services.categories import (
  create_category_services,
  get_one_category_services,
  update_category_services,
  delete_category_services
)



route = APIRouter(
  dependencies= [Depends(get_current_user)],
  tags=["Dashboard"]
)


class ResponseM(BaseModel):
  items: Any
  purchase: Any
  transaction: GetAllTransaction


@route.get('/', status_code= status.HTTP_200_OK, response_model=ResponseM)
async def get_all_categories(
    itemsRepository: Annotated[ItemsRepository, Depends(get_items_repo)],
    purchaseRepository: Annotated[PurchasesRepository, Depends(get_purchases_repo)],
    transactionREpository: Annotated[ItemTransactionsRepository, Depends(get_items_transactions_repo)]
):
  items = await itemsRepository.get_all_dash()
  purchase = await purchaseRepository.get_all_dash()
  transaction = await transactionREpository.get_all_dash()
  
  itemsData = []
  for i in items:
    if i.minimum_stock_level != 0 and i.stock <= i.minimum_stock_level:
      itemsData.append(i)
    
  return {
    "items": {
      "total": len(itemsData),
      "data": jsonable_encoder(itemsData)
    },
    "purchase": {
      "total": len(purchase),
      "data": jsonable_encoder(purchase)
    },
    "transaction": {
      "total": len(transaction),
      "items": transaction
    }
  }
  
  
  
  
  
  
  
  
