import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core-service.service';
import { OrdreFabricationService } from '../../services/Orders/ordre-fabrication.service';
import { OrdreFormComponent } from './ordre-form/ordre-form.component';
import { ProduitService } from '../../services/produit/produit.service';
import { ClientService } from '../../services/client/client.service';
import { OrdreFabrication } from '../../models/ordreFabrication/ordre-fabrication.model';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AuthService } from '../../services/authentification/auth.service';
import { StatComponent } from './stat/stat.component';
@Component({
  selector: 'app-ordre-fabrication',
  templateUrl: './ordre-fabrication.component.html',
  styleUrl: './ordre-fabrication.component.css',
})
export class ordreFabricationComponent implements OnInit {
  displayedColumns: string[] = [
    'ordreFabricationId',
    'dateCreation',
    'dateDebutLancement',
    'dateFinLancement',
    'Produit',
    'qteProduite',
    'qteDemander',
    'Client',
    'observation',
    'Statistiques',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _ordreFabricationService: OrdreFabricationService,
    private _coreService: CoreService,
    private _produitService: ProduitService,
    private _clientService: ClientService ,
    private authService : AuthService

  ) {}

  ngOnInit(): void {
    this.getordreFabricationList();
  }

  openAddEditordreFabricationForm() {
    const dialogRef = this._dialog.open(OrdreFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }
  openStat(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      id: id // Passer l'identifiant à votre composant StatComponent
    };
  
    const dialogRef = this._dialog.open(StatComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Logique à exécuter après la fermeture du dialogue, si nécessaire
        }
      },
    });
  }
  getordreFabricationList() {
    this._ordreFabricationService.getAllOrdreFabrications().subscribe({
      next: (res) => {
        if (!res) {
          return;
        }

        const transformedOrders = res.map((order: any) => {
          return {
            ordreFabricationId: order.ordreFabricationId,
            dateCreation: order.dateCreation,
            dateDebutLancement: order.dateDebutLancement,
            dateFinLancement: order.dateFinLancement,
            observation:order.observation,
            produit: order.produit?.designation,
            designation: order.dateDebutLancement,
            qteProduite: order.qteProduite,
            client: order.client?.name,
            qteDemander: order.qteDemander,
          };
        });
        this.dataSource = new MatTableDataSource(transformedOrders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteordreFabrication(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'La suppression de cet ordre implique la suppression de tous les Tags de cet ordre ,Êtes-vous sûr de vouloir supprimer cet élément ?'
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ordreFabricationService.deleteOrdreFabrication(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Ordre deleted!', 'done');
            this.getordreFabricationList();
          },
          error: console.log,
        });
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(OrdreFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getordreFabricationList();
        }
      },
    });
  }
  hasRole(role: string): boolean {
    const userRole = this.authService.getUserRole();
   return userRole === role;
 }
}
