import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { VendasService, VendaPUT } from '../vendas.service';
import { UsuariosService } from '../usuarios.service';
import { ProdutosService } from '../produtos.service';
import { DatePipe } from '@angular/common';
UsuariosService;
ProdutosService

interface Usuario {
  id: number;
  usuario: string;
}

interface Produto {
  id: number;
  descricao: string;
}

@Component({
  selector: 'app-vendas-editar',
  templateUrl: './vendas-editar.component.html',
  styleUrls: ['./vendas-editar.component.css'],
  providers: [DatePipe]
})
export class VendasEditarComponent implements OnInit, OnChanges {
  form: FormGroup = this.formBuilder.group({
    produto_id: ['', Validators.required],
    usuario_id: ['', Validators.required],
    quantidade: [0, Validators.required],
    data_venda: ['', Validators.required],
  });
  id?: number;
  produtos: Produto[] = [];
  usuarios: Usuario[] = [];
  produtoSelected: Produto = {
    id: 0,
    descricao: '',
  };
  usuarioSelected: Usuario = {
    id: 0,
    usuario: '',
  }
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private vendasService: VendasService,
    private usuariosService: UsuariosService,
    private produtosService: ProdutosService,
    private datePipe: DatePipe
    ) {}

  ngOnInit() {
      this.route.paramMap.subscribe(
        params => {
          this.id = Number(params.get('id'));
        }
      )
      this.carregarUsuarios();
      this.carregarProdutos();

      this.carregarForm();
      this.message1 = [
        {
          severity: 'error',
          summary: 'Failed!',
          detail: 'Registro falhou!'
        }
      ];

      this.message2 = [
        {
          severity: 'success',
          summary: 'Success!',
          detail: 'Register bem sucedido!'
        }
      ];
    }

    carregarUsuarios() {
      this.usuariosService.getUser().subscribe(
        (response: any) => {
          this.usuarios = response;
        }
      )
      console.log(this.usuarios);
    }

    carregarForm() {
     if(this.id) {
      this.vendasService.getVendasById(this.id).subscribe(
        (response: any) => {
          this.carregarProdutosById(response.produto_id);
          this.carregarUsuariosById(response.usuario_id);

          this.form.patchValue({
            quantidade: response.quantidade,
            data_venda: this.datePipe.transform(response.data_venda, 'yyyy-MM-dd')
          })
        }
      )
     }
    }

    carregarProdutosById(id: number) {
      this.produtosService.getProdutosById(id).subscribe(
        (response: any) => {
          this.produtoSelected = response;
        }
      )
    }

    carregarUsuariosById(id: number) {
      this.usuariosService.getUserById(id).subscribe(
        (response: any) => {
          this.usuarioSelected = response;
        }
      )
    }

    carregarProdutos() {
      this.produtosService.getProdutos().subscribe(
        (response: any) => {
          this.produtos = response;
        }
      )
      console.log(this.produtos);
    }
  editarVenda() {
    const vendaToEdit: VendaPUT = {
      id: this.id,
      produto_id: this.produtoSelected.id,
      usuario_id: this.usuarioSelected.id,
      quantidade: this.form.value.quantidade,
      data_venda: new Date(this.form.value.data_venda).toISOString()
    }
    console.log(vendaToEdit);

    this.vendasService.updateVenda(vendaToEdit).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        // Limpar os campos após o cadastro bem-sucedido (opcional)
        this.form.reset();
        // Desabilitar o botão de cadastro novamente
        this.cadastrarDesabilitado = true;
        // Exibir a mensagem de sucesso apenas quando a resposta for bem-sucedida
        this.isRegisterFailed = false;
        this.isRegisterSuccess = true;
      }
    )

  }
  verificarCampos() {
    this.cadastrarDesabilitado = !(this.form.value.quantidade && this.form.value.data_venda);
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.verificarCampos();
  }

}
