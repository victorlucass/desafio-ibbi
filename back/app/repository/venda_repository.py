from sqlalchemy.orm import Session
from sqlalchemy import func
from models.venda_model import VendaModel
from models.produto_model import ProdutoModel
from models.categoria_model import CategoriaModel
from fastapi import Depends
from configs.database import get_db

class VendaRepository:
    def __init__(self, db: Session = Depends(get_db)) -> None:
        self.db = db

    def obterTodos(self) -> list[VendaModel]:
        return self.db.query(VendaModel).all()
    
    def obterUltimasVendas(self) -> list[VendaModel]:
        return self.db.query(VendaModel).order_by(VendaModel.data_venda.desc()).limit(4).all()

    def dezMaisVendidos(self) -> list[int]:
        dezMaisVendidosIds = (
            self.db.query(VendaModel.produto_id, func.sum(VendaModel.quantidade))
                .group_by(VendaModel.produto_id)
                .order_by(func.sum(VendaModel.quantidade).desc())
                .limit(10)
                .all()
        )
        return dezMaisVendidosIds

    def maisVendidosPorCategoria(self):
        subconsulta = (
            self.db.query(VendaModel.produto_id, ProdutoModel.categoria_id, func.sum(VendaModel.quantidade).label('total_vendido'))
                .join(ProdutoModel, VendaModel.produto_id == ProdutoModel.id)
                .group_by(VendaModel.produto_id, ProdutoModel.categoria_id)
                .subquery()
        )
        categoriasMaisVendidas = (
            self.db.query(CategoriaModel.descricao, func.sum(subconsulta.c.total_vendido).label('total_categoria'))
                .join(subconsulta, CategoriaModel.id == subconsulta.c.categoria_id)
                .group_by(CategoriaModel.descricao)
                .order_by(func.sum(subconsulta.c.total_vendido).desc())
                .all()
        )

        return categoriasMaisVendidas

    def inserir(self, venda: VendaModel) -> VendaModel:
        if venda.id:
            self.db.merge(venda)
        else:
            self.db.add(venda)
        self.db.commit()
        return venda
    
    def obterPorId(self, id: int) -> VendaModel:
        return self.db.query(VendaModel).filter(VendaModel.id == id).first()

    def existePorId(self, id: int) -> bool:
        return self.db.query(VendaModel).filter(VendaModel.id == id).first() is not None

    def deletarPorId(self, id: int) -> None:
        venda = self.db.query(VendaModel).filter(VendaModel.id == id).first()
        if venda is not None:
            self.db.delete(venda)
            self.db.commit()
        return venda