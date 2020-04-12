import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material'
import { ShopService } from '@app/_services/shop.service';
import { GetAllTwonshipResponse } from '@app/_models/city';

@Component({
  selector: 'app-township-dialog',
  templateUrl: './township-dialog.component.html',
  styleUrls: ['./township-dialog.component.css']
})
export class TownshipDialogComponent implements OnInit {

  cityId: any;
  townshipList = new Array();

  constructor(
    public dialogRef: MatDialogRef<TownshipDialogComponent>,
    private shopService :ShopService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.cityId = this.data.cityId;
    this.getAllTownShip();
  }

  getAllTownShip(){
    this.shopService.getTownShips(this.cityId).subscribe(res =>{
      this.townshipList = res.townList;
    })
  }

  get selectedOptions() { // right now: ['1','3']
    return this.townshipList
              .filter(opt => opt.checked)
              .map(opt => opt.id)
  }

  save(){
    var townList = [];
    townList = this.selectedOptions;
    console.log(townList);
    this.dialogRef.close({townIdList: townList});
  }

  close() {
    this.dialogRef.close({townIdList: null});
  }
}
