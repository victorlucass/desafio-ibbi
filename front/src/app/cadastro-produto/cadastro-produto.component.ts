import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService, ProductPOST } from '../produtos.service';
import { MessageService } from 'primeng/api';
import { CategoriasService, Categoria } from '../categorias.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({
    descricao: ['', Validators.required],
    valor: [0, Validators.required],
    quantidade: [0, Validators.required],
    categoria_id: [0, Validators.required],
    imagem: ['', Validators.required]
  });
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];
  categorias: Categoria[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private categoriasService: CategoriasService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
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

  cadastrarProduto() {
    if (this.form.valid) {
      const produto: ProductPOST = this.form.value;
      produto.categoria_id = this.form.value.categoria_id.id;
      console.log(produto);
      this.produtosService.insertProduto(produto).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso:', response);
          this.isRegisterFailed = false;
          this.isRegisterSuccess = true;

          // Limpar os campos após o cadastro bem-sucedido (opcional)
          this.form.reset();

          // Limpar as mensagens após um cadastro bem-sucedido
          this.messageService.clear('message1');
          this.messageService.clear('message2');
        },
        (error) => {
          this.isRegisterFailed = true;
          this.isRegisterSuccess = false;
          console.error('Erro ao cadastrar produto:', error);
        }
      );
    }
  }

  carregarCategorias() {
    this.categoriasService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
      console.log(this.categorias);
    });
  }

  verificarCampos() {
    this.cadastrarDesabilitado = !(this.form.value.descricao && this.form.value.valor && this.form.value.quantidade && this.form.value.categoria_id && this.form.value.imagem);
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }
}
