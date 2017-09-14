import { Pipe, PipeTransform } from '@angular/core';
import { AppConfig } from "../../app/app.config";

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
    if (typeof (value) != "string") {
      if (typeof (value) == "number") {
          if (AppConfig.timestampToDatestring(value).length<10) {
              return "未知日期";
          } else {
              return AppConfig.timestampToDatestring(value).substr(0, 4);
          }
      } else {
          return "未知日期";
      }
    }
    if (value == null || value.length < 4) {
      return "未知日期";
    }
    return value.substr(0, 4);
  }
}
