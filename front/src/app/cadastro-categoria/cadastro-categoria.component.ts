import { Component } from '@angular/core';
import { CategoriasService, CategoriaPOST } from '../categorias.service';
import { Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css'],
  providers: [MessageService],
})
export class CadastroCategoriaComponent {
  descricaoCategoria = '';
  isDisabled = true;
  isRegisterFailed = false;
  isRegisterSuccess = false;

  constructor(
    private categoriasService: CategoriasService,
    private messageService: MessageService,
    private router: Router
  ) {}

  cadastrarCategoria() {
    const categoria: CategoriaPOST = {
      descricao: this.descricaoCategoria,
    };

    this.categoriasService.inputCategoria(categoria).subscribe(
      () => this.onRegisterSuccess(),
      () => this.onRegisterError()
    );
  }

  onRegisterSuccess() {
    this.isRegisterFailed = false;
    this.isRegisterSuccess = true;
    this.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Register successful!',
    });
    this.isDisabled = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  onRegisterError() {
    this.isRegisterFailed = true;
    this.isRegisterSuccess = false;
    this.show({
      severity: 'error',
      summary: 'Failed!',
      detail: 'Register failed!',
    });
  }

  show(message: Message) {
    this.messageService.add(message);
  }

  validarCampos() {
    this.isDisabled = !this.descricaoCategoria;
  }
}
