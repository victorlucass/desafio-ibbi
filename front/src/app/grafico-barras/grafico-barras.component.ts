import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit {
  public grafico: any;
  public options: any;
  public maisVendidosData: any[] = [];
  public maisVendidosLabels: any[] = [];

  constructor(public dashboardService: DashboardService) { }

  async ngOnInit(): Promise<void> {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const maisVendidos = await this.dashboardService.getMaisVendidos().toPromise();
    this.maisVendidosData = maisVendidos.mais_vendidos;

    this.maisVendidosData.sort((a, b) => b.quantidade - a.quantidade);

    this.grafico = {
      labels: this.maisVendidosData.map((item: any) => item.descricao),
      datasets: [
        {
          label: 'Os produtos mais vendidos',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.maisVendidosData.map((item: any) => item.quantidade)
        },
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

}
