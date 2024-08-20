import {Component, input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ControlWrapDirective, ControlWrapHostDirective} from "../../../npx-control-wrap/src/lib/control-wrap.directive";

@Component({
  selector: 'app-simple-decorator',
  standalone: true,
  imports: [FormsModule, ControlWrapDirective],
  template: `
    <div class="group">
      <label>{{label()}}</label>
      <input ngDefaultControl controlWrap/>
    </div>
  `,
  styleUrl: './simple-decorator.component.scss',
  hostDirectives: [ControlWrapHostDirective],//this allows outer world to use this component as a ControlValueAccessor
})
export class SimpleDecoratorComponent {
  label = input<string>()
}
