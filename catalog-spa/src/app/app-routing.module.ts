import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogResolver } from './shared/resolver/catalog.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      CatalogList: CatalogResolver,
    },
    loadChildren: () => import('./components/main/main.module').then(m => m.MainModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
