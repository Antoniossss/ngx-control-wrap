import {ControlValueAccessorProxy} from "./control-value-accessor-proxy";
import createSpyObj = jasmine.createSpyObj;
import {ControlValueAccessor} from "@angular/forms";
import SpyObj = jasmine.SpyObj;

describe("ControlValueAccessorProxy", () => {
  let proxy!: ControlValueAccessorProxy
  let delegate!: SpyObj<ControlValueAccessor>
  beforeEach(() => {
    proxy = new ControlValueAccessorProxy();
    delegate = createSpyObj<ControlValueAccessor>(["writeValue", "registerOnChange", "registerOnTouched", "setDisabledState"])
  })
  it("should proxy all delayed calls when setting delegate", () => {
    const onChange = () => {
    }
    const onTouched = () => {
    };
    proxy.registerOnChange(onChange);
    proxy.registerOnTouched(onTouched);
    proxy.writeValue("someValue");
    proxy.setDisabledState(true);


    //when
    proxy.setDelegate(delegate);

    expect(delegate.writeValue).toHaveBeenCalledWith("someValue")
    expect(delegate.registerOnTouched).toHaveBeenCalledWith(onTouched)
    expect(delegate.registerOnChange).toHaveBeenCalledWith(onChange)
    expect(delegate.setDisabledState).toHaveBeenCalledWith(true)
  })

  it('should delegate writeValue calls right away after proxy is set', () => {
    proxy.setDelegate(delegate)
    expect(delegate.writeValue).not.toHaveBeenCalled();
    proxy.writeValue("blelbe");
    expect(delegate.writeValue).toHaveBeenCalledWith("blelbe");
  })
  it('should delegate onChanges calls right away after proxy is set', () => {
    proxy.setDelegate(delegate)
    expect(delegate.registerOnChange).not.toHaveBeenCalled();
    proxy.registerOnChange(null);
    expect(delegate.registerOnChange).toHaveBeenCalledWith(null);
  })
  it('should delegate onTouched calls right away after proxy is set', () => {
    proxy.setDelegate(delegate)
    expect(delegate.registerOnTouched).not.toHaveBeenCalled();
    proxy.registerOnTouched(null);
    expect(delegate.registerOnTouched).toHaveBeenCalledWith(null);
  })
  it('should delegate setDisabled calls right away after proxy is set', () => {
    proxy.setDelegate(delegate)
    expect(delegate.setDisabledState).not.toHaveBeenCalled();
    proxy.setDisabledState(true);
    expect(delegate.setDisabledState).toHaveBeenCalledWith(true);
  })
})
