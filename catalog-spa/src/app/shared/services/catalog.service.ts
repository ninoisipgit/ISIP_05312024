import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalog } from '../models/catalog';
@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiUrl = 'https://localhost:44335/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getAllList(): Observable<Catalog[]> {
    return this.http.get<Catalog[]>(`${this.apiUrl}/items`);
  }

  getById(id: number): Observable<Catalog> {
    return this.http.get<any>(`${this.apiUrl}/items/${id}`);
  }

  post(item: Catalog): Observable<Catalog> {
    return this.http.post<Catalog>(`${this.apiUrl}/items`, item);
  }

  put(item: Catalog): Observable<Catalog> {
    return this.http.put<Catalog>(`${this.apiUrl}/items`, item);
  }
}
