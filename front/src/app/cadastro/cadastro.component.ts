import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  usuario: string = '';
  senha: string = '';
  confirmacaoSenha: string = '';
  cadastrarDesabilitado: boolean = true;
  isRegisterFailed: boolean = false;
  isRegisterSuccess: boolean = false;
  message1: Message[] = [];
  message2: Message[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {}


  ngOnInit() {
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

  cadastrar() {
    // Verificar se os campos estão preenchidos e se as senhas coincidem
    if (this.usuario && this.senha && this.senha === this.confirmacaoSenha) {
      // Criar o objeto com o corpo do request
      const requestBody = {
        usuario: this.usuario,
        senha: this.senha
      };

      // Fazer a chamada POST ao endpoint
      this.http.post('http://localhost:8000/v1/usuarios/', requestBody).subscribe(
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

          // Limpar as mensagens após um cadastro bem-sucedido
          this.messageService.clear('message1');
          this.messageService.clear('message2');
        },
        (error) => {
          console.error('Erro ao cadastrar usuário.', error);
          // Exibir a mensagem de erro
          this.isRegisterFailed = true;
          this.isRegisterSuccess = false;
        }
      );
    }
  }

  // Método para habilitar ou desabilitar o botão de cadastro
  verificarCampos() {
    this.cadastrarDesabilitado = !(this.usuario && this.senha && this.senha === this.confirmacaoSenha);
    this.isRegisterFailed = false;
    this.isRegisterSuccess = false;
  }
}
