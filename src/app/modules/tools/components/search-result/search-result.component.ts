import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InfoAuthor } from 'src/app/modules/core/interface/info-author';
import { InfoItem } from 'src/app/modules/core/interface/info-item';
import { Item } from 'src/app/modules/core/interface/item';
import { PriceItem } from 'src/app/modules/core/interface/price-item';
import { GeneralResponse } from 'src/app/modules/core/interface/response';
import { Shipping } from 'src/app/modules/core/interface/shipping';
import { SearchItemService } from 'src/app/modules/core/services/search-items/search-item.service';
import { SellerService } from 'src/app/modules/core/services/seller/Seller.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})

export class SearchResultComponent implements OnInit {
  item$!: Observable<string | any>;
  infoItem: InfoItem = <InfoItem>{};
  author: InfoAuthor = <InfoAuthor>{};
  items: Item[] = new Array<Item>();
  uniqueItem: Item = <Item>{};
  priceItem: PriceItem = <PriceItem>{};
  shipping: Shipping = <Shipping>{};
  category: String[] = [];

  responseSearchByName: any;
  responseSearchUserById: any;
  responseSearchCategoryById: any;
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchItemService,
    private sellerService: SellerService,
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
        results = this.responseSearchByName.results.find((m: any) => m); //Devuelvo arreglo de results.
        this.searchUserById(results.seller.id);
        this.searchCategoryById(results.category_id);
        results.prices.prices.forEach((element: any) => {
          this.priceItem.amount = element.amount;
          this.priceItem.currency = element.currency_id;
        });
        setTimeout(() => {
          this.uniqueItem.id = results.id;
          this.uniqueItem.title = results.title;
          this.uniqueItem.price = this.priceItem;
          this.uniqueItem.picture = this.responseSearchCategoryById.picture;
          this.uniqueItem.condition = results.condition;
          this.uniqueItem.freeShipping = results.shipping.free_shipping;
          this.infoItem.items.push(this.uniqueItem);
        }, 1000);
        console.log(this.infoItem.items)
      })
    });
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

  //Nombre de categoría(name), url de imagen (picture)
  private searchCategoryById(id: number) {
    this.sellerService.getCategoryById(id).subscribe(
      res => {
        this.responseSearchCategoryById = res;
        console.log(this.responseSearchCategoryById.picture)
        this.category.push(this.responseSearchCategoryById.name)
        this.infoItem.categories = this.category
      }
    )
  }
}
