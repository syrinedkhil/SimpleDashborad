import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produit/produit.model';
import { SuiviProduction } from '../../models/suiviProduction/suivi-production.model';
const baseUrl = 'http://localhost:8087/api/suiviProduction';
@Injectable({
  providedIn: 'root'
})
export class SuiviProdService {

  constructor(private http: HttpClient) { }
 
  getAllSuivi(): Observable<SuiviProduction[]> {
    return this.http.get<SuiviProduction[]>(`${baseUrl}/get-all-suivi`);
  }
  getLecturesByDay(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/lectures-par-jour`);
  }

  // Appel GET pour récupérer les lectures par mois depuis l'API Spring Boot
  getLecturesByMonth(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/lecture-par-mois`);
  }
  
}
