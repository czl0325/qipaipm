import { Pipe, PipeTransform } from '@angular/core';
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the StampToDatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'stampToDate',
})
export class StampToDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    var timeStamp = "";
    if (typeof (value) == "number"){
      timeStamp = AppConfig.timestampToDatestring(value);
    } else {
      timeStamp = value;
    }
    return timeStamp;
  }
}
