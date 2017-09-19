import { Component, ChangeDetectorRef  } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SubtaskPage } from "../subtask/subtask";
import { DatePipe } from "@angular/common";
import {AppService} from "../../app/app.service";
import {AppConfig} from "../../app/app.config";

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
  pname : string;
  pid : string;
  callback;
  type : number;

  milestone = {
    id : '',                    //里程碑id
    milestoneName : '',         //里程碑的名称
    milestoneLeader : '',       //里程碑的负责人
    milestoneDelivery : '',     //里程碑的交付成果
    milestoneSchedule : '',     //里程碑的进度
    planTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
    realTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑实际完成时间
    remark : '',                //里程碑备注
    isAccomplish : false,       //里程碑是否完成
    delay : 0,                  //里程碑延迟天数
    subtask : [],              //里程碑子任务
  };

  tempMilestone;



  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private appService: AppService, private cd: ChangeDetectorRef) {
    var data = this.navParams.get('milestone');
    this.pname = this.navParams.get('projectname');
    this.pid = this.navParams.get('pid');
    this.callback = this.navParams.get('callback');
    this.type = this.navParams.get('type');
    this.milestone = data;
    for (let i=0; i<this.milestone.subtask.length; i++) {
        var subtask = this.milestone.subtask[i];
        subtask.subtaskName = '子任务'+(i+1);
    }
    this.tempMilestone = AppConfig.deepCopy(this.milestone);
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave(){

  }

  onPlanTimeChange($event) {

  }

  onSaveMilestone() {
    if (this.tempMilestone.milestoneLeader.length < 1) {
      let alert = this.alertCtrl.create({
        title: '错误信息',
        subTitle: '里程碑负责人为必填项!',
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    if (this.tempMilestone.milestoneDelivery.length < 1) {
      let alert = this.alertCtrl.create({
        title: '错误信息',
        subTitle: '里程碑交付成果为必填项!',
        buttons: ['确定']
      });
      alert.present();
      return;
    }

    var param = AppConfig.deepCopy(this.tempMilestone);
    if (this.type == 1) {
        this.milestone = this.tempMilestone;
        this.callback(this.milestone).then(()=>{
            this.navCtrl.pop()
        });
    } else {
        param.itemName = this.pname;
        param.pid = this.pid;
        param.mid = param.id;
        this.appService.httpPost("milestone/create",param,this,function (view, res) {
            if (res.status == 200) {
                console.log(view.tempMilestone);
                view.tempMilestone = res.json();
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
          subtaskName:'子任务'+(this.tempMilestone.subtask.length+1),     //子任务的名称
          subtaskLeader:'',   //子任务的负责人
          deliveryTime:'',    //子任务的交付时间
          deliveryResult:'',  //子任务交付成果
          planTime: new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //子任务计划完成时间
          realTime:'',        //子任务实际完成时间
          isAccomplish:false, //子任务是否完成
          remark:'',          //子任务备注
          delayDays:0,        //子任务延期天数
      };
    this.navCtrl.push(SubtaskPage, {
      subtask:subtask,
      type:1,
      projectname:this.pname,
      mid:this.tempMilestone.id,
      callback : this.subtaskCallback,
    });
  }

    onRemoveSubtask($event, subtask) {
      this.deleteOneSubtask(subtask);
      // this.appService.httpDelete("subtask/delete", {"id":subtask.id}, this, function (view, res) {
      //     var deleteId = subtask.id;
      //   if (res.status == 200) {
      //       var index = -1;
      //       for (let i=0; i<view.tempMilestone.subtask.length; i++) {
      //           var subtask2 = view.tempMilestone.subtask[i];
      //           if (deleteId == subtask2.id) {
      //               index = i;
      //               break;
      //           }
      //       }
      //       if (index >= 0) {
      //           view.tempMilestone.subtask.splice(index, 1);
      //           for (let i=0; i<view.tempMilestone.subtask.length; i++) {
      //               var subtask2 = view.tempMilestone.subtask[i];
      //               subtask2.subtaskName = '子任务'+(i+1);
      //           }
      //       }
      //    }
      // },true);
    }

    deleteOneSubtask(subtask) {
        var deleteId = subtask.id;
        var index = -1;
        for (let i=0; i<this.tempMilestone.subtask.length; i++) {
            var subtask1 = this.tempMilestone.subtask[i];
            if (deleteId == subtask1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.tempMilestone.subtask.splice(index, 1);
            for (let i=0; i<this.tempMilestone.subtask.length; i++) {
                var subtask2 = this.tempMilestone.subtask[i];
                subtask2.subtaskName = '子任务'+(i+1);
            }
        }
    }

    subtaskCallback = (subtask) =>
    {
        return new Promise((resolve, reject) => {
            if (typeof (subtask) != 'undefined') {
                var isIn = false;
                for (let i=0; i<this.tempMilestone.subtask.length; i++) {
                    var tempSubtask = this.tempMilestone.subtask[i];
                    if (tempSubtask.id == subtask.id) {
                        isIn = true;
                        this.tempMilestone.subtask.splice(i, 1, subtask);
                        this.cd.detectChanges();
                        break;
                    }
                }
                if (!isIn) {
                    this.tempMilestone.subtask.push(subtask);
                    this.cd.detectChanges();
                }
            } else {

            }
            resolve();
        });
    };
}
