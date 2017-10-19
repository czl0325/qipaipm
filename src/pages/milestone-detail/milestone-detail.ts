import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import {NavController, NavParams, Events, Content, AlertController} from 'ionic-angular';
import { SubtaskPage } from "../subtask/subtask";
import { DatePipe } from "@angular/common";
import { AppService } from "../../app/app.service";
import { AppConfig } from "../../app/app.config";
import { ContactPage } from "../contact/contact";
import { AppSingleton } from "../../app/app.singleton";

/**
 * Generated class for the MilestoneDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-milestone-detail',
  templateUrl: 'milestone-detail.html',
})

/*
	@ApiModelProperty(value = "里程碑id")
	private String id;
	@ApiModelProperty(value = "里程碑的名称")
	private String milestoneName;
	@ApiModelProperty(value = "里程碑的负责人")
	private String milestoneLeader;
	@ApiModelProperty(value = "里程碑的交付成果")
	private String milestoneDelivery;
	@ApiModelProperty(value = "里程碑的进度")
	private String milestoneSchedule;
	@ApiModelProperty(value = "里程碑计划完成时间")
	private Date planTime;
	@ApiModelProperty(value = "里程碑实际完成时间")
	private Date realTime;
 */

export class MilestoneDetailPage {
  project : any;
  callback;
  type : number;
  @ViewChild(Content) content: Content;

