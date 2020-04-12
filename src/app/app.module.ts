import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from '@app/layouts/nav/nav.component';
import { HomeComponent } from '@app/components/home/home.component';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { FooterComponent } from './layouts/nav/footer/footer.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopSearchHomeComponent } from './components/shop-search/shop-search-home/shop-search-home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryDialogComponent } from './components/shop-search/shop-search-home/country-dialog/country-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { TownshipDialogComponent } from './components/shop-search/shop-search-home/township-dialog/township-dialog.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ViewMoreShopComponent } from './components/view-more-shop/view-more-shop.component';
import { TruncateModule } from 'ng2-truncate';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';


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
      ShopSearchHomeComponent,
      CountryDialogComponent,
      TownshipDialogComponent,
      ShopDetailComponent,
      SpinnerComponent,
      ViewMoreShopComponent,
      ShopDetailAdvertisementComponent,
   ],
   imports: [
      TruncateModule,
      CarouselModule,
      BrowserModule,
      FileUploadModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ModalModule.forRoot(),
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
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
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [CountryDialogComponent, TownshipDialogComponent]
})
export class AppModule { }
