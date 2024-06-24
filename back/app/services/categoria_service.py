from fastapi import Depends, HTTPException, status
from repository.categoria_repository import CategoriaRepository
from models.categoria_model import CategoriaModel

class CategoriaService:
    def __init__(self, repo: CategoriaRepository = Depends(CategoriaRepository)) -> None:
        self.repo = repo

    def obterCategorias(self):
        categorias = self.repo.obterTodos()
        return categorias
    
    def obterCategoriaPorId(self, id: int):
        categoria = self.repo.obterPorId(id)
        if not categoria:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Categoria não encontrada"
            )
        return categoria
    
    def inserirCategoria(self, categoria: CategoriaModel):
        inserido = self.repo.inserir(categoria)
        return inserido

    def atualizarCategoria(self, categoria: CategoriaModel):
        if self.obterCategoriaPorId(categoria.id):
            atualizado = self.repo.inserir(categoria)
            if not atualizado:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro interno ao atualizar categoria"
                )
            return atualizado
    
    def deletarCategoria(self, id: int):
        if self.obterCategoriaPorId(id):
            deletado = self.repo.deletarPorId(id)
            if not deletado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao deletar categoria"
                )
            return deletado