import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {AppSingleton} from "../../app/app.singleton";
import {AppService} from "../../app/app.service";

/**
 * Generated class for the ProjectEndDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-project-end-detail',
    templateUrl: 'project-end-detail.html',
})
export class ProjectEndDetailPage {
    project: any;
    canFinish: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
                private appService: AppService, private events: Events, private toastCtrl: ToastController) {
        this.project = this.navParams.get('project');
        if (AppSingleton.getInstance().currentUserInfo.username == this.project.itemEndLeaderNum) {
            this.canFinish = true;
        }
    }

    ionViewDidLoad() {

    }

    onNormalEndProject($event) {
        this.appService.httpPost("item/createItem", this.project, this, function (view, res) {
            view.events.publish('homeProjectReload');
            let toast = view.toastCtrl.create({
                message: '项目已结束!',
                duration: 3000,
                dismissOnPageChange: false,
            });
            toast.present();
            view.navCtrl.popToRoot();
        }, true);
    }
}
