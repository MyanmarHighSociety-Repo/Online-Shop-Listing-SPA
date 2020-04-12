import { Injectable } from '@angular/core';
import { Constants } from '@app/_models/constants';
import { GetCityResponse, City, GetAllTwonshipResponse } from '@app/_models/city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetShopSearchResponse } from '@app/_models/home-models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
private url = Constants.API_URL_PREFIX + '/api/Miscellaneous';
private shopsearch_url = Constants.API_URL_PREFIX + '/api/ShopSearch';

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

}
