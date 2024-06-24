import { Component, ChangeDetectorRef } from '@angular/core';
import { CotacaoDolarService } from '../cotacao-dolar.service';
import { ProdutosService } from '../produtos.service';
import { ConfirmationService } from 'primeng/api';
import { CategoriasService, Categoria } from '../categorias.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { VendaPOST, VendasService } from '../vendas.service';

interface Produto {
  categoria_id: number;
  descricao: string;
  id: number;
  imagem: string;
  quantidade: number;
  valor: number;
  quantidadeVenda: number;
  quantidadeAnterior: number;
  isEsgotado?: boolean;
  descricaoCategoria?: string;

}

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrls: ['./card-produto.component.css']
})
export class CardProdutoComponent {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  valorEmReal: number = 0;
  cotacaoDolar: number = 0;
  categorias: Categoria[] = [];
  descricaoFiltro: string = '';
  selectedCategory: Categoria[] = [];
  produtosFiltradosTemp: Produto[] = [];
  id: number | undefined;
  usuario: string | undefined;
  showNotLoggedInMessage: boolean = false;

  constructor(
    public cotacaoDolarService: CotacaoDolarService,
    public produtosService: ProdutosService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private categoriasService: CategoriasService,
    private router: Router,
    private vendasService: VendasService
  ) {}

  ngOnInit() {
    const categorias$ = this.categoriasService.getCategorias();
    const produtos$ = this.produtosService.getProdutos();

    forkJoin([categorias$, produtos$]).subscribe(([categorias, produtos]) => {
      this.categorias = categorias;
      this.produtos = produtos
        .filter((produto: Produto) => produto.quantidade !== 0) // Filtra os produtos com quantidade diferente de zero
        .map((produto: Produto) => ({
          ...produto,
          quantidadeVenda: 1,
          quantidadeAnterior: 1,
          descricaoCategoria: this.getDescricaoCategoria(produto.categoria_id),
          isEsgotado: produto.quantidade === 0 || produto.quantidadeVenda > produto.quantidade,
        }));
      this.produtosFiltrados = this.produtos;
    });

    this.getDolarApi()
    
  }
  comprarProduto(produto: Produto) {
    this.checkLocalStorage();
    console.log('clicou no produto', produto);
    if(!this.showNotLoggedInMessage){
      const novaVenda = {
        produto_id: produto.id,
        usuario_id: this.id,
        quantidade: produto.quantidadeVenda
      }
      try {
        this.vendasService.insertVenda(novaVenda).subscribe(() => {
          console.log('venda inserida com sucesso');
        });
        this.router.navigate(['/lista-vendas']);
      } catch (error) {
        console.log('erro ao inserir venda', error);

      }
    }


  }

  getDescricaoCategoria(categoriaId: number): string {
    const categoriaEncontrada = this.categorias.find((categoria) => categoria.id === categoriaId);
    return categoriaEncontrada ? categoriaEncontrada.descricao : '';
  }

  getSeverity(produto: any) {

    if(produto.quantidade === 0 || produto.quantidadeVenda > produto.quantidade) {
      return 'danger';
    }
    else if(produto.quantidade - produto.quantidadeVenda <= 5) {
      return 'warning';
    }
    return 'success';
  }

  getStatus(produto: any) {

    if(produto.quantidade === 0 || produto.quantidadeVenda > produto.quantidade) {
      return 'Esgotado';
    }
    else if(produto.quantidade - produto.quantidadeVenda <= 5) {
      return 'Estoque baixo';
    }
    return 'Em estoque';
  }

  getDolarValue(valor: number) {
    return valor / this.cotacaoDolar;
  }

  getDolarApi() {
    this.cotacaoDolarService.getCotacaoDolar().subscribe((cotacao) => {
      this.cotacaoDolar = cotacao.USDBRL.ask;
    });
  }

  diminuirQuantidade(produto: Produto): void {
    if (produto?.quantidadeVenda && produto.quantidadeVenda > 0) {
      produto.quantidadeVenda--;
      produto.isEsgotado = produto.quantidade === 0 || produto.quantidadeVenda > produto.quantidade;
      produto.quantidadeAnterior = produto.quantidadeVenda; // Atualiza quantidadeAnterior
      this.atualizarQuantidade(produto);
    }
  }

  aumentarQuantidade(produto: Produto): void {
    if (produto && produto.quantidadeVenda !== undefined) {
      produto.quantidadeVenda++;
      if (produto.quantidadeVenda > produto.quantidade) {
        produto.quantidadeVenda = produto.quantidade;
      }
      produto.isEsgotado = produto.quantidade === 0 || produto.quantidadeVenda > produto.quantidade;
      produto.quantidadeAnterior = produto.quantidadeVenda; // Atualiza quantidadeAnterior
      this.atualizarQuantidade(produto);
    }
  }

  atualizarQuantidade(produto: Produto): void {
    if (produto?.quantidadeVenda === undefined || produto.quantidadeVenda < 0) {
      produto.quantidadeVenda = 0;
    } else if (produto.quantidadeVenda > produto.quantidade) {
      produto.quantidadeVenda = produto.quantidade;
    }
  }

  filtroDescricao() {
    const filtro = this.descricaoFiltro.toLowerCase().trim(); // Corrija o nome da variável
    this.produtosFiltrados = this.produtos.filter(
      (produto: Produto) => produto.descricao.toLowerCase().includes(filtro)
    );
  }

  filtroCategoria() {
    const categoriasSelecionadas = this.selectedCategory.map(categoria => categoria.id);

    if (categoriasSelecionadas.length === 0) {
      // Caso nenhuma categoria seja selecionada, mostrar todos os produtos
      this.produtosFiltrados = this.produtos;
    } else {
      // Filtrar os produtos com base nas categorias selecionadas
      this.produtosFiltradosTemp = this.produtos.filter((produto: Produto) => {
        return categoriasSelecionadas.includes(produto.categoria_id) ||
          (produto.descricaoCategoria && categoriasSelecionadas.includes(Number(produto.descricaoCategoria)));
      });

      // Atualizar a lista de produtos filtrados com base nos produtos filtrados temporariamente
      this.produtosFiltrados = this.produtosFiltradosTemp;
    }

    console.log(categoriasSelecionadas);
    console.log(this.produtosFiltrados);

  }

  limparFiltro() {
    this.descricaoFiltro = '';
    this.filtroDescricao();
  }

  checkLocalStorage() {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user && user.id && user.usuario) {
          this.id = user.id;
          this.usuario = user.usuario;
          console.log(this.usuario);
          console.log(this.id);
        } else {
          this.showNotLoggedInMessage = true;
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        this.showNotLoggedInMessage = true;
      }
    } else {
      this.showNotLoggedInMessage = true;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }


}
