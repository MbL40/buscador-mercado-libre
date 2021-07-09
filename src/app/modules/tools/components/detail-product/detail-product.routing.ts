import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product.component';

const routes: Routes = [
  {
    path: 'items/:id',
    component: DetailProductComponent
  },
];

export const DetailProductRoutes = RouterModule.forChild(routes);
