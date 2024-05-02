
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-field-required-dialog-component',
  templateUrl: './field-required-dialog-component.component.html',
  styleUrl: './field-required-dialog-component.component.css'
})
export class FieldRequiredDialogComponent {
  constructor(public dialogRef: MatDialogRef<FieldRequiredDialogComponent>) {}
}
