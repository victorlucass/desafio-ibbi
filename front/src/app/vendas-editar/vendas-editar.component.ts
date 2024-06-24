import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { VendasService, VendaPUT } from '../vendas.service';
import { UsuariosService } from '../usuarios.service';
import { ProdutosService } from '../produtos.service';
import { MessageService } from 'primeng/api';

interface ToastProps {
  severity: string;
  summary: string;
  detail: string;
}

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
  providers: [DatePipe, MessageService]
})
export class VendasEditarComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  produtos: Produto[] = [];
  usuarios: Usuario[] = [];
  produtoSelected: Produto = { id: 0, descricao: '' };
  usuarioSelected: Usuario = { id: 0, usuario: '' };
  isDisable = false;
  isRegisterFailed = false;
  isRegisterSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private vendasService: VendasService,
    private usuariosService: UsuariosService,
    private produtosService: ProdutosService,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarDados();
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.carregarVenda();
      }
    });
    this.form.statusChanges.subscribe(() => this.validarCampos());
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      produto_id: ['', Validators.required],
      usuario_id: ['', Validators.required],
      quantidade: [0, Validators.required],
      data_venda: [new Date().toISOString(), Validators.required],
    });
  }

  carregarDados() {
    this.carregarUsuarios();
    this.carregarProdutos();
  }

  carregarUsuarios() {
    this.usuariosService.getUser().subscribe((response: Usuario[]) => {
      this.usuarios = response;
    });
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe((response: Produto[]) => {
      this.produtos = response;
    });
  }

  carregarVenda() {
    this.vendasService.getVendasById(this.id!).subscribe(response => {
      this.carregarProdutoById(response.produto_id);
      this.carregarUsuarioById(response.usuario_id);
      this.form.patchValue({
        quantidade: response.quantidade,
        data_venda: this.datePipe.transform(response.data_venda, 'yyyy-MM-dd')
      });
    });
  }

  carregarProdutoById(id: number) {
    this.produtosService.getProdutosById(id).subscribe((response: Produto) => {
      this.produtoSelected = response;
      this.form.patchValue({ produto_id: response.id });
    });
  }

  carregarUsuarioById(id: number) {
    this.usuariosService.getUserById(id).subscribe((response: Usuario) => {
      this.usuarioSelected = response;
      this.form.patchValue({ usuario_id: response.id });
    });
  }

  editarVenda() {
    if (this.form.valid && this.id) {
      const vendaToEdit: VendaPUT = {
        id: this.id,
        produto_id: this.form.value.produto_id,
        usuario_id: this.form.value.usuario_id,
        quantidade: this.form.value.quantidade,
        data_venda: new Date(this.form.value.data_venda).toISOString(),
      };

      this.vendasService.updateVenda(vendaToEdit).subscribe(
        () => this.onRegisterSuccess(),
        () => this.onRegisterFailure()
      );
    }
  }

  validarCampos() {
    this.isDisable = !this.form.valid;
  }

  onRegisterSuccess() {
    this.isRegisterFailed = false;
    this.isRegisterSuccess = true;
    this.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Register successful!',
    });

    this.isDisable = true;

    setTimeout(() => {
      this.router.navigate(['/lista-vendas']);
    }, 1000);
  }


  onRegisterFailure() {
    this.isRegisterFailed = true;
    this.isRegisterSuccess = false;
    this.show({
      severity: 'error',
      summary: 'Failed!',
      detail: 'Register failed!',
    });
  }

  show({ severity, summary, detail }: ToastProps) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
