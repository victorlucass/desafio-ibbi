from sqlalchemy.orm import Session
from models.categoria_model import CategoriaModel
from fastapi import Depends
from configs.database import get_db

class CategoriaRepository:
    def __init__(self, db: Session = Depends(get_db)) -> None:
        self.db = db
    
    def obterTodos(self) -> list[CategoriaModel]:
        return self.db.query(CategoriaModel).all()

    def inserir(self, categoria: CategoriaModel) -> CategoriaModel:
        if categoria.id:
            self.db.merge(categoria)
        else:
            self.db.add(categoria)
        self.db.commit()
        return categoria
    
    def obterPorId(self, id: int) -> CategoriaModel:
        return self.db.query(CategoriaModel).filter(CategoriaModel.id == id).first()

    def existePorId(self, id: int) -> bool:
        return self.db.query(CategoriaModel).filter(CategoriaModel.id == id).first() is not None

    def deletarPorId(self, id: int) -> None:
        categoria = self.db.query(CategoriaModel).filter(CategoriaModel.id == id).first()
        if categoria is not None:
            self.db.delete(categoria)
            self.db.commit()
        return categoria