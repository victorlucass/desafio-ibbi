from fastapi import Depends, HTTPException, status
from repository.produto_repository import ProdutoRepository
from models.produto_model import ProdutoModel
from services.categoria_service import CategoriaService

class ProdutoService:
    def __init__(
        self, 
        repo: ProdutoRepository = Depends(ProdutoRepository),
        categoriaService: CategoriaService = Depends(CategoriaService)
    ) -> None:
        self.repo = repo
        self.categoriaService = categoriaService

    def obterProdutos(self):
        produtos = self.repo.obterTodos()
        return produtos
    
    def obterProdutoPorId(self, id: int):
        produto = self.repo.obterPorId(id)
        if not produto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Produto não encontrado"
            )
        return produto
    
    def obterProdutoPorDescricao(self, produto: ProdutoModel):
        produtos = self.repo.obterTodosPorDescricao(produto.descricao)
        return produtos

    def inserirProduto(self, produto: ProdutoModel):
        inserido = self.repo.inserir(produto)
        return inserido
    
    def atualizarProduto(self, produto: ProdutoModel):
        if self.obterProdutoPorId(produto.id):
            atualizado = self.repo.inserir(produto)
            if not atualizado:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar produto"
                )
            return atualizado
    
    def deletarProduto(self, id: int):
        if self.obterProdutoPorId(id):
            deletado = self.repo.deletarPorId(id)
            if not deletado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro ao deletar produto"
                )
            return deletado
        
    
    def obterProdutoPorCategoriaId(self, id: int):
        categoriaExiste = self.categoriaService.obterCategoriaPorId(id)
        if not categoriaExiste:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Categoria inválida"
            )
        produtos = self.repo.obterTodosPorIdCategoria(id)
        return produtos
