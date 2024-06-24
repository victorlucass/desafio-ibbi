import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { LoginService, UserLogin } from '../login.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username?: string;
  password?: string;
  isLoginButtonDisabled: boolean = true;
  isLoginFailed: boolean = false;
  isLoading: boolean = false;
  messages: Message[] = [
    {
      severity: 'error',
      summary: 'Unauthorized',
      detail: 'Usuário e/ou senha incorretos!'
    }
  ];

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.messages = [
      {
        severity: 'error',
        summary: 'Unauthorized',
        detail: 'Usuário e/ou senha incorretos!'
      }
    ];
  }

  onLoginClick() {
    // Verificar se os campos de username e password estão preenchidos
    if (this.username && this.password) {
      // Criar um objeto UserLogin para passar para o serviço
      const user: UserLogin = {
        usuario: this.username,
        senha: this.password
      };

      // Fazer a chamada para o serviço handleLogin
      this.isLoading = true;
      this.loginService.handleLogin(user).subscribe(
        (response: HttpResponse<any>) => {
          this.isLoading = false;
          if (response) {
            // Salva resposta (response) no localStorage
            localStorage.setItem('user', JSON.stringify(response));

            this.router.navigate(['/home']);
          } else {
            this.isLoginFailed = true;
          }
        },
        error => {
          this.isLoading = false;
          console.error(error);
          // Exibir mensagem de login inválido
          this.isLoginFailed = true;
        }
      );
    }
  }

  checkFields() {
    // Verificar se os campos de username e password estão preenchidos
    this.isLoginButtonDisabled = !(this.username && this.password);
  }
}
