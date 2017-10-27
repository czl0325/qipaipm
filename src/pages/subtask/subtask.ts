import {Component} from '@angular/core';
import {Events, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {AppConfig} from "../../app/app.config";
import {AppService} from "../../app/app.service";
import {ContactPage} from "../contact/contact";
import {DatePipe} from "@angular/common";
import {AppSingleton} from "../../app/app.singleton";

/**
 * Generated class for the SubtaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-subtask',
    templateUrl: 'subtask.html',
})

/*
	@ApiModelProperty(value = "子任务的id")
	private String id;
	@ApiModelProperty(value = "子任务的名称")
	private String subtaskName;
	@ApiModelProperty(value = "子任务的负责人")
	private String subtaskLeader;
	@ApiModelProperty(value = "子任务的交付时间")
	private Date deliveryTime;
	@ApiModelProperty(value = "子任务交付成果")
	private String deliveryResult;
	@ApiModelProperty(value = "子任务计划完成时间")
	private Date planTime;
	@ApiModelProperty(value = "子任务实际完成时间")
	private Date realTime;
	@ApiModelProperty(value = "子任务是否完成")
	private String isAccomplish;
	@ApiModelProperty(value = "子任务备注")
	private String remark;
 */
export class SubtaskPage {
    project;
    callback;
    type: number;
    milestone: any;
    subtask = {
        id: '',                 //子任务的id
        subtaskName: '',        //子任务的名称
        itemEndLeader: '',      //子任务的负责人
        leaderEmpNum: '',       //子任务负责人工号
        itemDept: '',           //子任务负责人部门
        deliveryTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),    //子任务的交付时间
        deliveryResult: '',     //子任务交付成果
        planTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //子任务实际完成时间
        realTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //子任务实际完成时
        remark: '',             //子任务备注
        delayDays: 0,           //子任务延期天数
        itemIsEnd: false,       //子任务是否完成
        version: '',            //版本号(后台需要)
    };
    tempSubtask: any;
    canEdit: boolean = false;
    canFinish: boolean = false;
    minTime: string = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');
    maxTime: string = "2030-12-31";


    constructor(public navCtrl: NavController, private navParams: NavParams,
                private appService: AppService, public events: Events,
                private toastCtrl: ToastController, private platform: Platform) {
        var data = this.navParams.get('subtask');
        this.project = this.navParams.get('project');
        this.callback = this.navParams.get('callback');
        this.type = this.navParams.get("type");
        this.milestone = this.navParams.get("milestone");
        if (data != null) {
            this.subtask = data;
        }
        this.tempSubtask = AppConfig.deepCopy(this.subtask);
        if (this.type == 1) {
            this.canEdit = true;
        } else {
            if (this.subtask.leaderEmpNum == AppSingleton.getInstance().currentUserInfo.username) {
                this.canFinish = true;
            }
            if (this.milestone.itemEndLeaderNum == AppSingleton.getInstance().currentUserInfo.username) {
                this.canEdit = true;
            }
        }
        if (typeof (this.milestone.deliveryTime) == 'number') {
            this.maxTime = new DatePipe('en-US').transform(AppConfig.timestampToDate(this.milestone.deliveryTime), 'yyyy-MM-dd');
        } else if (typeof (this.milestone.deliveryTime) == 'string') {
            this.maxTime = this.milestone.deliveryTime;
        }
    }

    ionViewDidLoad() {
        this.events.subscribe('onConfirmSubtaskLeader', (leader) => {
            this.tempSubtask.itemEndLeader = leader.name;
            this.tempSubtask.leaderEmpNum = leader.username;
            this.tempSubtask.itemDept = leader.text||'';
        });
    }

    ionViewWillUnload() {
        this.events.unsubscribe('onConfirmSubtaskLeader');
    }

    ionViewWillLeave() {

    }

    onSubtaskLeader($event) {
        this.navCtrl.push(ContactPage, {
            type: 3,
        });
    }

    onSaveSubtask() {
        if (!(this.tempSubtask.itemEndLeader || '')) {
            let toast = this.toastCtrl.create({
                message: '子任务负责人为必填项!',
                duration: 3000
            });
            toast.present();
            return;
        }
        if (!(this.tempSubtask.deliveryResult || '')) {
            let toast = this.toastCtrl.create({
                message: '子任务交付成果为必填项!',
                duration: 3000
            });
            toast.present();
            return;
        }
        var param = this.tempSubtask;
        // if (this.type == 1) {
        //     this.callback(this.tempSubtask).then(()=>{
        //         this.navCtrl.pop()
        //     });
        // } else {
        param.projectinfo = this.milestone;
        //param.sid = this.tempSubtask.id;
        this.appService.httpPost("item/createSubtask", param, this, function (view, res) {
            if (res.status == 200) {
                if (typeof (res.json()) != 'undefined') {
                    view.events.publish('homeProjectReload');
                    view.events.publish('reloadProject_create');
                    view.events.publish('reloadProject');
                    view.subtask = res.json().data;
                    view.callback(view.subtask).then(() => {
                        view.navCtrl.pop()
                    });
                }
            } else {
                let toast = view.toastCtrl.create({
                    message: view.type == 1 ? '新建里程碑失败!' : '编辑里程碑失败!',
                    duration: 3000
                });
                toast.present();
            }
        }, true);
        //   }
    }
}
