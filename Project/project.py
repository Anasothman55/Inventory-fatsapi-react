from src.core.config import setting
from rich import print
import uvicorn

if __name__ == "__main__":
  uvicorn.run("src.main:app",host=setting.HOST, port=8000,log_level="debug", reload=True)

#! there are no new miggratesion for alembic
"""
alembic
1- alembic init -t async migrations
2- alembic revision --autogenerate -m "4st migrations"
3- alembic upgrade 4ec9cf8c7d9f    
""" 
