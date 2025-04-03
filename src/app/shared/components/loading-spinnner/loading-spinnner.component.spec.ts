import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnnerComponent } from './loading-spinnner.component';

describe('LoadingSpinnnerComponent', () => {
  let component: LoadingSpinnnerComponent;
  let fixture: ComponentFixture<LoadingSpinnnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingSpinnnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
