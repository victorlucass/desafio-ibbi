from fastapi import Depends
from services.categoria_service import CategoriaService
from services.produto_service import ProdutoService
from services.usuario_service import UsuarioService
from services.venda_service import VendaService
from schemas.dashboard_schemas import *

class DashboardService:
    def __init__(
        self,
        categoriaService: CategoriaService = Depends(CategoriaService),
        produtoService: ProdutoService = Depends(ProdutoService),
        usuarioService: UsuarioService = Depends(UsuarioService),
        vendaService: VendaService = Depends(VendaService)
    ) -> None:
        self.categoriaService = categoriaService
        self.produtoService = produtoService
        self.usuarioService = usuarioService
        self.vendaService = vendaService

    def obterDadosDashboard(self):
        ultimasVendas = self.vendaService.obterUltimasVendas()
        dezMaisVendidos = self.vendaService.dezMaisVendidos()
        porCategoria = self.vendaService.maisVendidosPorCategoria()

        dashboard_historico = list()
        dashboard_maisvendidos = list()
        dashboard_porcategoria = list()

        for venda in ultimasVendas:
            historico = HistoricoVendas(
                data_venda=venda.data_venda,
                descricao=venda.produtos.descricao,
                usuario=venda.usuarios.usuario,
                quantidade=venda.quantidade
            )
            dashboard_historico.append(historico)
        
        for item in dezMaisVendidos:
            id = item[0]
            total = item[1]
            produto = self.produtoService.obterProdutoPorId(id)
            maisVendido = MaisVendidos(
                descricao=produto.descricao,
                quantidade=total
            )
            dashboard_maisvendidos.append(maisVendido)

        filtroCategorias = list()
        tresMaiores = porCategoria[:3]
        outros = porCategoria[3:]
        totalOutros = 0
        for item in outros:
            totalOutros = totalOutros + item[1]

        filtroCategorias.extend(tresMaiores)
        if totalOutros > 0:
            filtroCategorias.append(("Outros", totalOutros))

        print(filtroCategorias)

        for item in filtroCategorias:
            descricao = item[0]
            total = item[1]
            vendaCat = VendasCategoria(
                descricao= descricao,
                total=total
            )
            dashboard_porcategoria.append(vendaCat)
        
        return DashboardResponse(
            historico=dashboard_historico,
            mais_vendidos=dashboard_maisvendidos,
            por_categoria=dashboard_porcategoria
        )
