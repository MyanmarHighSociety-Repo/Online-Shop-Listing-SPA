import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '@app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  isLoggedIn: boolean;

  constructor(private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {}
}
