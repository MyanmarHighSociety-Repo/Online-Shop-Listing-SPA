import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './web-view-home.component.html',
    styleUrls: ['./web-view-home.component.css']
})

export class WebViewHomeComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['web-view-buy-app']);
        }, 7000);
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
    gotoWebViewBuyApp() {
        this.router.navigate(['web-view-buy-app']);
    }

}
