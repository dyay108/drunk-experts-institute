import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = localStorage.getItem("loggedin");

    user ? this.router.navigate(['/']) : this.router.navigate(['/', 'login']);
  }

  login() {
    localStorage.setItem("loggedin", 'in');
    this.router.navigate(['/']);
  }

}
