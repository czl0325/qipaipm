import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import { DatePipe } from "@angular/common";
import { MilestoneDetailPage } from "../milestone-detail/milestone-detail";
import { AppService } from "../../app/app.service";
import { ContactPage } from "../contact/contact";

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

/*
@ApiModelProperty(value = "项目id")
	private String id;
	@ApiModelProperty(value = "项目的名称")
	private String itemName;
	@ApiModelProperty(value = "项目的创建人")
	private String itemFounder;
	@ApiModelProperty(value = "项目的创建时间")
	private String itemCreate;
	@ApiModelProperty(value = "项目的启动时间 ")
	private Date startTime;
	@ApiModelProperty(value = "项目的延期时间")
	private Date delayTime;
	@ApiModelProperty(value = "项目延期的天数")
	private String delayDays;
	@ApiModelProperty(value = "项目更新时间")
	private Date itemUpdate;
	@ApiModelProperty(value = "项目结束时间")
	private Date endTime;
	@ApiModelProperty(value = "项目版本")
	private String itemVersion;
	@ApiModelProperty(value = "项目启动的交付成果")
	private String startResult;
	@ApiModelProperty(value = "项目结束的交付成果")
	private String endResult;
	@ApiModelProperty(value = "项目里程碑")
	@OneToMany(mappedBy = "projectinfo",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Milestone> milestone = new ArrayList<Milestone>();
	@ApiModelProperty(value = "项目提出人")
	private String itemRaise;
	@ApiModelProperty(value = "项目修订人")
	private String itemRevision;
	@ApiModelProperty(value = "项目部门")
	private String itemDept;
	@ApiModelProperty(value = "项目状态")
	private String itemState;
	@ApiModelProperty(value = "项目编码")
	private String itemCode;
	@ApiModelProperty(value = "项目权重")
	private String itemWeight;
	@ApiModelProperty(value = "项目进度")
	private String itemProgress;
	@ApiModelProperty(value = "是否结束项目")
	private String isEnd;
 */

export class ProjectCreatePage {
  viewTitle: string;
  type: number;
  public project = {
    id : '',                    //项目id
    itemName : '',              //项目的名称
    itemFounder : '陈昭良',           //项目的创建人
    itemLeader : '',            //项目负责人
    itemCreate : '',            //项目的创建时间
    startTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),      //项目的启动时间
    delayTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),      //项目的延期时间
    delayDays : '',             //项目延期的天数
    itemUpdate : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),     //项目更新时间
    endTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //项目结束时间
    itemVersion : '',           //项目版本
    startResult : '',           //项目启动的交付成果
    endResult : '',             //项目结束的交付成果
    milestone : [],             //项目里程碑
    itemRaise : '',             //项目提出人
    itemRevision : '',          //项目修订人
    itemDept : '',              //项目部门
    itemState : '',             //项目状态
    itemCode : '',              //项目编码
    itemWeight : '',            //项目权重
    itemProgress : '',          //项目进度
    isEnd : false,              //是否结束项目
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              public appService : AppService, public toastCtrl: ToastController) {
    var data = this.navParams.get('project');
    this.type = this.navParams.get('type');
    if (data) {
      this.project = data;
      this.viewTitle = this.project.itemName;
    } else {
      this.viewTitle = '新建项目';
    }
  }

  ionViewDidLoad() {

  }

  onPublish() {
    if (this.project.itemName.length < 1) {
      let alert = this.alertCtrl.create({
        title: '错误信息',
        subTitle: '请先输入项目名称!',
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    if (this.project.milestone.length > 0) {
      var lastMile = this.project.milestone[this.project.milestone.length-1];
      if (lastMile.milestoneLeader.length < 1 || lastMile.milestoneDelivery.length < 1 || lastMile.milestoneSchedule.length < 1 || lastMile.planTime.length < 1) {
        let alert = this.alertCtrl.create({
          title: '错误信息',
          subTitle: '请先完善里程碑!',
          buttons: ['确定']
        });
        alert.present();
        return;
      }
    }
    this.appService.httpPost("item/create", this.project, this, function (view ,res){
      let toast = view.toastCtrl.create({
        message: '创建项目成功!',
        duration: 3000
      });
      toast.present();
      view.navCtrl.pop();
    } ,true);
  }

  onAddMilestone() {
    if (this.project.milestone.length > 0) {
      var lastMile = this.project.milestone[this.project.milestone.length-1];
      if (lastMile.milestoneLeader == null || lastMile.milestoneDelivery == null || lastMile.milestoneSchedule == null || lastMile.planTime  == null) {
        let alert = this.alertCtrl.create({
            title: '错误信息',
            subTitle: '请先完善上一个里程碑内容!',
            buttons: ['确定']
        });
        alert.present();
        return;
      }
      if (lastMile.milestoneLeader.length < 1 || lastMile.milestoneDelivery.length < 1 || lastMile.milestoneSchedule.length < 1 || lastMile.planTime.length < 1) {
        let alert = this.alertCtrl.create({
          title: '错误信息',
          subTitle: '请先完善上一个里程碑内容!',
          buttons: ['确定']
        });
        alert.present();
        return;
      }
    }
    var milestone = {
      id : '',                    //里程碑id
      milestoneName : '里程碑'+(this.project.milestone.length+1),         //里程碑的名称
      milestoneLeader : '',       //里程碑的负责人
      milestoneDelivery : '',     //里程碑的交付成果
      milestoneSchedule : '',     //里程碑的进度
      planTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
      realTime : "",              //里程碑实际完成时间
      remark : '',                //里程碑备注
      isAccomplish : false,       //里程碑是否完成
      delay : 0,                  //里程碑延迟天数
      subtask : [],              //里程碑子任务
    };
    // this.project.milestone.push(milestone);
    this.navCtrl.push(MilestoneDetailPage, {
      milestone : milestone,
      projectname : this.project.itemName,
      pid : this.project.id,
      type : this.type,
      callback : this.milestoneCallback,
    });
  }

  onLookMilestone() {
    this.navCtrl.push(MilestoneDetailPage, {
      project : this.project
    });
  }

  onClickRemoveMilestone($event, mile) {
    if (this.type == 1) {
      this.deleteOneMile(mile)
    } else {
      this.appService.httpDelete("milestone/delete",{"id":mile.id},this,function (view, res) {
        if (res.status == 200) {
            view.deleteOneMile(mile);
        }
      },true);
    }
  }

  deleteOneMile(mile) {
      var deleteId = mile.id;
      var index = -1;
      for (let i=0; i<this.project.milestone.length; i++) {
          var milestone1 = this.project.milestone[i];
          if (deleteId == milestone1.id) {
              index = i;
              break;
          }
      }
      if (index >= 0) {
          this.project.milestone.splice(index, 1);
          for (let i=0; i<this.project.milestone.length; i++) {
              var milestone2 = this.project.milestone[i];
              milestone2.milestoneName = '里程碑'+(i+1);
          }
      }
  }

  onEndDirector($event) {
    this.navCtrl.push(ContactPage);
  }

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
}
