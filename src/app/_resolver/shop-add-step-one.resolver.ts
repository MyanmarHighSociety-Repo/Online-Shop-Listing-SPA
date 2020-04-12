import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShopType } from '@app/_models/shop-type';
import { ShopService } from '@app/_services/shop.service';
import { AlertifyService } from '@app/_services/alertify.service';
import { City } from '@app/_models/city';

@Injectable()
export class ShopAddStepOneShopTypeResolver implements Resolve<ShopType> {

  constructor(private shopService: ShopService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ShopType> {
    return this.shopService.getShopTypes().pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['']);
            return of(null);
        })
    );
  }
}

@Injectable()
export class ShopAddStepOneCityResolver implements Resolve<City> {
  constructor(private shopService: ShopService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<City> {
    return this.shopService.getCities().pipe(
        catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['']);
            return of(null);
        })
    );
  }
}
