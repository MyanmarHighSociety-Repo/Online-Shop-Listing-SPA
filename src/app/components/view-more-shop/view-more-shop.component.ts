import { Component, OnInit } from '@angular/core';
import { GetHomeShopListResponse, GetViewMoreShopListResponse } from '@app/_models/home-models';
import { HomeService } from '@app/_services/home.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-more-shop',
  templateUrl: './view-more-shop.component.html',
  styleUrls: ['./view-more-shop.component.css']
})
export class ViewMoreShopComponent implements OnInit {

  // Variable
  currentCity = '1';
  pageSize = 1000;
  pageNumber = 1;
  isOpenOnHolidayFilter = false;
  homesearch = '';
  currentShopType = '';

  // Array Variable
  viewMoreShopList: GetViewMoreShopListResponse[];

  constructor(private service: HomeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentCity = this.route.snapshot.queryParamMap.get('currentCity');
    this.getViewMoreShopList();
  }

  getViewMoreShopList() {
    this.service.getViewMoreShopList(this.pageSize, this.pageNumber, this.currentCity, this.isOpenOnHolidayFilter).subscribe( res => {
      this.viewMoreShopList = [];
      this.viewMoreShopList = res;
    });
  }

  back() {
    this.router.navigate(['.']);
  }

  search(category, searchText) {
    this.router.navigate(['/shop-search-home'], { queryParams: {searchText, category } });
  }

  shopDetail(shopId) {
    this.router.navigate(['/shop-detail'], { queryParams: {shopId } });
  }

}
