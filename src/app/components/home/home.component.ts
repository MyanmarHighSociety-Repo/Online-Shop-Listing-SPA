import { Component, OnInit , AfterViewInit , ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '@app/_services/home.service';
import { GetShopTypeResponse, GetHomeShopListResponse } from '@app/_models/home-models';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //sticky
  @ViewChild('stickyMenu',{static: false }) menuElement: ElementRef;
  sticky: boolean = false;
  menuPosition: any;
  ngAfterViewInit(){
    this.menuPosition = this.menuElement.nativeElement.offsetTop
  }
    @HostListener('window:scroll', ['$event'])
    handleScroll(){
        const windowScroll = window.pageYOffset;
        if(windowScroll >= this.menuPosition){
            this.sticky = true;
        } else {
            this.sticky = false;
        }
    }

  // Tabs
  tablinks1 = 'active';
  tablinks2 = '';
  tablinks3 = '';
  tablinks4 = 'active';
  tablinks5 = '';

  // Array Variable
  shopTypeList: GetShopTypeResponse[];
  shopList: GetHomeShopListResponse[];

  // Variable
  currentCity = '1';
  pageSize = 6;
  pageNumber = 1;
  isOpenOnHolidayFilter = false;
  townshipReadMore = false;
  townshipReadMoreText = 'ထပ်ကြည့်ရန်...';

  // tslint:disable-next-line: member-ordering
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
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

  constructor(private service: HomeService,
              private router: Router) { }

  ngOnInit() {
    this.getShopType();
    this.getHomeShopList();
  }

  changeTab(tab) {
    if (tab === 'tablinks1') {
      this.tablinks1 = 'active';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'inactive';
      this.currentCity = '1';
      this.getHomeShopList();
    } else if (tab === 'tablinks2') {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'active';
      this.tablinks3 = 'inactive';
      this.currentCity = '3';
      this.getHomeShopList();
    } else {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'active';
      this.currentCity = '0';
      this.getHomeShopList();
    }

  }

  changeTab1(tab) {
    if (tab === 'tablinks4') {
      this.tablinks4 = 'active';
      this.tablinks5 = 'inactive';
      this.isOpenOnHolidayFilter = false;
      this.getHomeShopList();
    } else {
      this.tablinks4 = 'inactive';
      this.tablinks5 = 'active';
      this.isOpenOnHolidayFilter = true;
      this.getHomeShopList();
    }

  }

  getShopType() {
    this.service.getShopType().subscribe( res => {
      this.shopTypeList = res;
    });
  }

  getHomeShopList() {
    this.service.getHomeShopList(this.pageSize, this.pageNumber, this.currentCity, this.isOpenOnHolidayFilter).subscribe( res => {
      this.shopList = [];
      this.shopList = res;
    });
  }

  search() {
    this.router.navigate(['/shop-search']);
  }

  shopDetail(shopId) {
    this.router.navigate(['/shop-detail'], { queryParams: {shopId } });
  }

  viewMoreShop() {
    this.router.navigate(['/view-more-shop'], { queryParams: {currentCity: this.currentCity} });
  }

  changeTownshipReadMore() {
    this.townshipReadMore = !this.townshipReadMore;
    if (!this.townshipReadMore) {
      this.townshipReadMoreText = 'ထပ်ကြည့်ရန်...';
    } else {
      this.townshipReadMoreText = 'See Less';
    }
    }

}
