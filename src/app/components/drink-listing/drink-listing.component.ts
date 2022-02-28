import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-listing',
  templateUrl: './drink-listing.component.html',
  styleUrls: ['./drink-listing.component.css']
})
export class DrinkListingComponent {
  sortIconArray = [
    { iconName: 'keyboard_arrow_up', reverseSort: false },
    { iconName: 'keyboard_arrow_down', reverseSort: true },
    { iconName: '', reverseSort: null }];

  @Input() data: Array<any> = [];

  previousSortColumn: string = "";
  currentSortColumn: string = "";
  reverseSort: number = 1;

  constructor(private router: Router) { }

  sortTable(selectedColumn: string) {
    this.previousSortColumn = this.currentSortColumn;
    this.previousSortColumn === selectedColumn ? this.reverseSort *= -1 : this.reverseSort = 1;

    this.currentSortColumn = selectedColumn;

    this.sortFunction(selectedColumn, this.reverseSort);

  }

  sortFunction(sort_string: string, reverse: number) {

    function compare(a: { strDrink: string; strCategory: string; strAlcoholic: string }, b: { strDrink: string; strCategory: string; strAlcoholic: string }): number {

      let aa = "";
      let bb = "";

      if (sort_string === "drinks") {
        aa = a ? a.strDrink.toLowerCase() : "";
        bb = b ? b.strDrink.toLowerCase() : "";
      }
      if (sort_string === "category") {
        aa = a ? a.strCategory.toLowerCase() : "";
        bb = b ? b.strCategory.toLowerCase() : "";
      }
      if (sort_string === "alcohol") {
        aa = a ? a.strAlcoholic.toLowerCase() : "";
        bb = b ? b.strAlcoholic.toLowerCase() : "";
      }

      if (aa < bb) {
        return -1 * reverse;
      }
      if (aa > bb) {
        return 1 * reverse;
      }
      return 0;
    }

    this.data.sort(
      compare
    )
  }

  navToDetail(item:any) {
    this.router.navigate(['/','drink'], { queryParams: { id: item.idDrink }, state: {drink: item} })
  }

}
