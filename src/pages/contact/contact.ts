import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AppService } from "../../app/app.service";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService, private alertCtrl: AlertController) {
    this.organization = "福建柒牌集团";
    this.arrayDepartment = this.navParams.get('department');
    this.arrayStaff = this.navParams.get('staff');
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

    goNextDepartment($event, department) {
      if (department.children == null) {
          if (this.arrayStaff != null) {
              console.log(department);
          } else {
              this.appService.httpGet("http://192.168.72.101:8888/uc/group/searchUsersByGroup",{"id":department.id},this,function (view, res) {
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
          if (department.children.length > 0) {
              this.navCtrl.push(ContactPage, {
                  department:department.children,
                  staff:null,
              });
          }
      }
    }
}
