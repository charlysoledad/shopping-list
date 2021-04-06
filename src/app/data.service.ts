import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, filter, scan } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getShoppingItems() {
    return this.http
    .get<Item[]>(this.url+'items').pipe(
      map(res => res));
  }

  addShoppingItem(newItem: any) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http
    .post<Item>(this.url+'item', newItem, {headers: headers}).pipe(
      map(res => res));
  }

  deleteShoppingItem(id:any){
    return this.http
    .delete(this.url+'item/'+id).pipe(
      map(res => res));
  }

  updateShoppingItem(newItem: any) {
    let headers = new HttpHeaders();
    headers.append('content-Type', 'application/json');
    return this.http
    .put<Item>(this.url+'item/'+newItem._id, newItem, {headers: headers}).pipe(
      map(res => res));
  }

}
