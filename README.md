## Create control decorator with ease!

No more implementing `ControlValueAccessor` when in need having simple decorators. Using only two directives, control decorator will be bind to ReactiveFormsApi or FormsApi in no time.

### Advantages
1) No need to implement `ControlValueAccessor` if all you wanted is just do simple decorator
2) Thanks to internal `ControlValueAccessor` implementation, works with `FormsModule` and `ReactiveFormsModule` out of the box just like it would be custom control 

### Disadvantages
1) It should not be needed at all and Angular should support such delegation out of the box..... but since it does not.... :)

### How to use?


In order to create a component decorator, you will need two things:

1) Decorator component that will deliver ControlValueAccessor via well know directives like `[formControl]`,`[formControlName]`,`[ngModel]` and `ngDefaultControl` (less known, but still handy!)
2) `controlWrap` and `controlWrapperHost` directives

Example:

Our custom decorated control implementation:
````
@Component({
  selector: 'app-simple-decorator',
  standalone: true,
  imports: [FormsModule, ControlWrapDirective],
  template: `
    <div class="group">
      <label>{{label()}}</label>
      <input ngDefaultControl controlWrap/> //this specifies that ControlValueAccessor provided here by ngDefaultControl should be "exposed" outside for usage
    </div>
  `,
  styleUrl: './simple-decorator.component.scss',
  hostDirectives: [ControlWrapHostDirective],//this allows outer world to use this component as a ControlValueAccessor
})
export class SimpleDecoratorComponent {
  label = input<string>()
}
````
Client usage example:

````
<section>
  <app-simple-decorator [(ngModel)]="simpleWrapperValue" //or formControl or formControlName 
                        label="Simple input decorator - ngModel"></app-simple-decorator>
</section>
````


### How it works?
Internally it provides `ControlValueAccessor` implementation that delegates calls to the destination ControlValueAccessor once it becomes available
