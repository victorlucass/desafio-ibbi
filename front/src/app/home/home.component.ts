import { Component, ViewChild, OnInit } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { HttpClient } from '@angular/common/http';
import { ProdutosService } from '../produtos.service';
import { CategoriasService } from '../categorias.service';
import { CotacaoDolarService } from '../cotacao-dolar.service';

interface Category {
  name: string;
}

interface CategorySelected {
  id: number;
  descricao: string;
}
interface Product {
  id: number;
  descricao: string;
  valor: number;
  quantidade: number;
  categoria_id: number;
  imagem: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator!: Paginator;

  filtroDescricao: string = '';
  produtos: Product[] = [];
  produtosFiltrados: Product[] = [];
  cotacaoDolar?: number;
  categorias?: Category[];
  selectedCategory: CategorySelected[] = [];

  constructor(
    private http: HttpClient,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private cotacaoDolarService: CotacaoDolarService
    ) {}

  ngOnInit() {
    this.obterProdutos();
    this.obterCategorias();
  }

  obterProdutos() {
    this.produtosService.getProdutos().subscribe((produtos: Product[]) => {
      this.produtos = produtos;
      this.produtosFiltrados = produtos;
    }), (error: any) => {
      console.log('Erro ao obter os produtos',error);
    }
  }

  obterCategorias() {
    this.categoriasService.getCategorias().subscribe((categorias: Category[]) => {
      this.categorias = categorias;

    }), (error: any) => {
      console.log('Erro ao obter as categorias',error);
    }
  }

  filtrarPorDescricao() {
    const apiURL = 'http://localhost:8000/v1/produtos/filtro/descricao';

    // Construir o objeto com a descrição a ser enviada na requisição
    const body = {
      descricao: this.filtroDescricao,
    };

    // Fazer a chamada POST ao endpoint com o corpo da requisição
    this.http.post<Product[]>(apiURL, body).subscribe(
      (produtosFiltrados: Product[]) => {
        // Atualizar a lista de produtos filtrados com a resposta da API
        this.produtosFiltrados = produtosFiltrados;

        // Atualizar o paginator após filtrar os produtos
        this.paginator.changePage(0);
      },
      (error: any) => {
        console.log('Erro ao filtrar os produtos por descrição', error);
      }
    );
  }

  filtrarPorCategoria() {
    const categoriasSelecionadas = this.selectedCategory as CategorySelected[];
    if (!Array.isArray(categoriasSelecionadas) || categoriasSelecionadas.length === 0) {
      return;
    }
    const produtosFiltradosTemp: Product[] = [];
    const apiURL = 'http://localhost:8000/v1/produtos/categoria';

    categoriasSelecionadas.forEach((categoria: CategorySelected) => {
      this.http.get<Product[]>(apiURL +'/'+ categoria.id).subscribe(
        (produtosCategoria: Product[]) => {
          produtosFiltradosTemp.push(...produtosCategoria);
        }
      );
      if(produtosFiltradosTemp.length === categoriasSelecionadas.length){
        this.produtosFiltrados = produtosFiltradosTemp;
        this.paginator.changePage(0);
      }
    }, (error: any) => {
      console.log('Erro ao filtrar os produtos por categoria', error);
    });
    console.log(produtosFiltradosTemp);

    this.produtosFiltrados = produtosFiltradosTemp;
  }

}
