import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopSearchHomeComponent } from './components/shop-search/shop-search-home/shop-search-home.component';
import { ShopDetailComponent } from './components/shop-detail/shop-detail.component';
import { ViewMoreShopComponent } from './components/view-more-shop/view-more-shop.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'shop-search-home', component: ShopSearchHomeComponent},
    { path : 'shop-detail', component: ShopDetailComponent},
    { path : 'view-more-shop', component: ViewMoreShopComponent}
    // { path: '**', redirectTo: '', pathMatch: 'full'}
];
