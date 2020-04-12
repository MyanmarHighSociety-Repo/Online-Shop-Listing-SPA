import { Injectable } from '@angular/core';
import { Constants } from '@app/_models/constants';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetHomeShopListResponse, GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = Constants.API_URL_PREFIX + '/api/Shop';

  constructor(private http: HttpClient) { }

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
  }
