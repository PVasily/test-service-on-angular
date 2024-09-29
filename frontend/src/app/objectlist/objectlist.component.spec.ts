import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectlistComponent } from './objectlist.component';

describe('ObjectlistComponent', () => {
  let component: ObjectlistComponent;
  let fixture: ComponentFixture<ObjectlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ObjectlistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
