import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  adminMode: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router,
              private location: Location
    ){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.isLoggedIn = false;
    window.location.reload();
  }

  login(){
    this.isLoggedIn = true;
    this.router.navigate(['/login']);
  }
adminManageMode() {
  this.adminMode=!this.adminMode;
}
  title = 'angular-ecommerce';
}
