import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from "../../app/app.config";

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
  transform(value: any, ...args) {
    if (typeof (value) != "string") {
        if (typeof (value) == "number") {
            if (AppConfig.timestampToDatestring(value).length<10) {
                return "未知日期";
            } else {
                return AppConfig.timestampToDatestring(value).substr(5, 5);
            }
        } else {
            return "未知日期";
        }
    }
    if (value == null || value.length < 10) {
      return "未知日期";
    }
    return value.substr(5, 5);
  }
}
