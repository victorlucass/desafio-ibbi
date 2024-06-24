// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { Router, RoutesRecognized } from '@angular/router'; // Importando Router e RoutesRecognized
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosEditarComponent } from './usuarios-editar/usuarios-editar.component';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutosEditarComponent } from './produtos-editar/produtos-editar.component';
import { ListaVendasComponent } from './lista-vendas/lista-vendas.component';
import { VendasEditarComponent } from './vendas-editar/vendas-editar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'cadastro', component: CadastroComponent },
      { path: 'home', component: HomeComponent },
      { path: 'cadastro-categoria', component: CadastroCategoriaComponent },
      { path: 'cadastro-produto', component: CadastroProdutoComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios-editar/:id', component: UsuariosEditarComponent }, // Definindo o parâmetro :id
      { path: 'lista-produtos', component: ListaProdutosComponent },
      { path: 'produtos-editar/:id', component: ProdutosEditarComponent },
      { path: 'lista-vendas', component: ListaVendasComponent },
      { path: 'vendas-editar/:id', component: VendasEditarComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof RoutesRecognized) {
        if (event.url === '/') {
          router.navigateByUrl('/login');
        }
      }
    });
  }
}
