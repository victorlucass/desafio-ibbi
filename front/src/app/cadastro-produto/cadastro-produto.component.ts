import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService, ProductPOST, ProductPUT } from '../produtos.service';
import { MessageService, Message } from 'primeng/api';
import { CategoriasService, Categoria } from '../categorias.service';
import { ActivatedRoute, Router } from '@angular/router';

interface ToastProps {
  severity: string;
  summary: string;
  detail: string;
}

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css'],
  providers: [MessageService]
})
export class CadastroProdutoComponent implements OnInit {
  form!: FormGroup;
  isDisabled = true;
  isRegisterFailed = false;
  isRegisterSuccess = false;
  categorias: Categoria[] = [];
  id: string | null;
  titulo = '';

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.inicializarFormulario();
    this.carregarCategorias();
    this.titulo = this.id ? 'Editar Produto' : 'Cadastrar Produto';
    if (this.id) {
      this.carregarProduto();
    }
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
      quantidade: [0, Validators.required],
      categoria_id: [0, Validators.required],
      imagem: ['', Validators.required]
    });
    this.form.valueChanges.subscribe(() => this.verificarCampos());
  }

  cadastrarProduto() {
    if (this.form.valid && !this.id) {
      const produto: ProductPOST = { ...this.form.value };
      produto.categoria_id = this.form.value.categoria_id.id;

      this.produtosService.insertProduto(produto).subscribe(
        () => this.onRegisterSuccess(),
        () => this.onRegisterFailure()
      );
    } else {
      this.updateProduto();
    }
  }

  carregarCategorias() {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  verificarCampos() {
    const { descricao, valor, quantidade, categoria_id, imagem } = this.form.value;
    this.isDisabled = !(descricao && valor && quantidade && categoria_id && imagem);
    this.limparEstadoRegistro();
  }

  private limparEstadoRegistro() {
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }

  private carregarProduto() {
    this.produtosService.getProdutosById(Number(this.id)).subscribe((produto: any) => {
      this.form.patchValue({
        ...produto
      });

      this.carregarCategoria(produto.categoria_id);
    });
  }

  private carregarCategoria(id: number) {
    this.categoriasService.getCategoriaForId(id).subscribe((categoria: any) => {
      this.form.patchValue({
        categoria_id: categoria
      });
    });
  }

  private updateProduto() {
    const produto: ProductPUT = { 
      ...this.form.value,
      id: Number(this.id),
      categoria_id: this.form.value.categoria_id.id
    };
    if (this.id) {
      this.produtosService.updateProduto({ ...produto }).subscribe(
        () => this.onRegisterSuccess(),
        () => this.onRegisterFailure()
      );
    }
  }

  private onRegisterSuccess() {
    this.isRegisterFailed = false;
    this.isRegisterSuccess = true;
    this.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Register successful!',
    });
    this.isDisabled = true;
    setTimeout(() => {
      this.router.navigate(['/lista-produtos']);
    }, 1000);
  }

  private onRegisterFailure() {
    this.isRegisterFailed = true;
    this.isRegisterSuccess = false;
    this.show({
      severity: 'error',
      summary: 'Failed!',
      detail: 'Register failed!',
    });
  }

  private show({ severity, summary, detail }: ToastProps) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }
}
