import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from '../../core/core-service.service';
import { OrdreFabricationService } from '../../services/Orders/ordre-fabrication.service';
import { ClientService } from '../../services/client/client.service';
import { ProduitService } from '../../services/produit/produit.service';
import { SuiviProdService } from '../../services/suiviProd/suivi-prod.service';
import Chart from 'chart.js/auto';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  value?: number;
}
@Component({
  selector: 'app-tableu-board',
  templateUrl: './tableau-board.component.html',
  styleUrl: './tableau-board.component.css',
})
export class TableauBoardComponent implements OnInit {
  public chart: any;
  public secondChart: any;

  Content: Tile[] = [
    {
      text: 'Nombre de lecture du jour',
      cols: 1,
      rows: 2,
      color: '#F0EBE3',
      value: 0,
    },
    {
      text: 'Ordre de fabrication en cours',
      cols: 1,
      rows: 2,
      color: '#F0EBE3',
      value: 0,
    },
    {
      text: 'Ordre de fabrication Terminé',
      cols: 1,
      rows: 2,
      color: '#F0EBE3',
      value: 0,
    },
    {
      text: 'Ordre de fabrication en retard',
      cols: 1,
      rows: 2,
      color: '#F0EBE3',
      value: 0,
    },
  ];

 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _ordreFabricationService: OrdreFabricationService,
    private _coreService: CoreService,
    private _produitService: ProduitService,
    private _clientService: ClientService,

    private _suiviProd: SuiviProdService
  ) {}

  ngOnInit(): void {
    this.LoadLectureByDay();
    this.LoadLectureByMonth();
    this.LoadOrderEnRetard();
    this.LoadOrderTermine();
    this.LoardOrderEnCours();
    this.getListOfOrderEnCours();
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ];
    return months[monthNumber - 1];
  }

  LoadLectureByMonth() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
        ],
        datasets: [
          {
            label: "Suivi de production de l'année",
            data: [],
            backgroundColor: [] // Initialiser avec un tableau vide
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  
    this._suiviProd.getLecturesByMonth().subscribe(
      (data: number[][]) => {
        const monthsData = data.map((month) => ({
          label: this.getMonthName(month[0]),
          y: month[1],
        }));
  
        const backgroundColors = monthsData.map((month, index) => this.generateBackgroundColor(index));
        this.chart.data.datasets[0].backgroundColor = backgroundColors;
  
        monthsData.forEach((month) => {
          const index = this.chart.data.labels.indexOf(month.label);
          if (index !== -1) {
            this.chart.data.datasets[0].data[index] = month.y;
          }
        });
  
        this.chart.update();
      },
      (error) => {
        console.error('Erreur lors de la récupération des lectures par mois:', error);
      }
    );
  }
  LoadLectureByDay() {
    this._suiviProd.getLecturesByDay().subscribe(
      (count: any) => {
        this.Content[0].value = count;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des ordres terminés:',
          error
        );
      }
    );
  }

  
  
  LoadOrderEnRetard() {
    this._ordreFabricationService.getOrdresEnRetard().subscribe(
      (count: number) => {
        this.Content[3].value = count;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des ordres en retard:',
          error
        );
      }
    );
  }
  LoardOrderEnCours() {
    this._ordreFabricationService.getOrdresEnCours().subscribe(
      (count: number) => {
        this.Content[1].value = count;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des ordres en cours:',
          error
        );
      }
    );
  }

  LoadOrderTermine() {
    this._ordreFabricationService.getOrdresTermines().subscribe(
      (count: number) => {
        this.Content[2].value = count;
      },
      (error) => {
        console.error(
          'Erreur lors de la récupération des ordres terminés:',
          error
        );
      }
    );
  }
  generateBackgroundColor(index: number): string {
    
    const saturation = 30; 
    const lightness = 70; 
  
   
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; 
  }
  
  getListOfOrderEnCours() {
    this.secondChart = new Chart("MySecondChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: "Pourcentage de production des OF en cours",
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  
    this._ordreFabricationService.getOrdreFabricationEncours().subscribe({
      next: (res: any[]) => {
        if (!res || res.length === 0) {
          return;
        }
        console.log(res)
  
        const labels = [];
        const data = [];
        const backgroundColors = [];
        res.forEach((of,index) => {
          labels.push(of.ordreFabricationId.toString());
          data.push((of.qteProduite / of.qteDemander) * 100);
          backgroundColors.push(this.generateBackgroundColor(index));
        });
  
        this.secondChart.data.labels = labels;
        this.secondChart.data.datasets[0].data = data;
        this.secondChart.data.datasets[0].backgroundColor = backgroundColors; // Définir les couleurs de fond

        this.secondChart.update();
        console.log(this.secondChart)
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des ordres de fabrication en cours:', error);
      }
    });
  }
  
  
}
