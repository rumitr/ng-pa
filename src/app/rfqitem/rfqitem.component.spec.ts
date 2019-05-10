import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqitemComponent } from './rfqitem.component';

describe('RfqitemComponent', () => {
  let component: RfqitemComponent;
  let fixture: ComponentFixture<RfqitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
