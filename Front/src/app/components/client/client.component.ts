import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core-service.service';
import { ClientService } from '../../services/client/client.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';
import { AuthService } from '../../services/authentification/auth.service';
 @Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  displayedColumns: string[] = [
    'clientId',
    'adresse',
    'name',
    'email',
    'telephone',
    'action'

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _clientService: ClientService,
    private _coreService: CoreService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.getClientList();
    console.log("clientlist")
    console.log(this.getClientList())
  }

  openAddEditClientForm() {
    const dialogRef = this._dialog.open(ClientFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientList();
        }
      },
    });
  }

  getClientList() {
    this._clientService.getAllClients().subscribe({
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

  deleteClient(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'La suppression de ce client implique la suppression de tous les ordres de Fabrication de ce client, Êtes-vous sûr de vouloir supprimer cet élément ?'
      }    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._clientService.deleteClient(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Client deleted!', 'done');
            this.getClientList();
          },
          error: console.log,
        });
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ClientFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClientList();

        }
      },
    });
  }
  hasRole(role: string): boolean {
     const userRole = this.authService.getUserRole();
    return userRole === role;
  }
}
