import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './components/search-box/search-box.component';
import { RouterModule } from '@angular/router';
import { ToolRoutingModule } from './tools-routing.module';
import { SearchItemService } from '../core/services/search-items/search-item.service';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';

@NgModule({
  declarations: [
    SearchBoxComponent,
    SearchResultComponent,
    DetailProductComponent
  ],
  imports:
    [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      ToolRoutingModule,
    ],
  exports: [
    SearchBoxComponent,
    SearchResultComponent,
    DetailProductComponent
  ],
  providers: [SearchItemService]
})
export class ToolsModule { }
