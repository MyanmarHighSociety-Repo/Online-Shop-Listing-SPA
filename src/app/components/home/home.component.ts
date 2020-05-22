import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeService } from '@app/_services/home.service';
import {
  GetShopTypeResponse,
  GetHomeShopListResponse
} from '@app/_models/home-models';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { ShopService } from '@app/_services/shop.service';
import { Township, City } from '@app/_models/city';
import { TownshipOptions } from '@app/_models/township';
import { SwiperOptions } from 'swiper';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;

  // configbanner: SwiperOptions = {
  //   pagination: { el: '.home-swiper-pagination', clickable: true },

  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   spaceBetween: 30,
  //   parallax: true,
  //   effect: 'fade',
  //   speed: 30,
  //   autoplay: true


  // };


  // config: SwiperOptions = {
  //   pagination: { el: '.home-swiper-pagination', clickable: true },
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev'
  //   },
  //   spaceBetween: 30,
  //   parallax: true,
  //   autoplay:false,


  // };

  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: false,
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




  sticky = false;
  menuPosition: any;

  // Tabs
  tablinks1 = 'active';
  tablinks2 = '';
  tablinks3 = '';
  tablinks4 = 'active';
  tablinks5 = '';

  // Array Variable
  shopTypeList: GetShopTypeResponse[];
  shopType : GetHomeShopListResponse[];
  shopTypeFish : GetHomeShopListResponse[];
  shopTypeMedicine : GetHomeShopListResponse[];
  shopList: GetHomeShopListResponse[];
  hotshopList: GetHomeShopListResponse[];
  moreResult: GetHomeShopListResponse[];

  // Variable
  shopName = '';
  shopTypeId = '1';
  shopTypeId1 = '2';
  shopTypeId2 = '3';
  townId = '1';
  currentCity = '1';
  pageSize = 1;
  pageNumber = 1;
  totalPages = 1;
  isOpenOnHolidayFilter = false;
  townshipReadMore = false;
  townshipReadMoreText = 'ထပ်ကြည့်ရန်...';
  viewMoreClicked = false;
  currentPage = 1;
  cities: any;
  townships: Township[];
  townshipOptions: TownshipOptions[] = [];
  pageInfo: any;
  shopId = '';
  desReadMore = false;
  desReadMoreText = 'ထပ်ကြည့်ရန်...';
  shop: GetHomeShopListResponse;

  wholeCountry = false;
  searchText: string;
  cityIds: string = null;

   show1: boolean = false;
   show2: boolean = false;
   show3: boolean = false;
   show4: boolean = false;
   show5: boolean = false;
   show6: boolean = false;

  buttonName: any = 'ထပ်ကြည့်ရန်';

  // @HostListener('window:scroll', ['$event'])
  @HostListener('window:scroll', [])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.menuPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  // tslint:disable-next-line: member-ordering
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    animateOut: 'fadeOut',
    autoplay: true,
    autoplaySpeed:2200,
    navSpeed: 2200,
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





  constructor(
    private service: HomeService,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getShopType();
    this.gethotResult();
    this.getResult();
    this.getshopTypeList();
    this.getshopTypeList1();
    this.getshopTypeList2();
    this.shopService.searchFormShopType = '';
    this.shopService.searchFormText = '';
    this.shopService.searchFormTownship = '';
    this.loadResult('1');
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.menuPosition = this.menuElement.nativeElement.offsetTop;
  }

  changeTab(tab) {
    if (tab === 'tablinks1') {
      this.tablinks1 = 'active';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'inactive';
      this.currentCity = '1';
      this.loadResult(this.currentCity);
    } else if (tab === 'tablinks2') {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'active';
      this.tablinks3 = 'inactive';
      this.currentCity = '2';
      this.loadResult(this.currentCity);
    } else {
      this.tablinks1 = 'inactive';
      this.tablinks2 = 'inactive';
      this.tablinks3 = 'active';
      this.currentCity = '0';
      this.loadResult(this.currentCity);
    }
  }
  gethotResult() {   
    this.service.getHotShopList
      (this.pageSize.toString(), this.pageNumber.toString(), this.currentCity.toString(), this.isOpenOnHolidayFilter)
      .subscribe(res => {
        console.log(res);
        
        this.hotshopList = [];
        this.hotshopList = res;
      });
  }
  getShopType() {
    this.service.getShopType().subscribe(res => {
      this.shopTypeList = res;
    });
  }
  getshopTypeList() {
    this.service.getShopTypeList
    (this.shopName,this.shopTypeId.toString(),this.currentCity.toString(),this.townId)
    .subscribe(res => {
      console.log(res);
      this.shopType = [];
      this.shopType = res;
    });
  }
  getshopTypeList2() {
    this.service.getShopTypeList
    (this.shopName,this.shopTypeId2.toString(),this.currentCity.toString(),this.townId)
    .subscribe(res => {
      console.log(res);
      this.shopTypeMedicine = [];
      this.shopTypeMedicine = res;
    });
  }
  getshopTypeList1() {
    this.service.getShopTypeList
    (this.shopName,this.shopTypeId1.toString(),this.currentCity.toString(),this.townId)
    .subscribe(res => {
      console.log(res);
      this.shopTypeFish = [];
      this.shopTypeFish = res;
    });
  }
  getResult() {   
    this.service.getHomeShopList
      (this.pageSize.toString(), this.pageNumber.toString(), this.currentCity.toString(), this.isOpenOnHolidayFilter)
      .subscribe(res => {
        console.log(res);
        this.shopList = [];
        this.shopList = res;
      });
  }
  // getResult() {
  //   this.shopService
  //     .getSearchResult(this.pageSize.toString(), this.pageNumber.toString())
  //     .subscribe(res => {
  //       this.pageInfo = JSON.parse(res.headers.get('pagination'));
  //       const totalItems = this.pageInfo.totalItems;
  //       if (totalItems === 0) {
  //         this.totalPages = 0;
  //         this.currentPage = 0;
  //       } else {
  //         this.totalPages = this.pageInfo.totalPages;
  //         this.currentPage = this.pageInfo.currentPage;
  //       }
  //       this.shopList = [];
  //       this.shopList = res.body;
  //     });
  // }

  loadResult(cityId) {
    this.pageNumber = 1;
    this.shopService.getTownShips(cityId).subscribe(res => {
      this.townshipOptions = [];
      this.townships = res.townList;
      this.townships.forEach(data => {
        this.townshipOptions.push({
          id: data.id,
          value: data.name,
          selected: false
        });
      });
      this.shopService.searchFormTownship = this.townshipOptions
        .map(x => x.id)
        .join(',');
      if (this.shopService.searchFormTownship === '') {
        this.shopService.searchFormTownship = '0';
      }
      if (cityId !== '1') {
        this.shopService.representCity = cityId;
        this.router.navigate(['/shop-search-result']);
      } else {
        this.getResult();
      }
    });
  }

  search(shoptype) {
    this.shopService.searchFormText = null;
    this.shopService.searchFormTownship = null;
    this.shopService.searchFormShopType = shoptype.toString();

    this.router.navigate(['/shop-search-result']);
  }




  shopDetail(shopId) {
    this.router.navigate(['/shop-detail'], { queryParams: { shopId } });
  }

  viewMoreShop() {
    // this.router.navigate(['/view-more-shop'], { queryParams: {currentCity: this.currentCity} });
    this.viewMoreClicked = true;
    this.pageNumber = +this.pageInfo.currentPage + 1;
    this.shopService
      .getSearchResult(this.pageSize.toString(), this.pageNumber.toString())
      .subscribe(res => {
        this.pageInfo = JSON.parse(res.headers.get('pagination'));
        this.totalPages = this.pageInfo.totalPages;
        this.currentPage = this.pageInfo.currentPage;
        this.moreResult = [];
        this.moreResult = res.body;
        this.moreResult.forEach(element => {
          this.shopList.push(element);
        });
        this.viewMoreClicked = false;
      });
  }

  changeTownshipReadMore() {
    this.townshipReadMore = !this.townshipReadMore;
    if (!this.townshipReadMore) {
      this.townshipReadMoreText = 'ထပ်ကြည့်ရန်...';
    } else {
      this.townshipReadMoreText = 'See Less';
    }
  }

  changeDesReadMore() {
    this.desReadMore = !this.desReadMore;
    if (!this.desReadMore) {
      this.desReadMoreText = 'ထပ်ကြည့်ရန်...';
    } else {
      this.desReadMoreText = 'See Less';
    }
    }

  goToSearch() {
    this.router.navigate(['/coming-soon']);
  }
  goToShopAdd() {
    this.router.navigate(['/coming-soon']);
  }

  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
  goToApp() {
    this.router.navigate(['/BuyApp']);
  }


