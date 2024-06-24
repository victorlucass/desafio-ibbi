import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styleUrls: ['./grafico-donut.component.css']
})
export class GraficoDonutComponent implements OnInit {
  public grafico: any;
  public options: any;
  public porCategoriaData: any[] = [];
  public porCategoriaLabels: any[] = [];

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.vendasPorCategorias().subscribe(() => {
      this.grafico = {
        labels: this.porCategoriaLabels.map(label => label.descricao),
        datasets: [
          {
            data: this.porCategoriaLabels.map(label => label.total),
            backgroundColor: [
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--red-500'),
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ]
          }
        ]
      };
      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        }
      };
    });
  }

  vendasPorCategorias() {
    return this.dashboardService.getVendasPorCategoria().pipe(
      map((data: any) => {
        this.porCategoriaData = data.por_categoria;
        this.obterValoresCategorias();
      })
    );
  }

  obterValoresCategorias() {
    const sortedArr = this.porCategoriaData.sort((a, b) => b.total - a.total);

    const length = sortedArr.length;

    const primeiroMaior = length > 0 ? sortedArr[0].total : 0;
    const segundoMaior = length > 1 ? sortedArr[1].total : 0;
    const terceiroMaior = length > 2 ? sortedArr[2].total : 0;

    let outrosTotal = 0;
    for (let i = 3; i < length; i++) {
      outrosTotal += sortedArr[i].total;
    }
    const novoArray = [
      { descricao: sortedArr[0].descricao, total: primeiroMaior },
      { descricao: sortedArr[1].descricao, total: segundoMaior },
      { descricao: sortedArr[2].descricao, total: terceiroMaior },
      { descricao: "Outros", total: outrosTotal }
    ];

    this.porCategoriaLabels = novoArray;
  }
}
