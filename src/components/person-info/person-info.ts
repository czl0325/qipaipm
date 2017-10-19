import { Component } from '@angular/core';
import { UserInfo } from "../../model/UserInfo";
import {AppSingleton} from "../../app/app.singleton";

/**
 * Generated class for the PersonInfoComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'person-info',
  templateUrl: 'person-info.html'
})
export class PersonInfoComponent {
  currentUser: UserInfo = AppSingleton.getInstance().currentUserInfo;

  constructor() {


  }

}
