import { Injectable } from '@angular/core';
import { GetCityResponse, City, GetAllTwonshipResponse } from '@app/_models/city';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetShopSearchResponse } from '@app/_models/home-models';
import { environment } from 'src/environments/environment';
import { ShopType } from '@app/_models/shop-type';
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
private url = Constants.API_URL_PREFIX + '/api/Miscellaneous';
private shopsearch_url = Constants.API_URL_PREFIX + '/api/ShopSearch';

baseUrl = environment.apiUrl;

private shop_url = Constants.API_URL_PREFIX + '/api/Shop';

selectedTownships: TownshipOptions[];
shopData: ShopData;
selectedAdveriesementFiles: AdvertisementData[];
shopImgFile: File;

searchFormText: string;
searchFormTownship: string;
searchFormShopType: string;

constructor(private http: HttpClient) { }

getCityList(): Observable<GetCityResponse> {
  const url = `${this.url}/GetCity`;
  return this.http.get<GetCityResponse>(url);
}

getAllTwonship(cityId): Observable<GetAllTwonshipResponse> {
  let params = new HttpParams();
  params = params.append('CityId', cityId);
  const url = `${this.url}/GetTown?` + params;
  return this.http.get<GetAllTwonshipResponse>(url);
}

searchShopList(request): Observable<GetShopSearchResponse> {
  let params = new HttpParams();
  params = params.append('shopName', request.shopName);
  if (request.shopTypeIdList !== null) {
    params = params.append('shopTypeIdList', request.shopTypeIdList);
  }
  if (request.cityId !== 0) {
    params = params.append('cityId', request.cityId);
  }
  if (request.townIdList != null) {
    params = params.append('townIdList', request.townIdList);
  }
  console.log(params);
  const url = `${this.shopsearch_url}/GetShopList?` + params;
  return this.http.get<GetShopSearchResponse>(url);
}


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
      fd.append(element.name + '|||' + element.price , element.file, element.file.name);
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
    const shopUrl = `${this.shop_url}/GetShopDetail?` + params;
    return this.http.get<GetHomeShopListResponse>(shopUrl);
  }
  getAdvertisementByShopId(shopId): Observable<GetHomeShopListAdvertisementResponse[]> {
    let params = new HttpParams();
    params = params.append('shopId', shopId);
    const shopUrl = `${this.shop_url}/GetAdvertisementByShopId?` + params;
    return this.http.get<GetHomeShopListAdvertisementResponse[]>(shopUrl);
  }

  getSearchResult(pageSize?: string, pageNumber?: string): Observable<any> {
    const postData = {
      pageNumber,
      pageSize,
      townshipIds: this.searchFormTownship,
      searchText: this.searchFormText ,
      shopTypeIds: this.searchFormShopType
    };

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response' as 'response'
    };


    this.searchFormTownship = null;
    this.searchFormText = null;
    this.searchFormShopType = null;
    return this.http.post<GetHomeShopListResponse[]>(this.baseUrl + 'Shop/search/shoplist', postData, httpOptions);
  }
}
