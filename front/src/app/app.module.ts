import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { CheckboxModule } from 'primeng/checkbox';
import { PaginatorModule } from 'primeng/paginator';
import { CardProdutoComponent } from './card-produto/card-produto.component'; // Certifique-se de ter o caminho correto aqui
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { CadastroCategoriaComponent } from './cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { DropdownModule } from 'primeng/dropdown';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TableModule } from 'primeng/table';
import { UsuariosEditarComponent } from './usuarios-editar/usuarios-editar.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutosEditarComponent } from './produtos-editar/produtos-editar.component'; //
import { CotacaoDolarService } from './cotacao-dolar.service';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ListaVendasComponent } from './lista-vendas/lista-vendas.component';
import { VendasEditarComponent } from './vendas-editar/vendas-editar.component';
import { CardHistoricoVendasComponent } from './card-historico-vendas/card-historico-vendas.component';
import { CardModule } from 'primeng/card';
import { GraficoDonutComponent } from './grafico-donut/grafico-donut.component';
import { ChartModule } from 'primeng/chart';
import { GraficoBarrasComponent } from './grafico-barras/grafico-barras.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MenubarModule } from 'primeng/menubar';
import { PanelModule } from 'primeng/panel';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    CardProdutoComponent,
    CadastroCategoriaComponent,
    CadastroProdutoComponent,
    DashboardComponent,
    UsuariosComponent,
    UsuariosEditarComponent,
    ListaProdutosComponent,
    ProdutosEditarComponent,
    ListaVendasComponent,
    VendasEditarComponent,
    CardHistoricoVendasComponent,
    GraficoDonutComponent,
    GraficoBarrasComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CheckboxModule,
    PaginatorModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    AvatarModule,
    DropdownModule,
    MultiSelectModule,
    TieredMenuModule,
    TableModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    DataViewModule,
    TagModule,
    VirtualScrollerModule,
    ConfirmPopupModule,
    ToastModule,
    CardModule,
    ChartModule,
    RadioButtonModule,
    MenubarModule,
    PanelModule,
    ImageModule
  ],
  providers: [
    CotacaoDolarService, ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
