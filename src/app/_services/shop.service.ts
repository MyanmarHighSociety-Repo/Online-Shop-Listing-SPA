import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShopType } from '@app/_models/shop-type';
import { City } from '@app/_models/city';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopData, AddShopResponse, AddShopImageResponse, AddShopAvailableLocationResponse } from '@app/_models/shop';
import { AdvertisementData, AddAdvertisementResponse } from '@app/_models/advertisement';
import { Constants } from '@app/_models/constants';
import { GetHomeShopListResponse, GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';
import { ProductData, AddProductResponse } from '@app/_models/product';

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
    return this.http.get<ShopType[]>(this.baseUrl + 'Home/GetShopType');
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl + 'Miscellaneous/GetCity');
  }

  getTownShips(cityIds: string): Observable<Township> {
    return this.http.get<Township>(this.baseUrl + 'Miscellaneous/GetTownship?cityids=' + cityIds);
  }

  postShop(shop: ShopData): Observable<AddShopResponse> {
    return this.http.post<AddShopResponse>(this.baseUrl + 'Shop/Addshop', shop);
  }

  postShopDeliveryAvailableLocation(townshipStr: string, id: number): Observable<AddShopAvailableLocationResponse> {
    return this.http.post<AddShopAvailableLocationResponse>(this.baseUrl + 'Shop/addshopavailablelocation',
      {townshipIds: townshipStr, shopId: id });
  }

  postAdvertisement(files: AdvertisementData[], id: number): Observable<AddAdvertisementResponse> {
    const fd = new FormData();
    files.forEach(element => {
      fd.append(element.caption, element.file, element.file.name);
    });
    return this.http.post<AddAdvertisementResponse>(this.baseUrl + 'Shop/addadvertisement?id=' + id, fd);
  }

  postProduct(files: ProductData[], id: number): Observable<AddProductResponse> {
    const fd = new FormData();
    files.forEach(element => {
      fd.append(element.name + ',' + element.price, element.file, element.file.name);
    });
    return this.http.post<AddProductResponse>(this.baseUrl + 'Shop/addProduct?id=' + id, fd);
  }

  postShopImage(file: File, id: number): Observable<AddShopImageResponse> {
    const fd = new FormData();
    fd.append('image', file, file.name);
    return this.http.post<AddShopImageResponse>(this.baseUrl + 'Shop/addshopimage?id=' + id , fd);
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