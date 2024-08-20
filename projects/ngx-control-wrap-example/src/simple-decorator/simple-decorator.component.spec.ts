import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDecoratorComponent } from './simple-decorator.component';

describe('SimpleDecoratorComponent', () => {
  let component: SimpleDecoratorComponent;
  let fixture: ComponentFixture<SimpleDecoratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleDecoratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
