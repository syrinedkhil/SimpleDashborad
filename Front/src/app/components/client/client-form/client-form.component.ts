import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../core/core-service.service';

import { ClientService } from '../../../services/client/client.service';
import { ClientComponent } from '../client.component';
import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';

@Component({
  selector: 'app-client-form',
 
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent implements OnInit{
  ClientForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _clientService: ClientService,
    private _dialogRef: MatDialogRef<ClientComponent>,
    private _dialog: MatDialog,
    private fieldRequiredDialogService: FieldRequiredDialogService,

    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.ClientForm = this._fb.group({
      clientId:"",
     adresse:['', Validators.required],
     name:['', Validators.required],
    email:['', Validators.required],
    telephone:['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.ClientForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.ClientForm.valid) {
      console.log(this.ClientForm.value)
      if (this.data) {
        console.log(this.data.id);
        console.log('rrrrr')
        console.log(this.ClientForm.value)
        this._clientService
          .updateClient(this.data.clientId, this.ClientForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Client detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._clientService.createClient(this.ClientForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Client added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }else {
      // Afficher le popup si le formulaire est invalide
      this.fieldRequiredDialogService.openDialog();
    }
  }

}