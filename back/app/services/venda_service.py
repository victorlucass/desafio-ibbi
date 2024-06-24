from fastapi import Depends, HTTPException, status
from repository.venda_repository import VendaRepository
from models.venda_model import VendaModel
from services.usuario_service import UsuarioService
from services.produto_service import ProdutoService

class VendaService:
    def __init__(
        self, 
        repo: VendaRepository = Depends(VendaRepository),
        usuarioService: UsuarioService = Depends(UsuarioService),
        produtoService: ProdutoService = Depends(ProdutoService)
    ) -> None:
        self.repo = repo
        self.usuarioService = usuarioService
        self.produtoService = produtoService

    def obterVendas(self):
        return self.repo.obterTodos()
    
    def obterVendaPorId(self, id: int):
        venda = self.repo.obterPorId(id)
        if not venda:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Venda não encontrada"
            )
        return venda
    
    def obterUltimasVendas(self):
        return self.repo.obterUltimasVendas()
    
    def dezMaisVendidos(self):
        return self.repo.dezMaisVendidos()
    
    def maisVendidosPorCategoria(self):
        return self.repo.maisVendidosPorCategoria()
    
    def inserirVenda(self, venda: VendaModel):
        self.usuarioService.obterUsuarioPorId(venda.usuario_id)
        produto = self.produtoService.obterProdutoPorId(venda.produto_id)
        if venda.quantidade < 1:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Quantidade de venda solicitada inválida."
            )
        if produto.quantidade >= venda.quantidade:
            vendaInserida = self.repo.inserir(venda)
            if not vendaInserida:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao inserir venda"
                )
            produto.quantidade = produto.quantidade - venda.quantidade
            produtoAtualizado = self.produtoService.atualizarProduto(produto)
            if not produtoAtualizado:
                self.repo.deletarPorId(vendaInserida.id)
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao atualizar estoque"
                )
            return vendaInserida
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Estoque de produto indisponível para a quantidade de venda informada"
            )
    
    def atualizarVenda(self, venda: VendaModel):
        if self.obterVendaPorId(venda.id):
            atualizado = self.repo.inserir(venda)
            if not atualizado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao atualizar venda"
                )
            return atualizado
    
    def deletarVenda(self, id: int):
        if self.obterVendaPorId(id):
            deletado = self.repo.deletarPorId(id)
            if not deletado:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="Erro interno ao deletar venda"
                )
            return deletado
