import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  items: MenuItem[] | undefined;
  ngOnInit(): void {
      this.items = [
        {
          label: 'Início',
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home']
        },
        {
          label: 'Dashboard',
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: ['/dashboard']
        },
        {
          label: 'Usuários',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'Cadastrar Usuário',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/cadastro-usuario']
            },
            {
              label: 'Listar Usuários',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/usuarios']
            }
          ]
        },  
        {
          label: 'Categorias',
          icon: 'pi pi-fw pi-plus',
          items: [
            {
              label: 'Cadastrar Categorias',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/cadastro-categoria']
            }
          ]
        },
        
        {
          label: 'Produtos',
          icon: 'pi pi-fw pi-list',
          items: [
            {
              label: 'Cadastrar Produtos',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/cadastro-produto']
            },{
              label: 'Listar Produtos',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/lista-produtos']
            }
          ]
        },
        {
          label: 'Vendas',
          icon: 'pi pi-fw pi-list',
          routerLink: ['/lista-vendas']
        },
        {
          separator: true
        },
        {
          label: 'Sair',
          icon: 'pi pi-fw pi-power-off',
          routerLink: ['/login']
      }

      ]
  }
  constructor(private router: Router) { }

}
