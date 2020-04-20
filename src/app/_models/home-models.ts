export class GetShopTypeResponse {
    id: number;
    name: string;
    iconUrl: string;
}

export class GetHomeShopListResponse {
    id: number;
    name: string;
    shopLogoUrl: string;
    cityName: string;
    description: string;
    websiteLink: string;
    facebookLink: string;
    androidLink: string;
    iosLink: string;
    phNo: string;
    townshipName: string;
    deliveryFromTime: string;
    deliveryToTime: string;
    shopTypeName: string;
    product: GetHomeShopListProductResponse[];
    shopDeliveryAvailableLocation: GetHomeShopListDeliveryResponse[];
    advertisement: GetHomeShopListAdvertisementResponse[];
}

export class GetHomeShopListProductResponse {
    id: number;
    name: string;
    price: number;
    productImage: GetHomeShopListProductImageResponse[];
}

export class GetHomeShopListProductImageResponse {
    id: number;
    url: string;
}

export class GetHomeShopListDeliveryResponse {
    township: GetHomeShopListDeliveryTownshipResponse;
}

export class GetHomeShopListDeliveryTownshipResponse {
    id: number;
    name: string;
}

export class GetViewMoreShopListResponse {
    shopTypeName: string;
    shopList: GetHomeShopListResponse[];
}

export class GetShopSearchResponse{
    shopList: GetHomeShopListResponse[];
}

export class GetHomeShopListAdvertisementResponse {
    id: number;
    shopId: number;
    url: string;
    caption: string;
}



