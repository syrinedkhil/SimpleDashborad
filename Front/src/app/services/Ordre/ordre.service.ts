import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ordre } from '../../models/Ordre/ordre.model';
const baseUrl = 'http://localhost:8087/api/order';

@Injectable({
  providedIn: 'root'
})
export class OrdreService {

  constructor(private http: HttpClient) {}
  getOrdre(id: any): Observable<Ordre> {
    return this.http.get(`${baseUrl}/get-order/${id}`);
  }
  getAllOrdres(): Observable<Ordre[]> {
    return this.http.get<Ordre[]>(`${baseUrl}/get-all-order`);
  }
  createOrdre(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-order`, data);
  }

  updateOrdre(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-order/${id}`, data);
  }

  deleteOrdre(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-order/${id}`);
  }
  deleteAllOrdres(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-all-order`);
  }
}
