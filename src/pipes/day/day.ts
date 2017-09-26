import { Pipe, PipeTransform } from '@angular/core';
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the DayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'DayPipe',
})
export class DayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (typeof (value) != "string") {
      if (typeof (value) == "number") {
        if (AppConfig.timestampToDatestring(value).length<10) {
          return "未知日期";
        } else {
          return AppConfig.timestampToDatestring(value).substr(8, 2);
        }
      } else {
        return "未知日期";
      }
    }
    if (value == null){
      return "未知日期";
    }
    if (value.length < 10) {
      return "未知日期";
    }
    return value.substr(8, 2);
  }
}
