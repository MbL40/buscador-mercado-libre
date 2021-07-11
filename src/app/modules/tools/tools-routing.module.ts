import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
    {
        path: '', component: SearchBoxComponent,
    },
    {
        path: 'items', component: SearchResultComponent
    },
    {
        path: 'items/:id', component: DetailProductComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ToolRoutingModule { }