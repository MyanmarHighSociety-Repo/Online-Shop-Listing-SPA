

export class GetCityResponse {
    cityList: City[];
}

export class GetAllTwonshipResponse{
    townList: Township[];
}
    
export class City{
    id: number;
    name: string;
    description: string;
    createdDate: string;
    createdBy: number
}

export class Township{
    id: number;
    name: string;
    description: string;
    cityId: number;
    createdDate: string;
    createdBy: number
}