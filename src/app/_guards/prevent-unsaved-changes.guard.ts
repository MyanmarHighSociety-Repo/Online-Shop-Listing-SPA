import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ShopAddStepOneComponent } from '@app/components/shop-add/shop-add-step-one/shop-add-step-one.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ShopAddStepOneComponent> {
    canDeactivate(component: ShopAddStepOneComponent) {
        if (component.addForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changeds will be lost');
        }
        return true;
    }
}