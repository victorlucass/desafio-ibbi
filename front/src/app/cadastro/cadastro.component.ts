import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

interface UserRequest {
  usuario: string;
  senha: string;
}

interface ToastProps {
  severity: string;
  summary: string;
  detail: string;
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService],
})
export class CadastroComponent implements OnInit {
  usuario: string = '';
  senha: string = '';
  confirmacaoSenha: string = '';
  isRegisterDisabled: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  titulo: string = '';
  id = this.route.snapshot.paramMap.get('id');
  usuarioNome = '';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.titulo = 'Editar Usuário';
      this.carregarUsuario();
    } else {
      this.titulo = 'Cadastrar Usuário';
    }
  }

  cadastrar() {
    if (this.isFormValid() && !this.id) {
      const requestBody: UserRequest = {
        usuario: this.usuario,
        senha: this.senha,
      };

      this.http
        .post('http://localhost:8000/v1/usuarios/', requestBody)
        .subscribe(
          () => this.onRegisterSuccess(),
          () => this.onRegisterFailure()
        );
    } else {
      this.updateUsuario();
    }
  }

  private isFormValid(): boolean {
    return (
      this.usuario.trim() !== '' &&
      this.senha.trim() !== '' &&
      this.senha === this.confirmacaoSenha
    );
  }

  private onRegisterSuccess() {
    this.isRegisterFailed = false;
    this.isRegisterSuccess = true;
    this.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Register successful!',
    });
    this.isRegisterDisabled = true;
    setTimeout(() => {
      this.router.navigate(['/usuarios']);
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

  private clearForm() {
    this.usuario = '';
    this.senha = '';
    this.confirmacaoSenha = '';
    this.isRegisterDisabled = true;
  }

  verificarCampos() {
    this.isRegisterDisabled = !this.isFormValid();
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }

  show({ severity, summary, detail }: ToastProps) {
    this.messageService.add({
      severity,
      summary,
      detail,
    });
  }

  carregarUsuario() {
    this.usuarioService.getUserById(Number(this.id)).subscribe((response) => {
      this.usuario = response.usuario;
    });
  }

  updateUsuario() {
    this.usuarioService
      .editUser({
        id: Number(this.id),
        usuario: this.usuario,
        senha: this.senha,
      })
      .subscribe(
        () => this.onRegisterSuccess(),
        () => this.onRegisterFailure()
      );
  }
}
