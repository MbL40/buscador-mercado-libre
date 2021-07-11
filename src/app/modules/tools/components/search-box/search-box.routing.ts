import { Routes, RouterModule } from '@angular/router';
import { SearchBoxComponent } from './search-box.component';

const routes: Routes = [
  { 
    path: '',
    component: SearchBoxComponent
   },
];

export const SearchBoxRoutes = RouterModule.forChild(routes);
