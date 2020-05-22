import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SwiperOptions } from 'swiper';
import * as AOS from 'aos';

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
  public show2: boolean = false;
  public show3: boolean = false;
  public show4: boolean = false;
  public show5: boolean = false;
  public show6: boolean = false;
  public buttonName: any = 'အကုန်ကြည့်ရန် ...';
  public viewmoreshow: boolean = false;
  public viewmorename: any = 'ဆက်ကြည့်ရန်';

  public cardButton4: any = 'အကုန်ကြည့်ရန်...';
  public cardButton5: any = 'အကုန်ကြည့်ရန်...';
  public cardButton6: any = 'အကုန်ကြည့်ရန်...';
  ngOnInit() {
    AOS.init();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
    }

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
      this.buttonName = 'ချုံရန်';
      }
      else {
      this.buttonName = 'အကုန်ကြည့်ရန်';
    }
  }
  toggle2() {
    this.show2 = !this.show2;
  }
  toggle3() {
    this.show3 = !this.show3;
  }
  toggle4() {
    this.show4 = !this.show4;
     // CHANGE THE NAME OF THE BUTTON.
    if (this.show4) {
      this.cardButton4 = 'ချုံ့ရန်';
    } else {
      this.cardButton4 = 'အကုန်ကြည့်ရန်...';
    }
  }
  toggle5() {
    this.show5 = !this.show5;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show5) {
      this.cardButton5 = 'ချုံ့ရန်';
    } else {
      this.cardButton5 = 'အကုန်ကြည့်ရန်...';
    }
  }
  toggle6() {
    this.show6 = !this.show6;
    // CHANGE THE NAME OF THE BUTTON.
    if (this.show6) {
      this.cardButton6 = 'ချုံ့ရန်';
    } else {
      this.cardButton6 = 'အကုန်ကြည့်ရန်...';
    }
  }


  goToHome() {
    this.router.navigate(['/home']);
  }
  goToSearch() {
    this.router.navigate(['coming-soon']);
  }
  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
  goToShopAdd() {
    this.router.navigate(['/coming-soon']);
  }
}








