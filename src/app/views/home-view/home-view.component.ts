import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataHandlerService } from 'src/app/services/data-handler.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent {

  drinksObj: { [key: string]: Array<any> } = {};
  drinksList: Array<any> = [];
  workingDrinks: Array<any> = [];

  filterOptions: Array<any> = [];

  sub!:Subscription;
  loading:boolean = true;

  constructor(private ds: DataHandlerService) { 
    this.sub = this.ds.getAllDrinks().subscribe(res => {
      this.workingDrinks = res;
      this.genFilterOptions();
      this.loading = false;
      

    });
  }

  getIngredients(drink:any): Array<string>{
    let keys = Object.keys(drink).filter(i => i.includes("ngredient"));
    let ingredientsList: Array<string> = [];

    keys.forEach(i => {
      drink[i] ? ingredientsList.push(drink[i]) : null;
    })

    return ingredientsList;
  }

  search(term: string) {
    let searchTerm = term.toLowerCase();

    if (searchTerm) {
      this.workingDrinks.forEach(i => {
        let il = this.getIngredients(i);
        il = il.map(i => i.toLowerCase());

        if(il.includes(searchTerm)) {
          i.inIngr = true;
        }
        else {
          i.inIngr = false;
        }

        if (i.strDrink.toLowerCase().includes(searchTerm)) {
          i.inSearch = true;
        }
        else {
          i.inSearch = false;
        }

      });
    }
    else {
      this.workingDrinks.forEach(i => {
        i.inSearch = true;
        i.inIngr = true;
      });
    }
  }

  genFilterOptions() {
    let ft: Array<any> = [];
    this.workingDrinks.forEach(i => {

      if (ft.indexOf(i.strAlcoholic) == -1) {
        this.filterOptions.push({ "name": i.strAlcoholic, "type": "Alcoholic" });
        ft.push(i.strAlcoholic);
      }

      if (ft.indexOf(i.strCategory) == -1) {
        this.filterOptions.push({ "name": i.strCategory, "type": "Category" });
        ft.push(i.strCategory);
      }

      if (ft.indexOf(i.strGlass) == -1) {
        this.filterOptions.push({ "name": i.strGlass, "type": "Glass" });
        ft.push(i.strGlass);
      }

    })
  }

  applyFilter(data: Array<any>) {
    if (data.length != 0) {
      this.workingDrinks.forEach(i => {
        if (data.indexOf(i.strCategory) >= 0 || data.indexOf(i.strAlcoholic) >= 0 || data.indexOf(i.strGlass) >= 0) {
          i.inFilter = true;
        }
        else {
          i.inFilter = false;
        }
      });
    }
    else {
      this.workingDrinks.forEach(i => {
        i.inFilter = true;
      });
    }
  }

}
