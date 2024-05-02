import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdreFabrication } from '../../models/ordreFabrication/ordre-fabrication.model';
const baseUrl = 'http://localhost:8087/api/ordre-fabrication';
@Injectable({
  providedIn: 'root',
})
export class OrdreFabricationService {
  constructor(private http: HttpClient) {}
  getOrdreFabrication(id: any): Observable<OrdreFabrication> {
    return this.http.get(`${baseUrl}/get-ordre-fabrication/${id}`);
  }
  getAllOrdreFabrications(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(
      `${baseUrl}/get-all-ordre-fabrication`
    );
  }
  createOrdreFabrication(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-ordre-fabrication`, data);
  }

  updateOrdreFabrication(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-ordre-fabrication/${id}`, data);
  }

  deleteOrdreFabrication(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-ordre-fabrication/${id}`);
  }
  deleteAllOrdreFabrications(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-all-ordre-fabrication`);
  }
  getQteProduite(id: any): Observable<number> {
    return this.http.get<number>(`${baseUrl}/qte-produite/${id}`);
  }
  getQteDemande(id: any): Observable<number> {
    return this.http.get<number>(`${baseUrl}/qte-demande/${id}`);
  }
  getDailySuivi():Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${baseUrl}/get-daily-tracking`);

    
  }
  getOrdresEnRetard(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/en-retard`);
  }

  getOrdresEnCours(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/en-cours`);
  }

  getOrdresTermines(): Observable<number> {
    return this.http.get<number>(`${baseUrl}/termines`);
  }
  getOrdreFabricationEncours(): Observable<OrdreFabrication[]> {
    return this.http.get<OrdreFabrication[]>(`${baseUrl}/list-ordre-en-cours`);
  }
}