// search() {
//   this.shopService.searchFormText = this.searchText;
//   let counter = 1;
//   this.shopTypeList.forEach(element => {
//     if (element.showSpan != null && element.showSpan !== false) {
//       if (counter === 1) {
//         this.shopService.searchFormShopType = element.id.toString();
//       } else {
//         this.shopService.searchFormShopType += ',' + element.id.toString();
//       }
//       counter++;
//     }
//   });

//   if (this.wholeCountry === true || this.cityIds == null) {
//     this.shopService.searchFormTownship = 'All';
//   } else if (
//     this.wholeCountry === false &&
//     this.townshipOptions.length === 0
//   ) {
//     this.shopService.searchFormTownship = this.townshipOptions.map(x => x.id).join(',');
//   } else {
//     this.shopService.searchFormTownship = this.townshipOptions.map(x => x.id).join(',');
//   }

//   this.router.navigate(['/shop-search-result']);
// }
toggle1() {
  this.show1 = !this.show1;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show1) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}

toggle2() {
  this.show2 = !this.show2;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show2) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}

toggle3() {
  this.show3 = !this.show3;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show3) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}

toggle4() {
  this.show4 = !this.show4;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show4) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}


toggle5() {
  this.show5 = !this.show5;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show5) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}

toggle6() {
  this.show6 = !this.show6;
  // CHANGE THE NAME OF THE BUTTON.
  if (this.show6) {
  this.buttonName = 'View Less';
  }
  else {
  this.buttonName = 'ထပ်ကြည့်ရန်';
}
}


}

