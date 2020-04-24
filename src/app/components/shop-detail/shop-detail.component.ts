import { Component, OnInit, TemplateRef } from '@angular/core';
import { GetHomeShopListResponse } from '@app/_models/home-models';
import { ShopService } from '@app/_services/shop.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.css']
})
export class ShopDetailComponent implements OnInit {

  // Variable
  shopId = '';
  townshipReadMore = false;
  townshipReadMoreText = 'ထပ်ကြည့်ရန်...';
  desReadMore = false;
  desReadMoreText = 'ထပ်ကြည့်ရန်...';
  shop: GetHomeShopListResponse;

  modalRef: BsModalRef;

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
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private location: Location) { }

  ngOnInit() {
    this.shopId = this.route.snapshot.queryParamMap.get('shopId');
    this.getShopDetail();
  }

  getShopDetail() {
    this.service.getShopDetail(this.shopId).subscribe( res => {
      this.shop = res;
    });
  }

  changeTownshipReadMore() {
  this.townshipReadMore = !this.townshipReadMore;
  if (!this.townshipReadMore) {
    this.townshipReadMoreText = 'ထပ်ကြည့်ရန်...';
  } else {
    this.townshipReadMoreText = 'See Less';
  }
  }

  changeDesReadMore() {
  this.desReadMore = !this.desReadMore;
  if (!this.desReadMore) {
    this.desReadMoreText = 'ထပ်ကြည့်ရန်...';
  } else {
    this.desReadMoreText = 'See Less';
  }
  }

  back() {
    this.location.back();
  }

  shopDetailAdvertisement(shopId) {
    this.router.navigate(['/shop-detail-advertisement'], { queryParams: {shopId} });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      animated: true,
      backdrop: 'static'
    });
  }

  hideModal() {
  }

}
