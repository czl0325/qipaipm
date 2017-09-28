import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, Events, ToastController } from 'ionic-angular';
import { SubtaskPage } from "../subtask/subtask";
import { MilestoneDetailPage } from "../milestone-detail/milestone-detail";
import { ProjectCreatePage } from "../project-create/project-create";
import { AppService } from "../../app/app.service";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  template: `
    <ion-list>
      <ion-item (click)="onClickEdit($event)">
        <ion-icon name="appname-edit" item-start></ion-icon>
        编辑
      </ion-item>
      <ion-item (click)="onClickShare($event)">
        <ion-icon name="appname-share" item-start></ion-icon>
        分享
      </ion-item>
      <ion-item (click)="onClickDelete($event)">
        <ion-icon name="appname-delete" item-start></ion-icon>
        删除
      </ion-item>
      <ion-item (click)="onClickFinish($event)">
        <ion-icon name="appname-finish" item-start></ion-icon>
        结束
      </ion-item>
      <ion-item (click)="onClickDelay($event)">
        <ion-icon name="appname-delay" item-start></ion-icon>
        延期
      </ion-item>
    </ion-list>
  `
})

export class PopoverPage {
  contentEle: any;

  constructor(public viewCtrl: ViewController ,private navParams: NavParams, public events: Events) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
    }
  }

  onClickEdit($event) {
    this.viewCtrl.dismiss();
    this.events.publish('onPushProjectDetail');
  }

  onClickShare($event) {
    this.viewCtrl.dismiss();
    this.events.publish('showShareView');
  }

  onClickDelete($event) {
    this.viewCtrl.dismiss();
    this.events.publish('onDeleteProject');
  }

  onClickFinish($event) {
    this.viewCtrl.dismiss();
    this.events.publish('onEndProject');
  }

  onClickDelay($event) {
    this.viewCtrl.dismiss();

  }
}

@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})

export class ProjectDetailPage {
  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  public project: any;
  timer;
  isExpand;

  constructor(public navCtrl: NavController, private navParams: NavParams, private popoverCtrl: PopoverController,
              public events: Events, public appService: AppService, public toastCtrl: ToastController) {
    this.project = this.navParams.get('project');
    this.isExpand = [];
    this.reloadArray();
  }

  ionViewDidLoad() {
    this.events.subscribe('showShareView', () => {
      var shareView = document.getElementById('shareView');
      var bottom = parseInt(window.getComputedStyle(shareView).bottom) ;
      this.timer = setInterval(()=> {
        bottom = bottom + 10;
        shareView.style.bottom = bottom+'px';
        if (bottom >= 0) {
          clearInterval(this.timer);
          shareView.style.bottom = 0+'px';
        }
      }, 16);
    });
    this.events.subscribe('onPushProjectDetail',()=>{
      this.navCtrl.push(ProjectCreatePage, {
        project:this.project,
        type:2,
      });
    });
    this.events.subscribe('reloadMilestone',(milestone)=>{
      var isIn = false;
      for (let i=0; i<this.project.children.length; i++) {
        var mile = this.project.children[i];
        if (milestone.id == mile.id) {
          this.project.children.splice(i, 1, milestone);
          isIn = true;
          break;
        }
      }
      if (isIn == false) {
        this.project.children.push(milestone);
      }
    });
    this.events.subscribe('onDeleteProject',()=> {
        this.appService.httpDelete("item/delete",{"ids":this.project.id}, this, function (view, res) {
            if (res.status == 200) {
                view.events.publish('homeProjectReload');
                view.navCtrl.pop();
            }
        },true);
    });
    this.events.subscribe('onEndProject',()=>{
       this.project.itemIsEnd = true;
       this.project.itemState = '07010040';
        this.appService.httpPost("item/createItem", this.project, this, function (view ,res){
            //var data = res.json();
            view.events.publish('homeProjectReload');
            let toast = view.toastCtrl.create({
                message: '项目已结束!',
                duration: 3000
            });
            toast.present();
        } ,true);
    });
  }

  ionViewWillEnter(){

  }

  ionViewDidEnter(){

  }

  ionViewWillLeave(){

  }
  ionViewDidLeave(){

  }
  ionViewWillUnload(){
    this.events.unsubscribe('showShareView');
    this.events.unsubscribe('onPushProjectDetail');
    this.events.unsubscribe('reloadMilestone');
    this.events.unsubscribe('onEndProject');
  }

  ionViewCanEnter(){

  }

  ionViewCanLeave(){

  }

