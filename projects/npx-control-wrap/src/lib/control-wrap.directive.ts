import {Directive, Input, Optional, SkipSelf} from '@angular/core';
import {ControlValueAccessorProxy} from "./control-value-accessor-proxy";
import {AbstractControl, ControlContainer, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
  selector: '[controlWrap]',
  standalone: true,
  providers: [
    ControlValueAccessorProxy,
    {provide: NG_VALUE_ACCESSOR, useExisting: ControlValueAccessorProxy, multi: true}
  ]
})
export class ControlWrapDirective {
  @Input()
  formControlName?: string;

  constructor(
    private proxy: ControlValueAccessorProxy,
    @Optional() @SkipSelf() private container: ControlContainer
  ) {
  }

  setControl(ctrl: { valueAccessor: ControlValueAccessor }) {
    this.proxy.setDelegate(ctrl.valueAccessor);
  }


  get control() {
    if (this.container == null) {
      return null;
    }
    return this.container.control;
  }
}
