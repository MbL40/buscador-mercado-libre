import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchItemService {

  constructor(private http: HttpClient) { }
  public endPointSearchItems = "https://api.mercadolibre.com/sites/MLA/search?q=";

  searchItemsByName(value: string): Observable<any> {
    return this.http.get(this.endPointSearchItems+value);
  }
  
}
