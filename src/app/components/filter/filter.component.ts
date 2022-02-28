import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {

  @Input() options!: Array<any>;
  @Output() selected = new EventEmitter<Array<any>>();
  selectedFilters: Array<string> = [];
  filterListing: boolean = false;

  constructor() { }

  ngOnInit(): void {
      let fh_s = sessionStorage.getItem("dex_history");
      if(fh_s) {
        let fh_a: Array<string> = JSON.parse(fh_s);
        this.selectedFilters = fh_a;
        this.selected.emit(this.selectedFilters);
      }
  }

  ngOnDestroy(): void {
      this.selectedFilters.length > 0 ? 
        sessionStorage.setItem("dex_history", JSON.stringify(this.selectedFilters)) : null;
  }

  onAdd() {
    sessionStorage.setItem("dex_history", JSON.stringify(this.selectedFilters))
    this.selected.emit(this.selectedFilters);
}

}
