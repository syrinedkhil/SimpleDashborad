import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProduitService } from '../../services/produit/produit.service';
import { CoreService } from '../../core/core-service.service';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AuthService } from '../../services/authentification/auth.service';


@Component({
  selector: 'app-produit-form',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit{
  displayedColumns: string[] = [
    'produitId',
    'designation',
    'codeConception',
    'decalageHoraire',
    'codeFournisseur',
    'dateCreation',
    'reference',
    'action'

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _produitService: ProduitService,
    private _coreService: CoreService,
    private authService : AuthService


  ) {}

  ngOnInit(): void {
    this.getProduitList();
  }

  openAddEditProduitForm() {
    const dialogRef = this._dialog.open(ProduitFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProduitList();
        }
      },
    });
  }

  getProduitList() {
    this._produitService.getAllProduits().subscribe({
      next: (res) => {
        if (!res) {
          return;
        }
        this.dataSource = new MatTableDataSource(res);
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

  deleteProduit(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message:       'La suppression de ce produit implique la suppression de tous les ordres de Fabrication de ce produit,Êtes-vous sûr de vouloir supprimer cet élément ?'

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._produitService.deleteProduit(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('tag deleted!', 'done');
            this.getProduitList();
          },
          error: console.log,
        });
      }
    });



    this._produitService.deleteProduit(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('tag deleted!', 'done');
        this.getProduitList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ProduitFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProduitList();
        }
      },
    });
  }
  hasRole(role: string): boolean {
    const userRole = this.authService.getUserRole();
   return userRole === role;
 }
}
