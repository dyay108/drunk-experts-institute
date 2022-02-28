import { Component, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataHandlerService } from 'src/app/services/data-handler.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class DrinkDetailComponent implements AfterContentInit {
  drink: any = [];
  ingredientsList: Array<string> = [];

  constructor(private route: ActivatedRoute, private router: Router, private ds: DataHandlerService, private location: Location) {
  }

  ngAfterContentInit(): void {
    let state: any = this.location.getState();

    let id = "";
    this.route.queryParams.subscribe(params => {
      id = params['id']
      id === undefined ? this.router.navigate(['/']) : null;
    });

    if (state['drink']) {

      this.drink = state['drink'];
    }
    else if (id != "") {

      let data = this.ds.getLocalDrinkList();

      this.drink = data.filter(i => i.idDrink === id).length > 0 ? data.filter(i => i.idDrink === id)[0] : {};
    }

    this.getIngredients();
  }

  getIngredients(){
    let keys = Object.keys(this.drink).filter(i => i.includes("ngredient"));

    keys.forEach(i => {
      this.drink[i] ? this.ingredientsList.push(this.drink[i]) : null;
    });
  }

}
