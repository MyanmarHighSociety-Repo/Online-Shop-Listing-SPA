import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddShopStepOneComponent } from '@app/components/shop-add/add-shop-step-one/add-shop-step-one.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<AddShopStepOneComponent> {
    canDeactivate(component: AddShopStepOneComponent) {
        if (component.addForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changeds will be lost');
        }
        return true;
    }
}
