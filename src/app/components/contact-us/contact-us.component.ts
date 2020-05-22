import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContactInfo } from '@app/_models/shop';
import { AlertifyService } from '@app/_services/alertify.service';
import { ShopService } from '@app/_services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactInfo =  new ContactInfo (null, null, null);
  isSubmitted = false;

  constructor(
              private location: Location,
              private alertifyService: AlertifyService,
              private shopService: ShopService,
              private router: Router
            ) { }

  ngOnInit() {
  }

  back() {
    this.shopService.clearData();
    this.location.back();
  }

  submitContactInfo() {
    if (  this.contactInfo.name == null ||
          this.contactInfo.name === ''  ||
          this.contactInfo.phNo == null ||
          this.contactInfo.phNo === ''  ||
          this.contactInfo.reason == null ||
          this.contactInfo.reason === ''
      ) {
        return;
      }
    this.isSubmitted = true;
    this.shopService.postContactInfo(this.contactInfo).subscribe(res => {
      const result = res;
      if ( result.id ) {
        this.isSubmitted = false;
        this.alertifyService.success('Submission completed!');
      }
    }, error => {
      this.alertifyService.error(error);
    });
  }

  goToShopRequest() {
    this.shopService.clearData();
    this.router.navigate(['add-shop-step-one']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToSearch() {
    this.router.navigate(['/shop-search']);
  }
  goToShopAdd() {
    this.router.navigate(['/coming-soon']);
  }

  goToApp() {
    this.router.navigate(['/']);
  }

}
