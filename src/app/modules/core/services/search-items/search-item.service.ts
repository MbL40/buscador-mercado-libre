import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../interface/item';
@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  constructor(private http: HttpClient) { }
  public endPointSearchItems = "https://api.mercadolibre.com/sites/MLA/search?q=";
  public endPointGetCategoryById = "https://api.mercadolibre.com/categories/";
  public endPointGetItem = "https://api.mercadolibre.com/items/";

  public searchDescriptionItemById(value: number): Observable<any> {
    return this.http.get(this.endPointGetItem + value + '/description');
  }

  public searchItemsByName(value: string): Observable<any> {
    return this.http.get(this.endPointSearchItems + value);
  }

  public getItemSpecific(value: number): Observable<any>{
    return this.http.get(this.endPointGetItem+value);
  }

  public getCategoryById(value: number): Observable<any> {
    return this.http.get(this.endPointGetCategoryById + value);
  }

}
