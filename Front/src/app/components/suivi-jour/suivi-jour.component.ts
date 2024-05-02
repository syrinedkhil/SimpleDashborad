import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit/produit.service';
import { SuiviProdService } from '../../services/suiviProd/suivi-prod.service';
import { TagsService } from '../../services/tag/tags.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrdreFabricationService } from '../../services/Orders/ordre-fabrication.service';


@Component({
  selector: 'app-suivi-jour',
  templateUrl: './suivi-jour.component.html',
  styleUrls: ['./suivi-jour.component.css']
})
export class SuiviJourComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); // Use appropriate type if available
  displayedColumns: string[] = [
    'ordreFabricationId',
    'dateCreation',
    'dateDebutLancement',
    'produit',
    'qteProduite',
    'qteDemander',
    'client',
    'dateFinLancement',
    'observation',
    
  ];

  constructor(
    private ordreFabService: OrdreFabricationService
    ) { }

  ngOnInit(): void {
    this.fetchDailyTracking();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchDailyTracking(): void {
    this.ordreFabService.getDailySuivi().subscribe(
      (data: any[]) => {
        console.log(data)
        const formattedData = data.map(track => {
          console.log('track')
          console.log(track)
         const content=track
          return {
            ordreFabricationId: content.ordreFabricationId,
            dateCreation: content.dateCreation,
            dateDebutLancement: content.dateDebutLancement,
            produit: content.produit.designation, // Assuming 'designation' is the property you want to display for the product
            qteProduite: content.qteProduite,
            qteDemander: content.qteDemander,
            client: content.client ? content.client.name : 'Unknown', // Assuming 'name' is the property for client's name
            dateFinLancement: content.dateFinLancement,
            observation: content.observation
          };
        });
        this.dataSource.data = formattedData;
        console.log(this.dataSource.data);
      },
      error => {
        console.error('Une erreur s\'est produite lors de la récupération du suivi quotidien : ', error);
      }
    );
  }

  // Other methods for editing, deleting, etc.

}