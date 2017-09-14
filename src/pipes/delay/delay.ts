import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DelayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'delayPipe',
})
export class DelayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    var j = parseInt(value);
    if (j < 1) {
      return '无延迟';
    } else {
      return '延迟'+j+'天';
    }
  }
}
