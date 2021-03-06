import {Component, ViewChild} from '@angular/core';
import {
    NavController, NavParams, ToastController, Events, AlertController, App, Platform,
    Content
} from 'ionic-angular';
import {DatePipe} from "@angular/common";
import {MilestoneDetailPage} from "../milestone-detail/milestone-detail";
import {AppService} from "../../app/app.service";
import {ContactPage} from "../contact/contact";
import {AppConfig} from "../../app/app.config";
import {AppSingleton} from "../../app/app.singleton";
import {Keyboard} from "@ionic-native/keyboard";

/**
 * Generated class for the ProjectCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-project-create',
    templateUrl: 'project-create.html',
})

//未开始(07010010)    进行中(07010020)      延期(07010030)     已结束(07010040)

export class ProjectCreatePage {
    viewTitle: string;
    type: number;
    isExpand;
    public project = {
        id: '',                    //项目id
        itemName: '',              //项目的名称
        itemFounder: AppSingleton.getInstance().currentUserInfo.name,           //项目的创建人
        founderEmpNum: AppSingleton.getInstance().currentUserInfo.username,     //项目创建人工号
        itemDept: AppSingleton.getInstance().currentUserInfo.department!=null?AppSingleton.getInstance().currentUserInfo.department:AppSingleton.getInstance().currentUserInfo.company,
        itemUrl: '',                    //项目分享的网址
        itemEndLeader: '',              //项目结束负责人
        itemEndLeaderNum: '',           //项目结束负责人工号
        itemEndDept: '',                //项目结束负责人部门
        // empNum: '',
        itemCreateTime: '',             //项目的创建时间
        itemStartTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),  //项目的启动时间
        delayTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),      //项目的延期时间
        delayDays: '',                  //项目延期的天数
        itemUpdate: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),     //项目更新时间
        endTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //项目结束时间
        itemVersion: '',                //项目版本
        itemLevel: '',                  //项目级别
        itemStartResult: '',            //项目启动的交付成果
        itemEndResult: '',              //项目结束的交付成果
        multipleItemEndWhy: '',         //项目结束原因
        children: [],                   //总的数组
        milestoneVo1: [],               //项目里程碑
        milestoneVo2: [],               //项目延期里程碑
        itemRaise: '',                  //项目提出人
        itemRevision: '',               //项目修订人
        itemState: '',                  //项目状态
        itemCode: '',                   //项目编码
        itemWeight: '',                 //项目权重
        itemProgress: '',               //项目进度
        itemIsEnd: false,               //是否结束项目
        itemEndType: '',                //到期结束(07000010)  手动结束(07000020)
        version: '',                    //版本号(后台需要)
    };
    minTime: string = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');
    changeIndex: number = -1;
    fromDetail: boolean = false;

    @ViewChild(Content) content:Content;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public appService: AppService, public toastCtrl: ToastController,
                public events: Events, private alertCtrl: AlertController,
                private platform: Platform, private keyboard: Keyboard) {
        var data = this.navParams.get('project');
        this.type = this.navParams.get('type');
        this.isExpand = this.navParams.get('isExpand');
        this.fromDetail = this.navParams.get('fromDetail') || this.fromDetail;
        if (data) {
            this.project = data;
            this.viewTitle = this.project.itemName;
        } else {
            this.viewTitle = '新建项目';
        }
    }

    ionViewDidLoad() {
        this.events.subscribe('onConfirmProjectLeader', (leader) => {
            this.project.itemEndLeader = leader.name;
            this.project.itemEndLeaderNum = leader.username;
            this.project.itemEndDept = leader.text||'';
        });
        this.events.subscribe('reloadProject_create',()=> {
            this.appService.httpGet('item/getProject',{"id":this.project.id},this,function (view, res) {
                if (res.status == 200) {
                    var temp = res.json().data;
                    temp.milestoneVo1 = [];
                    temp.milestoneVo2 = [];
                    for (let j = 0; j < temp.children.length; j++) {
                        var mile = temp.children[j];
                        if (mile.milestoneType == 1) {
                            temp.milestoneVo1.push(mile);
                        } else if (mile.milestoneType == 2) {
                            temp.milestoneVo2.push(mile);
                        }
                    }
                    view.project = temp;
                    view.reloadArray();
                }
            },false);
        });
        this.keyboard.onKeyboardShow().subscribe(()=>{
            console.log("键盘出现");
        });
        this.keyboard.onKeyboardHide().subscribe(()=>{
            console.log("键盘隐藏");
        });
    }

    ionViewWillUnload() {
        this.events.unsubscribe('onConfirmProjectLeader');
        this.events.unsubscribe('reloadProject_create');
    }

    onPublish() {
        if (this.project.itemName.length < 1) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请先输入项目名称!',
                buttons: ['确定']
            });
            alert.present();
            this.events.publish('testContent');
            return;
        }
        if (this.project.itemLevel.length < 1) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请选择项目紧急程度!',
                buttons: ['确定']
            });
            alert.present();
            return;
        }
        if (this.project.itemEndLeader.length < 1) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请选择项目结束负责人!',
                buttons: ['确定']
            });
            alert.present();
            return;
        }
        if (this.project.itemEndResult.length < 1) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请填写项目结束交付成果!',
                buttons: ['确定']
            });
            alert.present();
            return;
        }
        if (AppConfig.stringToDate(this.project.endTime) < AppConfig.stringToDate(this.project.itemStartTime)) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '项目结束时间不得小于项目开始时间!',
                buttons: ['确定']
            });
            alert.present();
            return;
        }
        for (let i=0; i<this.project.milestoneVo1.length; i++) {
            var mile = this.project.milestoneVo1[i];
            if (AppConfig.stringToDate(mile.deliveryTime) > AppConfig.stringToDate(this.project.endTime)) {
                let alert = this.alertCtrl.create({
                    title: '错误信息',
                    subTitle: mile.milestoneName+'的结束时间必须早于项目结束时间',
                    buttons: ['确定']
                });
                alert.present();
                return ;
            }
            if (i>0) {
                var preMile = this.project.milestoneVo1[i-1];
                if (AppConfig.stringToDate(preMile.deliveryTime) > AppConfig.stringToDate(mile.deliveryTime)) {
                    let alert = this.alertCtrl.create({
                        title: '错误信息',
                        subTitle: mile.milestoneName+'的结束时间必须晚于'+preMile.milestoneName+'的结束时间',
                        buttons: ['确定']
                    });
                    alert.present();
                    return ;
                }
            }
        }
        this.appService.httpPost("item/createItem", this.project, this, function (view, res) {
            var data = res.json().data;
            view.events.publish('reloadProject');
            view.events.publish('homeProjectReload');
            let toast = view.toastCtrl.create({
                message: view.project.id.length > 0 ? '保存项目成功!' : '创建项目成功!',
                duration: 3000
            });
            toast.present();
            view.navCtrl.pop();
        }, true);
    }

    onAddMilestone() {
        var milestone = {
            id: '',                    //里程碑id
            milestoneName: '里程碑' + (this.project.milestoneVo1.length + 1),         //里程碑的名称
            itemEndLeader: '',       //里程碑的负责人
            leaderEmpNum: '',          //里程碑负责人工号
            // milestoneDelivery : '',
            deliveryResult: '',         //里程碑的交付成果
            itemProgress: '',          //里程碑的进度
            deliveryTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),         //里程碑交付时间
            planTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
            realTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑实际完成时间
            remark: '',                //里程碑备注
            isAccomplish: false,       //里程碑是否完成
            delayDays: 0,              //里程碑延迟天数
            milestoneType: 1,          //1是普通里程碑，2是延期里程碑
            itemIsEnd: false,          //里程碑是否结束
            children: [],              //里程碑子任务
            version: '',               //版本号(后台需要)
        };
        // this.project.children.push(milestone);
        this.navCtrl.push(MilestoneDetailPage, {
            milestone: milestone,
            mileType: 1,
            project: this.project,
            type: this.type,
            callback: this.milestoneCallback,
        });
    }

    onLookMilestone() {

        this.navCtrl.push(MilestoneDetailPage, {
            project: this.project
        });
    }

    onFocusInput($event, mile, i) {
        var textarea = document.getElementById('miletext');
        if (textarea != null) {
            textarea.blur();
        }
        if (this.type == 1) {
            this.changeIndex = i;
        }
        this.navCtrl.push(MilestoneDetailPage, {
            milestone: mile,
            mileType: 1,
            isExpand: this.isExpand,
            project: this.project,
            callback: this.milestoneCallback,
            type: 2,
        });
    }

    onFocusInput2($event, mile, i) {
        var textarea = document.getElementById('miletext2');
        if (textarea != null) {
            textarea.blur();
        }
        if (this.type == 1) {
            this.changeIndex = i;
        }
        this.navCtrl.push(MilestoneDetailPage, {
            milestone: mile,
            mileType: 1,
            isExpand: this.isExpand,
            project: this.project,
            callback: this.milestoneCallback,
            type: 2,
        });
    }

    onClickMilestone($event, mile, i) {
        if (this.type == 1) {
            this.changeIndex = i;
        }
        this.navCtrl.push(MilestoneDetailPage, {
            milestone: mile,
            mileType: mile.milestoneType,
            isExpand: this.isExpand,
            project: this.project,
            callback: this.milestoneCallback,
            type: this.type,
        });
    }

    onClickRemoveMilestone($event, mile, index) {
        if (this.type == 1) {
            //this.deleteOneMile(mile);
            this.project.milestoneVo1.splice(index, 1);
            for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                var milestone2 = this.project.milestoneVo1[i];
                milestone2.milestoneName = '里程碑' + (i + 1);
            }
        } else {
            this.appService.httpDelete("item/deleteMilestone", {"ids": [mile.id]}, this, function (view, res) {
                if (res.status == 200) {
                    //view.deleteOneMile(mile);
                    view.events.publish('reloadProject');
                    view.events.publish('homeProjectReload');
                    view.events.publish('reloadProject_create');
                }
            }, true);
        }
    }

    onMilestoneLeader($event) {
        this.navCtrl.push(ContactPage, {
            type: 2,
        });
    }

    deleteOneMile(mile) {
        var deleteId = mile.id;
        var index = -1;
        for (let i = 0; i < this.project.milestoneVo1.length; i++) {
            var milestone1 = this.project.milestoneVo1[i];
            if (deleteId == milestone1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.project.milestoneVo1.splice(index, 1);
            for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                var milestone2 = this.project.milestoneVo1[i];
                milestone2.milestoneName = '里程碑' + (i + 1);
            }
        }
    }

    onEndDirector($event) {
        this.navCtrl.push(ContactPage, {
            type: 1,
        });
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
    }

    addOneMilestone(milestone) {
        if (this.project.milestoneVo1.length == 0) {
            this.project.milestoneVo1.push(milestone);
            if (this.isExpand != null) {
                this.isExpand.push(false);
            }
        } else if (this.project.milestoneVo1.length == 1) {
            var p1 = this.project.milestoneVo1[0];
            var d1 = AppConfig.timestampToDate(p1.deliveryTime);
            var d2 = AppConfig.timestampToDate(milestone.deliveryTime);
            if (d1 <= d2 || AppConfig.isSameDay(d1, d2)) {
                this.project.milestoneVo1.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            } else {
                this.project.milestoneVo1.splice(0, 0, milestone);
                if (this.isExpand != null) {
                    this.isExpand.splice(0, 0, false);
                }
            }
        } else {
            var isInsert = false;
            for (let i = 0; i < this.project.milestoneVo1.length - 1; i++) {
                var pp1 = this.project.milestoneVo1[i];
                var pp2 = this.project.milestoneVo1[i + 1];
                var dd1 = AppConfig.timestampToDate(pp1.deliveryTime);
                var dd2 = AppConfig.timestampToDate(pp2.deliveryTime);
                var dd3 = AppConfig.timestampToDate(milestone.deliveryTime);
                if (i == 0 && dd3 < dd1) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(0, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(0, 0, false);
                    }
                    break;
                }
                if (dd3 > dd1 && dd3 < dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(i + 1, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(i + 1, 0, false);
                    }
                    break;
                }
                if (i == this.project.milestoneVo1.length - 2 && dd3 > dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.push(milestone);
                    if (this.isExpand != null) {
                        this.isExpand.push(false);
                    }
                    break;
                }
            }
            if (isInsert == false) {
                this.project.milestoneVo1.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            }
        }
        for (let i = 0; i < this.project.milestoneVo1.length; i++) {
            var mm = this.project.milestoneVo1[i];
            mm.milestoneName = '里程碑' + (i + 1);
        }
    }

    milestoneCallback = (milestone) => {
        return new Promise((resolve, reject) => {
            if (typeof (milestone) != 'undefined') {
                if (milestone.id.length > 0) {
                    var isIn1 = false;
                    for (let i = 0; i < this.project.milestoneVo1.length; i++) {
                        var tempMile1 = this.project.milestoneVo1[i];
                        if (tempMile1.id == milestone.id && tempMile1.id != '') {
                            isIn1 = true;
                            this.project.milestoneVo1.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn1) {
                        this.addOneMilestone(milestone);
                    }
                    var isIn2 = false;
                    for (let i = 0; i < this.project.children.length; i++) {
                        var tempMile2 = this.project.children[i];
                        if (tempMile2.id == milestone.id && tempMile2.id != '') {
                            isIn2 = true;
                            this.project.children.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn2) {
                        this.project.children.push(milestone);
                    }
                    this.project.version = milestone.pv || this.project.version;
                } else {
                    if (this.changeIndex > -1) {
                        this.project.milestoneVo1.splice(this.changeIndex, 1, milestone);
                        this.project.children.splice(this.changeIndex, 1, milestone);
                        this.changeIndex = -1;
                    } else {
                        this.addOneMilestone(milestone);
                        this.project.children.push(milestone);
                    }
                }
            } else {

            }
            resolve();
        });
    };
}
