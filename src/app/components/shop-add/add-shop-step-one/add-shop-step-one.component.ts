import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';
import { ShopData } from '@app/_models/shop';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopType } from '@app/_models/shop-type';
import { City, CityOptions } from '@app/_models/city';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ShopService } from '@app/_services/shop.service';
import { Township, TownshipOptions } from '@app/_models/township';
import { AdvertisementData } from '@app/_models/advertisement';
import { Location } from '@angular/common';
import { ClockPickerDialogService, ClockPickerConfig } from 'ng-clock-picker-lib';

@Component({
  selector: 'app-home',
  templateUrl: './add-shop-step-one.component.html',
  styleUrls: ['./add-shop-step-one.component.css'],
})
export class AddShopStepOneComponent implements OnInit {
  @ViewChild('addForm', { static: true }) addForm: NgForm;

  config: ClockPickerConfig = {
    wrapperClassName: 'myClass',
  };
  fromTime: string;
  cityModalRef: BsModalRef;
  advertisementModalRef: BsModalRef;
  townshipModalRef: BsModalRef;
  shop = new ShopData(null, null, null, null, null, null, null, null, null, null, 1);
  shopTypes: ShopType[];
  cities: City[];
  townships: Township[];
  localImageUrl: any;
  advertiseImageUrl: any;
  baseUrl = environment.apiUrl;
  cityOptions: CityOptions[] = [];
  townshipOptions: TownshipOptions[] = [];
  cityPlaceholder = 'မြို့ရွေးချယ်ပါ';
  sleectedAdvertisementFiles: AdvertisementData[] = [];
  message: string;
  imageUrl: any;
  caption: string;
  townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
  shopImgFile: File = null;
  shopImageMessage: string;
  selectedTownshipToTransfer: TownshipOptions[] = [];
  error: string;
  shopTypeDropdownClicked = false;
  shopTypeDropdownPlaceholder = 'ဆိုင်အမျိုးအစား‌ရွေးချယ်ရန်';
  selectedDropdownImg = null;

  tempAdvertisementFile: File;
  tempUrl: any;

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
    this.clockPickerDialogService.registerViewContainerRef(this.vcr);
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

  setDropdownStatus() {
    this.shopTypeDropdownClicked = !this.shopTypeDropdownClicked;
  }
  openAdvertisementModal(template: TemplateRef<any>) {
    this.advertisementModalRef = this.modalService.show(template);
  }

  openTownshipModal(template: TemplateRef<any>) {
    this.townshipModalRef = this.modalService.show(template);
  }

  getSelectedCity() {
    this.selectedTownshipToTransfer = [];
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    const result = this.cityOptions
      .filter(opt => {
        return opt.selected;
      })
      .map(opt => {
        return opt;
      });

    const cityids = result.map(x => x.id).join(',');

    this.service.getTownShips(cityids).subscribe(res => {
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
      this.cityPlaceholder = 'မြို့ရွေးချယ်ပါ';
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
            this.cityPlaceholder =
              this.cityPlaceholder + ' ...';
        }
      }
    }
    this.cityModalRef.hide();
  }

  setSelectedShopType(shopType: ShopType) {
    this.shop.shopTypeId = shopType.id;
    this.shopTypeDropdownPlaceholder = shopType.name;
    this.selectedDropdownImg = shopType.iconUrl;
    this.shopTypeDropdownClicked = false;
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
            this.townshipPlaceholder =
              this.townshipPlaceholder + ' ...';
        }
      }
    }
    this.townshipModalRef.hide();
  }

  cancelCityModal() {
    this.cityOptions.forEach(data => {
      data.selected = false;
    });
    this.cityPlaceholder = 'မြို့ရွေးချယ်ပါ';
    this.townshipOptions = [];
    this.cityModalRef.hide();
  }

  cancelTownshipModal() {
    this.townshipOptions.forEach(data => {
      data.selected = false;
    });
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    this.townshipModalRef.hide();
  }

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

  onShopImageSelected(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.shopImageMessage = 'Only images are supported.';
      return;
    }
    this.shopImgFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.localImageUrl = reader.result;
    };
  }

  onFileSelected(data) {
    this.sleectedAdvertisementFiles.push(data.target.files[0]);
  }

  getAdvertisementData() {
    const advertisementData = new AdvertisementData(
      this.tempUrl,
      this.tempAdvertisementFile,
      this.caption
    );

    this.sleectedAdvertisementFiles.push(advertisementData);
    this.cancelAdvertisementModal();
  }

  cancelAdvertisementModal() {
    this.imageUrl = null;
    this.caption = null;
    this.tempAdvertisementFile = null;
    this.tempUrl = null;
    this.caption = null;
    this.advertisementModalRef.hide();
  }

  goToShopStepTwo() {
    if (this.shop.deliveryFromTime ===  null ||
      this.shop.deliveryToTime === null ||
      this.shop.description === null ||
      this.shop.name === null ||
      this.shop.phNo === null ||
      this.shop.shopTypeId === null ||
      this.selectedTownshipToTransfer.length === 0 ||
      this.shopImgFile === null
    ) {
      this.error =  'Please fill out all the fields!';
    } else {
      this.service.selectedAdveriesementFiles = this.sleectedAdvertisementFiles;
      this.service.shopData = this.shop;
      this.service.selectedTownships = this.selectedTownshipToTransfer;
      this.service.shopImgFile = this.shopImgFile;
      this.router.navigate(['/add-shop-step-two']);
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
      this.tempUrl = reader.result;
      this.tempAdvertisementFile = files[0];
      this.imageUrl = this.tempUrl;
    };
  }

  back() {
    this.service.clearShopData();
    this.location.back();
  }
// tslint:disable-next-line: eofline
}