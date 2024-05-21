import {ControlValueAccessor} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class ControlValueAccessorProxy implements ControlValueAccessor {
  setDisabledState(isDisabled: boolean): void {
    if (this.delegate == null) {
      this.delayCall('setDisabledState', isDisabled)
      return;
    }

    this.delegate?.setDisabledState?.(true);
  }

  private calls: aCall[] = [];

  private delegate?: ControlValueAccessor;

  registerOnChange(fn: any): void {
    if (this.delegate == null) {
      this.delayCall('registerOnChange', fn);
      return;
    }
    this.delegate.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    if (this.delegate == null) {
      this.delayCall('registerOnTouched', fn);
      return
    }
    this.delegate.registerOnTouched(fn)
  }

  writeValue(obj: any): void {
    if (this.delegate == null) {
      this.delayCall('writeValue', obj)
      return;
    }
    this.delegate.writeValue(obj);
  }

  setDelegate(ctrl: ControlValueAccessor) {
    if (ctrl == null) {
      throw new Error("Delegate MUST NOT BE NULL");
    }
    this.delegate = ctrl;
    this.calls.forEach(acall => {
      this.delegate?.[acall.method]?.(acall.value);
    })
    this.calls = [];
  }

  private delayCall(method: aCall["method"], arg: any) {
    this.calls.push({
      method: method,
      value: arg
    })
  }
}


type aCall = {
  method: keyof ControlValueAccessor;
  value: any
}
