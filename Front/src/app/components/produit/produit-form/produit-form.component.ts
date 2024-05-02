import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../core/core-service.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { ProduitComponent } from '../produit.component';
import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrl: './produit-form.component.css'
})
export class ProduitFormComponent implements OnInit{
  ProduitForm: FormGroup;
  ListDesignation=["Pull","Pantalon"];
  ListcodeConception: string[] = [];
  ListRef: string[] = [];

  selectedRef: string = '';
  selectedDesignation: string = '';
  selectedDecalage: string = '';
  selectedCode: string = '';
  ListCode=["SH62046239","SH62034231","SH62034233","SH62034235"]
  ListDecalage=["1H","2H","3H","4H","5H","6H","7H","8H","9H","10H","11H","12H","13H","14H","15H","16H","17H","18H","19H","20H","21H","22H","23H","24H"];
  constructor(
    private _fb: FormBuilder,
    private _produitService: ProduitService,
    private _dialogRef: MatDialogRef<ProduitComponent>,
    private fieldRequiredDialogService: FieldRequiredDialogService,

    private _dialog: MatDialog,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.ProduitForm = this._fb.group({
      produitId:'',
    designation:['', Validators.required],
    codeConception:['', Validators.required],
    decalageHoraire:['', Validators.required], 
    codeFournisseur:['', Validators.required],
    dateCreation:['', Validators.required],
    reference:['', Validators.required],
     
    });
  }

  ngOnInit(): void {
    this.ProduitForm.patchValue(this.data);
  }
  onDesignationSelectionChange(event: any) {
    this.selectedDesignation = event.value;
    this.setCodeConceptionList();
    this.setRefList();
  }
  onDecalageSelectionChange(event: any) {
    this.selectedDecalage = event.value;  
  }
  setRefList() {
    // Mettre à jour la liste des références en fonction de la désignation sélectionnée
    if (this.selectedDesignation === 'Pull') {
      this.ListRef = ["106"];
    } else if (this.selectedDesignation === 'Pantalon') {
      this.ListRef = ["109"];
    } else {
      this.ListRef = []; // Réinitialiser la liste si la désignation n'est pas reconnue
    }
  }
  onCodeSelectionChange(event: any) {
    this.selectedCode = event.value;  
  }
  onRefSelectionChange(event: any) {
    this.selectedRef = event.value;  
  }
  setCodeConceptionList() {
    // Mettre à jour la liste des codes de conception en fonction de la désignation sélectionnée
    if (this.selectedDesignation === 'Pull') {
      this.ListcodeConception = ["S", "M", "L", "XL", "XXL"];
    } else if (this.selectedDesignation === 'Pantalon') {
      this.ListcodeConception = ["34", "36", "38","40","42"];
    } else {
      this.ListcodeConception = []; // Réinitialiser la liste si la désignation n'est pas reconnue
    }
  }
  onFormSubmit() {
    if (this.ProduitForm.valid) {
      console.log(this.ProduitForm.value)
      console.log(this.ProduitForm.value)
      if (this.data) {
        this._produitService
          .updateProduit(this.data.produitId, this.ProduitForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Produit detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._produitService.createProduit(this.ProduitForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Produit added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this._coreService.openSnackBar('erreur');
          },
        });
      }
    }else {
      // Afficher le popup si le formulaire est invalide
      this.fieldRequiredDialogService.openDialog();
    }
  }

}