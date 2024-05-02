import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core-service.service';
import { OrdreService } from '../../services/Ordre/ordre.service';
import { AuthService } from '../../services/authentification/auth.service';
import { ClientService } from '../../services/client/client.service';
import { ProduitService } from '../../services/produit/produit.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { OrdreFormulaireComponent } from './ordre-formulaire/ordre-formulaire.component';
@Component({
  selector: 'app-ordre',

  templateUrl: './ordre.component.html',
  styleUrl: './ordre.component.css',
})
export class OrdreComponent implements OnInit {
  displayedColumns: string[] = [
    'ordreId',
    'dateDebutReel',
    'dateFinReel',
    'etat',
    'ordreFabricationId',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _ordreService: OrdreService,
    private _coreService: CoreService,

    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getordreList();
  }

  openAddEditordreForm() {
    const dialogRef = this._dialog.open(OrdreFormulaireComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        }
      },
    });
  }

  getordreList() {
    this._ordreService.getAllOrdres().subscribe({
      next: (res) => {
        if (!res) {
          return;
        }

        const transformedOrders = res.map((order: any) => {
          console.log('gggg')
          console.log(order)
          return {
            ordreId: order.idOrdre,
            dateDebutReel: order.dateDebutReel,
            dateFinReel: order.dateFinReel,
            ordreFabricationId:order.ordreFabrication.ordreFabricationId,
            etat: order.etat,
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

  deleteordre(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message:
          'La suppression de cet ordre implique la suppression de tous les Ordres de fabrication de cet ordre ,Êtes-vous sûr de vouloir supprimer cet élément ?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._ordreService.deleteOrdre(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Ordre deleted!', 'done');
            this.getordreList();
          },
          error: console.log,
        });
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(OrdreFormulaireComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getordreList();
        }
      },
    });
  }
  hasRole(role: string): boolean {
    const userRole = this.authService.getUserRole();
    return userRole === role;
  }
}
