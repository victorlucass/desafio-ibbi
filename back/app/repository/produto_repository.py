from sqlalchemy.orm import Session
from models.produto_model import ProdutoModel
from fastapi import Depends
from configs.database import get_db

class ProdutoRepository:
    def __init__(self, db: Session = Depends(get_db)) -> None:
        self.db = db

    def obterTodos(self) -> list[ProdutoModel]:
        return self.db.query(ProdutoModel).all()
    
    def obterTodosPorIdCategoria(self, id: int) -> list[ProdutoModel]:
        return self.db.query(ProdutoModel).filter(ProdutoModel.categoria_id == id).all()

    def obterTodosPorDescricao(self, descricao: str) -> list[ProdutoModel]:
        return self.db.query(ProdutoModel).filter(ProdutoModel.descricao.like(f'%{descricao}%')).all()

    def inserir(self, produto: ProdutoModel) -> ProdutoModel:
        if produto.id:
            self.db.merge(produto)
        else:
            self.db.add(produto)
        self.db.commit()
        return produto
    
    def obterPorId(self, id: int) -> ProdutoModel:
        return self.db.query(ProdutoModel).filter(ProdutoModel.id == id).first()

    def existePorId(self, id: int) -> bool:
        return self.db.query(ProdutoModel).filter(ProdutoModel.id == id).first() is not None

    def deletarPorId(self, id: int) -> None:
        produto = self.db.query(ProdutoModel).filter(ProdutoModel.id == id).first()
        if produto is not None:
            self.db.delete(produto)
            self.db.commit()
        return produto