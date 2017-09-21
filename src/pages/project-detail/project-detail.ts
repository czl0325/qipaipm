import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, Events, ToastController } from 'ionic-angular';
import { SubtaskPage } from "../subtask/subtask";
import { MilestoneDetailPage } from "../milestone-detail/milestone-detail";
import { ProjectCreatePage } from "../project-create/project-create";
import { AppService } from "../../app/app.service";

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

  }

  onClickFinish($event) {
    this.viewCtrl.dismiss();

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
  isExpand: any[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private popoverCtrl: PopoverController,
              public events: Events, public appService: AppService, public toastCtrl: ToastController) {
    this.project = this.navParams.get('project');
    for (let i=0; i<this.project.milestone.length; i++) {
        var milestone = this.project.milestone[i];
        milestone.milestoneName = '里程碑'+(i+1);
        for (let j=0; j<milestone.subtask.length; j++) {
          var subtask = milestone.subtask[j];
          subtask.subtaskName = '子任务'+(j+1);
        }
    }
    this.isExpand = [];
    for (let i=0; i<this.project.milestone.length; i++) {
      this.isExpand.push(false);
    }
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
      for (let i=0; i<this.project.milestone.length; i++) {
        var mile = this.project.milestone[i];
        if (milestone.id == mile.id) {
          this.project.milestone.splice(i, 1, milestone);
          isIn = true;
          break;
        }
      }
      if (isIn == false) {
        this.project.milestone.push(milestone);
      }
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
      projectname : this.project.itemName,
      pid :this.project.id,
      callback : this.milestoneCallback,
      type : 2,
    });
  }

  onClickSubtask($event, subtask) {
    this.navCtrl.push(SubtaskPage, {
      subtask: subtask,
      projectname : this.project.itemName,
      callback: this.subtaskCallback
    });
  }

  onClickExpand($event, index) {
    var mile = this.project.milestone[index];
    if (mile.subtask == null) {
      return;
    }
    if (mile.subtask.length < 1) {
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

  //点击进入里程碑的回调
  milestoneCallback = (milestone) =>
  {
      return new Promise((resolve, reject) => {
          if (typeof (milestone) != 'undefined') {
              var isIn = false;
              for (let i=0; i<this.project.milestone.length; i++) {
                  var tempMile = this.project.milestone[i];
                  if (tempMile.id == milestone.id) {
                      isIn = true;
                      this.project.milestone.splice(i, 1, milestone);
                      break;
                  }
              }
              if (!isIn) {
                  this.project.milestone.push(milestone);
              }
          } else {

          }
          resolve();
      });
  };

    //点击进入子任务的回调
    subtaskCallback = (subtask) => {
      return new Promise((resolve, reject) => {
        if (typeof (subtask) != 'undefined') {
            for (let i=0; i<this.project.milestone.length; i++) {
                var milestone = this.project.milestone[i];
                var isIn = false;
                for (let j=0; j<milestone.subtask.length; j++) {
                    var sub = milestone.subtask[j];
                    if (sub.id == subtask.id) {
                      milestone.subtask.splice(j,1,subtask);
                        isIn = true;
                      break;
                    }
                }
                if (isIn == true) {
                  break;
                }
            }
        }
        resolve();
      });
    }


  // setInterval(function(){
  //   this.showShareView();
  // }.bind(this), 2500);
}
