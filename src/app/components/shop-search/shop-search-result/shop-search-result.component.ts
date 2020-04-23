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
  pageInfo: any;

  constructor(
    private service: ShopService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    this.service.getSearchResult('10', '1').subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
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
}
