import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FieldRequiredDialogComponent } from '../../components/field-required-dialog-component/field-required-dialog-component.component';

@Injectable({
  providedIn: 'root'
})


@Injectable({
  providedIn: 'root',
})
export class FieldRequiredDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(FieldRequiredDialogComponent);
  }
}
