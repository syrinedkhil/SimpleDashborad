import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { TagsFormComponent } from './components/tags/tags-form/tags-form.component';
import { TagsComponent } from './components/tags/tags.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { ClientComponent } from './components/client/client.component';
import { ProduitComponent } from './components/produit/produit.component';
import { ProduitFormComponent } from './components/produit/produit-form/produit-form.component';
import { ordreFabricationComponent } from './components/ordre-fabrication/ordre-fabrication.component';
import { OrdreFormComponent } from './components/ordre-fabrication/ordre-form/ordre-form.component';
import { FieldRequiredDialogComponent } from './components/field-required-dialog-component/field-required-dialog-component.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { RouterModule } from '@angular/router';
import { TableauBoardComponent } from './components/tableau-board/tableau-board.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {MatGridListModule} from '@angular/material/grid-list';
import { SuiviProductionComponent } from './components/suivi-production/suivi-production.component';
import { MatCardModule } from '@angular/material/card';
import { OrdreComponent } from './components/ordre/ordre.component';
import { OrdreFormulaireComponent } from './components/ordre/ordre-formulaire/ordre-formulaire.component';
import { StatComponent } from './components/ordre-fabrication/stat/stat.component';
import { SuiviJourComponent } from './components/suivi-jour/suivi-jour.component';


@NgModule({
  declarations: [
    TagsFormComponent,
    TagsComponent,
    ClientComponent,
    ClientFormComponent,
    ProduitComponent,
    ProduitFormComponent,
    ordreFabricationComponent,
     OrdreFormComponent,
     FieldRequiredDialogComponent,
     DeleteConfirmComponent,
     TableauBoardComponent,
     SuiviProductionComponent,
     OrdreComponent,
     OrdreFormulaireComponent,
     StatComponent,
     SuiviJourComponent
  ],
  imports: [
    CommonModule ,
    HttpClientModule,
    DatePipe,
    CanvasJSAngularChartsModule,
    FormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSortModule,
    
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
