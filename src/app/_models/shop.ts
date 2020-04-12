export interface Shop {
    name: string;
    shopType: number;
    phoneNo: string;
    description: string;
    deliveryFromTime: string;
    deliveryToTime: string;
    facebooLink: string;
    andriodLink: string;
    iosLink: string;
    websiteLink: string;
}

export interface AddShopResponse {
    id: number;
}

export interface AddShopImageResponse {
    id: number;
}

export interface AddShopAvailableLocationResponse {
    status: boolean;
}

export class AddShopAvailableLocationRequest {
    constructor(
        townshipIds: string,
        shopId: number
    ) {}
}

export class ShopData {
    constructor(
        public name: string,
        public shopTypeId: number,
        public phNo: string,
        public description: string,
        public deliveryFromTime: string,
        public deliveryToTime: string,
        public facebookLink: string,
        public androidLink: string,
        public websiteLink: string,
        public iosLink: string,
        public townshipId: number,
    ) {}
}
