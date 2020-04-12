import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { TownshipDialogComponent } from './township-dialog/township-dialog.component';
import { HomeService } from '@app/_services/home.service';
import { GetShopTypeResponse } from '@app/_models/home-models';
import { ShopService } from '@app/_services/shop.service';
import { GetCityResponse } from '@app/_models/city';
// import { request } from 'http';

@Component({
  selector: 'app-shop-search-home',
  templateUrl: './shop-search-home.component.html',
  styleUrls: ['./shop-search-home.component.css']
})
export class ShopSearchHomeComponent implements OnInit {

  isShow = [];
  showspan = false;
  cityId: any;
  shopName: string;
  bthDisable = true;
  townshipIdList = [];
  shopTypeIdList = [];
  selectedOptions: GetShopTypeResponse[]; 
  // Array Variable
  shopTypeList: GetShopTypeResponse[];

  constructor(
    private dialog: MatDialog,
    private service: HomeService,
    private shopService :ShopService) { }

  ngOnInit() {
    this.getShopType();
  }

  getShopType() {
    this.service.getShopType().subscribe( res => {
      this.shopTypeList = res;
    });
  } 

toggleDisplay(i,id) {
  console.log(id)
  // this.isShow = !this.isShow;
  this.shopTypeList.forEach(element => {
    if (element.id == id) {
      this.showspan = true;
    }else{
      this.showspan = false;
    }
  });
}

onNgModelChange(selectedOptions: string[]){
console.log(selectedOptions);
}


  openCountryDialog() {
    const dialogRef = this.dialog.open(CountryDialogComponent, {
      width: '90%',
      height: '320px',
      maxWidth: '90vw !important',
      autoFocus: false,
      maxHeight: '90vh',
      panelClass: 'country-modalbox' //you can adjust the value as per your view
      // data: {name: this.name, animal: this.animal}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cityId = result.cityId
      if(this.cityId != null){
        this.bthDisable = false;
      }
    });
  }


  openTownshipDialog(){
    const dialogRef = this.dialog.open(TownshipDialogComponent, {
      width: '90%',
      height: '320px',
      maxWidth: '100vw !important',
      autoFocus: false,
      maxHeight: '90vh',
      panelClass: 'township-modalbox', //you can adjust the value as per your view
      data: {cityId: this.cityId}
    }); 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.townshipIdList = result.townIdList;
      console.log(this.townshipIdList);
    });
  }


  Search(){
    if (this.selectedOptions) {
      this.selectedOptions.forEach(element => {
        this.shopTypeIdList.push(element.id)
      });
    }

    var request = {
      shopName: this.shopName,
      shopTypeIdList: this.shopTypeIdList == undefined || this.shopTypeIdList.length == 0? null : this.shopTypeIdList,
      cityId: this.cityId == '' || this.cityId == undefined ? 0 : this.cityId,
      townIdList: this.townshipIdList == undefined || this.townshipIdList.length == 0 ? null : this.townshipIdList
    }


    console.log("res", request)
    this.shopService.searchShopList(request).subscribe(result => {
      let obt = result;
      console.log(obt);
    })
  }

}
