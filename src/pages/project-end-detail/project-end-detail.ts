import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {AppSingleton} from "../../app/app.singleton";
import {AppService} from "../../app/app.service";
import {AppConfig} from "../../app/app.config";

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
    tempPorject: any;
    canFinish: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
                private appService: AppService, private events: Events, private toastCtrl: ToastController) {
        this.project = this.navParams.get('project');
        this.tempPorject = AppConfig.deepCopy(this.project);
        if (AppSingleton.getInstance().currentUserInfo.username == this.project.itemEndLeaderNum && this.tempPorject.itemIsEnd == false) {
            this.canFinish = true;
        }
    }

    ionViewDidLoad() {

    }

    onNormalEndProject($event) {
        if (this.tempPorject.itemIsEnd == false) {
            let toast = this.toastCtrl.create({
                message: '您没有勾选结束项目!',
                duration: 3000,
                dismissOnPageChange: false,
            });
            toast.present();
            return;
        }
        if (this.tempPorject.itemIsEnd == true) {
            this.tempPorject.itemEndType = "07000010";
        }
        this.appService.httpPost("item/createItem", this.tempPorject, this, function (view, res) {
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
