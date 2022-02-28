import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';

import { DataHandlerService } from './data-handler.service';

describe('DataHandlerService', () => {
  let service: DataHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(DataHandlerService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
