import { Component, OnInit, Input, TemplateRef, ViewChild, HostListener, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ShopService } from '@app/_services/shop.service';
import { ProductData } from '@app/_models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { City, CityOptions } from '@app/_models/city';
import { Township, TownshipOptions } from '@app/_models/township';
import { ShopType } from '@app/_models/shop-type';
import { ShopData } from '@app/_models/shop';
import { ClockPickerDialogService, ClockPickerConfig } from 'ng-clock-picker-lib';

@Component({
  selector: 'app-home',
  templateUrl: './add-shop-step-two.component.html',
  styleUrls: ['./add-shop-step-two.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddShopStepTwoComponent implements OnInit {
  @ViewChild('addForm', { static: true }) addForm: NgForm;
  config: ClockPickerConfig = {
    wrapperClassName: 'myClass',
    closeOnOverlayClick: true,
  };

  cityModalRef: BsModalRef;
  shop = new ShopData(null, null, null, null, null, null, null, null, null, null, 1);
  cityPlaceholder = 'မြို့ရွေးချယ်ပါ။';
  cityOptions: CityOptions[] = [];
  cities: City[];
  shopTypes: ShopType[];
  townships: Township[];
  townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ။';
  townshipModalRef: BsModalRef;
  townshipOptions: TownshipOptions[] = [];
  selectedTownshipToTransfer: TownshipOptions[] = [];
  wholeCountry = false;
  wholeCity = false;
  disabled = true;
  cityIds: string = null;
  baseUrl = environment.apiUrl;
  error: string;
  // links = new LinkData(null, null, null, null);
  selectedProductFiles: ProductData[] = [];
  message: string;
  tempProductImageFile: File = null;
  tempProductImageUrl: any = null;
  productName: string = null;
  productPrice: number = null;
  formValidationMessage: string;
  faPlus = faPlus;

  loading = false;


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.addForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private service: ShopService,
    private router: Router,
    private location: Location,
    private vcr: ViewContainerRef,
    private clockPickerDialogService: ClockPickerDialogService
  ) {}

  ngOnInit() {
    // console.log(this.service.shopData);
    this.clockPickerDialogService.registerViewContainerRef(this.vcr);
    this.route.data.subscribe(data => {
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
  showModal(): void {
    this.clockPickerDialogService.showClockPickerDialog(this.config).subscribe((time: string) => console.log(time));
  }
  openCityModal(template: TemplateRef<any>) {
    this.cityModalRef = this.modalService.show(template);
  }
  openTownshipModal(template: TemplateRef<any>) {
    this.townshipModalRef = this.modalService.show(template);
  }
  // City Modal
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
  checkForWholeCountry(obj: any) {
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
    // console.log(this.cities);
  }
  // Township Modal
  cancelTownshipModal() {
    this.townshipOptions.forEach(data => {
      data.selected = false;
    });
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    this.wholeCity = false;
    this.selectedTownshipToTransfer = [];
    this.townshipModalRef.hide();
  }
  checkAllTownships() {
    if (this.wholeCity === false) {
      this.wholeCity = true;

      this.townshipOptions.forEach(data => {
        data.selected = true;
      });
    } else {
      this.wholeCity = false;
      this.townshipOptions.forEach(data => {
        data.selected = false;
      });
    }
  }
  checkForWholeCity(obj) {
    if (obj.selected === true) {
      this.wholeCity = false;
      return;
    }

    const marker = [];
    this.townshipOptions.forEach(data => {
      if (data.selected === false) {
        marker.push(data);
        return;
      }
    });
    if (marker.length > 1) {
      this.wholeCity = false;
    } else {
      this.wholeCity = true;
    }
  }
  getSelectedTownship() {
    const result = this.townshipOptions
      .filter(opt => {
        return opt.selected;
      })
      .map(opt => {
        return opt;
      });

    this.selectedTownshipToTransfer = result;

    this.townshipPlaceholder = '';
    if (result.length === 1) {
      this.townshipPlaceholder = result[0].value;
    } else if (result.length === 0) {
      this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    } else if (result.length === 2) {
      for (let index = 0; index < 2; index++) {
        if (index === 0) {
          this.townshipPlaceholder = result[index].value;
        } else {
          this.townshipPlaceholder =
            this.townshipPlaceholder + '၊' + result[index].value;
        }
      }
    } else {
      for (let index = 0; index < 3; index++) {
        if (index === 0) {
          this.townshipPlaceholder = result[index].value;
        } else if (index === 1) {
          this.townshipPlaceholder =
            this.townshipPlaceholder + '၊' + result[index].value;
        } else {
          this.townshipPlaceholder = this.townshipPlaceholder + ' ...';
        }
      }
    }
    this.townshipModalRef.hide();
    // console.log(this.selectedTownshipToTransfer);
  }
  // Township Modal End

  changePlaceholderName(opt: any, placeholder: string) {
    placeholder = '';
    for (let index = 1; index < 2; index++) {
      if (index === 1) {
        placeholder = opt[index];
      } else {
        placeholder += '၊' + opt[index];
      }
    }
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
  removeProduct(index: number) {
    this.selectedProductFiles.splice(index, 1);
    this.selectedProductFiles.forEach(element => {
      element.arrayRoom = element.arrayRoom - 1;
    });
  }

  back() {
    this.service.clearData();
    this.router.navigate(['add-shop-step-one']);
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

    // console.log(this.selectedProductFiles);
    this.selectedProductFiles.push(productData);

    this.tempProductImageFile = null;
    this.tempProductImageUrl = null;
    this.productName = null;
    this.productPrice = null;
    this.message = null;
  }

  goToShopStepThree() {
    // console.log(this.selectedTownshipToTransfer);
    // console.log(this.wholeCity);
    // console.log(this.wholeCountry);
    // console.log(this.shop.deliveryFromTime);
    // console.log(this.shop.deliveryToTime);
    if ( this.shop.deliveryFromTime ===  null ||
        this.shop.deliveryToTime === null ||
        this.tempProductImageFile === null || this.tempProductImageUrl == null ||
        this.productName == null || this.productPrice === null ||
        (this.wholeCountry !== true && this.selectedTownshipToTransfer.length === 0)) {
          this.error = 'Please fill out all the fields!';
    } else {
      // this.error = 'hello';
      this.service.shopData.deliveryFromTime = this.shop.deliveryFromTime;
      this.service.shopData.deliveryToTime = this.shop.deliveryToTime;
      this.service.productData = this.selectedProductFiles;
      // console.log(this.service.shopData);
      // console.log(this.selectedProductFiles);
      // console.log(this.cityIds);
      // console.log(this.selectedTownshipToTransfer);
      // this.service.selectedTownships = this.selectedTownshipToTransfer;
      if (this.wholeCountry === true || this.cityIds == null) {
        this.service.selectedTownships = 'All';
      } else if (
        this.wholeCountry === false &&
        this.selectedTownshipToTransfer.length === 0
      ) {
        this.service.selectedTownships = this.townshipOptions.map(x => x.id).join(',');
      } else {
        this.service.selectedTownships = this.selectedTownshipToTransfer.map(x => x.id).join(',');
      }
      this.router.navigate(['/add-shop-step-three']);
    }
    // console.log(this.service.shopData);
  }
  
}