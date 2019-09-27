import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item } from './models/item';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/item/get-all`);
  }

  getItem(classId: string): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/item/get/${classId}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.apiUrl}/item/create`, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/item/update/${item.classId}`, item);
  }

  deleteItem(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/item/delete/${classId}`);
  }
}
