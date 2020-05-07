import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
         BsDropdownModule,
         TabsModule,
         BsDatepickerModule,
         PaginationModule,
         ButtonsModule,
         ModalModule,
         BsDropdownConfig
      } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from '@app/layouts/nav/nav.component';
import { HomeComponent } from '@app/components/home/home.component';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { FooterComponent } from './layouts/nav/footer/footer.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { TruncateModule } from 'ng2-truncate';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';
import { AddShopStepThreeComponent } from './components/shop-add/add-shop-step-three/add-shop-step-three.component';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { MobileAppBuyComponent } from './components/mobile-app-buy/mobile-app-buy.component';
import { ShopSearchResultComponent } from './components/shop-search/shop-search-result/shop-search-result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { NgClockPickerLibModule } from 'ng-clock-picker-lib';
import { from } from 'rxjs';
import { WebViewHomeComponent } from './components/web-view/web-view-home/web-view-home.component';
import { WebViewShopAdd } from './components/web-view/web-view-shop-add/web-view-shop-add.component';
import { WebViewContactUsComponent } from './components/web-view/web-view-contact-us/web-view-contact-us.component';
import { WebViewBuyApp } from './components/web-view/web-view-buy-app/web-view-buy-app.component';
import { RecaptchaModule } from 'ng-recaptcha';

export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
   overrides = {
       pinch: { enable: false },
       rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      FooterComponent,
      AddShopStepOneComponent,
      AddShopStepTwoComponent,
      AddShopStepThreeComponent,
      ShopSearchComponent,
      ShopDetailComponent,
      SpinnerComponent,
      ShopSearchResultComponent,
      ShopDetailAdvertisementComponent,
      ContactUsComponent,
      WebViewHomeComponent,
      WebViewShopAdd,
      WebViewContactUsComponent,
      WebViewBuyApp,
      MobileAppBuyComponent,
   ],
   imports: [
      TruncateModule,
      CarouselModule,
      BrowserModule,
      RecaptchaModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      NgClockPickerLibModule,
      ReactiveFormsModule,
      FontAwesomeModule,
      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
],
   providers: [
      AlertifyService,
      PreventUnsavedChanges,
      ShopAddStepOneShopTypeResolver,
      ShopAddStepOneCityResolver,
      { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } },
   ],
   bootstrap: [
      AppComponent
   ],
})
export class AppModule { }
