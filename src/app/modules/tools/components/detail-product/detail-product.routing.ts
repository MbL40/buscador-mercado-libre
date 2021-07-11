import { Routes, RouterModule } from '@angular/router';
import { DetailProductComponent } from './detail-product.component';

const routes: Routes = [
  {
    path: '',
    component: DetailProductComponent,
  },
];

export const DetailProductRoutes = RouterModule.forChild(routes);
