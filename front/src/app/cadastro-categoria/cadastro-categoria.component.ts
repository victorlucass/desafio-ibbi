import { Component } from '@angular/core';
import { CategoriasService, CategoriaPOST } from '../categorias.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent {
  descricaoCategoria: string = '';
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];
  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.message1 = [
      {
        severity: 'error',
        summary: 'Failed!',
        detail: 'Cadastro não realizado!'
      }
    ];

    this.message2 = [
      {
        severity: 'success',
        summary: 'Success!',
        detail: 'Cadastro feito com sucesso!'
      }
    ];
  }
  cadastrarCategoria() {
    if (this.descricaoCategoria) {
      const novaCategoria: CategoriaPOST = { descricao: this.descricaoCategoria };
      this.categoriasService.inputCategoria(novaCategoria).subscribe(
        response => {
          console.log('Nova categoria cadastrada com sucesso!');
          this.isRegisterFailed = false;
          this.isRegisterSuccess = true;
          // Limpar o input após o cadastro
          this.descricaoCategoria = '';
        },
        error => {
          this.isRegisterFailed = true;
          this.isRegisterSuccess = false;
          console.error('Erro ao cadastrar categoria:', error);
        }
      );
    }
  }

}
