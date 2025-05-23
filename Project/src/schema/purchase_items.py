import uuid
import enum
from datetime import datetime
from decimal import  Decimal


from pydantic import BaseModel



class BasePurchaseItemSchema(BaseModel):
  quantity: int
  unite_price: Decimal
  subtotal_price : Decimal
  note: str
  

class BasePurchaseItemSchema2(BasePurchaseItemSchema):
  purchas_uid : uuid.UUID | None = None

  

class CreatePurchaseItemsSchema(BaseModel):
  item_uid : str | None = None
  new_name: str | None = None
  unit : str | None = None
  category_uid: str| None = None

  quantity: int
  unite_price: Decimal
  note: str | None = None


class UpdatePurchaseItemsSchema(BaseModel):
  quantity: int | None = None
  unite_price: Decimal | None = None
  note: str | None = None


class ItemsModelPT(BaseModel):
  item_name: str
  stock: int
  uid: uuid.UUID 


class PurchasesModelPT(BaseModel):
  uid: uuid.UUID | None = None
  purchasing_plase : str | None = None
  receipt_number : int | None = None

class GetFullPurchaseItemsSchema(BasePurchaseItemSchema):
  uid: uuid.UUID | None = None
  created_at: datetime
  updated_at: datetime
  purchas_uid : uuid.UUID | None = None
  items_model: ItemsModelPT | None = None
  
class GetAllPurchaseItemsSchema(GetFullPurchaseItemsSchema):
  user_uid : uuid.UUID  | None = None
  item_uid : uuid.UUID | None = None
  purchas_uid : uuid.UUID | None = None
  purchas_model: PurchasesModelPT | None = None

class Order(enum.Enum):
  DESC  = "desc"
  ASC  = "asc"

class OrderBy(enum.Enum):
  QUANTITY  = "quantity"
  UNITE_PRICE = "unite_price"
  SUBTOTAL_PRICE = "subtotal_price"
  CREATED_AT = "created_at"
  UPDATED_AT = "updated_at"
