import { RouterModule } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import { NgxSeoModule } from '../ngx-seo.module';
import { NgxSeoService } from './ngx-seo.service';

describe('NgxSeoService', () => {
  let service: NgxSeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RouterModule.forRoot([]), NgxSeoModule.forRoot()] });
  });

  it('should be created', () => {
    service = TestBed.inject(NgxSeoService);
    expect(service).toBeTruthy();
  });
});
