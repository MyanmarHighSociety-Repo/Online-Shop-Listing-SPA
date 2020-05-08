import { Component, OnInit, Input, VERSION } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './web-view-contact-us.component.html',
    styleUrls: ['./web-view-contact-us.component.css']
})

export class WebViewContactUsComponent implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {}
    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
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
