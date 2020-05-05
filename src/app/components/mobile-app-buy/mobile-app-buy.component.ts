import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './mobile-app-buy.component.html',
  styleUrls: ['./mobile-app-buy.component.css']
})

export class MobileAppBuyComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToSearch() {
    this.router.navigate(['/shop-search']);
  }
}




