from fastapi import Depends

from ..db.index import get_db
from ..db.models import PurchaseItemsModel,ItemsModel
from ..schema.categories import Order, OrderBy
from .items import ItemsRepository

from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession, AsyncResult
from sqlmodel import select,desc, asc

from decimal import Decimal
from typing import Any, Annotated, Callable, List
import uuid

class PurchasesItemsRepository:
  def __init__(self, db):
    self.db = db
    self.model = PurchaseItemsModel
  

  async def _statement(self, field: str, value: Any) -> AsyncResult:
    statement = select(self.model).where(getattr(self.model, field) == value)
    return await self.db.execute(statement)

  async def _commit_refresh(self, row):
    await self.db.commit()
    await self.db.refresh(row)
    return row

  async def delete_row(self, row):
    await self.db.delete(row)
    await self.db.commit()


  async def get_by_uid(self, uid: uuid.UUID):
    res =  await self._statement(field="uid", value=uid)
    return res.scalars().first()
  async def get_by_quantity(self, quantity: int):
    res = await self._statement(field="quantity", value=quantity)
    return res.scalars().first()
  async def get_by_unite_price(self, unite_price: Decimal):
    res =  await self._statement(field="unite_price", value=unite_price)
    return res.scalars().first()
  async def get_by_subtotal_price(self, subtotal_price: Decimal):
    res =  await self._statement(field="subtotal_price", value= subtotal_price)
    return res.scalars().first()
  
  async def get_by_purchase_uid(self, purchas_uid: uuid.UUID) -> List[PurchaseItemsModel]:
    res = await self._statement(field="purchas_uid", value= purchas_uid)
    return res.scalars().all()
  
  async def get_all(self, order: Order, order_by: OrderBy):
    order_column = getattr(self.model, order_by.value )

    if order.value == "desc": order_column = desc(order_column)
    else: order_column = asc(order_column)

    statement = (select(self.model).order_by(order_column))
    result = await self.db.execute(statement)
    return result.scalars().all()

  async def create_row(self,new_row) -> PurchaseItemsModel:
    self.db.add(new_row)
    return await self._commit_refresh(new_row)

  async def update_row(self, req_data:dict, row_model: PurchaseItemsModel) -> PurchaseItemsModel:
    for key, value in req_data.items():
      if value:
        setattr(row_model,key,value)
    return await self._commit_refresh(row_model)

async def get_purchases_items_repo(db: Annotated[AsyncSession, Depends(get_db)]):
  return PurchasesItemsRepository(db)



async def create_new_row_utils(
    data: dict, create_row: Callable, update_row: Callable, items: ItemsModel):
  new_row = PurchaseItemsModel(**data)
  new_data = await create_row(new_row)
  new_stock = new_data.quantity + items.stock
  item_update_dict = {"stock": new_stock}
  await update_row(item_update_dict, items)

  return new_data


