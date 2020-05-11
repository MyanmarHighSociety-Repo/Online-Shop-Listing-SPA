import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './mobile-app-buy.component.html',
  styleUrls: ['./mobile-app-buy.component.css']
})

export class MobileAppBuyComponent implements OnInit {
  constructor(private router: Router) {}

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    parallax: true,
    autoplay: true,
    speed: 1000,


  };

  public show: boolean = false;
  public buttonName: any = 'အကုန်ကြည့်ရန်';
  public viewmoreshow: boolean = false;
  public viewmorename: any = 'ဆက်ကြည့်ရန်';

  ngOnInit() {}

  viewmore() {
    this.viewmoreshow = !this.viewmoreshow;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.viewmoreshow) {
    this.viewmorename = ' Less';
    }
    else {
    this.viewmorename = 'ဆက်ကြည့်ရန်';
  }
}

    toggle() {
      this.show = !this.show;
      // CHANGE THE NAME OF THE BUTTON.
      if (this.show) {
      this.buttonName = 'View Less';
      }
      else {
      this.buttonName = 'အကုန်ကြည့်ရန်';
    }
  }




  goToHome() {
    this.router.navigate(['/']);
  }
  goToSearch() {
    this.router.navigate(['/shop-search']);
  }
  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
  goToShopAdd() {
    this.router.navigate(['/add-shop-step-one']);
  }



}








