import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../core/core-service.service';
import { Client } from '../../../models/client/client.model';
import { Produit } from '../../../models/produit/produit.model';
import { ClientService } from '../../../services/client/client.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';
import { OrdreFabrication } from '../../../models/ordreFabrication/ordre-fabrication.model';
import { OrdreService } from '../../../services/Ordre/ordre.service';
import { OrdreComponent } from '../ordre.component';
import { OrdreFabricationService } from '../../../services/Orders/ordre-fabrication.service';

@Component({
  selector: 'app-ordre-formulaire',
  templateUrl: './ordre-formulaire.component.html',
  styleUrl: './ordre-formulaire.component.css'
})
export class OrdreFormulaireComponent implements OnInit {
  ordreForm: FormGroup;
  selectedOf: string = '';
  ListOrdreFabrication: OrdreFabrication[] = [];
  selectedetat: string = '';
  Listetat=["Refusé","Accepter"];
  constructor(
    private _fb: FormBuilder,
    private _ordreService: OrdreService,
    private _ordreFabricationService:OrdreFabricationService,
    private _dialogRef: MatDialogRef<OrdreComponent>,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private fieldRequiredDialogService: FieldRequiredDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordreForm = this._fb.group({
      ordreFabrication: this._fb.group({
        ordreFabricationId: [''],
        
      }),
      ordreFabricationId:[''],
      ordreId: '',
      dateDebutReel: ['', Validators.required],
      dateFinReel: ['', Validators.required],
      etat: ['', Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.ordreForm.patchValue(this.data);
    this.loadOrdreFabrication();
  }
 
  onetatSelectionChange(event: any) {
    this.selectedetat = event.value;
    
  }
  onCodeSelectionChange(event: any) {
    this.selectedOf = event.value;
  }
  findOrderFabricationById(id: string): any {
    const Of = this.ListOrdreFabrication.find(
      (of) => of.ordreFabricationId === id
    );
    return Of ? Of.ordreFabricationId : undefined;}

  loadOrdreFabrication() {
    this._ordreFabricationService.getAllOrdreFabrications().subscribe((ordersFab: any[]) => {
      this.ListOrdreFabrication = ordersFab;
    });
  }
  onFormSubmit() {
    if (this.ordreForm.valid) {
      const ofID=this.findOrderFabricationById(this.selectedOf)
      const ordreData = {
        ...this.ordreForm.value, 
        ordreFabrication: { ordreFabricationId: ofID },
       
      };
      console.log(ordreData)
      if (this.data) {
        this._ordreService
          .updateOrdre(
            this.data.ordreId,
            ordreData
          )
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'ordre detail updated!'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        
        this._ordreService
          .createOrdre(ordreData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'ordre added successfully'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              this._coreService.openSnackBar(' erreur ');
            },
          });
      }
    } else {
      this.fieldRequiredDialogService.openDialog();
    }
  }
}
