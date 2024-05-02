import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../core/core-service.service';
import { OrdreFabricationService } from '../../../services/Orders/ordre-fabrication.service';
import { ClientService } from '../../../services/client/client.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { SuiviProdService } from '../../../services/suiviProd/suivi-prod.service';
import { Observable, map, catchError, of } from 'rxjs';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-stat',

  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css',
})
export class StatComponent implements OnInit {
  id: number; // Déclarer une propriété pour stocker l'identifiant passé depuis le dialogue
  public chart: any;


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _ordreFabricationService: OrdreFabricationService,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _suiviProd: SuiviProdService
  ) {}

  ngOnInit(): void {
    this.id = this.data.id;
    this.loadChartData(this.id);
  }
  getQteProduite(id: number): Observable<number> {
    return this._ordreFabricationService.getQteProduite(id).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la récupération de la quantité produite',
          error
        );
        return of(0);
      })
    );
  }

  // Fonction pour récupérer la quantité demandée
  getQteDemande(id: number): Observable<number> {
    return this._ordreFabricationService.getQteDemande(id).pipe(
      catchError((error) => {
        console.error(
          'Erreur lors de la récupération de la quantité demandée',
          error
        );
        return of(0);
      })
    );
  }
 
  loadChartData(id: number): void {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        labels: ['Quantité produite', 'Reste à produire'],
        datasets: [{
          label: 'Ordre de fabrication',
          data: [0, 0],
          backgroundColor: [
            'red',
            'blue',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  
    this.getQteProduite(id).subscribe(
      (qteP) => {
        this.getQteDemande(id).subscribe(
          (qteD) => {
            const reste = qteD - qteP;
  
            // Mettre à jour les données existantes du graphique
            this.chart.data.datasets[0].data = [qteP, reste];
  
            // Générer des couleurs pour les ensembles de données existants
            const backgroundColors = [
              this.generateBackgroundColor(0), // Couleur pour 'Quantité produite'
              this.generateBackgroundColor(1)  // Couleur pour 'Reste à produire'
            ];
  
            // Mettre à jour les couleurs de fond des ensembles de données existants
            this.chart.data.datasets[0].backgroundColor = backgroundColors;
  
            // Mettre à jour le graphique pour refléter les changements
            this.chart.update();
          },
          (error) => {
            console.error('Erreur lors de la récupération de la quantité demandée', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération de la quantité produite', error);
      }
    );
  }
  
  generateBackgroundColor(index: number): string {
    // Définir la saturation et la luminosité pour des couleurs plus calmes
    const saturation = 30; // Saturation (0-100)
    const lightness = 70; // Luminosité (0-100)
  
    // Générer une couleur en utilisant l'index de l'élément
    const hue = (index * 137.508) % 360;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`; // Utiliser HSL avec la saturation et la luminosité définies
  }
  



}
