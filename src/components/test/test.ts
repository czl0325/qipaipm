import { Component } from '@angular/core';

/**
 * Generated class for the TestComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'test',
  templateUrl: 'test.html'
})
export class TestComponent {

  text: string;

  constructor() {
    console.log('Hello TestComponent Component');
    this.text = 'Hello World';
  }

}
