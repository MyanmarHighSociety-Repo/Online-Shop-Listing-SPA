import { Component, OnInit } from '@angular/core';
import { ShopService } from './_services/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private service: ShopService) {}

  ngOnInit() {
    this.service.clearData();
  }
}
