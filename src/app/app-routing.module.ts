

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes, PreloadAllModules } from '@angular/router';
import { ApplicationStateService } from './_services/application-state.service';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';
import { ShopSearchResultComponent } from './components/shop-search/shop-search-result/shop-search-result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { MobileAppBuyComponent } from './components/mobile-app-buy/mobile-app-buy.component';
import { WebViewHomeComponent } from './components/web-view/web-view-home/web-view-home.component';
import { WebViewShopAdd } from './components/web-view/web-view-shop-add/web-view-shop-add.component';
import { WebViewContactUsComponent } from './components/web-view/web-view-contact-us/web-view-contact-us.component';
import { WebViewBuyApp } from './components/web-view/web-view-buy-app/web-view-buy-app.component';
import { AddShopStepThreeComponent } from './components/shop-add/add-shop-step-three/add-shop-step-three.component';


const desktop_routes: Routes = [
    { path: '', component: WebViewHomeComponent},
    {
        path: '',
        children: [
          { path: 'web-view-shop-add', component: WebViewShopAdd },
          { path: 'web-view-contact-us', component: WebViewContactUsComponent },
          { path: 'web-view-buy-app', component: WebViewBuyApp },
          { path: 'BuyApp', component: MobileAppBuyComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
  ];

const mobile_routes: Routes = [
  { path: '', component: HomeComponent},
  {
      path: '',
      children: [
          { path: 'add-shop-step-one', component: AddShopStepOneComponent,
              resolve: {shopTypes: ShopAddStepOneShopTypeResolver}
          },
          { path: 'shop-search', component: ShopSearchComponent,
              resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
          },
          { path: 'add-shop-step-two', component: AddShopStepTwoComponent,
              resolve: {cities: ShopAddStepOneCityResolver}
          },
          { path: 'add-shop-step-three', component: AddShopStepThreeComponent },
          { path: 'shop-search-result', component: ShopSearchResultComponent},
          { path: 'contact-us', component: ContactUsComponent},
          { path: 'shop-detail', component: ShopDetailComponent},
          { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent},
          { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent}
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
  ];

@NgModule({
    // as default we set the desktop routing configuration. if mobile will be started it will be replaced below.
    // note that we must specify some routes here (not an empty array) otherwise the trick below doesn't work...
    imports: [RouterModule.forRoot(desktop_routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
  })
  export class AppRoutingModule {

    public constructor(private router: Router,
                       private applicationStateService: ApplicationStateService) {

      if (applicationStateService.getIsMobileResolution()) {
        router.resetConfig(mobile_routes);
      }
    }
  }
