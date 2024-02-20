import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {defineCustomElements } from 'stencil-web-component-demo/loader/index';

defineCustomElements(window);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'ng-component-demo';
}
