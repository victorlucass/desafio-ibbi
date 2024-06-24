from sqlalchemy import Integer, Boolean, Column
from configs.database import Base

class SeedModel(Base):
    __tablename__ = "DataSeed"
    id: int = Column(Integer, primary_key=True, index=True, unique=True)
    seeded: bool = Column(Boolean, nullable=False)
