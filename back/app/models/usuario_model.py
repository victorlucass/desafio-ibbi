from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from configs.database import Base
from models.venda_model import VendaModel

class UsuarioModel(Base):
    __tablename__ = "Usuarios"
    id: int = Column(Integer, primary_key=True, index=True, unique=True)
    usuario: str = Column(String(255), nullable=False)
    senha: str = Column(String(255), nullable=False)
    vendas = relationship("VendaModel", back_populates="usuarios")