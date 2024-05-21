import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpxControlWrapComponent } from './npx-control-wrap.component';

describe('NpxControlWrapComponent', () => {
  let component: NpxControlWrapComponent;
  let fixture: ComponentFixture<NpxControlWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpxControlWrapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NpxControlWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
