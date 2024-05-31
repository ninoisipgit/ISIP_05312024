import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CatalogService } from '../services/catalog.service';

@Injectable({
  providedIn: 'root'
})

export class CatalogResolver implements Resolve<any[]> {
  constructor(private catalogService: CatalogService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.catalogService.getAllList();
  }
}

