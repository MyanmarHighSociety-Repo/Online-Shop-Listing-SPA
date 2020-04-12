export interface Product {
    name: string;

    price: number;
}

export class ProductData {
    constructor(public url: any, public file: File, public name: string, public price: number, public arrayRoom: number) {}
}

export interface AddProductResponse {
    status: boolean;
}
