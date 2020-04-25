import { Component, OnInit } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-detail-advertisement',
  templateUrl: './shop-detail-advertisement.component.html',
  styleUrls: ['./shop-detail-advertisement.component.css']
})
export class ShopDetailAdvertisementComponent implements OnInit {

  shopId = '';
  shopAdvertisement: GetHomeShopListAdvertisementResponse[];

  constructor(private service: ShopService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private location: Location) { }

  ngOnInit() {
    this.shopId = this.route.snapshot.queryParamMap.get('shopId');
    this.getAdvertisementByShopId();
  }

  back() {
    this.service.clearData();
    this.location.back();
  }

  getAdvertisementByShopId() {
    this.service.getAdvertisementByShopId(this.shopId).subscribe( res => {
      this.shopAdvertisement = null;
      this.shopAdvertisement = res;

      this.shopAdvertisement.forEach(element => {
        element.caption = element.caption.replace(/%0A/g, '<br />');
        element.safteHtml = this.sanitizer.bypassSecurityTrustHtml(element.caption);
      });
    });
  }
}
