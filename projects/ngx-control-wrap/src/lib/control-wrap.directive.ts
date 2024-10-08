import {AfterViewInit, Directive, Host, Inject, Input, Optional, Self, SkipSelf, ViewChild} from '@angular/core';
import {ControlValueAccessorProxy} from "./control-value-accessor-proxy";
import {
  AbstractControl,
  ControlContainer,
  ControlValueAccessor, DefaultValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl
} from "@angular/forms";

/**
 * A directive that bind outer ControlValueAccessor (eg provided by [controlWrapHost]) with inner ControlValueAccessor provided by ormControl,formControlName,ngModel or DefaultValueAccessor
 */
@Directive({
  selector: '[controlWrap]',
  standalone: true,
})
export class ControlWrapDirective {
  constructor(
    private proxy: ControlValueAccessorProxy,
    @Optional() @Inject(NG_VALUE_ACCESSOR) @Self() va: ControlValueAccessor[]
  ) {
    if (!va || va.length == 0) {
      throw new Error("When using [controlWrap] must be used on the same element in conjunction with formControl,formControlName,ngModel or DefaultValueAccessor")
    }
    this.proxy.setDelegate(va[0]);
  }
}

/**
 * A directive used to denote current component as custom form control implementation that will bind its ControlValueAccessor that is provided by it with inner ControlValueAccessor somewhere inside that will be provided by ngModel,formControl,formControlName or DefautlValueAccessor directives (or even custom ones)
 * Always used in conjunction with ControlWrapDirective
 */
@Directive({
  selector: "[controlWrapHost]",
  standalone: true,
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ControlValueAccessorProxy, multi: true},
    {provide: ControlValueAccessorProxy, useClass: ControlValueAccessorProxy}
  ]
})
export class ControlWrapHostDirective {

}
