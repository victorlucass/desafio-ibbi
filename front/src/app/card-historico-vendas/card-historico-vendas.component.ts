import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
DashboardService

@Component({
  selector: 'app-card-historico-vendas',
  templateUrl: './card-historico-vendas.component.html',
  styleUrls: ['./card-historico-vendas.component.css']
})
export class CardHistoricoVendasComponent {
  public historico:any = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getHistoricoVendas();

  }

  getHistoricoVendas() {
    this.dashboardService.getHistoricoVendas().subscribe(
      (data: any) => {
        this.historico = data.historico;
      },
      (error) => {
        console.log('Ocorreu um erro:', error);
      }
    );
  }
}
