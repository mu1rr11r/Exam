import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavauthComponent } from './navauth.component';

describe('NavauthComponent', () => {
  let component: NavauthComponent;
  let fixture: ComponentFixture<NavauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
