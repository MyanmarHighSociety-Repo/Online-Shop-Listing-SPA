import { Component, OnInit, TemplateRef } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { GetHomeShopListResponse } from '@app/_models/home-models';
import { Router } from '@angular/router';

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
  items = 3;
  page = 1;

  constructor(
    private service: ShopService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    this.service.getSearchResult(this.items.toString(), this.page.toString()).subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
        console.log(this.pageInfo);
        this.searchResult = [];
        this.searchResult = res.body;
        if (this.searchResult.length > 0) {
            this.haveResult = true;
        }
        this.isLoading = false;
    });
  }

  backToSearch() {
    this.router.navigate(['shop-search']);
  }

  viewMoreShop() {
    this.viewMoreClicked = true;
    this.page = +this.pageInfo.currentPage + 1;
    this.service.getSearchResult(this.items.toString(), this.page.toString()).subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
        this.moreResult = [];
        this.moreResult = res.body;
        this.moreResult.forEach(element => {
          this.searchResult.push(element);
        });
        this.viewMoreClicked = false;
    });
  }
}
