import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from '@app/layouts/nav/nav.component';
import { HomeComponent } from '@app/components/home/home.component';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { FooterComponent } from './layouts/nav/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopSearchHomeComponent } from './components/shop-search/shop-search-home/shop-search-home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CountryDialogComponent } from './components/shop-search/shop-search-home/country-dialog/country-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { TownshipDialogComponent } from './components/shop-search/shop-search-home/township-dialog/township-dialog.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';


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
      ShopSearchHomeComponent,
      CountryDialogComponent,
      TownshipDialogComponent,
      ShopDetailComponent
   ],
   imports: [
      CarouselModule,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
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
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [CountryDialogComponent, TownshipDialogComponent]
})
export class AppModule { }
