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

export class ShopData {
    constructor(
        public name: string,
        public shopTypeId: number,
        public phoneNo: string,
        public description: string,
        public deliveryFromTime: string,
        public deliveryToTime: string,
        public facebooLink: string,
        public andriodLink: string,
        public websiteLink: string,
        public iosLink: string,
    ) {}
}
