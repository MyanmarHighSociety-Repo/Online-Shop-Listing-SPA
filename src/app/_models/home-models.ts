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
    townshipName: string;
    estDeliveryFromTime: string;
    estDeliveryToTime: string;
    shopTypeName: string;
    product: GetHomeShopListProductResponse[];
    shopDeliveryAvailableLocation: GetHomeShopListProductResponse[];
}

export class GetHomeShopListProductResponse {
    productImage: GetHomeShopListProductImageResponse[];
}

export class GetHomeShopListProductImageResponse {
    id: number;
    url: string;
}

export class GetHomeShopListDeliveryResponse {
    township: GetHomeShopListDeliveryTownshipResponse[];
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



