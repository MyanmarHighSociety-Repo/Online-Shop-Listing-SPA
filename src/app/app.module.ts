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
<<<<<<< HEAD
import { ShopAddStepOneComponent } from './components/shop-add/shop-add-step-one/shop-add-step-one.component';
import { ShopAddStepTwoComponent } from './components/shop-add/shop-add-step-two/shop-add-step-two.component';
import { FileUploadModule } from 'ng2-file-upload';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';

=======
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
>>>>>>> 9dadf77645c7af2fe26c86a8734e6ab78492c91f


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
<<<<<<< HEAD
      ShopAddStepOneComponent,
      ShopAddStepTwoComponent
=======
      ShopSearchHomeComponent,
      CountryDialogComponent,
      TownshipDialogComponent,
      ShopDetailComponent,
      ViewMoreShopComponent,
>>>>>>> 9dadf77645c7af2fe26c86a8734e6ab78492c91f
   ],
   imports: [
      CarouselModule,
      BrowserModule,
      FileUploadModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
<<<<<<< HEAD
      ModalModule.forRoot(),
=======
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
>>>>>>> 9dadf77645c7af2fe26c86a8734e6ab78492c91f
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
