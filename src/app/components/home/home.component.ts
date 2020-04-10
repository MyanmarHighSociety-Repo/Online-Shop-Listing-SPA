import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '@app/_services/home.service';
import { GetShopTypeResponse } from '@app/_models/home-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Tabs
  tablinks1 = 'active';
  tablinks2 = '';
  tablinks3 = '';

  // Array Variable
  shopTypeList: GetShopTypeResponse[];

  constructor(private service: HomeService) { }

  ngOnInit() {
    this.getShopType();
  }

  getShopType() {
    this.service.getShopType().subscribe( res => {
      this.shopTypeList = res;
    });
}

  changeTab(tab) {
    if (tab === 'tablinks1') {
      this.tablinks1 = 'active';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'inactive';
    } else if (tab === 'tablinks2') {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'active';
      this.tablinks3 = 'inactive';
    } else {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'active';
    }

  }
}
