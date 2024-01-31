import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { IProduct } from './product.interface';

@Injectable()
export class ProductService {
  private baseUrl = "https:localhost:3000/"
  httpOptions = {
    Headers: new HttpHeaders({
      "contetn-type": "application/json"
    })
  }
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "GetAll").pipe(
      catchError(error => error)
    );;
  }

  create(product: IProduct): Observable<any> {
    return this.http.post(this.baseUrl + "GetAll", JSON.stringify(product));
  }

  edit(id: number, product: IProduct): Observable<any> {
    return this.http.put<any>(this.baseUrl + "edit/" + id, JSON.stringify(product));
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + id );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + "delete/" + id);
  }
}
