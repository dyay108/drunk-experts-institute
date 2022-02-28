import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CocktailApiRequestsService {
  readonly API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";


  constructor(private http: HttpClient) { }

  getCocktail(letter: string): Observable<any> {
    let url = this.API_BASE_URL + "/search.php?f=" + letter;
    return this.http.get<any>(url).pipe(
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
