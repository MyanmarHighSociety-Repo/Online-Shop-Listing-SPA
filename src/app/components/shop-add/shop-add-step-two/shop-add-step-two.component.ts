import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { ProductData } from '@app/_models/product';

@Component({
  selector: 'app-home',
  templateUrl: './shop-add-step-two.component.html',
  styleUrls: ['./shop-add-step-two.component.css']
})
export class ShopAddStepTwoComponent implements OnInit {
  links = new LinkData(null, null, null, null);
  selectedProductFiles: ProductData[] = [];
  message: string;
  tempProductImageFile: File = null;
  tempProductImageUrl: any = null;
  productName: string = null;
  productPrice: number = null;
  formValidationMessage: string;

  constructor(private service: ShopService) { }

  ngOnInit() {}

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
    this.service.shopData.andriodLink = this.links.andriodLink;
    this.service.shopData.iosLink = this.links.iosLink;
    this.service.shopData.facebooLink = this.links.facebooLink;
    this.service.shopData.websiteLink = this.links.websiteLink;
  }

  removeProduct(index: number) {
    this.selectedProductFiles.splice(index, 1);
    this.selectedProductFiles.forEach(element => {
      element.arrayRoom = element.arrayRoom - 1;
    });
  }

  addNewProductEntry() {
    if (this.tempProductImageUrl === null ||
      this.tempProductImageFile === null ||
      this.productName === null ||
      this.productPrice === null ) {
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
      public facebooLink: string,
      public andriodLink: string,
      public iosLink: string,
  ) {}
}