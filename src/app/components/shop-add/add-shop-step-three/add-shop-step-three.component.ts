import { Component, OnInit, Input, ViewChild, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ShopService } from '@app/_services/shop.service';
import { ShopData} from '@app/_models/shop';
import { ProductData } from '@app/_models/product';

@Component({
    selector: 'app-home',
    templateUrl: './add-shop-step-three.component.html',
    styleUrls: ['./add-shop-step-three.component.css']
  })

export class AddShopStepThreeComponent implements OnInit {
  @ViewChild('addForm', { static: true }) addForm: NgForm;
  baseUrl = environment.apiUrl;
  links = new LinkData(null, null, null, null);
  loading = false;
  // androidLink: string = null;
  // iosLink: string = null;
  // websiteLink: string = null;
  // facebookLink: string = null;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private service: ShopService,
    private router: Router
  ) {}
  ngOnInit() {
    // console.log(this.service.shopData);
    // console.log(this.service.productData);
  }
  addNewShop() {
    // console.log(this.facebookLink);
    this.service.shopData.facebookLink = this.links.facebookLink;
    this.service.shopData.androidLink = this.links.androidLink;
    this.service.shopData.iosLink = this.links.iosLink;
    this.service.shopData.websiteLink = this.links.websiteLink;

    this.loading = true;

    this.service.postShop(this.service.shopData).subscribe(res => {
      if (res != null) {
        this.service.postShopImage(this.service.shopImgFile, res.id).subscribe(response => {
          if (response != null) {
            this.service.postShopDeliveryAvailableLocation(this.service.selectedTownships, res.id).subscribe(data => {
              if (data.status) {
                if (this.service.selectedAdveriesementFiles.length > 0) {
                  this.service.postAdvertisement(this.service.selectedAdveriesementFiles, res.id).subscribe(result => {
                    if (result.status) {
                      this.service.postProduct(this.service.productData, res.id).subscribe(finalResult => {
                        if (finalResult.status) {
                          this.service.selectedAdveriesementFiles = [];
                          this.service.selectedTownships = null;
                          this.service.shopData = null;
                          this.service.shopImgFile = null;
                          this.loading = false;
                          this.router.navigate(['']);
                        } else {
                          console.log(finalResult.message);
                        }
                      });
                    }
                  });
                } else {
                  this.service.postProduct(this.service.productData, res.id).subscribe(finalResult => {
                    if (finalResult.status) {
                      this.service.selectedAdveriesementFiles = [];
                      this.service.selectedTownships = null;
                      this.service.shopData = null;
                      this.service.shopImgFile = null;
                      this.loading = false;
                      this.router.navigate(['']);
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }
  back3() {
    this.service.clearData3();
    this.router.navigate(['add-shop-step-two']);
  }
}
export class LinkData {
  constructor(
      public websiteLink: string,
      public facebookLink: string,
      public androidLink: string,
      public iosLink: string,
  ) {}
  // tslint:disable-next-line: eofline
}