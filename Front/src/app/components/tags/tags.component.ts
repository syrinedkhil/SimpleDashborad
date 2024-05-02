import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TagsService } from '../../services/tag/tags.service';
import { CoreService } from '../../core/core-service.service';
import { TagsFormComponent } from './tags-form/tags-form.component';
import { AuthService } from '../../services/authentification/auth.service';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-tags',

  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  displayedColumns: string[] = [
    'idTag',
    'ordreFabricationId',
    'operateur',
    'action',

  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _tagService: TagsService,
    private _coreService: CoreService,
     private authService : AuthService

  ) {}

  ngOnInit(): void {
    this.getTagList();
  }

  openAddEditTagForm() {
    const dialogRef = this._dialog.open(TagsFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTagList();

        }
      },
    });
  }

  getTagList() {
    this._tagService.getAllTags().subscribe({
      next: (res) => {
        if (!res) {
          return;
        }
        const transformedTags = res.map((tag: any) => {
          return {
            idTag: tag.idTag,
            operateur: tag.operateur,
            ordreFabricationId: tag.orderFabrication?.ordreFabricationId // Assurez-vous que ordreFabricationId est correctement défini
          };
        });
        this.dataSource = new MatTableDataSource(transformedTags);
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

  deleteTag(id: number) {
    const dialogRef = this._dialog.open(DeleteConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirmation',
        message: 'La suppression de ce tag implique la suppression de tous les suivi de ce tag, Êtes-vous sûr de vouloir supprimer cet élément ?'
      }    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._tagService.deleteTag(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('tag deleted!', 'done');
            this.getTagList();
          },
          error: console.log,
        });
      }
    });
    
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(TagsFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getTagList();
        }
      },
    });
  }
  hasRole(role: string): boolean {
    const userRole = this.authService.getUserRole();
   return userRole === role;
 }

}
