import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ClientComponent } from './components/client/client.component';
import { ordreFabricationComponent } from './components/ordre-fabrication/ordre-fabrication.component';
import { ProduitComponent } from './components/produit/produit.component';

import { SuiviProductionComponent } from './components/suivi-production/suivi-production.component';
import { TagsComponent } from './components/tags/tags.component';
import { TableauBoardComponent } from './components/tableau-board/tableau-board.component';
import { SignupComponent } from './components/signup/signup.component';
import { OrdreComponent } from './components/ordre/ordre.component';
import { SuiviJourComponent } from './components/suivi-jour/suivi-jour.component';

export const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" }, // Redirect to login page
    { path: "login", component: LoginComponent }, // Define login page route
    { path: "signup", component: SignupComponent }, // Add signin page route
    { path: "client", component: ClientComponent },
    { path: "tags", component: TagsComponent },
    { path: "suivi du jour", component: SuiviJourComponent },
    { path: "Produit", component: ProduitComponent },
    { path: "Ordre", component: OrdreComponent },
    { path: "Ordre de fabrication", component: ordreFabricationComponent },
    { path: "Suivi Production", component: SuiviProductionComponent },
    { path: "Tableau de Board", component: TableauBoardComponent },
];
