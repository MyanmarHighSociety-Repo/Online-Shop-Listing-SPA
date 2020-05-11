import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';
import { ShopSearchComponent } from './components/shop-search/shop-search.component';
import { ShopSearchResultComponent } from './components/shop-search/shop-search-result/shop-search-result.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { InfoComponent } from './components/info/info.component';

export const appRoutes: Routes = [
    { path: '', component: InfoComponent},
    // {
    //     path: '',
    //     children: [
    //         { path: 'add-shop-step-one', component: AddShopStepOneComponent,
    //             resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
    //         },
    //         { path: 'shop-search', component: ShopSearchComponent,
    //             resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
    //         },
    //         { path: 'add-shop-step-two', component: AddShopStepTwoComponent},
    //         { path: 'shop-search-result', component: ShopSearchResultComponent},
    //         { path: 'contact-us', component: ContactUsComponent},
    //         { path: 'shop-detail', component: ShopDetailComponent},
    //         { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent}
    //     ]
    // },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
