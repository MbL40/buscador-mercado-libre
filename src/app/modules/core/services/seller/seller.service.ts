import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


  constructor(private http: HttpClient) { }
  public endPointGetInfoSeller = "https://api.mercadolibre.com/users/";
  public endPointGetCategoryById = "https://api.mercadolibre.com/categories/"

  public getInfoSellerById(value: number): Observable<any> {
    return this.http.get(this.endPointGetInfoSeller + value);
  }

  public getCategoryById(value: number): Observable<any> {
    return this.http.get(this.endPointGetCategoryById + value);
  }
}
