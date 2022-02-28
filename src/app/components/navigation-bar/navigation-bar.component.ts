import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  hideSide:boolean = true;
  hideNav: boolean = false;
  dropdown:boolean = false;

  constructor(private router : Router) { }

  navHome(){
    this.router.navigate(['/']);
  }

  toggleSideNav() {
    this.hideSide = !this.hideSide;
    this.hideNav = !this.hideNav;
  }

  logout() {
    localStorage.removeItem("dex_data");
    localStorage.removeItem("last_item");
    localStorage.removeItem("loggedin");
    this.router.navigate(['/','login'])
  }

  toggleDD() {
    this.dropdown = !this.dropdown;
  }

}
