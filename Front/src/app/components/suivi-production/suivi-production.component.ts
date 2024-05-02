import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core-service.service';
import { OrdreFabricationService } from '../../services/Orders/ordre-fabrication.service';
import { ClientService } from '../../services/client/client.service';
import { ProduitService } from '../../services/produit/produit.service';
import { SuiviProdService } from '../../services/suiviProd/suivi-prod.service';
import { Produit } from '../../models/produit/produit.model';

@Component({
  selector: 'app-suivi-production',
 
  templateUrl: './suivi-production.component.html',
  styleUrl: './suivi-production.component.css',
})
export class SuiviProductionComponent implements OnInit {
  produit:Produit=new Produit();
  displayedColumns: string[] = [
    'suiviProdId',
    'dateLecture',
    'idTag',
    'ordreFabricationId',
    'produit',
    
    'time',
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
    this.getSuiviProdList();
  }
  getSuiviProdList() {
    this._suiviProd.getAllSuivi().subscribe({
      next: (res) => {
        if (!res) {
          return;
        }
        
        const transformedSuiviList = res.map((suivi: any) => {
          console.log('suiviii')
          console.log(suivi)
          //const p=this.findProduitById(suivi.produit);
          console.log("produuiiiiit")
          
          return {
            suiviProdId: suivi.idSuiviProduction,
            dateLecture: suivi.dateLecture,
            idTag: suivi.tag.idTag,
            ordreFabricationId: suivi.ordreFabrication.ordreFabricationId,
            produit: suivi.produit.designation,
            user: suivi.user,
            time: suivi.time,
          };
        });
        console.log('trans')
        console.log(transformedSuiviList)
        this.dataSource = new MatTableDataSource(transformedSuiviList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
