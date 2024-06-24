from fastapi import Depends, HTTPException, status
from repository.usuario_repository import UsuarioRepository
from models.usuario_model import UsuarioModel
import bcrypt

class UsuarioService:
    def __init__(self, repo: UsuarioRepository = Depends(UsuarioRepository)) -> None:
        self.repo = repo

    def obterUsuarios(self):
        return self.repo.obterTodos()
    
    def obterUsuarioPorId(self, id: int):
        usuario = self.repo.obterPorId(id)
        if not usuario:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado"
            )
        return usuario
    
    def inserirUsuario(self, usuario: UsuarioModel):
        user = self.repo.obterPorNome(usuario.usuario)
        if user:
            return None
        usuario.senha = bcrypt.hashpw(usuario.senha.encode("utf-8"), bcrypt.gensalt())
        inserido = self.repo.inserir(usuario)
        return inserido
    
    def atualizarUsuario(self, usuario: UsuarioModel):
        if self.obterUsuarioPorId(usuario.id):
            usuario.senha = bcrypt.hashpw(usuario.senha.encode("utf-8"), bcrypt.gensalt())
            atualizado = self.repo.inserir(usuario)
            if not atualizado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao atualizar usuário"
                )
            return atualizado
    
    def deletarUsuario(self, id: int):
        if self.obterUsuarioPorId(id):
            deletado = self.repo.deletarPorId(id)
            if not deletado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao deletar usuário"
                )
            return deletado
    
    def login(self, usuario: UsuarioModel):
        user = self.repo.obterPorNome(usuario.usuario)
        if not user:
            return None
        samePassword = bcrypt.checkpw(usuario.senha.encode("utf-8"), user.senha.encode("utf-8"))
        if not samePassword:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Credenciais incorretas"
            )
        return user
