import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AppService} from "../../app/app.service";

/**
 * Generated class for the ProjectEndPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-end',
  templateUrl: 'project-end.html',
})
export class ProjectEndPage {
  project:any;
  arrayCheckboxs:boolean[] = [];
  otherReason:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, private appService: AppService,
              private events: Events, private toastCtrl: ToastController) {
    this.project = this.navParams.get('project');
    this.otherReason = '';
    for (let i=0; i<4; i++) {
        this.arrayCheckboxs.push(false);
    }
  }

  ionViewDidLoad() {

  }

  onClickCheck(value, index) {
    if (value == false) {
      this.arrayCheckboxs[index] = false;
      this.project.multipleItemEndWhy = '';
    } else {
        for (let i=0; i<this.arrayCheckboxs.length; i++) {
            this.arrayCheckboxs[i] = false;
        }
        this.arrayCheckboxs[index] = true;
        switch (index) {
            case 0:
                this.project.multipleItemEndWhy = '业务改变';
                break;
            case 1:
                this.project.multipleItemEndWhy = '资源不够';
                break;
            case 2:
                this.project.multipleItemEndWhy = '合作方退出';
                break;
            default:
                break;
        }
    }
  }

    onEndSave($event) {
      if (this.arrayCheckboxs[3]==true) {
        this.project.multipleItemEndWhy = this.otherReason;
      }

      if (this.project.multipleItemEndWhy == null || this.project.multipleItemEndWhy.length < 1) {
          let alert = this.alertCtrl.create({
              title: '错误信息',
              subTitle: '请填写项目结束原因!',
              buttons: ['确定']
          });
          alert.present();
          return;
      }

      this.project.itemIsEnd = true;
        this.appService.httpPost("item/createItem", this.project, this, function (view ,res){
            // var data = res.json().data;
            view.events.publish('homeProjectReload');
            let toast = view.toastCtrl.create({
                message: '项目已结束!',
                duration: 3000,
                dismissOnPageChange: false,
            });
            toast.present();
            view.navCtrl.popToRoot();
        } ,true);
    }
}
