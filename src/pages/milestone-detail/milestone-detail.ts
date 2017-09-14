import { Component } from '@angular/core';
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
  mileNumber : any;
  callback;
  type;

  canEdit;
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
    subtasks : [],              //里程碑子任务
  };

  tempMilestone;

  /**
   * 深拷贝
   */
  deepCopy(originObj: any): any{
    return originObj ? JSON.parse(JSON.stringify(originObj)) : null;
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private appService: AppService) {
    var data = this.navParams.get('milestone');
    this.pname = this.navParams.get('projectname');
    this.mileNumber = this.navParams.get('number');
    this.callback = this.navParams.get('callback');
    this.type = this.navParams.get('type');
      this.milestone = data;
      this.tempMilestone = this.deepCopy(this.milestone);
    if (this.type == 1) {
        this.tempMilestone.milestoneName = '里程碑'+this.mileNumber;
    }
    console.log(this.tempMilestone);
  }

  ionViewDidLoad() {

  }
  ionViewWillLeave(){

  }

    onPlanTimeChange($event) {
      console.log(this.milestone.planTime);
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
    switch (this.type) {
        case 1:
          console.log(this.tempMilestone);
          this.callback(this.tempMilestone).then(()=>{ this.navCtrl.pop() });
          break;
        case 2:
          var param = this.deepCopy(this.tempMilestone);
          param.itemName = this.pname;
          this.appService.httpPost("milestone/create",param,this,function (view, res) {
            if (res.status == 200) {
              view.milestone = view.tempMilestone;
              view.navCtrl.pop();
            } else {
              let toast = view.toastCtrl.create({
                  message: '编辑里程碑失败!',
                  duration: 3000
              });
              toast.present();
            }
          },true);
          break;
        default:
          break;
    }
  }

  onAddSubtask($event) {
    this.navCtrl.push(SubtaskPage, {
      type:2,
        projectname:this.pname,
    });
  }
}
