import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CoreService } from '../../../core/core-service.service';
import { TagsService } from '../../../services/tag/tags.service';
import { TagsComponent } from '../tags.component';
import { OrdreFabrication } from '../../../models/ordreFabrication/ordre-fabrication.model';
import { OrdreFabricationService } from '../../../services/Orders/ordre-fabrication.service';
import { FieldRequiredDialogService } from '../../../services/requiredField/field-required-dialog.service';
@Component({
  selector: 'app-tags-form',
  
  templateUrl: './tags-form.component.html',
  styleUrl: './tags-form.component.css'
})
export class TagsFormComponent implements OnInit{
  TagForm: FormGroup;
  ListOrdreFabrication: OrdreFabrication[] = [];
  constructor(
    private _fb: FormBuilder,
    private _tagService: TagsService,
    private _orderFabricationService: OrdreFabricationService,
    private fieldRequiredDialogService: FieldRequiredDialogService,
    private _dialogRef: MatDialogRef<TagsComponent>,
    private _dialog: MatDialog,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.TagForm = this._fb.group({
      orderFabrication: this._fb.group({
        ordreFabricationId: [''],
      }),
      idTag:[],
      operateur:['', Validators.required],
      ordreFabricationId:['', Validators.required]

    });
  }

  ngOnInit(): void {
    this.TagForm.patchValue(this.data);
     console.log('daaaaaaaataaaaaaaaa')
    console.log(this.data)
    this.loadOrdreFabrication();
    
    
  }

  loadOrdreFabrication() {
    this._orderFabricationService.getAllOrdreFabrications().subscribe((orders: any[]) => {
      this.ListOrdreFabrication = orders;
    });
  }
  findOrdreById(id: any): string {
    const ordre = this.ListOrdreFabrication.find((ordre) => ordre.ordreFabricationId === id);
    return ordre ? ordre.ordreFabricationId : undefined;
  }
  onFormSubmit() {
    if (this.TagForm.valid) {
      console.log('valuue')
     console.log(this.TagForm.value)
      const idOrdre=this.findOrdreById(this.TagForm.value.ordreFabricationId);
      const TagData = {
        ...this.TagForm.value, // Spread remaining fields
        orderFabrication: { ordreFabricationId: idOrdre },
        
      };
      console.log(TagData)
      if (this.data) {
        this._tagService
          .updateTag(this.data.idTag, TagData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Tag detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._tagService.createTag(TagData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Tag added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
           this._coreService.openSnackBar(' erreur ');
          },
        });
      }
    }else {
      // Afficher le popup si le formulaire est invalide
      this.fieldRequiredDialogService.openDialog();
    }
  }

}