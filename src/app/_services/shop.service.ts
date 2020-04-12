import { Injectable } from '@angular/core';
import { GetCityResponse, City, GetAllTwonshipResponse } from '@app/_models/city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetShopSearchResponse } from '@app/_models/home-models';
import { environment } from 'src/environments/environment';
import { ShopType } from '@app/_models/shop-type';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopData } from '@app/_models/shop';
import { AdvertisementData } from '@app/_models/advertisement';
import { Constants } from '@app/_models/constants';
import { GetHomeShopListResponse, GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
private url = Constants.API_URL_PREFIX + '/api/Miscellaneous';
private shopsearch_url = Constants.API_URL_PREFIX + '/api/ShopSearch';

baseUrl = environment.apiUrl;

private shop_url = Constants.API_URL_PREFIX + '/api/Shop';

selectedTownships: TownshipOptions[];
shopData: ShopData;
selectedAdveriesementFiles: AdvertisementData[];
shopImgFile: File;

constructor(private http: HttpClient) { }

getCityList(): Observable<GetCityResponse> {
  const url = `${this.url}/GetCity`;
  return this.http.get<GetCityResponse>(url);
}

getAllTwonship(cityId): Observable<GetAllTwonshipResponse>{
  let params = new HttpParams();
  params = params.append('CityId', cityId)
  const url = `${this.url}/GetTown?`+ params;
  return this.http.get<GetAllTwonshipResponse>(url);
}

searchShopList(request): Observable<GetShopSearchResponse>{
  let params = new HttpParams();
  params = params.append("shopName", request.shopName);
  if (request.shopTypeIdList !=null) {
    params = params.append("shopTypeIdList", request.shopTypeIdList);
  }
  if (request.cityId != 0) {
    params = params.append("cityId", request.cityId);
  }
  if (request.townIdList != null) {
    params = params.append("townIdList", request.townIdList);
  }
  console.log(params);
  const url = `${this.shopsearch_url}/GetShopList?`+params;
  return this.http.get<GetShopSearchResponse>(url);
}


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
    const shop_url = `${this.url}/GetShopDetail?` + params;
    return this.http.get<GetHomeShopListResponse>(shop_url);
  }
  getAdvertisementByShopId(shopId): Observable<GetHomeShopListAdvertisementResponse[]> {
    let params = new HttpParams();
    params = params.append('shopId', shopId);
    const shop_url = `${this.url}/GetAdvertisementByShopId?` + params;
    return this.http.get<GetHomeShopListAdvertisementResponse[]>(shop_url);
  }
// tslint:disable-next-line: eofline
}
