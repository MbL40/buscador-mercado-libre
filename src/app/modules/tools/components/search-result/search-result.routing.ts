import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

const routes: Routes = [
  { 
    path: '/items',
    component: SearchResultComponent
   },
];

export const SearchResultRoutes = RouterModule.forChild(routes);