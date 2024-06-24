from sqlalchemy import Column, Integer, String, Numeric, ForeignKey
from sqlalchemy.orm import relationship
from configs.database import Base
from models.venda_model import VendaModel

class ProdutoModel(Base):
    __tablename__ = "Produtos"
    id: int = Column(Integer, primary_key=True, index=True, unique=True)
    descricao: str = Column(String(255), nullable=False)
    valor: float = Column(Numeric(precision=10, scale=2))
    quantidade: int = Column(Integer, nullable=False)
    imagem: str = Column(String(500), nullable=False)
    categoria_id: int = Column(Integer, ForeignKey('Categorias.id'))
    categorias = relationship("CategoriaModel", back_populates="produtos")
    vendas = relationship("VendaModel", back_populates="produtos")