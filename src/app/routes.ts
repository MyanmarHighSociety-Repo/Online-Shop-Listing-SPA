import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';
import { AddShopStepThreeComponent } from './components/shop-add/add-shop-step-three/add-shop-step-three.component';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { ShopSearchResultComponent } from './components/shop-search/shop-search-result/shop-search-result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { from } from 'rxjs';
import { WebViewHomeComponent } from './components/web-view/web-view-home/web-view-home.component';
import { WebViewShopAdd } from './components/web-view/web-view-shop-add/web-view-shop-add.component';
import { WebViewContactUsComponent } from './components/web-view/web-view-contact-us/web-view-contact-us.component';
import { WebViewBuyApp } from './components/web-view/web-view-buy-app/web-view-buy-app.component';
import { MobileAppBuyComponent } from './components/mobile-app-buy/mobile-app-buy.component';
import { InfoComponent } from './components/info/info.component';

export const appRoutes: Routes = [
    // { path: '', component: HomeComponent},
    // {
    //     path: '',
    //     children: [
    //         { path: 'add-shop-step-one', component: AddShopStepOneComponent,
    //             resolve: {shopTypes: ShopAddStepOneShopTypeResolver}
    //         },
    //         { path: 'shop-search', component: ShopSearchComponent,
    //             resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
    //         },
    //         { path: 'add-shop-step-two', component: AddShopStepTwoComponent,
    //             resolve: {cities: ShopAddStepOneCityResolver}
    //         },
    //         { path: 'add-shop-step-three', component: AddShopStepThreeComponent },
    //         { path: 'shop-search-result', component: ShopSearchResultComponent},
    //         { path: 'contact-us', component: ContactUsComponent},
    //         { path: 'shop-detail', component: ShopDetailComponent},
    //         { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent},
    //         { path: 'web-view-home', component: WebViewHomeComponent},
    //         { path: 'web-view-shop-add', component: WebViewShopAdd },
    //         { path: 'web-view-contact-us', component: WebViewContactUsComponent },
    //         { path: 'web-view-buy-app', component: WebViewBuyApp },
    //         { path: 'BuyApp', component: MobileAppBuyComponent},
    //         { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent}
    //     ]
    // },
    // { path: '**', redirectTo: '', pathMatch: 'full'}
];
