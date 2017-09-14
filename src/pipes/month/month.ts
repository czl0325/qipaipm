import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MonthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'MonthPipe',
})
export class MonthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (value == null || value.length < 10) {
      return "未知日期";
    }
    return value.substr(5, 5);
  }
}