  milestone = {
    id : '',                    //里程碑id
    milestoneName : '',         //里程碑的名称
    itemEndLeader : '',                 //里程碑的负责人
    itemEndLeaderNum : '',          //里程碑负责人工号
    deliveryResult : '',        //里程碑的交付成果
    // milestoneSchedule : '',     //里程碑的进度
    itemProgress : '',          //里程碑的进度
    deliveryTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑交付时间
    planTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
    realTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑实际完成时间
    remark : '',                //里程碑备注
    delayDays : 0,              //里程碑延迟天数
    children : [],              //里程碑子任务
    itemIsEnd : false,          //里程碑是否完成
    milestoneType : 1,          //1是普通里程碑，2是延期里程碑
  };
  tempMilestone;
  canEdit: boolean = true;
  canFinish: boolean = false;
  mileType: number;
  minTime: string = new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd');

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private appService: AppService, private cd: ChangeDetectorRef,
              private events: Events, private alertCtrl: AlertController) {
    var data = this.navParams.get('milestone');
    this.project = this.navParams.get('project');
    this.callback = this.navParams.get('callback');
    this.type = this.navParams.get('type');
    this.mileType = this.navParams.get('mileType');
    this.milestone = data;
    if (this.milestone.id.length < 1) {
        if (this.mileType == 1) {
            if (typeof (this.project.children) != 'undefined') {
                this.milestone.milestoneName = '里程碑'+(this.project.children.length+1);
            } else {
                this.milestone.milestoneName = '里程碑'+'1';
            }
        } else {
            console.log();
            if (typeof (this.project.delayMilestone) != 'undefined') {
                this.milestone.milestoneName = '延期'+(this.project.delayMilestone.length+1);
            } else {
                this.milestone.milestoneName = '延期'+'1';
            }
        }
    }
    if (typeof (this.milestone.children) != 'undefined') {
        for (let i=0; i<this.milestone.children.length; i++) {
            var subtask = this.milestone.children[i];
            subtask.subtaskName = '子任务'+(i+1);
        }
    }
    this.tempMilestone = AppConfig.deepCopy(this.milestone);
    if (this.type == 2) {
        if (AppSingleton.getInstance().currentUserInfo.username != this.milestone.itemEndLeader) {
            this.canEdit = false;
        }
        if (AppSingleton.getInstance().currentUserInfo.username == this.milestone.itemEndLeaderNum) {
            this.canFinish = true;
        }
    }
  }

    ionViewDidLoad() {
        this.events.subscribe('onConfirmMilestoneLeader',(leader)=>{
            this.tempMilestone.itemEndLeader = leader.name;
            this.tempMilestone.itemEndLeaderNum = leader.username;
        });
    }

    ionViewWillUnload(){
        this.events.unsubscribe('onConfirmMilestoneLeader');
    }

  ionViewWillLeave(){

  }

  onMilestoneLeader($event) {
      this.navCtrl.push(ContactPage, {
          type: 2,
      });
  }

  onSaveMilestone($event) {
    if (this.tempMilestone.itemEndLeader.length < 1) {
      let alert = this.alertCtrl.create({
        title: '错误信息',
        subTitle: '里程碑负责人为必填项!',
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    if (this.tempMilestone.deliveryResult.length < 1) {
      let alert = this.alertCtrl.create({
        title: '错误信息',
        subTitle: '里程碑交付成果为必填项!',
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    var param = AppConfig.deepCopy(this.tempMilestone);
    if (this.mileType == 1) {
        if (this.type == 1) {
            this.tempMilestone.milestoneType = 1;
            this.milestone = this.tempMilestone;
            this.callback(this.milestone).then(()=>{
                this.navCtrl.pop()
            });
        } else {
            param.milestoneType = 1;
            param.projectinfo = this.project;
            this.appService.httpPost("item/createMilestone",param,this,function (view, res) {
                if (res.status == 200) {
                    view.tempMilestone = res.json().data;
                    if (typeof (view.project.children != 'undefined')) {
                        view.tempMilestone.milestoneName = '里程碑'+(view.project.children.length+1);
                    } else {
                        view.tempMilestone.milestoneName = '里程碑1';
                    }
                    view.milestone = view.tempMilestone;
                    view.callback(view.milestone).then(()=>{
                        view.navCtrl.pop()
                    });
                } else {
                    let toast = view.toastCtrl.create({
                        message: view.type==1?'新建里程碑失败!':'编辑里程碑失败!',
                        duration: 3000
                    });
                    toast.present();
                }
            },true);
        }
    } else {
        param.milestoneType = 2;
        param.projectinfo = this.project;
        this.appService.httpPost("item/createMilestone",param,this,function (view, res) {
            if (res.status == 200) {
                view.tempMilestone = res.json().data;
                if (typeof (view.project.children != 'undefined')) {
                    view.tempMilestone.milestoneName = '延期'+(view.project.children.length+1);
                } else {
                    view.tempMilestone.milestoneName = '延期1';
                }
                view.milestone = view.tempMilestone;
                view.callback(view.milestone).then(()=>{
                    view.navCtrl.pop()
                });
            } else {
                let toast = view.toastCtrl.create({
                    message: view.type==1?'新建里程碑失败!':'编辑里程碑失败!',
                    duration: 3000
                });
                toast.present();
            }
        },true);
    }
  }

  onAddSubtask($event) {
      var subtask = {
          id:'',              //子任务的id
          subtaskName:'子任务'+(this.tempMilestone.children.length+1),     //子任务的名称
          itemEndLeader:'',            //子任务的负责人
          itemEndLeaderNum : '',  //子任务负责人工号
          deliveryTime:new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),    //子任务的交付时间
          deliveryResult:'',  //子任务交付成果
          planTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //子任务计划完成时间
          realTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //子任务实际完成时间
          itemIsEnd :false,
          remark:'',          //子任务备注
          delayDays:0,        //子任务延期天数
      };
    this.navCtrl.push(SubtaskPage, {
      subtask : subtask,
      type : 1,
      projectname : this.project.itemName,
      milestone : this.tempMilestone,
      callback : this.subtaskCallback,
    });
  }

    onRemoveSubtask($event, subtask) {
      this.appService.httpDelete("item/delete", {"ids":subtask.id}, this, function (view, res) {
        if (res.status == 200) {
          view.deleteOneSubtask(subtask);
        }
      },true);
    }

    deleteOneSubtask(subtask) {
        var deleteId = subtask.id;
        var index = -1;
        for (let i=0; i<this.tempMilestone.children.length; i++) {
            var subtask1 = this.tempMilestone.children[i];
            if (deleteId == subtask1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.tempMilestone.children.splice(index, 1);
            for (let i=0; i<this.tempMilestone.children.length; i++) {
                var subtask2 = this.tempMilestone.children[i];
                subtask2.subtaskName = '子任务'+(i+1);
            }
            this.milestone = this.tempMilestone;
            this.events.publish('reloadMilestone',this.milestone);
        }
    }

    subtaskCallback = (subtask) =>
    {
        return new Promise((resolve, reject) => {
            if (typeof (subtask) != 'undefined') {
                var isIn = false;
                for (let i=0; i<this.tempMilestone.children.length; i++) {
                    var tempSubtask = this.tempMilestone.children[i];
                    if (tempSubtask.id == subtask.id && subtask.id != '') {
                        isIn = true;
                        this.tempMilestone.children.splice(i, 1, subtask);
                        this.cd.detectChanges();
                        break;
                    }
                }
                if (!isIn) {
                    this.tempMilestone.children.push(subtask);
                    this.cd.detectChanges();
                }
                for (let i=0; i<this.tempMilestone.children.length; i++) {
                    var ss = this.tempMilestone.children[i];
                    ss.subtaskName = '子任务'+(i+1);
                }
                this.milestone = this.tempMilestone;
                this.events.publish('reloadMilestone',this.milestone);
                //this.content.resize();
                setTimeout(() => {
                    if(this.content.scrollToBottom){
                        this.content.scrollToBottom(0);
                    }
                },200);
            } else {

            }
            resolve();
        });
    };
}
