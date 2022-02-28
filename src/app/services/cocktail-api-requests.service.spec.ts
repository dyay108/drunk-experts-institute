import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CocktailApiRequestsService } from './cocktail-api-requests.service';

describe('CocktailApiRequestsService', () => {
  let service: CocktailApiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], 
    });
    service = TestBed.inject(CocktailApiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
