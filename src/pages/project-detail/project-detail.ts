import {Component, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import {
    NavController, NavParams, PopoverController, ViewController, Events, ToastController,
    AlertController
} from 'ionic-angular';
import {SubtaskPage} from "../subtask/subtask";
import {MilestoneDetailPage} from "../milestone-detail/milestone-detail";
import {ProjectCreatePage} from "../project-create/project-create";
import {AppService} from "../../app/app.service";
import {AppConfig} from "../../app/app.config";
import {DatePipe} from "@angular/common";
import {AppSingleton} from "../../app/app.singleton";
import {SocialSharing} from '@ionic-native/social-sharing';
import {ProjectEndPage} from "../project-end/project-end";

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
    template: `
        <ion-list>
            <ion-item (click)="onClickEdit($event)" [hidden]="!canShow">
                <ion-icon name="appname-edit" item-start></ion-icon>
                编辑
            </ion-item>
            <ion-item (click)="onClickShare($event)">
                <ion-icon name="appname-share" item-start></ion-icon>
                分享
            </ion-item>
            <ion-item (click)="onClickDelete($event)" [hidden]="!canShow">
                <ion-icon name="appname-delete" item-start></ion-icon>
                删除
            </ion-item>
            <ion-item (click)="onClickFinish($event)" [hidden]="!canShow">
                <ion-icon name="appname-finish" item-start></ion-icon>
                结束
            </ion-item>
            <ion-item (click)="onClickDelay($event)" [hidden]="!canShow">
                <ion-icon name="appname-delay" item-start></ion-icon>
                延期
            </ion-item>
        </ion-list>
    `
})

export class PopoverPage {
    contentEle: any;
    canShow: boolean;

    constructor(public viewCtrl: ViewController, private navParams: NavParams,
                public events: Events) {

    }

    ngOnInit() {
        if (this.navParams.data) {
            this.contentEle = this.navParams.data.contentEle;
            this.canShow = this.navParams.data.canShow;
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
        this.events.publish('onDelayProject');
    }
}

@Component({
    selector: 'page-project-detail',
    templateUrl: 'project-detail.html',
})

export class ProjectDetailPage {
    @ViewChild('popoverContent', {read: ElementRef}) content: ElementRef;
    public project: any;
    timer;
    isExpand1: boolean[];
    isExpand2: boolean[];

    constructor(public navCtrl: NavController, private navParams: NavParams, private popoverCtrl: PopoverController,
                public events: Events, public appService: AppService, public toastCtrl: ToastController,
                private socialSharing: SocialSharing, private alertCtrl: AlertController,
                private cd: ChangeDetectorRef) {
        this.project = this.navParams.get('project');
        this.isExpand1 = [];
        this.isExpand2 = [];
        this.reloadArray();
    }

