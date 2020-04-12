import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.css']
})
export class CountryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CountryDialogComponent>) { }

  ngOnInit() {
  }

  save(){}

  close() {
    this.dialogRef.close();
  }
}
