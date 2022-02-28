import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CocktailApiRequestsService } from './cocktail-api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  private drinksArray: Array<any> = [];

  constructor(private capi: CocktailApiRequestsService) { }

  private handleData(letter: string, data: Array<any>) {
    let saveData: Array<any> = [];
    let localData = localStorage.getItem("dex_data");

    if (localData) {
      saveData = JSON.parse(localData);
    }
    let tbSaved = saveData.concat(data);

    localStorage.setItem("dex_data", JSON.stringify(tbSaved));
    letter === "z" ? (localStorage.setItem("last_item", letter), this.setLocalDrinkList()) : null;
  }

  getAllDrinks() {
    let obs = new Observable<Array<any>>(subscriber => {
      let item = localStorage.getItem("last_item");

      if (item === "z") {
        this.setLocalDrinkList();
        subscriber.next(this.drinksArray);
      }
      else {
        this.fetchAllDrinks(subscriber);
      }
    });

    return obs;
  }

  fetchAllDrinks(sub: Subscriber<any>) {
    let alpha = [...'abcdefghijklmnopqrstuvwxyz'];

    alpha.forEach(letter => {
      this.capi.getCocktail(letter).subscribe(response => {
        response.drinks ?
          this.handleData(letter, response.drinks) : null;
          if(letter == "z") {
            this.setLocalDrinkList();
            sub.next(this.drinksArray);
          }
      });
    });
  }

  setLocalDrinkList() {
    let prevData = localStorage.getItem("dex_data");
    if (prevData) {
      this.drinksArray = JSON.parse(prevData);
      let temp = [...this.drinksArray];
      temp.map(i => {
        i.inSearch = true;
        i.inFilter = true;
        i.inIngr = true;
      });

      this.drinksArray = [...temp];

    }
  }

  getLocalDrinkList(): Array<any> {

    return this.drinksArray
  }
}
