import { Injectable } from '@angular/core';
import { Item } from '../../interface/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public item: Item = <Item>{};
  constructor() { }

  setItemArray(list: Item) {
    this.item = list;
  }

  getItem() {
    return this.item;
  }
}
