import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ShopService } from '@app/_services/shop.service';
import { ProductData } from '@app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { City, CityOptions } from '@app/_models/city';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopType } from '@app/_models/shop-type';

@Component({
  selector: 'app-home',
  templateUrl: './add-shop-step-two.component.html',
  styleUrls: ['./add-shop-step-two.component.css']
})
export class AddShopStepTwoComponent implements OnInit {
  cityModalRef: BsModalRef;
  cityPlaceholder = 'မြို့ရွေးချယ်ပါ';
  cityOptions: CityOptions[] = [];
  cities: City[];
  shopTypes: ShopType[];
  townships: Township[];
  townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
  townshipOptions: TownshipOptions[] = [];
  selectedTownshipToTransfer: TownshipOptions[] = [];
  wholeCountry = false;
  wholeCity = false;
  disabled = true;
  cityIds: string = null;
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

  constructor(
    private service: ShopService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: BsModalService) { }

  ngOnInit() {
    console.log(this.service.selectedTownships);
    this.route.data.subscribe(data => {
      this.shopTypes = data.shopTypes;
      this.cities = data.cities.cityList;
      this.cities.forEach(val => {
        this.cityOptions.push({
          id: val.id,
          value: val.name,
          selected: false
        });
      });
    });
  }
  openCityModal(template: TemplateRef<any>) {
    this.cityModalRef = this.modalService.show(template);
  }
  cancelCityModal() {
    this.cityOptions.forEach(data => {
      data.selected = false;
    });
    this.cityPlaceholder = 'မြို့ရွေးချယ်ပါ';
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    this.townshipOptions = [];
    this.selectedTownshipToTransfer = [];
    this.wholeCountry = false;
    this.wholeCity = false;
    this.cityIds = null;
    this.disabled = true;
    this.cityModalRef.hide();
  }
  checkAllCities() {
    if (this.wholeCountry === false) {
      this.wholeCountry = true;

      this.cityOptions.forEach(data => {
        data.selected = true;
      });
    } else {
      this.wholeCountry = false;
      this.cityOptions.forEach(data => {
        data.selected = false;
      });

      this.townshipOptions.forEach(data => {
        data.selected = false;
      });
    }
  }
  checkForWholeCountry(obj) {
    if (obj.selected === true) {
      this.wholeCountry = false;
      return;
    }
  }
  getSelectedCity() {
    if (this.wholeCountry) {
      this.disabled = true;
      this.cityPlaceholder = 'တစ်နိုင်ငံလုံး';
      this.townshipPlaceholder = 'မြို့နယ်အားလုံး';
      this.cityModalRef.hide();
      this.cityIds = null;
      return;
    }
    this.disabled = false;
    this.selectedTownshipToTransfer = [];
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    const result = this.cityOptions
      .filter(opt => {
        return opt.selected;
      })
      .map(opt => {
        return opt;
      });

    if (result == null || result.length === 0) {
      return;
    }
    this.cityIds = null;
    this.cityIds = result.map(x => x.id).join(',');
    this.service.getTownShips(this.cityIds).subscribe(res => {
      this.townshipOptions = [];
      this.townships = res.townList;
      this.townships.forEach(data => {
        this.townshipOptions.push({
          id: data.id,
          value: data.name,
          selected: false
        });
      });
    });

    this.cityPlaceholder = '';
    this.cityPlaceholder = '';
    if (result.length === 1) {
      this.cityPlaceholder = result[0].value;
    } else if (result.length === 0) {
      this.cityPlaceholder = 'တစ်နိုင်ငံလုံး';
    } else if (result.length === 2) {
      for (let index = 0; index < 2; index++) {
        if (index === 0) {
          this.cityPlaceholder = result[index].value;
        } else {
          this.cityPlaceholder =
            this.cityPlaceholder + '၊' + result[index].value;
        }
      }
    } else {
      for (let index = 0; index < 3; index++) {
        if (index === 0) {
          this.cityPlaceholder = result[index].value;
        } else if (index === 1) {
          this.cityPlaceholder =
            this.cityPlaceholder + '၊' + result[index].value;
        } else {
          this.cityPlaceholder = this.cityPlaceholder + ' ...';
        }
      }
    }
    this.cityModalRef.hide();
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