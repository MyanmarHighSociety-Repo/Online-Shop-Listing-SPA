import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  goToHome() {
    this.router.navigate(['/home']);
  }
  goToSearch() {
    this.router.navigate(['']);
  }
  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
  goToShopAdd() {
    this.router.navigate(['/coming-soon']);
  }
  gotoApp() {
    this.router.navigate(['/']);
  }
}