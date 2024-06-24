import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { UsuariosService, UserPUT } from '../usuarios.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: ['./usuarios-editar.component.css']
})
export class UsuariosEditarComponent implements OnInit {
  id?: number;
  usuario: string = '';
  senha: string = '';
  confirmacaoSenha: string = '';
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];

  constructor(
    private http: HttpClient,
    private usuariosService: UsuariosService,
    private route: ActivatedRoute,
    ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.id = Number(params.get('id'));
      }
    )
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

    this.carregarUsuario();
  }

  carregarUsuario() {
    if (this.id) {
      this.usuariosService.getUserById(this.id).subscribe(
        (response) => {
          this.usuario = response.usuario;
        }
      )
    }
  }

  cadastrarEdicao() {
    const userToEdit: UserPUT = {
      id: this.id,
      usuario: this.usuario,
      senha: this.senha
    }
    this.usuariosService.editUser(userToEdit).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso!', response);
        // Limpar os campos após o cadastro bem-sucedido (opcional)
        this.usuario = '';
        this.senha = '';
        this.confirmacaoSenha = '';
        // Desabilitar o botão de cadastro novamente
        this.cadastrarDesabilitado = true;
        // Exibir a mensagem de sucesso apenas quando a resposta for bem-sucedida
        this.isRegisterFailed = false;
        this.isRegisterSuccess = true;
      }
    )
  }

  verificarCampos() {
    this.cadastrarDesabilitado = !(this.usuario && this.senha && this.senha === this.confirmacaoSenha);
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }
}
