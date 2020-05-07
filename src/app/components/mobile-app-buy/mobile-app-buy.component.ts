import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './mobile-app-buy.component.html',
  styleUrls: ['./mobile-app-buy.component.css']
})

export class MobileAppBuyComponent implements OnInit {
  constructor(private router: Router) {}

  public show: boolean = false;
  public buttonName: any = 'အကုန်ကြည့်ရန်';

  ngOnInit() {}


  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
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


  goToSearch() {
    this.router.navigate(['/shop-search']);
  }
  goToShopAdd() {
    this.router.navigate(['/add-shop-step-one']);
  }

  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
}




