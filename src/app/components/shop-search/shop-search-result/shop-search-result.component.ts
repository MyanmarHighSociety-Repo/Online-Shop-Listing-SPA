import { Component, OnInit, TemplateRef } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { GetHomeShopListResponse, GetHomeShopListDeliveryResponse } from '@app/_models/home-models';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-search-home',
  templateUrl: './shop-search-result.component.html',
  styleUrls: ['./shop-search-result.component.css']
})
export class ShopSearchResultComponent implements OnInit {
  haveResult = false;
  isLoading = true;
  searchResult: GetHomeShopListResponse[];
  moreResult: GetHomeShopListResponse[];
  pageInfo: any;
  viewMoreClicked = false;
  items = 1;
  page = 1;
  demiText = '';

  constructor(
    private service: ShopService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    if (this.service.representCity === '1') {
      this.demiText = 'ရန်ကုန်မြို့နယ်အားလုံး';
    } else if (this.service.representCity === '2') {
      this.demiText = 'မန္တလေးမြို့နယ်အားလုံး';
    }
    this.service.getSearchResult(this.items.toString(), this.page.toString()).subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
        this.searchResult = [];
        this.searchResult = res.body;
        if (this.searchResult.length > 0) {
            this.haveResult = true;
        }
        this.searchResult.forEach(element => {
            const wholeCityDelivery = element.shopDeliveryAvailableLocation
              .map(x => x.township.id)
              .join(',');
            if (wholeCityDelivery.includes(this.service.searchFormTownship)) {
              element.shopDeliveryAvailableLocation = [];
              const makeOver: GetHomeShopListDeliveryResponse = {
                township: {
                  id: 0,
                  name: this.demiText
                }
              };
              element.shopDeliveryAvailableLocation.push(makeOver);
            }
        });
        this.isLoading = false;
    });
  }

  backToSearch() {
    this.service.clearData();
    this.service.searchFormShopType = null;
    this.service.searchFormText = null;
    this.service.searchFormTownship = null;
    this.location.back();
  }

  viewMoreShop() {
    this.viewMoreClicked = true;
    this.page = +this.pageInfo.currentPage + 1;
    this.service.getSearchResult(this.items.toString(), this.page.toString()).subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
        this.moreResult = [];
        this.moreResult = res.body;
        this.moreResult.forEach(element => {
            const wholeCityDelivery = element.shopDeliveryAvailableLocation
              .map(x => x.township.id)
              .join(',');
            if (wholeCityDelivery.includes(this.service.searchFormTownship) && this.demiText !== '') {
              element.shopDeliveryAvailableLocation = [];
              const makeOver: GetHomeShopListDeliveryResponse = {
                township: {
                  id: 0,
                  name: this.demiText
                }
              };
              element.shopDeliveryAvailableLocation.push(makeOver);
            }
        });
        this.moreResult.forEach(element => {
          this.searchResult.push(element);
        });
        this.viewMoreClicked = false;
    });
  }

  shopDetail(shopId) {
    this.router.navigate(['/shop-detail'], { queryParams: {shopId } });
  }
}
