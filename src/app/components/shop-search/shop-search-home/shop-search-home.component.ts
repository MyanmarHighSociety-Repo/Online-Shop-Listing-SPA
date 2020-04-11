import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { CountryDialogComponent } from './country-dialog/country-dialog.component';
import { TownshipDialogComponent } from './township-dialog/township-dialog.component';
import { HomeService } from '@app/_services/home.service';
import { GetShopTypeResponse } from '@app/_models/home-models';

@Component({
  selector: 'app-shop-search-home',
  templateUrl: './shop-search-home.component.html',
  styleUrls: ['./shop-search-home.component.css']
})
export class ShopSearchHomeComponent implements OnInit {

  isShow = [];
  showspan = false;
  // Array Variable
  shopTypeList: GetShopTypeResponse[];

  constructor(
    private dialog: MatDialog,
    private service: HomeService) { }

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

selectShopType(){

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
  }


  openTownshipDialog(){
    const dialogRef = this.dialog.open(TownshipDialogComponent, {
      width: '90%',
      height: '320px',
      maxWidth: '100vw !important',
      autoFocus: false,
      maxHeight: '90vh',
      panelClass: 'township-modalbox' //you can adjust the value as per your view
      // data: {name: this.name, animal: this.animal}
    }); 
  }

}
