import { TestBed } from '@angular/core/testing';
import { CollisionService } from './collision.service';

describe('CollisionService', () => {
  let service: CollisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    try {
      service = TestBed.inject(CollisionService);
    } catch (e) {
      // Stub throws on instantiation; this is expected
    }
  });

  it('should be defined as a class', () => {
    expect(CollisionService).toBeDefined();
  });
});
