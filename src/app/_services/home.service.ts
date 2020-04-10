import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constants } from '@app/_models/constants';
import { GetShopTypeResponse } from '@app/_models/home-models';

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

}
