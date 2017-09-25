import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ItemlevelPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'itemlevelPipe',
})
export class ItemlevelPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    switch (parseInt(value)) {
        case 1:
          return "一级";
        case 2:
          return "二级";
        case 3:
          return "三级";
        case 4:
          return "四级";
        default:
          return "未知级别";
    }
  }
}
