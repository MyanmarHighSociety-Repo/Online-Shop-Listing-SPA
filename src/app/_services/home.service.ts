import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from '@app/_models/constants';
import { GetShopTypeResponse, GetHomeShopListResponse, GetViewMoreShopListResponse } from '@app/_models/home-models';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

private url = Constants.API_URL_PREFIX + '/api/Home';

constructor(private http: HttpClient) { }

getShopType(): Observable<GetShopTypeResponse[]> {
  const url = `${this.url}/GetShopType`;
  return this.http.get<GetShopTypeResponse[]>(url);
}

getHomeShopList(pageSize, pageNumber, currentCity, isOpenOnHolidayFilter): Observable<GetHomeShopListResponse[]> {
  let params = new HttpParams();
  params = params.append('PageSize', pageSize);
  params = params.append('pageNumber', pageNumber);
  params = params.append('CityId', currentCity);
  params = params.append('IsOpenOnHolidayFilter', isOpenOnHolidayFilter);
  const url = `${this.url}/GetHomeShopList?` + params;
  return this.http.get<GetHomeShopListResponse[]>(url);
}

getViewMoreShopList(pageSize, pageNumber, currentCity, isOpenOnHolidayFilter): Observable<GetViewMoreShopListResponse[]> {
  let params = new HttpParams();
  params = params.append('PageSize', pageSize);
  params = params.append('pageNumber', pageNumber);
  params = params.append('CityId', currentCity);
  params = params.append('IsOpenOnHolidayFilter', isOpenOnHolidayFilter);
  const url = `${this.url}/GetViewMoreShopList?` + params;
  return this.http.get<GetViewMoreShopListResponse[]>(url);
}

}
