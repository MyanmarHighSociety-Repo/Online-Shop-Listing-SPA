import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopType } from '@app/_models/shop-type';
import { City } from '@app/_models/city';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopData } from '@app/_models/shop';
import { AdvertisementData } from '@app/_models/advertisement';
import { Constants } from '@app/_models/constants';
import { GetHomeShopListResponse, GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;

  private url = Constants.API_URL_PREFIX + '/api/Shop';

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

  getShopDetail(shopId): Observable<GetHomeShopListResponse> {
    let params = new HttpParams();
    params = params.append('shopId', shopId);
    const url = `${this.url}/GetShopDetail?` + params;
    return this.http.get<GetHomeShopListResponse>(url);
  }
  getAdvertisementByShopId(shopId): Observable<GetHomeShopListAdvertisementResponse[]> {
    let params = new HttpParams();
    params = params.append('shopId', shopId);
    const url = `${this.url}/GetAdvertisementByShopId?` + params;
    return this.http.get<GetHomeShopListAdvertisementResponse[]>(url);
  }
// tslint:disable-next-line: eofline
}