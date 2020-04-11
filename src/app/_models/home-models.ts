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
}

export class GetHomeShopListProductResponse {
    productImage: GetHomeShopListProductImageResponse[];
}

export class GetHomeShopListProductImageResponse{
    id: number;
    url: string;
}



