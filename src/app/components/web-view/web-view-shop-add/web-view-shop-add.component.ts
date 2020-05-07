import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './web-view-shop-add.component.html',
    styleUrls: ['./web-view-shop-add.component.css']
})

export class WebViewShopAdd implements OnInit {
    constructor(private router: Router) {}
    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['web-view-contact-us']);
        }, 20000);
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

}
