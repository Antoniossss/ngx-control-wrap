import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxControlWrapComponent } from './ngx-control-wrap.component';

describe('NgxControlWrapComponent', () => {
  let component: NgxControlWrapComponent;
  let fixture: ComponentFixture<NgxControlWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxControlWrapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxControlWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
