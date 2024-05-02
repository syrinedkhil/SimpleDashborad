import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag/tag.model';


const baseUrl = 'http://localhost:8087/api/tags';
@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }
  getTag(id: any): Observable<Tag> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${baseUrl}/get-all-tags`);
  }
  createTag(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/add-tag`, data);
  }

  updateTag(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/update-tag/${id}`, data);
  }

  deleteTag(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-tag/${id}`);
  }
  deleteAllTags(): Observable<any> {
    return this.http.delete(`${baseUrl}/delete-all-tags`);
  }
  findTagByOperateur(operateur: any): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${baseUrl}?operateur=${operateur}`);
  }
}
