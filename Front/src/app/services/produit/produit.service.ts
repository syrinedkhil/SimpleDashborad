import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produit/produit.model';
const baseUrl = 'http://localhost:8087/api/produit';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }
  getProduit(id: any): Observable<Produit> {
    return this.http.get(`${baseUrl}/get-produits/${id}`);
  }
  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${baseUrl}/get-all-produit`);
  }
  createProduit(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-produit`, data);
  }

  updateProduit(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-produit/${id}`, data);
  }

  deleteProduit(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-produit/${id}`);
  }
  deleteAllProduits(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-all-produit`);
  }
  findProduitByDesignation(designation: any): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${baseUrl}?designation=${designation}`);
  }
}
