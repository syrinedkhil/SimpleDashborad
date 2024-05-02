import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client/client.model';
const baseUrl = 'http://localhost:8087/api/clients';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  getClient(id: any): Observable<Client> {
    return this.http.get(`${baseUrl}/get-client/${id}`);
  }
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}/getClients`);
  }
  createClient(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-client`, data);
  }

  updateClient(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-client/${id}`, data);
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-client/${id}`);
  }
  deleteAllClients(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-all-clients`);
  }
  findTagByEmail(email: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}?email=${email}`);
  }
  findTagByName(name: any): Observable<Client[]> {
    return this.http.get<Client[]>(`${baseUrl}?name=${name}`);
  }
}
