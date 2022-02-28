import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataHandlerService } from './services/data-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'drunken-institute';

  constructor(private ds: DataHandlerService, private router: Router) { }

  ngOnInit() {
    let user = localStorage.getItem("loggedin");

    user ? this.router.navigate(['/']) : this.router.navigate(['/', 'login']);
  }
}
