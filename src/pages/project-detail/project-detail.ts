import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { SubtaskPage } from "../subtask/subtask";
import { MilestoneDetailPage } from "../milestone-detail/milestone-detail";
import { ProjectCreatePage } from "../project-create/project-create";
import {AppService} from "../../app/app.service";

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

  constructor(public navCtrl: NavController, private navParams: NavParams, private popoverCtrl: PopoverController, public events: Events, public appService: AppService) {
    this.project = this.navParams.get('project');
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
      callback : this.projectCallback,
      type : 1,
    });
  }

  onClickSubtask($event, subtask) {
    this.navCtrl.push(SubtaskPage, {
      subtask: subtask,
      projectname : this.project.itemName,
      callback: this.projectCallback
    });
  }

  onClickExpand($event, index) {
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

  projectCallback = (param) =>
  {
    return new Promise((resolve, reject) => {
      if (typeof (param) != 'undefined') {

      } else {

      }
      resolve();
    });
  };



  // setInterval(function(){
  //   this.showShareView();
  // }.bind(this), 2500);
}
