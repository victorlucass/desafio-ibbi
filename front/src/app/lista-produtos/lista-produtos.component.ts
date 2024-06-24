import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../produtos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.css']
})
export class ListaProdutosComponent implements OnInit {
  produtos: any[] = [];
  cols: any[] = [];

  constructor(private produtosService: ProdutosService, private router: Router) {}

  ngOnInit() {
    this.carregarProdutos();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'valor', header: 'Valor' },
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'categoria_id', header: 'Categoria' },
      { field: 'imagem', header: 'Imagem' },
      { field: 'editar', header: '' },
      { field: 'deletar', header: '' }
    ];
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe((data) => {
      this.produtos = data;
    });
  }

  deletarProduto(id: number) {
    this.produtosService.deleteProduto(id).subscribe(() => {
      this.carregarProdutos();
    });
  }

  editarProduto(id: number) {
    console.log(id);
    this.router.navigate(['/produtos-editar', id]);
  }


}
