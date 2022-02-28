import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input() filterOptions!: { "Category": Array<string>, "Alcoholic": Array<string>, "Glass": Array<string> };
  @Output() searchCriteria = new EventEmitter<any>();

  searchTerm: string = "";

  constructor() { }

  ngOnInit(): void {
    let sh_s = sessionStorage.getItem("dex_search");
    if (sh_s) {
      let sh = JSON.parse(sh_s);
      this.searchTerm = sh;

      this.searchCriteria.emit(this.searchTerm);      
    }
  }

  ngOnDestroy(): void {
    this.searchTerm.length > 0 ?
      sessionStorage.setItem("dex_search", JSON.stringify(this.searchTerm)) : null;
  }

  searchWord() {
    sessionStorage.setItem("dex_search", JSON.stringify(this.searchTerm))
    this.searchCriteria.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = "";
    this.searchWord();
  }

}
