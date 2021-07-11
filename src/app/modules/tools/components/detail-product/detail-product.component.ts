import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { InfoItem } from 'src/app/modules/core/interface/info-item';
import { Item } from 'src/app/modules/core/interface/item';
import { DataService } from 'src/app/modules/core/services/data/data.service';
import { SearchItemService } from 'src/app/modules/core/services/search-items/search-item.service';
import { SellerService } from 'src/app/modules/core/services/seller/seller.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  item$!: Observable<string | any>;
  item: Item = <Item>{}
  idItem: number = 0;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchItemService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.detailsProduct();
  }

  detailsProduct() {
    this.item = this.dataService.getItem();
    let rsp: any;
    this.item$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id'))
    );
    this.item$.subscribe(param => {
      this.searchService.getItemSpecific(param).subscribe(valItem => {
        this.item.sold_quantity = valItem.sold_quantity;
        this.searchService.searchDescriptionItemById(param).subscribe(valResponse => {
          rsp = valResponse;
          this.item.description = rsp.plain_text
        })
      });
    });
  }

}