    ionViewDidLoad() {
        this.events.subscribe('showShareView', () => {
            // var shareView = document.getElementById('shareView');
            // var bottom = parseInt(window.getComputedStyle(shareView).bottom) ;
            // this.timer = setInterval(()=> {
            //   bottom = bottom + 10;
            //   shareView.style.bottom = bottom+'px';
            //   if (bottom >= 0) {
            //     clearInterval(this.timer);
            //     shareView.style.bottom = 0+'px';
            //   }
            // }, 16);
            var dateString = '';
            if (typeof (this.project.itemStartTime) == "number") {
                dateString = AppConfig.timestampToDatestring(this.project.itemStartTime);
            } else if (typeof (this.project.itemStartTime) == "string") {
                dateString = this.project.itemStartTime;
            }
            this.socialSharing.share("您有一个项目任务《" + this.project.itemName + "》于" + dateString + "启动，请前往柒牌项目管理应用查看详情", "柒牌项目管理", null, null);
        });
        this.events.subscribe('onPushProjectDetail', () => {
            if (this.project.itemIsEnd == true) {
                let toast = this.toastCtrl.create({
                    message: "已结束项目不能编辑!",
                    duration: 3000
                });
                toast.present();
                return;
            }
            this.navCtrl.push(ProjectCreatePage, {
                project: this.project,
                isExpand: this.isExpand1,
                type: 2,
            });
        });
        this.events.subscribe('reloadMilestone', (milestone) => {
            if (milestone.milestoneType == 1) {
                var isIn1 = false;
                for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                    var mile1 = this.project.milestoneVo1[i];
                    if (milestone.id == mile1.id && mile1.id != '') {
                        //this.project.children.splice(i, 1, milestone);
                        this.project.milestoneVo1.splice(i, 1, milestone);
                        isIn1 = true;
                        this.cd.detectChanges();
                        break;
                    }
                }
                if (isIn1 == false) {
                    this.project.milestoneVo1.push(milestone);
                    this.cd.detectChanges();
                }
            } else if (milestone.milestoneType == 2) {
                var isIn2 = false;
                for (let i = 0; i < this.project.milestoneVo2.length; i++) {
                    var mile2 = this.project.milestoneVo2[i];
                    if (milestone.id == mile2.id && mile2.id != '') {
                        //this.project.children.splice(i, 1, milestone);
                        this.project.milestoneVo2.splice(i, 1, milestone);
                        isIn2 = true;
                        this.cd.detectChanges();
                        break;
                    }
                }
                if (isIn2 == false) {
                    this.project.milestoneVo2.push(milestone);
                    this.cd.detectChanges();
                }
            }
        });
        this.events.subscribe('onDeleteProject', () => {
            let prompt = this.alertCtrl.create({
                title: '提示',
                message: "确定删除项目?",
                buttons: [
                    {
                        text: '确定',
                        handler: data => {
                            this.appService.httpDelete("item/delete", {"ids": [this.project.id]}, this, function (view, res) {
                                if (res.status == 200) {
                                    view.events.publish('homeProjectReload');
                                    view.navCtrl.pop();
                                } else {
                                    var data = res.json()._body.msg;
                                    let toast = view.toastCtrl.create({
                                        message: data.msg,
                                        duration: 3000
                                    });
                                    toast.present();
                                }
                            }, true);
                        }
                    },
                    {
                        text: '取消',
                        handler: data => {

                        }
                    }
                ]
            });
            prompt.present();
        });
        this.events.subscribe('onEndProject', () => {
            if (this.project.itemIsEnd == true) {
                let toast = this.toastCtrl.create({
                    message: "该项目已结束!",
                    duration: 3000
                });
                toast.present();
                return;
            }
            this.navCtrl.push(ProjectEndPage, {
                project: this.project,
            });
        });
        this.events.subscribe('onDelayProject', () => {
            var milestone = {
                id: '',                     //里程碑id
                milestoneName: '延期' + (this.project.milestoneVo2.length + 1),         //里程碑的名称
                leader: '',                 //里程碑的负责人
                leaderEmpNum: '',           //里程碑负责人工号
                // milestoneDelivery : '',
                deliveryResult: '',         //里程碑的交付成果
                itemProgress: '100%',       //里程碑的进度
                deliveryTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),         //里程碑交付时间
                planTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
                realTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑实际完成时间
                remark: '',                 //里程碑备注
                isAccomplish: false,        //里程碑是否完成
                delayDays: 0,               //里程碑延迟天数
                milestoneType: 2,           //1是普通里程碑，2是延期里程碑
                children: [],               //里程碑子任务
            };
            this.navCtrl.push(MilestoneDetailPage, {
                milestone: milestone,
                mileType: 2,
                isExpand: this.isExpand2,
                project: this.project,
                callback: this.delayMilestoneCallback,
                type: 1,
            });
        });
    }

    ionViewWillEnter() {

    }

    ionViewDidEnter() {

    }

    ionViewWillLeave() {

    }

    ionViewDidLeave() {

    }

    ionViewWillUnload() {
        this.events.unsubscribe('showShareView');
        this.events.unsubscribe('onPushProjectDetail');
        this.events.unsubscribe('reloadMilestone');
        this.events.unsubscribe('onDeleteProject');
        this.events.unsubscribe('onEndProject');
        this.events.unsubscribe('onDelayProject');
    }

    ionViewCanEnter() {

    }

    ionViewCanLeave() {

    }

    presentPopover($event) {
        var canShow = true;
        if (AppSingleton.getInstance().currentUserInfo.username != this.project.founderEmpNum) {
            canShow = false;
        }
        let popover = this.popoverCtrl.create(PopoverPage, {
            contentEle: this.content.nativeElement,
            canShow: canShow,
        });

        popover.present({
            ev: event
        });
    }

    onClickMilestone($event, mile) {
        if (this.project.itemIsEnd == true) {
            let toast = this.toastCtrl.create({
                message: "已结束项目不能编辑!",
                duration: 3000
            });
            toast.present();
            return;
        }
        this.navCtrl.push(MilestoneDetailPage, {
            milestone: mile,
            mileType: 1,
            isExpand: mile.milestoneType == 1?this.isExpand1:this.isExpand2,
            project: this.project,
            callback: this.milestoneCallback,
            type: 2,
        });
    }

    onClickSubtask($event, subtask, mile) {
        if (this.project.itemIsEnd == true) {
            let toast = this.toastCtrl.create({
                message: "已结束项目不能编辑!",
                duration: 3000
            });
            toast.present();
            return;
        }
        this.navCtrl.push(SubtaskPage, {
            subtask: subtask,
            type: 2,
            projectname: this.project.itemName,
            callback: this.subtaskCallback,
            milestone: mile,
        });
    }

    onClickExpand($event, index, m) {
        if (m.milestoneType == 1) {
            var mile1 = this.project.milestoneVo1[index];
            if (mile1.children == null) {
                return;
            }
            if (mile1.children.length < 1) {
                return;
            }
            this.isExpand1[index] = !this.isExpand1[index];
        } else if(m.milestoneType == 2) {
            var mile2 = this.project.milestoneVo1[index];
            if (mile2.children == null) {
                return;
            }
            if (mile2.children.length < 1) {
                return;
            }
            this.isExpand2[index] = !this.isExpand2[index];
        }
    }

    onCancelShare($event) {
        var shareView = document.getElementById('shareView');
        var bottom = parseInt(window.getComputedStyle(shareView).bottom);
        this.timer = setInterval(() => {
            bottom = bottom - 10;
            shareView.style.bottom = bottom + 'px';
            if (bottom <= -200) {
                clearInterval(this.timer);
                shareView.style.bottom = '-200px';
            }
        }, 16);
    }

    reloadArray() {
        if (typeof (this.project.milestoneVo1) != 'undefined') {
            for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                var milestone = this.project.milestoneVo1[i];
                milestone.milestoneName = '里程碑' + (i + 1);
                if (typeof (milestone.children) != 'undefined') {
                    for (let j = 0; j < milestone.children.length; j++) {
                        var subtask1 = milestone.children[j];
                        subtask1.subtaskName = '子任务' + (j + 1);
                    }
                }
            }
        }
        if (typeof (this.project.milestoneVo2) != 'undefined') {
            for (let i = 0; i < this.project.milestoneVo2.length; i++) {
                var delayMile = this.project.milestoneVo2[i];
                delayMile.milestoneName = '延期' + (i + 1);
                if (typeof (delayMile.children) != 'undefined') {
                    for (let j = 0; j < delayMile.children.length; j++) {
                        var subtask2 = delayMile.children[j];
                        subtask2.subtaskName = '子任务' + (j + 1);
                    }
                }
            }
        }
        this.isExpand1 = [];
        if (typeof (this.project.milestoneVo1) != 'undefined') {
            for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                this.isExpand1.push(false);
            }
        }
        this.isExpand2 = [];
        if (typeof (this.project.milestoneVo2) != 'undefined') {
            for (let i = 0; i < this.project.milestoneVo2.length; i++) {
                this.isExpand2.push(false);
            }
        }
    }

    addOneMilestone(milestone) {
        if (milestone.milestoneType == 1) {
            if (this.project.milestoneVo1.length == 0) {
                this.project.milestoneVo1.push(milestone);
                this.isExpand1.push(false);
            } else if (this.project.milestoneVo1.length == 1) {
                var p1_1 = this.project.milestoneVo1[0];
                var d1_1 = AppConfig.timestampToDate(p1_1.deliveryTime);
                var d2_1 = AppConfig.timestampToDate(milestone.deliveryTime);
                if (d1_1 <= d2_1) {
                    this.project.milestoneVo1.push(milestone);
                    this.isExpand1.push(false);
                } else {
                    this.project.milestoneVo1.splice(0, 0, milestone);
                    this.isExpand1.splice(0, 0, false);
                }
            } else {
                var isInsert1 = false;
                for (let i = 0; i < this.project.milestoneVo1.length - 1; i++) {
                    var pp1_1 = this.project.milestoneVo1[i];
                    var pp2_1 = this.project.milestoneVo1[i + 1];
                    var dd1_1 = AppConfig.timestampToDate(pp1_1.deliveryTime);
                    var dd2_1 = AppConfig.timestampToDate(pp2_1.deliveryTime);
                    var dd3_1 = AppConfig.timestampToDate(milestone.deliveryTime);
                    if (i == 0 && dd3_1 < dd1_1) {
                        isInsert1 = true;
                        this.project.milestoneVo1.splice(0, 0, milestone);
                        this.isExpand1.splice(0, 0, false);
                        break;
                    }
                    if (dd3_1 > dd1_1 && dd3_1 < dd2_1) {
                        isInsert1 = true;
                        this.project.milestoneVo1.splice(i + 1, 0, milestone);
                        this.isExpand1.splice(i + 1, 0, false);
                        break;
                    }
                    if (i == this.project.milestoneVo1.length - 2 && dd3_1 > dd2_1) {
                        isInsert1 = true;
                        this.project.milestoneVo1.push(milestone);
                        this.isExpand1.push(false);
                        break;
                    }
                }
                if (isInsert1 == false) {
                    this.project.milestoneVo1.push(milestone);
                    this.isExpand1.push(false);
                }
            }
        } else if (milestone.milestoneType == 2) {
            if (this.project.milestoneVo2.length == 0) {
                this.project.milestoneVo2.push(milestone);
                this.isExpand2.push(false);
            } else if (this.project.milestoneVo2.length == 1) {
                var p1_2 = this.project.milestoneVo2[0];
                var d1_2 = AppConfig.timestampToDate(p1_2.deliveryTime);
                var d2_2 = AppConfig.timestampToDate(milestone.deliveryTime);
                if (d1_2 <= d2_2) {
                    this.project.milestoneVo2.push(milestone);
                    this.isExpand2.push(false);
                } else {
                    this.project.milestoneVo2.splice(0, 0, milestone);
                    this.isExpand2.splice(0, 0, false);
                }
            } else {
                var isInsert2 = false;
                for (let i = 0; i < this.project.milestoneVo2.length - 1; i++) {
                    var pp1_2 = this.project.milestoneVo2[i];
                    var pp2_2 = this.project.milestoneVo2[i + 1];
                    var dd1_2 = AppConfig.timestampToDate(pp1_2.deliveryTime);
                    var dd2_2 = AppConfig.timestampToDate(pp2_2.deliveryTime);
                    var dd3_2 = AppConfig.timestampToDate(milestone.deliveryTime);
                    if (i == 0 && dd3_2 < dd1_2) {
                        isInsert2 = true;
                        this.project.milestoneVo2.splice(0, 0, milestone);
                        this.isExpand2.splice(0, 0, false);
                        break;
                    }
                    if (dd3_2 > dd1_2 && dd3_2 < dd2_2) {
                        isInsert2 = true;
                        this.project.milestoneVo2.splice(i + 1, 0, milestone);
                        this.isExpand2.splice(i + 1, 0, false);
                        break;
                    }
                    if (i == this.project.milestoneVo2.length - 2 && dd3_2 > dd2_2) {
                        isInsert2 = true;
                        this.project.milestoneVo2.push(milestone);
                        this.isExpand2.push(false);
                        break;
                    }
                }
                if (isInsert2 == false) {
                    this.project.milestoneVo2.push(milestone);
                    this.isExpand2.push(false);
                }
            }
        }

    }

    //点击进入里程碑的回调
    milestoneCallback = (milestone) => {
        return new Promise((resolve, reject) => {
            if (typeof (milestone) != 'undefined') {
                if (milestone.milestoneType == 1) {
                    var isIn1 = false;
                    for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                        var tempMile1 = this.project.milestoneVo1[i];
                        if (tempMile1.id == milestone.id) {
                            isIn1 = true;
                            this.project.milestoneVo1.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn1) {
                        this.addOneMilestone(milestone);
                    }
                } else if (milestone.milestoneType == 2) {
                    var isIn2 = false;
                    for (let i = 0; i < this.project.milestoneVo2.length; i++) {
                        var tempMile2 = this.project.milestoneVo2[i];
                        if (tempMile2.id == milestone.id) {
                            isIn2 = true;
                            this.project.milestoneVo2.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn2) {
                        this.addOneMilestone(milestone);
                    }
                }
                this.reloadArray();
            } else {

            }
            resolve();
        });
    };

    delayMilestoneCallback = (milestone) => {
        return new Promise((resolve, reject) => {
            if (typeof (milestone) != 'undefined') {
                var isIn = false;
                for (let i = 0; i < this.project.milestoneVo2.length; i++) {
                    var tempMile = this.project.milestoneVo2[i];
                    if (tempMile.id == milestone.id) {
                        isIn = true;
                        this.project.milestoneVo2.splice(i, 1, milestone);
                        break;
                    }
                }
                if (!isIn) {
                    this.project.milestoneVo2.push(milestone);
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
                for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                    var milestone = this.project.milestoneVo1[i];
                    var isIn = false;
                    for (let j = 0; j < milestone.children.length; j++) {
                        var sub = milestone.children[j];
                        if (sub.id == subtask.id) {
                            milestone.children.splice(j, 1, subtask);
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
