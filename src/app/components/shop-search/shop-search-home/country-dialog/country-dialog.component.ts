import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ShopService } from '@app/_services/shop.service';
import { GetCityResponse, City } from '@app/_models/city';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent implements OnInit {

  cityList = new Array();
  
  constructor(public dialogRef: MatDialogRef<CountryDialogComponent>,
    private shopService :ShopService) { }

    
    selectedCity: any;

  ngOnInit() {
    this.getCity()
  }

  selectCity(ans: string) {
        this.selectedCity = ans;
        console.log(this.selectedCity)
    }
  getCity() {
    this.shopService.getCityList().subscribe( res => {
      console.log(res)
      this.cityList = res.cityList;
      console.log(this.cityList)
    });
  }

  save(){
    this.dialogRef.close({cityId: this.selectedCity.id})
  }

  close() {
    this.dialogRef.close({cityId: null});
  }
}
