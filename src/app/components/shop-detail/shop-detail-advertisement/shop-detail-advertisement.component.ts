import { Component, OnInit } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GetHomeShopListAdvertisementResponse } from '@app/_models/home-models';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.shopId = this.route.snapshot.queryParamMap.get('shopId');
    this.getAdvertisementByShopId();
  }

  back() {
    this.router.navigate(['/shop-detail'], { queryParams: {shopId : this.shopId } });
  }

  getAdvertisementByShopId() {
    this.service.getAdvertisementByShopId(this.shopId).subscribe( res => {
      this.shopAdvertisement = null;
      this.shopAdvertisement = res;
      console.log(res)
    });
  }

}
