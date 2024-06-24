import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService, ProductPUT } from '../produtos.service';
import { Message } from 'primeng/api';
import { CategoriasService, Categoria } from '../categorias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos-editar',
  templateUrl: './produtos-editar.component.html',
  styleUrls: ['./produtos-editar.component.css']
})
export class ProdutosEditarComponent {
  form: FormGroup = this.formBuilder.group({
    descricao: ['', Validators.required],
    valor: [0, Validators.required],
    quantidade: [0, Validators.required],
    categoria_id: [0, Validators.required],
    imagem: ['', Validators.required]
  });
  id?: number;
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];
  categorias: Categoria[] = [];

  constructor(private formBuilder: FormBuilder, private produtosService: ProdutosService, private categoriasService: CategoriasService,
  private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = Number(params.get('id'));
      }
    );

    this.carregarCategorias();
    this.carregarProduto();



    this.message1 = [
      {
        severity: 'error',
        summary: 'Failed!',
        detail: 'Register failed!'
      }
    ];

    this.message2 = [
      {
        severity: 'success',
        summary: 'Success!',
        detail: 'Register successful!'
      }
    ];
  }

  carregarCategorias() {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
  }

  carregarProduto() {
    this.produtosService.getProdutos().subscribe((produtos: ProductPUT[]) => {
      const product = produtos.find((p) => p.id === this.id);
      if (product) {
        this.form.patchValue({
          descricao: product.descricao,
          valor: product.valor,
          quantidade: product.quantidade,
          categoria_id: product.categoria_id,
          imagem: product.imagem
        });

        this.carregarCategoriaDescricaoSelect(product.categoria_id);
      }
    });
  }

  carregarCategoriaDescricaoSelect(_id: number) {
    this.categoriasService.getCategoriaForId(_id).subscribe((categoria: Categoria) => {
      this.form.patchValue({ categoria_id: categoria });
    })
  }

  editarProduto() {
    const productToEdit: ProductPUT = {
      id: this.id,
      descricao: this.form.value.descricao,
      valor: this.form.value.valor,
      quantidade: this.form.value.quantidade,
      categoria_id: this.form.value.categoria_id,
      imagem: this.form.value.imagem
    }

    productToEdit.categoria_id = this.form.value.categoria_id.id;



    this.produtosService.updateProduto(productToEdit).subscribe(
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
    this.cadastrarDesabilitado = !(this.form.value.descricao && this.form.value.valor && this.form.value.quantidade && this.form.value.categoria_id && this.form.value.imagem);
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }
}
