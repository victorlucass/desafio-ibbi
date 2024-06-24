from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from configs.database import Base

class CategoriaModel(Base):
    __tablename__ = "Categorias"
    id: int = Column(Integer, primary_key=True, index=True, unique=True)
    descricao: str = Column(String(255), nullable=False)
    produtos = relationship("ProdutoModel", back_populates="categorias")