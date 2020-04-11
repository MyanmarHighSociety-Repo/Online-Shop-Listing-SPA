import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-township-dialog',
  templateUrl: './township-dialog.component.html',
  styleUrls: ['./township-dialog.component.css']
})
export class TownshipDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TownshipDialogComponent>) { }

  ngOnInit() {
  }

  save(){}
  close() {
    this.dialogRef.close();
  }
}
