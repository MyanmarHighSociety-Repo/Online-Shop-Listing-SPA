import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopType } from '@app/_models/shop-type';
import { City } from '@app/_models/city';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopData } from '@app/_models/shop';
import { AdvertisementData } from '@app/_models/advertisement';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;

  selectedTownships: TownshipOptions[];
  shopData: ShopData;
  selectedAdveriesementFiles: AdvertisementData[];
  shopImgFile: File;

  constructor(private http: HttpClient) {}

  getShopTypes(): Observable<ShopType[]> {
    return this.http.get<ShopType[]>(this.baseUrl + 'home/getshoptype');
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl + 'miscellaneous/getcity');
  }

  getTownShips(cityIds: string): Observable<Township> {
    return this.http.get<Township>(this.baseUrl + 'miscellaneous/gettownship?cityids=' + cityIds);
  }
// tslint:disable-next-line: eofline
}