  presentPopover($event) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
    });

    popover.present({
      ev: event
    });
  }

  onClickMilestone($event, mile) {
    this.navCtrl.push(MilestoneDetailPage, {
      milestone : mile,
      project : this.project,
      callback : this.milestoneCallback,
      type : 2,
    });
  }

  onClickSubtask($event, subtask, mile) {
    this.navCtrl.push(SubtaskPage, {
      subtask: subtask,
      projectname : this.project.itemName,
      callback: this.subtaskCallback,
      milestone: mile,
    });
  }

  onClickExpand($event, index) {
    var mile = this.project.children[index];
    if (mile.children == null) {
      return;
    }
    if (mile.children.length < 1) {
      return;
    }
    this.isExpand[index] = !this.isExpand[index];
  }

  onCancelShare($event) {
    var shareView = document.getElementById('shareView');
    var bottom = parseInt(window.getComputedStyle(shareView).bottom) ;
    this.timer = setInterval(()=> {
      bottom = bottom - 10;
      shareView.style.bottom = bottom+'px';
      if (bottom <= -200) {
        clearInterval(this.timer);
        shareView.style.bottom = '-200px';
      }
    }, 16);
  }

  reloadArray() {
      if (typeof (this.project.children) != 'undefined') {
          for (let i=0; i<this.project.children.length; i++) {
              var milestone = this.project.children[i];
              milestone.milestoneName = '里程碑'+(i+1);
              if (typeof (milestone.children) != 'undefined') {
                  for (let j = 0; j < milestone.children.length; j++) {
                      var subtask = milestone.children[j];
                      subtask.subtaskName = '子任务' + (j + 1);
                  }
              }
          }
      }
      this.isExpand = [];
      if (typeof (this.project.children) != 'undefined') {
          for (let i = 0; i < this.project.children.length; i++) {
              this.isExpand.push(false);
          }
      }
  }

  //点击进入里程碑的回调
  milestoneCallback = (milestone) =>
  {
      return new Promise((resolve, reject) => {
          if (typeof (milestone) != 'undefined') {
              var isIn = false;
              for (let i=0; i<this.project.children.length; i++) {
                  var tempMile = this.project.children[i];
                  if (tempMile.id == milestone.id) {
                      isIn = true;
                      this.project.children.splice(i, 1, milestone);
                      break;
                  }
              }
              if (!isIn) {
                  if (this.project.children.length == 0) {
                      this.project.children.push(milestone);
                      this.isExpand.push(false);
                  } else if (this.project.children.length == 1) {
                      var p1 = this.project.children[0];
                      var d1 = AppConfig.stringToDate(p1.deliveryTime);
                      var d2 = AppConfig.stringToDate(milestone.deliveryTime);
                      if (d1 <= d2) {
                          this.project.children.push(milestone);
                          this.isExpand.push(false);
                      } else {
                          this.project.children.insert(0, milestone);
                          this.isExpand.insert(0, false);
                      }
                  } else {
                      var isInsert = false;
                    for (let i=0; i<this.project.children.length-1; i++) {
                        var pp1 = this.project.children[i];
                        var pp2 = this.project.children[i+1];
                        var dd1 = AppConfig.stringToDate(pp1.deliveryTime);
                        var dd2 = AppConfig.stringToDate(pp2.deliveryTime);
                        var dd3 = AppConfig.stringToDate(milestone.deliveryTime);
                        if (i==0 && dd3<dd1) {
                            isInsert = true;
                            this.project.children.insert(0, milestone);
                            this.isExpand.insert(0, false);
                            break;
                        }
                        if (dd3>dd1 && dd3<dd2) {
                            isInsert = true;
                            this.project.children.insert(i+1, milestone);
                            this.isExpand.insert(i+1, false);
                            break;
                        }
                        if (i==this.project.children.length-2 && dd3>dd2) {
                            isInsert = true;
                            this.project.children.push(milestone);
                            this.isExpand.push(false);
                            break;
                        }
                    }
                    if (isInsert==false) {
                        this.project.children.push(milestone);
                        this.isExpand.push(false);
                    }
                  }
                  // var compare = function (obj1, obj2) {//比较函数
                  //     console.log(AppConfig.stringToDate(obj1.planTime));
                  //     var date1 = AppConfig.stringToDate(obj1.planTime);
                  //     var date2 = AppConfig.stringToDate(obj2.planTime);
                  //     if (date1 < date2) {
                  //         return -1;
                  //     } else if (date1 > date2) {
                  //         return 1;
                  //     } else {
                  //         return 0;
                  //     }
                  // }
                  // this.project.children.sort(compare);
              }
              this.reloadArray();
          } else {

          }
          resolve();
      });
  };

    //点击进入子任务的回调
    subtaskCallback = (subtask) => {
      return new Promise((resolve, reject) => {
        if (typeof (subtask) != 'undefined') {
            for (let i=0; i<this.project.children.length; i++) {
                var milestone = this.project.children[i];
                var isIn = false;
                for (let j=0; j<milestone.children.length; j++) {
                    var sub = milestone.children[j];
                    if (sub.id == subtask.id) {
                      milestone.children.splice(j,1,subtask);
                      isIn = true;
                      break;
                    }
                }
                if (isIn == false) {
                  break;
                }
            }
            this.reloadArray();
        }
        resolve();
      });
    }


  // setInterval(function(){
  //   this.showShareView();
  // }.bind(this), 2500);
}
