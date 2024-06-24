from sqlalchemy.orm import Session
from models.usuario_model import UsuarioModel
from fastapi import Depends
from configs.database import get_db

class UsuarioRepository:
    def __init__(self, db: Session = Depends(get_db)) -> None:
        self.db = db

    def obterTodos(self) -> list[UsuarioModel]:
        return self.db.query(UsuarioModel).all()

    def inserir(self, usuario: UsuarioModel) -> UsuarioModel:
        if usuario.id:
            self.db.merge(usuario)
        else:
            self.db.add(usuario)
        self.db.commit()
        return usuario
    
    def obterPorId(self, id: int) -> UsuarioModel:
        return self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first()

    def obterPorNome(self, name: str) -> UsuarioModel:
        return self.db.query(UsuarioModel).filter(UsuarioModel.usuario == name).first()

    def existePorId(self, id: int) -> bool:
        return self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first() is not None

    def deletarPorId(self, id: int) -> None:
        usuario = self.db.query(UsuarioModel).filter(UsuarioModel.id == id).first()
        if usuario is not None:
            self.db.delete(usuario)
            self.db.commit()
        return usuario