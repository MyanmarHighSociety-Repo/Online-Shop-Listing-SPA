import { Component,Input, OnInit, TemplateRef } from '@angular/core';
import { GetShopTypeResponse } from '@app/_models/home-models';
import { ShopService } from '@app/_services/shop.service';
import { City, CityOptions, Township } from '@app/_models/city';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TownshipOptions } from '@app/_models/township';
import { Location } from '@angular/common';

@Component({
  selector: 'app-shop-search-home',
  templateUrl: './shop-search.component.html',
  styleUrls: ['./shop-search.component.css']
})
export class ShopSearchComponent implements OnInit {
  townships: Township[];
  townshipOptions: TownshipOptions[] = [];
  cities: City[];
  cityOptions: CityOptions[] = [];
  cityModalRef: BsModalRef;
  cityPlaceholder = 'တစ်နိုင်ငံလုံး';
  townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
  selectedTownshipToTransfer: TownshipOptions[] = [];
  townshipModalRef: BsModalRef;
  shopTypeList: GetShopTypeResponse[];
  wholeCountry = false;
  wholeCity = false;
  disabled = true;
  searchText: string;
  cityIds: string = null;

  // @Input() list: string [];
  // // two way binding for input text
  // inputItem = '';
  // // enable or disable visiblility of dropdown
  // listHidden = true;
  // showError = false;
  // selectedIndex = -1;
  // // the list to be shown after filtering
  // filteredList: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private service: ShopService,
    private modalService: BsModalService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // this.filteredList = this.list;
    this.route.data.subscribe(data => {
      this.shopTypeList = data.shopTypes;
      this.cities = data.cities.cityList;
      this.cities.forEach(val => {
        this.cityOptions.push({
          id: val.id,
          value: val.name,
          selected: false
        });
      });
    });
  }
//    // modifies the filtered list as per input
//   getFilteredList() {
//   this.listHidden = false;
//   if (!this.listHidden && this.inputItem !== undefined) {
//     this.filteredList = this.list.filter((item) =>  item.toLowerCase().startsWith(this.inputItem.toLowerCase()));
//   }
//    }
//   // select highlighted item when enter is pressed or any item that is clicked
//   selectItem(ind) {
//     this.inputItem = this.filteredList[ind];
//     this.listHidden = true;
//     this.selectedIndex = ind;
//   }
//   // navigate through the list of items
//   onKeyPress(event) {
//     if (!this.listHidden) {
//       if (event.key === 'Escape') {
//         this.selectedIndex = -1;
//         this.toggleListDisplay(0);
//       } else if (event.key === 'Enter') {
//         this.toggleListDisplay(0);
//       } else if (event.key === 'ArrowDown') {
//         this.listHidden = false;
//         this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
//         if (this.filteredList.length > 0 && !this.listHidden) {
//           document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();                }
//             } else if (event.key === 'ArrowUp') {
//               this.listHidden = false;
//               if (this.selectedIndex <= 0) {
//                 this.selectedIndex = this.filteredList.length;
//               }
//               this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;
//               if (this.filteredList.length > 0 && !this.listHidden) {
//                 document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();                }
//             }
//         }
//     }
//  // show or hide the dropdown list when input is focused or moves out of focus
//  toggleListDisplay(sender: number) {        if (sender === 1) {
//   this.listHidden = false;
//   this.getFilteredList();
// } else {
//   // helps to select item by clicking
//   setTimeout(() => {
//     this.selectItem(this.selectedIndex);
//     this.listHidden = true;
//     if (!this.list.includes(this.inputItem)) {
//       this.showError = true;
//       this.filteredList = this.list;
//       } else {
//       this.showError = false;
//       }
//   }, 500);
// }
// }

