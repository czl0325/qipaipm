import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AppService } from "../../app/app.service";
import {ProjectCreatePage} from "../project-create/project-create";
import {MilestoneDetailPage} from "../milestone-detail/milestone-detail";
import {SubtaskPage} from "../subtask/subtask";

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  searchValue:string;
  organization:string;
  arrayDepartment:any[];
  arrayStaff:any[];
  callback;
  type:number;//1是新建工程 2是新建里程碑 3是新建子任务

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, public alertCtrl: AlertController) {
    this.organization = "福建柒牌集团";
    this.arrayDepartment = this.navParams.get('department');
    this.arrayStaff = this.navParams.get('staff');
    this.callback = this.navParams.get('callback');
    this.type = this.navParams.get('type');
  }

  ionViewDidLoad() {
    if ( typeof (this.arrayDepartment) == 'undefined') {
      this.appService.httpGet("http://192.168.72.101:8888/uc/group/searchAll",{},this, function (view, res) {
        if (res.status == 200) {
          var data = res.json();
          if (data.id == null && data.children.length > 0) {
            view.arrayDepartment = data.children;
            console.log(view.arrayDepartment);
          }
        }
      },true);
    }
  }

    goNextDepartment($event, value) {
      if (value.children == null) {
          if (this.arrayStaff != null) {
              this.callback(value).then(()=>{
                  if (this.type == 1) {
                      this.navCtrl.popTo(ProjectCreatePage).then(()=>{
                          const index = this.navCtrl.getActive().index;
                          this.navCtrl.remove(0, index);
                      });
                  } else if (this.type == 2) {
                      this.navCtrl.popTo(MilestoneDetailPage);
                  } else if (this.type == 3) {
                      this.navCtrl.popTo(SubtaskPage);
                  }
              });
          } else {
              this.appService.httpGet("http://192.168.72.101:8888/uc/group/searchUsersByGroup",{"id":value.id},this,function (view, res) {
                  if (res.status == 200) {
                      var array = res.json();
                      if (array == null) {
                          let alert = view.alertCtrl.create({
                              title: '错误信息',
                              subTitle: '该组织架构没有成员!',
                              buttons: ['确定']
                          });
                          alert.present();
                      } else {
                          if (array.length > 0) {
                              view.navCtrl.push(ContactPage, {
                                  department:null,
                                  staff:array,
                                  callback:view.callback,
                                  type:view.type,
                              });
                          } else {
                              let alert = view.alertCtrl.create({
                                  title: '错误信息',
                                  subTitle: '该组织架构没有成员!',
                                  buttons: ['确定']
                              });
                              alert.present();
                          }
                      }
                  }
              },true);
          }
      } else {
          if (value.children.length > 0) {
              this.navCtrl.push(ContactPage, {
                  department:value.children,
                  staff:null,
                  callback:this.callback,
                  type:this.type,
              });
          }
      }
    }
}
