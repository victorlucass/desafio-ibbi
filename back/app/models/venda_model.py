from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from configs.database import Base
import datetime


class VendaModel(Base):
    __tablename__ = "Vendas"
    id: int = Column(Integer, primary_key=True, index=True, unique=True)
    quantidade: int = Column(Integer, nullable=False)
    data_venda: str = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
    usuario_id: int = Column(Integer, ForeignKey("Usuarios.id"))
    usuarios = relationship("UsuarioModel", back_populates="vendas")
    produto_id: int = Column(Integer, ForeignKey('Produtos.id'))
    produtos = relationship("ProdutoModel", back_populates="vendas")
