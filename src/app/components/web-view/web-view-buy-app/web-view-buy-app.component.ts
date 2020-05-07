import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import * as AOS from 'aos';
import { AotSummaryResolver } from '@angular/compiler';

@Component({
    selector: 'app-home',
    templateUrl: './web-view-buy-app.component.html',
    styleUrls: ['./web-view-buy-app.component.css']
})
export class WebViewBuyApp implements OnInit {
    public show: boolean = false;
    public buttonName: any = 'အကုန်ကြည့်ရန်';

    constructor(private router: Router) {}
    ngOnInit() {
        AOS.init();
    }

    scroll(el: HTMLElement) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    gotoWebViewHome() {
        this.router.navigate(['web-view-home']);
    }
    gotoWebViewShopAdd() {
        this.router.navigate(['web-view-shop-add']);
    }
    gotoWebViewContactUs() {
        this.router.navigate(['web-view-contact-us']);
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
}