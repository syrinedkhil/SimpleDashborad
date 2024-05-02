import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm',

  templateUrl: './delete-confirm.component.html',
  styleUrl: './delete-confirm.component.css'
})
export class DeleteConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  get title(): string {
    return this.data.title || 'Confirmation';
  }

  get message(): string {
    return this.data.message || 'Êtes-vous sûr de vouloir continuer ?';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ConfirmDialogData {
  title?: string;
  message?: string;
}