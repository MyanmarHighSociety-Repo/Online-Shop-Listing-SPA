import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopAddStepOneComponent } from './components/shop-add/shop-add-step-one/shop-add-step-one.component';
import { ShopAddStepTwoComponent } from './components/shop-add/shop-add-step-two/shop-add-step-two.component';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';
import { ShopSearchHomeComponent } from './components/shop-search/shop-search-home/shop-search-home.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ViewMoreShopComponent } from './components/view-more-shop/view-more-shop.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'shop-search-home', component: ShopSearchHomeComponent},
    { path: 'shop-detail', component: ShopDetailComponent},
    { path: 'view-more-shop', component: ViewMoreShopComponent},
    {
        path: '',
        children: [
            { path: 'shop-add-step-one', component: ShopAddStepOneComponent,
                resolve: {shopTypes: ShopAddStepOneShopTypeResolver, cities: ShopAddStepOneCityResolver}
            },
            { path: 'shop-add-step-two', component: ShopAddStepTwoComponent},
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full'}
]
