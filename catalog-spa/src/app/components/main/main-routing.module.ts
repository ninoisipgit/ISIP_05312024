import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CatalogViewComponent } from '../catalog-view/catalog-view.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'view/:id',
    component: CatalogViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
