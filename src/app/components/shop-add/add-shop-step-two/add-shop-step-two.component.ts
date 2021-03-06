import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { ProductData } from '@app/_models/product';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './add-shop-step-two.component.html',
  styleUrls: ['./add-shop-step-two.component.css']
})
export class AddShopStepTwoComponent implements OnInit {
  links = new LinkData(null, null, null, null);
  selectedProductFiles: ProductData[] = [];
  message: string;
  tempProductImageFile: File = null;
  tempProductImageUrl: any = null;
  productName: string = null;
  productPrice: number = null;
  formValidationMessage: string;
  faPlus = faPlus;

  loading = false;

  constructor(private service: ShopService, private router: Router, private location: Location) { }

  ngOnInit() {
    console.log(this.service.selectedTownships);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.tempProductImageFile = files[0];
      this.tempProductImageUrl = reader.result;
    };
  }

  addNewShop() {
    if (this.selectedProductFiles.length === 0) {
      this.formValidationMessage = 'Must add at least one product!';
      return;
    }
    this.service.shopData.androidLink = this.links.androidLink;
    this.service.shopData.iosLink = this.links.iosLink;
    this.service.shopData.facebookLink = this.links.facebookLink;
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
                      this.service.postProduct(this.selectedProductFiles, res.id).subscribe(finalResult => {
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
                  this.service.postProduct(this.selectedProductFiles, res.id).subscribe(finalResult => {
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

  removeProduct(index: number) {
    this.selectedProductFiles.splice(index, 1);
    this.selectedProductFiles.forEach(element => {
      element.arrayRoom = element.arrayRoom - 1;
    });
  }

  back() {
    this.service.clearData();
    this.location.back();
  }

  addNewProductEntry() {
    if (this.tempProductImageUrl === null ||
      this.tempProductImageFile === null ||
      this.productName === null) {
        this.message = 'Please fill out all the fields first';
        return;
    }
    const productData = new ProductData(null, null, null, null, null);
    productData.file = this.tempProductImageFile;
    productData.url = this.tempProductImageUrl;
    productData.name = this.productName;
    productData.price = this.productPrice;
    productData.arrayRoom = this.selectedProductFiles.length;

    this.selectedProductFiles.push(productData);

    this.tempProductImageFile = null;
    this.tempProductImageUrl = null;
    this.productName = null;
    this.productPrice = null;
    this.message = null;
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