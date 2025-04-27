from fastapi import Depends

from ..db.index import get_db
from ..db.models import EmployeeInfoModel
from ..schema.employeeInfo import GetFullEmpInfoModel, CreateEmpInfoModel

from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select,desc, asc
from typing import Any, Annotated, List
import uuid

class EmployeeInfoRepository:
  def __init__(self, db):
    self.db = db
    self.model = EmployeeInfoModel

  async def _statement(self, field: str, value: Any):
    statement = select(self.model).where(getattr(self.model, field) == value)
    result = await self.db.execute(statement)
    return result.scalars().first()

  async def _commit_refresh(self, row):
    await self.db.commit()
    await self.db.refresh(row)
    return row

  async def get_by_employee_uid(self, employee_uid: uuid.UUID):
    return await self._statement(field="employee_uid", value=employee_uid)

  async def create_row(self,new_row) -> EmployeeInfoModel:
    self.db.add(new_row)
    return await self._commit_refresh(new_row)

  async def update_row(self, req_data:dict, row_model: EmployeeInfoModel) -> EmployeeInfoModel:
    for key, value in req_data.items():
      if value:
        setattr(row_model,key,value)
    return await self._commit_refresh(row_model)


async def get_emp_info_repo(db: Annotated[AsyncSession, Depends(get_db)]):
  return EmployeeInfoRepository(db)









