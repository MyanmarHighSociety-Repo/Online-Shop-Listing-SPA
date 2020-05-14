import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
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

@Component({
  selector: 'app-home',
  templateUrl: './add-shop-step-one.component.html',
  styleUrls: ['./add-shop-step-one.component.css'],
})
export class AddShopStepOneComponent implements OnInit {
  @ViewChild('addForm', { static: true }) addForm: NgForm;

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
  wholeCountry = false;
  wholeCity = false;
  disabled = true;
  cityIds: string = null;

  tempAdvertisementFile: File;
  tempUrl: any;

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private service: ShopService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.shopTypes = data.shopTypes;
    });
  }
  setDropdownStatus() {
    this.shopTypeDropdownClicked = !this.shopTypeDropdownClicked;
  }
  openAdvertisementModal(template: TemplateRef<any>) {
    this.advertisementModalRef = this.modalService.show(template);
  }
  setSelectedShopType(shopType: ShopType) {
    this.shop.shopTypeId = shopType.id;
    this.shopTypeDropdownPlaceholder = shopType.name;
    this.selectedDropdownImg = shopType.iconUrl;
    this.shopTypeDropdownClicked = false;
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
    console.log(this.localImageUrl);
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
  goToShopStepTwo() {
    // console.log(this.shop.name);
    // console.log(this.shop.shopTypeId);
    // console.log(this.shop.phNo);
    // console.log(this.shop.description);
    // console.log(this.shopImgFile);
    // console.log(this.sleectedAdvertisementFiles);

    if (
      this.shop.description === null ||
      this.shop.name === null ||
      this.shop.phNo === null ||
      this.shop.shopTypeId === null ||
      this.shopImgFile === null
    ) {
      this.error =  'Please fill out all the fields!';
    } else {
      this.service.selectedAdveriesementFiles = this.sleectedAdvertisementFiles;
      this.service.shopData = this.shop;
      this.service.shopImgFile = this.shopImgFile;
      this.router.navigate(['/add-shop-step-two']);
    }
  }
  back() {
    this.service.clearData();
    this.location.back();
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  goToShopAdd() {
    this.router.navigate(['/add-shop-step-one']);
  }
  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
  goToApp() {
    this.router.navigate(['/mobile-app-buy']);
  }

// tslint:disable-next-line: eofline
}