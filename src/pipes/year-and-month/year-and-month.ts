import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from "../../app/app.config";

/**
 * Generated class for the YearAndMonthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'YearAndMonthPipe',
})
export class YearAndMonthPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if (value == null || value.length < 7) {
      return "未知日期";
    }
    if (value instanceof Date) {
      return AppConfig.dateToString(value).substr(0,7);
    }
    return value.substr(0, 7);
  }
}
