// import { Component, Inject, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// import {
//   MatDialogRef,
//   MatDialog,
//   MAT_DIALOG_DATA,
// } from '@angular/material/dialog';
// import { CoreService } from '../../../core/core-service.service';
// import { TagsService } from '../../../services/tag/tags.service';
// import { TagsComponent } from '../../tags/tags.component';
// import { OrdreFabricationService } from '../../../services/Orders/ordre-fabrication.service';
// import { ordreFabricationComponent } from '../ordre-fabrication.component';
// import { ProduitService } from '../../../services/produit/produit.service';
// import { ClientService } from '../../../services/client/client.service';
// import { Produit } from '../../../models/produit/produit.model';
// import { Client } from '../../../models/client/client.model';
// import { listeners } from 'process';
// import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';

// @Component({
//   selector: 'app-ordre-form',
//   templateUrl: './ordre-form.component.html',
//   styleUrl: './ordre-form.component.css',
// })
// export class OrdreFormComponent implements OnInit {
//   ordreFabricationForm: FormGroup;
//   ListProduit: Produit[] = [];
//   ListClient: Client[] = [];
//   constructor(
//     private _fb: FormBuilder,
//     private _ordreFabricationService: OrdreFabricationService,
//     private _dialogRef: MatDialogRef<ordreFabricationComponent>,
//     private _dialog: MatDialog,
//     private _coreService: CoreService,
//     private _produitService: ProduitService,
//     private _clientService: ClientService,
//     private fieldRequiredDialogService: FieldRequiredDialogService,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.ordreFabricationForm = this._fb.group({
//       produit: this._fb.group({
//         produitId: [''],
//         designation: [''],
//         // other product fields
//       }),
//       client: this._fb.group({
//         clientId: [''],
//         name: [''],
//         // other product fields
//       }),
//       ordreFabricationId: "",
//       dateCreation: ['', Validators.required],
//       dateDebutLancement: ['', Validators.required],

//       qteProduite: ['', Validators.required],
//       dateFinLancement:['', Validators.required],
//       designation:['', Validators.required],
//       qteDemander:['', Validators.required],
//       name:['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.ordreFabricationForm.patchValue(this.data);
//     console.log(this.data)
//     this.loadProducts();
//     this.loadClients();
//   }

//   loadProducts() {
//     this._produitService.getAllProduits().subscribe((produits: any[]) => {
//       this.ListProduit = produits;
//     });
//   }

//   loadClients() {
//     this._clientService.getAllClients().subscribe((clients: any[]) => {
//       this.ListClient = clients;
//     });
//   }
//   findProductIdByDesignation(designation: string): string {
//     const produit = this.ListProduit.find(
//       (produit) => produit.designation === designation
//     );
//     return produit ? produit.produitId : undefined;
//   }
//   findClientIdByNameClient(name: string): string {
//     const client = this.ListClient.find((client) => client.name === name);
//     return client ? client.clientId : undefined;
//   }
//   onFormSubmit() {
//     if (this.ordreFabricationForm.valid) {
//       const idProduit = this.findProductIdByDesignation(
//         this.ordreFabricationForm.value.designation
//       );
//       const idClient = this.findClientIdByNameClient(
//         this.ordreFabricationForm.value.name
//       );
//       const ordreFabricationData = {
//         ...this.ordreFabricationForm.value, // Spread remaining fields
//         produit: { produitId: idProduit },
//         client: { clientId: idClient },

//       };

//       if (this.data) {

//         this._ordreFabricationService
//           .updateOrdreFabrication(this.data.ordreFabricationId, ordreFabricationData)
//           .subscribe({
//             next: (val: any) => {
//               this._coreService.openSnackBar(
//                 'ordreFabrication detail updated!'
//               );
//               this._dialogRef.close(true);
//             },
//             error: (err: any) => {
//               console.error(err);
//             },
//           });
//       } else {
//         this._ordreFabricationService
//           .createOrdreFabrication(ordreFabricationData)
//           .subscribe({
//             next: (val: any) => {
//               this._coreService.openSnackBar(
//                 'ordreFabrication added successfully'
//               );
//               this._dialogRef.close(true);
//             },
//             error: (err: any) => {
//               this._coreService.openSnackBar(' erreur ');
//             },
//           });

