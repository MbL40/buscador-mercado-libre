import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, DEFAULT_CURRENCY_CODE, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressItem } from 'src/app/modules/core/interface/address-item';
import { InfoAuthor } from 'src/app/modules/core/interface/info-author';
import { InfoItem } from 'src/app/modules/core/interface/info-item';
import { Item } from 'src/app/modules/core/interface/item';
import { PriceItem } from 'src/app/modules/core/interface/price-item';
import { Shipping } from 'src/app/modules/core/interface/shipping';
import { DataService } from 'src/app/modules/core/services/data/data.service';
import { SearchItemService } from 'src/app/modules/core/services/search-items/search-item.service';
import { SellerService } from 'src/app/modules/core/services/seller/seller.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' }]
})

export class SearchResultComponent implements OnInit {
  item$!: Observable<string | any>;
  infoItem: InfoItem = <InfoItem>{};
  author: InfoAuthor = <InfoAuthor>{};
  items: Item[] = new Array<Item>();
  shipping: Shipping = <Shipping>{};
  category: String[] = [];
  flagPaintItems: number = 4;
  listElement = new Array();
  dataRoute = [];
  responseSearchByName: any;
  responseSearchUserById: any;
  responseSearchCategoryById: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchItemService,
    private sellerService: SellerService,
    private dataService: DataService
  ) { }


  ngOnInit() {
    this.searchItemByName();
  }

  private searchItemByName() {
    this.infoItem.items = [];
    let results: any
    this.item$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('search'))
    );
    this.item$.subscribe(param => {
      this.searchService.searchItemsByName(param).subscribe(valObservable => {
        this.responseSearchByName = valObservable;
        results = this.responseSearchByName.results;
        results.forEach((element: any) => {
          this.listElement.push(element) 
        });
        this.paintItem(this.listElement);
      })
    });
  }

  private paintItem(list: any[]) {
    let count: number = 0;
    for (let i = 0; i < list.length; i++) {
      count++;
      let uniqueItem: Item = <Item>{};
      let priceItem: PriceItem = <PriceItem>{};
      let address: AddressItem = <AddressItem>{}
      const element = list[i];
      if (count <= 4) {
        this.searchUserById(element.seller.id);
        this.searchCategoryById(element.category_id);
        priceItem.amount = element.price;
        priceItem.currency = element.currency_id;
        address.city_name = element.address.city_name
        uniqueItem.id = element.id;
        uniqueItem.title = element.title;
        uniqueItem.price = priceItem;
        uniqueItem.condition = element.condition;
        uniqueItem.free_shipping = element.shipping.free_shipping;
        uniqueItem.picture = element.thumbnail;
        uniqueItem.address = address;
        this.infoItem.items.push(uniqueItem);
      }
    }
  } 

  public selectItemSpecific(item: Item){
    this.dataService.item.picture = item.picture;
    this.dataService.item.title = item.title;
    this.dataService.item.price = item.price;
    this.dataService.item.condition = item.condition
  }

  private searchUserById(id: number) {
    this.sellerService.getInfoSellerById(id).subscribe(
      res => {
        this.responseSearchUserById = res;
        this.author.name = this.responseSearchUserById.nickname;
        this.author.lastname = this.responseSearchUserById.permalink
        this.infoItem.author = this.author;
      }
    )
  }

  private searchCategoryById(id: number) {
    this.searchService.getCategoryById(id).subscribe(
      res => {
        this.responseSearchCategoryById = res;
        this.category.push(this.responseSearchCategoryById.name)
        this.infoItem.categories = this.category
      }
    )
  }
}
