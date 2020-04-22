import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ViewMoreShopComponent } from './components/view-more-shop/view-more-shop.component';
import { ShopDetailAdvertisementComponent } from './components/shop-detail/shop-detail-advertisement/shop-detail-advertisement.component';
import { AddShopStepOneComponent } from './components/shop-add/add-shop-step-one/add-shop-step-one.component';
import { AddShopStepTwoComponent } from './components/shop-add/add-shop-step-two/add-shop-step-two.component';
import { ShopSearchComponent } from './components/shop-search/shop-search-home/shop-search.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'shop-detail', component: ShopDetailComponent},
    { path: 'shop-detail-advertisement', component: ShopDetailAdvertisementComponent},
    { path: 'view-more-shop', component: ViewMoreShopComponent},
    {
        path: '',
        children: [
            { path: 'add-shop-step-one', component: AddShopStepOneComponent,
                resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
            },
            { path: 'shop-search', component: ShopSearchComponent,
                resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
            },
            { path: 'add-shop-step-two', component: AddShopStepTwoComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];
