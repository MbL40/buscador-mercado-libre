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
import { SellerService } from 'src/app/modules/core/services/seller/seller.service';

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
  shipping: Shipping = <Shipping>{};
  category: String[] = [];

  listElement = new Array();
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
    let prices: any;
    this.item$ = this.route.queryParamMap.pipe(
      map((params: ParamMap) => params.get('search'))
    );
    this.item$.subscribe(param => {
      this.searchService.searchItemsByName(param).subscribe(valObservable => {
        this.responseSearchByName = valObservable;
        results = this.responseSearchByName.results;
        results.forEach((element: any) => {
          this.listElement.push(element) // Lista de objetos que devuelve la api ?search=apple
        });
        for (let i = 0; i < this.listElement.length; i++) {
          let uniqueItem: Item = <Item>{};
          let priceItem: PriceItem = <PriceItem>{};
          const element = this.listElement[i];
          console.log(element.prices.prices)
          this.searchUserById(element.seller.id);
          this.searchCategoryById(element.category_id);
          setTimeout(() => { //Debería cambiarse por validación de status de los servicios que se consumen anteriormente
            priceItem.amount = element.price;
            priceItem.currency = element.currency_id;
            uniqueItem.id = element.id;
            uniqueItem.title = element.title;
            uniqueItem.price = priceItem;
            uniqueItem.condition = element.condition;
            uniqueItem.free_shipping = element.shipping.free_shipping;
            uniqueItem.picture = this.responseSearchCategoryById.picture
            this.infoItem.items.push(uniqueItem);
          }, 1000);
        }
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
        console.log(this.responseSearchCategoryById)
        this.category.push(this.responseSearchCategoryById.name)
        this.infoItem.categories = this.category

      }
    )
  }
}
