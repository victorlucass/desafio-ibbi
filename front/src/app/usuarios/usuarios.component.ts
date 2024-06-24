// usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuariosService, User } from '../usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuariosService.getUser().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  editarUsuario(id: number): void {
    // Implemente a lógica para editar o usuário pelo ID
    console.log(`Editar usuário com ID: ${id}`);
  }

  navegaEditarUsuario(id: number): void {
    this.router.navigate(['/usuarios-editar', id]);
  }

  deletarUsuario(id: number): void {
    this.usuariosService.deleteUser(id).subscribe((data) => {
      this.carregarUsuarios();
    });
  }
}
