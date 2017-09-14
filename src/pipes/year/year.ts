import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the YearPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'YearPipe',
})
export class YearPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == null || value.length < 4) {
      return "未知日期";
    }
    return value.substr(0, 4);
  }
}
