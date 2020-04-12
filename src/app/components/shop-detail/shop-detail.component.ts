import { Component, OnInit } from '@angular/core';
import { GetHomeShopListResponse } from '@app/_models/home-models';
import { ShopService } from '@app/_services/shop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  // Variable
  shopId = '';

  // Array Variable
  shop: GetHomeShopListResponse;

  // Slider
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  };

  constructor(private service: ShopService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.shopId = this.route.snapshot.queryParamMap.get('shopId');
    this.getShopDetail();
  }

  getShopDetail() {
    this.service.getShopDetail(this.shopId).subscribe( res => {
      this.shop = null;
      this.shop = res;
      console.log(res);
    });
  }

  back() {
    this.router.navigate(['.']);
  }

}
