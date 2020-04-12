import { Routes } from '@angular/router';
import { HomeComponent } from '@app/components/home/home.component';
import { ShopAddStepOneComponent } from './components/shop-add/shop-add-step-one/shop-add-step-one.component';
import { ShopAddStepTwoComponent } from './components/shop-add/shop-add-step-two/shop-add-step-two.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ShopAddStepOneShopTypeResolver, ShopAddStepOneCityResolver } from './_resolver/shop-add-step-one.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent},
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
];
