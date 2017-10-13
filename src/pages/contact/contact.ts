import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  type:number;//1是新建工程 2是新建里程碑 3是新建子任务
  arrayHidden:boolean[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService,
              public alertCtrl: AlertController, public events: Events) {
    this.organization = "福建柒牌集团";
    this.arrayDepartment = this.navParams.get('department');
    this.arrayStaff = this.navParams.get('staff');
    this.type = this.navParams.get('type');
    this.arrayHidden = [];
    if (this.arrayDepartment != null) {
        for (let i1=0; i1<this.arrayDepartment.length; i1++) {
            this.arrayHidden.push(false);
        }
    } else {
        if (this.arrayStaff != null) {
            for (let i2=0; i2<this.arrayStaff.length; i2++) {
                this.arrayHidden.push(false);
            }
        }
    }
  }

  ionViewDidLoad() {
    if ( typeof (this.arrayDepartment) == 'undefined') {
      this.appService.httpGet("http://192.168.10.118:8888/uc/group/searchAll",{},this, function (view, res) {
        if (res.status == 200) {
          var data = res.json();
          if (data.id == null && data.children.length > 0) {
            view.arrayDepartment = data.children;
          }
        }
      },true);
    }
  }


    onSearchContact($event) {
      if (this.searchValue.length == 0) {
          for (let i=0; i<this.arrayHidden.length; i++) {
              this.arrayHidden[i]=false;
          }
      } else {
          if (this.arrayDepartment != null) {
              for (let i1=0; i1<this.arrayDepartment.length; i1++) {
                  var text1 = this.arrayDepartment[i1].text;
                  if(text1.indexOf(this.searchValue) > -1 ){
                      this.arrayHidden[i1] = false;
                  } else {
                      this.arrayHidden[i1] = true;
                  }
              }
          } else {
              if (this.arrayStaff != null) {
                  for (let i2=0; i2<this.arrayStaff.length; i2++) {
                      var text2 = this.arrayStaff[i2].name;
                      if(text2.indexOf(this.searchValue) > -1 ){
                          this.arrayHidden[i2] = false;
                      } else {
                          this.arrayHidden[i2] = true;
                      }
                  }
              }
          }
      }
    }

    onSearchCancel($event) {
        for (let i=0; i<this.arrayHidden.length; i++) {
            this.arrayHidden[i]=false;
        }
    }

    goNextDepartment($event, value) {
      if (value.children == null) {
          if (this.arrayStaff != null) {
              if (this.type == 1) {
                  var index1 = -1;
                  for (let i=0; i<this.navCtrl.length(); i++) {
                      var view1 = this.navCtrl.getByIndex(i);
                      if (view1.name == 'ProjectCreatePage') {
                          index1 = i;
                          break;
                      }
                  }
                  if (index1 >= 0) {
                      this.events.publish('onConfirmProjectLeader',value);
                      this.navCtrl.popTo(this.navCtrl.getByIndex(index1)).then(()=>{

                      });
                  }
              } else if (this.type == 2) {
                  var index2 = -1;
                  for (let i=0; i<this.navCtrl.length(); i++) {
                      var view2 = this.navCtrl.getByIndex(i);
                      if (view2.name == 'MilestoneDetailPage') {
                          index2 = i;
                          break;
                      }
                  }
                  if (index2 >= 0) {
                      this.events.publish('onConfirmMilestoneLeader',value);
                      this.navCtrl.popTo(this.navCtrl.getByIndex(index2)).then(()=>{

                      });
                  }
              } else if (this.type == 3) {
                  var index3 = -1;
                  for (let i=0; i<this.navCtrl.length(); i++) {
                      var view3 = this.navCtrl.getByIndex(i);
                      if (view3.name == 'SubtaskPage') {
                          index3 = i;
                          break;
                      }
                  }
                  if (index3 >= 0) {
                      this.events.publish('onConfirmSubtaskLeader',value);
                      this.navCtrl.popTo(this.navCtrl.getByIndex(index3)).then(()=>{

                      });
                  }
              }
          } else {
              this.appService.httpGet("http://192.168.10.118:8888/uc/group/searchUsersByGroupAndKey",{"id":value.id},this,function (view, res) {
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
                  type:this.type,
              });
          }
      }
    }
}
