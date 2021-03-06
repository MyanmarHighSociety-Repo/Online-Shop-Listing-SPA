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
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { ShopSearchResultComponent } from './components/shop-search/shop-search-result/shop-search-result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { NgClockPickerLibModule } from 'ng-clock-picker-lib';
import { InfoComponent } from './components/info/info.component';


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
      ShopSearchComponent,
      ShopDetailComponent,
      SpinnerComponent,
      ShopSearchResultComponent,
      ShopDetailAdvertisementComponent,
      ContactUsComponent,
      InfoComponent
   ],
   imports: [
      TruncateModule,
      CarouselModule,
      BrowserModule,
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
      { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
   ],
   bootstrap: [
      AppComponent
   ],
})
export class AppModule { }
