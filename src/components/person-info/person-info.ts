import {Component, Output, EventEmitter} from '@angular/core';
import {UserInfo} from "../../model/UserInfo";
import {AppSingleton} from "../../app/app.singleton";
import {AppConfig} from "../../app/app.config";

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
    timer: any;
    @Output() onLogOut = new EventEmitter();
    @Output() onHideMask = new EventEmitter();

    constructor() {

    }

    onHidePerson($event) {
        this.onHideMask.emit();
        clearInterval(this.timer);
        var personView = document.getElementById('person-info');
        if (personView != null) {
            var left = parseInt(window.getComputedStyle(personView).left);
            this.timer = setInterval(() => {
                left = left - 10;
                personView.style.left = left + 'px';
                var screenw = AppConfig.getWindowWidth();
                if (left <= -screenw) {
                    clearInterval(this.timer);
                    personView.style.left = '-100%';
                }
            }, 2);
        }
    }

    onClickLogOut($event) {
        this.onLogOut.emit();
    }
}
