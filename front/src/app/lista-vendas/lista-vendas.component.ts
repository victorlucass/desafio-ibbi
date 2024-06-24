import { Component, OnInit } from '@angular/core';
import { VendaPOST, VendasService } from '../vendas.service';
import { ProdutosService } from '../produtos.service';
import { UsuariosService } from '../usuarios.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-vendas',
  templateUrl: './lista-vendas.component.html',
  styleUrls: ['./lista-vendas.component.css']
})
export class ListaVendasComponent implements OnInit {
  vendas: any[] = [];
  cols: any[] = [];

  constructor(
    private vendasService: VendasService,
    private produtosService: ProdutosService,
    private usuariosService: UsuariosService,
    private router: Router
    ) {}

  ngOnInit() {
    this.carregarVendas();
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'produto_descricao', header: 'Produto' }, // Adjusted field name
      { field: 'usuario', header: 'Usuário' }, // Adjusted field name
      { field: 'quantidade', header: 'Quantidade' },
      { field: 'data_venda', header: 'Data da venda' },
      { field: 'actions', header: 'Ações' },
    ];
  }

  carregarVendas() {
    forkJoin([
      this.vendasService.getVendas(),
      this.produtosService.getProdutos(),
      this.usuariosService.getUser()
    ]).subscribe(([vendasData, produtosData, usuariosData]) => {
      this.vendas = vendasData.map((venda: any) => {
        const produto = produtosData.find((prod: any) => prod.id === venda.produto_id);
        const usuario = usuariosData.find((user: any) => user.id === venda.usuario_id);
        return {
          ...venda,
          produto_descricao: produto ? produto.descricao : 'N/A',
          usuario: usuario ? usuario.usuario : 'N/A'
        };
      });
      console.log(this.vendas);
    });


  }

  deletarVenda(id: number) {
    this.vendasService.deleteVenda(id).subscribe(() => {
      this.carregarVendas();
    })
  }

  editarVenda(id: number) {
    console.log(id);
    this.router.navigate(['/vendas-editar', id]);

  }
}
