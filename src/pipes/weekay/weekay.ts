import { Pipe, PipeTransform } from '@angular/core';
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the WeekayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'WeekayPipe',
})
export class WeekayPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
      if (typeof (value) == 'number') {
          var dateString = "";
          dateString = AppConfig.timestampToDatestring(value);
          var date1 = new Date(dateString.replace(/-/g, "/"));
          switch (date1.getDay()) {
              case 1:
                  return '周一';
              case 2:
                  return '周二';
              case 3:
                  return '周三';
              case 4:
                  return '周四';
              case 5:
                  return '周五';
              case 6:
                  return '周六';
              case 7:
                  return '周天';
              default:
                  return '未知';
          }
      } else {
          if (typeof (value) == 'string') {
              var date2 = new Date(value.replace(/-/g, "/"));
              switch (date2.getDay()) {
                  case 1:
                      return '周一';
                  case 2:
                      return '周二';
                  case 3:
                      return '周三';
                  case 4:
                      return '周四';
                  case 5:
                      return '周五';
                  case 6:
                      return '周六';
                  case 7:
                      return '周天';
                  default:
                      return '未知';
              }
          } else {
              return '未知';
          }
      }
  }
}
