import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SimpleDecoratorComponent} from "../simple-decorator/simple-decorator.component";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SimpleDecoratorComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class AppComponent {
  title = 'ngx-control-wrap-example';

  simpleWrapperValue = "Simple control via ngModel";
  simpleWrapperControl=new FormControl("Simple control via formControl");
}