toggleDisplay(id) {
    this.shopTypeList.forEach(element => {
      if (element.id === id) {
        element.showSpan = !element.showSpan;
      }
    });
  }

  openCityModal(template: TemplateRef<any>) {
    this.cityModalRef = this.modalService.show(template);
  }

  cancelCityModal() {
    this.cityOptions.forEach(data => {
      data.selected = false;
    });
    this.cityPlaceholder = 'တစ်နိုင်ငံလုံး';
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    this.townshipOptions = [];
    this.wholeCity = false;
    this.selectedTownshipToTransfer = [];
    this.wholeCountry = false;
    this.cityIds = null;
    this.disabled = true;
    this.cityModalRef.hide();
  }

  getSelectedCity() {
    if (this.wholeCountry) {
      this.disabled = true;
      this.cityPlaceholder = 'တစ်နိုင်ငံလုံး';
      this.townshipPlaceholder = 'မြို့နယ်အားလုံး';
      this.cityModalRef.hide();
      this.cityIds = null;
      return;
    }
    this.disabled = false;
    this.selectedTownshipToTransfer = [];
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    const result = this.cityOptions
      .filter(opt => {
        return opt.selected;
      })
      .map(opt => {
        return opt;
      });

    if (result == null || result.length === 0) {
      return;
    }
    this.cityIds = null;
    this.cityIds = result.map(x => x.id).join(',');
    this.service.getTownShips(this.cityIds).subscribe(res => {
      this.townshipOptions = [];
      this.townships = res.townList;
      this.townships.forEach(data => {
        this.townshipOptions.push({
          id: data.id,
          value: data.name,
          selected: false
        });
      });
    });

    this.cityPlaceholder = '';
    this.cityPlaceholder = '';
    if (result.length === 1) {
      this.cityPlaceholder = result[0].value;
    } else if (result.length === 0) {
      this.cityPlaceholder = 'တစ်နိုင်ငံလုံး';
    } else if (result.length === 2) {
      for (let index = 0; index < 2; index++) {
        if (index === 0) {
          this.cityPlaceholder = result[index].value;
        } else {
          this.cityPlaceholder =
            this.cityPlaceholder + '၊' + result[index].value;
        }
      }
    } else {
      for (let index = 0; index < 3; index++) {
        if (index === 0) {
          this.cityPlaceholder = result[index].value;
        } else if (index === 1) {
          this.cityPlaceholder =
            this.cityPlaceholder + '၊' + result[index].value;
        } else {
          this.cityPlaceholder = this.cityPlaceholder + ' ...';
        }
      }
    }
    this.cityModalRef.hide();
  }

  openTownshipModal(template: TemplateRef<any>) {
    this.townshipModalRef = this.modalService.show(template);
  }

  getSelectedTownship() {
    const result = this.townshipOptions
      .filter(opt => {
        return opt.selected;
      })
      .map(opt => {
        return opt;
      });

    this.selectedTownshipToTransfer = result;

    this.townshipPlaceholder = '';
    if (result.length === 1) {
      this.townshipPlaceholder = result[0].value;
    } else if (result.length === 0) {
      this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    } else if (result.length === 2) {
      for (let index = 0; index < 2; index++) {
        if (index === 0) {
          this.townshipPlaceholder = result[index].value;
        } else {
          this.townshipPlaceholder =
            this.townshipPlaceholder + '၊' + result[index].value;
        }
      }
    } else {
      for (let index = 0; index < 3; index++) {
        if (index === 0) {
          this.townshipPlaceholder = result[index].value;
        } else if (index === 1) {
          this.townshipPlaceholder =
            this.townshipPlaceholder + '၊' + result[index].value;
        } else {
          this.townshipPlaceholder = this.townshipPlaceholder + ' ...';
        }
      }
    }
    this.townshipModalRef.hide();
  }

  cancelTownshipModal() {
    this.townshipOptions.forEach(data => {
      data.selected = false;
    });
    this.townshipPlaceholder = 'မြို့နယ်ရွေးချယ်ပါ';
    this.wholeCity = false;
    this.selectedTownshipToTransfer = [];
    this.townshipModalRef.hide();
  }

  checkAllCities() {
    if (this.wholeCountry === false) {
      this.wholeCountry = true;

      this.cityOptions.forEach(data => {
        data.selected = true;
      });
    } else {
      this.wholeCountry = false;
      this.cityOptions.forEach(data => {
        data.selected = false;
      });

      this.townshipOptions.forEach(data => {
        data.selected = false;
      });
    }
  }

  checkAllTownships() {
    if (this.wholeCity === false) {
      this.wholeCity = true;

      this.townshipOptions.forEach(data => {
        data.selected = true;
      });
    } else {
      this.wholeCity = false;
      this.townshipOptions.forEach(data => {
        data.selected = false;
      });
    }
  }

  checkForWholeCity(obj) {
    if (obj.selected === true) {
      this.wholeCity = false;
      return;
    }

    const marker = [];
    this.townshipOptions.forEach(data => {
      if (data.selected === false) {
        marker.push(data);
        return;
      }
    });
    if (marker.length > 1) {
      this.wholeCity = false;
    } else {
      this.wholeCity = true;
    }
  }

  checkForWholeCountry(obj) {
    if (obj.selected === true) {
      this.wholeCountry = false;
      return;
    }
  }

  backToHome() {
    this.service.clearData();
    this.location.back();
  }
  search() {
    this.service.searchFormText = this.searchText;
    let counter = 1;
    this.shopTypeList.forEach(element => {
      if (element.showSpan != null && element.showSpan !== false) {
        if (counter === 1) {
          this.service.searchFormShopType = element.id.toString();
        } else {
          this.service.searchFormShopType += ',' + element.id.toString();
        }
        counter++;
      }
    });

    if (this.wholeCountry === true || this.cityIds == null) {
      this.service.searchFormTownship = 'All';
    } else if (
      this.wholeCountry === false &&
      this.selectedTownshipToTransfer.length === 0
    ) {
      this.service.searchFormTownship = this.townshipOptions.map(x => x.id).join(',');
    } else {
      this.service.searchFormTownship = this.selectedTownshipToTransfer.map(x => x.id).join(',');
    }

    this.router.navigate(['/shop-search-result']);
  }
}