//       }
//     }else {
//         this.fieldRequiredDialogService.openDialog();
//       }
//     }
//   }

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CoreService } from '../../../core/core-service.service';
import { TagsService } from '../../../services/tag/tags.service';
import { TagsComponent } from '../../tags/tags.component';
import { OrdreFabricationService } from '../../../services/Orders/ordre-fabrication.service';
import { ordreFabricationComponent } from '../ordre-fabrication.component';
import { ProduitService } from '../../../services/produit/produit.service';
import { ClientService } from '../../../services/client/client.service';
import { Produit } from '../../../models/produit/produit.model';
import { Client } from '../../../models/client/client.model';
import { listeners } from 'process';
import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';

@Component({
  selector: 'app-ordre-form',
  templateUrl: './ordre-form.component.html',
  styleUrl: './ordre-form.component.css',
})
export class OrdreFormComponent implements OnInit {
  ordreFabricationForm: FormGroup;
  selectedDesignation: string = '';
  ListProduit: Produit[] = [];
  ListClient: Client[] = [];
  constructor(
    private _fb: FormBuilder,
    private _ordreFabricationService: OrdreFabricationService,
    private _dialogRef: MatDialogRef<ordreFabricationComponent>,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _produitService: ProduitService,
    private _clientService: ClientService,
    private fieldRequiredDialogService: FieldRequiredDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ordreFabricationForm = this._fb.group({
      produit: this._fb.group({
        produitId: [''],
        designation: [''],
        // other product fields
      }),
      client: this._fb.group({
        clientId: [''],
        name: [''],
        // other product fields
      }),
      ordreFabricationId: '',
      dateCreation: ['', Validators.required],
      dateDebutLancement: ['', Validators.required],
      observation: ['', Validators.required],
      qteProduite: ['', Validators.required],
      dateFinLancement: ['', Validators.required],
      designation: ['', Validators.required],
      qteDemander: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ordreFabricationForm.patchValue(this.data);
    this.loadClients();
    this.loadProducts();

    const qteValidator = [Validators.required, this.quantityRangeValidator()];
    this.ordreFabricationForm.get('qteDemander')?.setValidators(qteValidator);
    this.ordreFabricationForm.get('qteProduite')?.setValidators(qteValidator);
  }
  loadProducts() {
    this._produitService.getAllProduits().subscribe((produits: any[]) => {
      this.ListProduit = produits;
      console.log(this.ListProduit);
    });
  }
  // Fonction de validation personnalisée pour vérifier si la valeur est comprise entre 1 et 2000
  quantityRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value !== null && (isNaN(value) || value < 1 || value > 2000)) {
        return { quantityRange: true };
      }
      return null;
    };
  }

  findProductIdByDesignation(designation: string): string {
    const produit = this.ListProduit.find(
      (produit) => produit.produitId === designation
    );
    return produit ? produit.produitId : undefined;
  }
  findDesignation(id: any): any {
    const produit = this.ListProduit.find(
      (produit) => produit.produitId === id
    );
    return produit ? produit.designation : undefined;
  }
  loadClients() {
    this._clientService.getAllClients().subscribe((clients: any[]) => {
      this.ListClient = clients;
    });
  }
  onDecalageSelectionChange(event: any) {
    this.selectedDesignation = event.value;
  }
  findClientIdByNameClient(name: string): string {
    const client = this.ListClient.find((client) => client.name === name);
    return client ? client.clientId : undefined;
  }
  onFormSubmit() {
    if (this.ordreFabricationForm.valid) {
      const idProduit = this.findProductIdByDesignation(
        this.ordreFabricationForm.value.designation
      );
      const idClient = this.findClientIdByNameClient(
        this.ordreFabricationForm.value.name
      );
      const ordreFabricationData = {
        ...this.ordreFabricationForm.value, // Spread remaining fields
        produit: { produitId: idProduit },
        client: { clientId: idClient },
      };
      if (this.data) {
        this._ordreFabricationService
          .updateOrdreFabrication(
            this.data.ordreFabricationId,
            ordreFabricationData
          )
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'ordreFabrication detail updated!'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._ordreFabricationService
          .createOrdreFabrication(ordreFabricationData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar(
                'ordreFabrication added successfully'
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
