import {ControlWrapDirective, ControlWrapHostDirective} from './control-wrap.directive';
import {Component} from "@angular/core";
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ControlValueAccessorProxy} from "./control-value-accessor-proxy";

describe('ControlWrapDirective', () => {
  let fixture: ComponentFixture<FormControlTestHostComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTestComponent, FormControlTestHostComponent, NgModelTestHostComponent, NothingToWrapTestHostComponent],
      imports: [ControlWrapDirective, ReactiveFormsModule, FormsModule]
    }).compileComponents()
  })

  it('should throw if no adequate value accessor directive companion is used', () => {
    expect(() => TestBed.createComponent(NothingToWrapTestHostComponent).detectChanges())
      .toThrowError("When using [controlWrap] must be used on the same element in conjunction with formControl,formControlName,ngModel or DefaultValueAccessor")
  })

  describe("Using formControl", () => {
    it('binds initial value to the inner control just fine', () => {
      const fixture = TestBed.createComponent(FormControlTestHostComponent);
      fixture.componentInstance.ctrl.setValue("I am the initial!");
      fixture.detectChanges()
      expect(fixture.debugElement.query(By.css("input")).nativeElement.value).toEqual("I am the initial!")
      expect(fixture.debugElement.query(By.css("input")).nativeElement.disabled).toBeFalsy()
    })

    it('binds changed values to the inner control just fine', () => {
      const fixture = TestBed.createComponent(FormControlTestHostComponent);
      fixture.detectChanges()
      const cmp = fixture.componentInstance
      cmp.ctrl.setValue("Hello bros!")
      fixture.detectChanges()
      expect(fixture.debugElement.query(By.css("input")).nativeElement.value).toEqual("Hello bros!")
    })

    it('propagates inner control changes to the outer control', () => {
      const fixture = TestBed.createComponent(FormControlTestHostComponent);
      fixture.detectChanges()
      const input = fixture.debugElement.query(By.css("input")).nativeElement
      input.value = "Uber new val!"
      input.dispatchEvent(new Event('input'))
      fixture.detectChanges()
      expect(fixture.componentInstance.ctrl.value).toEqual("Uber new val!")
    })
  })

  describe("Using ngModel", () => {
    it('binds initial value to the inner control just fine', async () => {
      const fixture = TestBed.createComponent(NgModelTestHostComponent);
      fixture.componentInstance.myVal = "I am the initial!"
      fixture.detectChanges()
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css("input")).nativeElement.value).toEqual("I am the initial!")
      expect(fixture.debugElement.query(By.css("input")).nativeElement.disabled).toBeFalsy()
    })

    it('binds changed values to the inner control just fine', async () => {
      const fixture = TestBed.createComponent(NgModelTestHostComponent);
      fixture.detectChanges()
      await fixture.whenStable()
      const cmp = fixture.componentInstance
      cmp.myVal = "Hello bros!"
      fixture.detectChanges()
      await fixture.whenStable()
      expect(fixture.debugElement.query(By.css("input")).nativeElement.value).toEqual("Hello bros!")
    })

    it('propagates inner control changes to the outer control', async () => {
      const fixture = TestBed.createComponent(NgModelTestHostComponent);
      fixture.detectChanges()
      await fixture.whenStable()
      const input = fixture.debugElement.query(By.css("input")).nativeElement
      input.value = "Uber new val!"
      input.dispatchEvent(new Event('input'))
      fixture.detectChanges()
      await fixture.whenStable()
      expect(fixture.componentInstance.myVal).toEqual("Uber new val!")
    })
  })
});


@Component({
  selector: "test-decorated-input",
  template: `
    Wrapping starts <br/>
    <input name="someName" ngDefaultControl controlWrap/>
    <br/>
    Wrapping ends
  `,
  hostDirectives:[ControlWrapHostDirective],
})
class CustomTestComponent {
}

@Component({
  template: `
    Some custom control decorator with formControl:
    <test-decorated-input [formControl]="ctrl"></test-decorated-input>
  `,
})
class FormControlTestHostComponent {
  ctrl = new FormControl("hi there!")
}

@Component({
  template: `
    Some custom control decorator with ngModel
    <test-decorated-input [(ngModel)]="myVal"></test-decorated-input>
  `
})
class NgModelTestHostComponent {
  myVal = "hi there!"
}


@Component({
  template: `
    nothing to delegate
    <input controlWrap/>
  `,
  providers: [
    {provide: ControlValueAccessorProxy}
  ]
})
class NothingToWrapTestHostComponent {

}
