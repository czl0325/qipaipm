import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
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
    itemFounder : '陈昭良',      //项目的创建人
    founderEmpNum : '003169',   //项目创建人工号
    leader : '',                  //项目负责人
    itemLeaderEmpNum :'',       //项目负责人工号
    // empNum: '',
    itemCreateTime : '',        //项目的创建时间
    itemStartTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),  //项目的启动时间
    delayTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),      //项目的延期时间
    delayDays : '',             //项目延期的天数
    itemUpdate : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),     //项目更新时间
    endTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),        //项目结束时间
    itemVersion : '',           //项目版本
    itemLevel : '',             //项目级别
    itemStartResult : '',      //项目启动的交付成果
    itemEndResult : '',        //项目结束的交付成果
    children : [],              //项目里程碑
    itemRaise : '',             //项目提出人
    itemRevision : '',          //项目修订人
    itemDept : '',              //项目部门
    itemState : '',             //项目状态
    itemCode : '',              //项目编码
    itemWeight : '',            //项目权重
    itemProgress : '',          //项目进度
    itemIsEnd : false,          //是否结束项目
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public appService : AppService, public toastCtrl: ToastController, public events: Events) {
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
    this.events.subscribe('onConfirmProjectLeader',(leader)=>{
        this.project.leader = leader.name;
        this.project.itemLeaderEmpNum = leader.username;
    });
  }

  ionViewWillUnload(){
      this.events.unsubscribe('onConfirmProjectLeader');
  }

  onPublish() {
    // if (this.project.itemName.length < 1) {
    //   let alert = this.alertCtrl.create({
    //     title: '错误信息',
    //     subTitle: '请先输入项目名称!',
    //     buttons: ['确定']
    //   });
    //   alert.present();
    //   return;
    // }
    // if (this.project.children.length > 0) {
    //   var lastMile = this.project.children[this.project.children.length-1];
    //   if (lastMile.leader.length < 1 || lastMile.deliveryResult.length < 1 || lastMile.itemProgress.length < 1 || lastMile.planTime.length < 1) {
    //     let alert = this.alertCtrl.create({
    //       title: '错误信息',
    //       subTitle: '请先完善里程碑!',
    //       buttons: ['确定']
    //     });
    //     alert.present();
    //     return;
    //   }
    // }
    this.appService.httpPost("item/create", this.project, this, function (view ,res){
      var data = res.json();
      view.events.publish('homeCreateProject',data);
      let toast = view.toastCtrl.create({
        message: '创建项目成功!',
        duration: 3000
      });
      toast.present();
      view.navCtrl.pop();
    } ,true);
  }

  onAddMilestone() {
    // if (this.project.children.length > 0) {
    //   var lastMile = this.project.children[this.project.children.length-1];
    //   if (lastMile.leader == null || lastMile.deliveryResult == null || lastMile.itemProgress == null || lastMile.planTime  == null) {
    //     let alert = this.alertCtrl.create({
    //         title: '错误信息',
    //         subTitle: '请先完善上一个里程碑内容!',
    //         buttons: ['确定']
    //     });
    //     alert.present();
    //     return;
    //   }
    //   if (lastMile.leader.length < 1 || lastMile.deliveryResult.length < 1 || lastMile.itemProgress.length < 1 || lastMile.planTime.length < 1) {
    //     let alert = this.alertCtrl.create({
    //       title: '错误信息',
    //       subTitle: '请先完善上一个里程碑内容!',
    //       buttons: ['确定']
    //     });
    //     alert.present();
    //     return;
    //   }
    // }
    var milestone = {
      id : '',                    //里程碑id
      milestoneName : '里程碑'+(this.project.children.length+1),         //里程碑的名称
      leader : '',       //里程碑的负责人
      leaderEmpNum : '',          //里程碑负责人工号
      // milestoneDelivery : '',
      deliveryResult: '',         //里程碑的交付成果
      itemProgress : '',          //里程碑的进度
      planTime : new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'),              //里程碑计划完成时间
      realTime : "",              //里程碑实际完成时间
      remark : '',                //里程碑备注
      isAccomplish : false,       //里程碑是否完成
      delayDays : 0,              //里程碑延迟天数
      children : [],              //里程碑子任务
    };
    // this.project.children.push(milestone);
    this.navCtrl.push(MilestoneDetailPage, {
      milestone : milestone,
      project : this.project,
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
      this.appService.httpDelete("item/delete",{"ids":mile.id},this,function (view, res) {
        if (res.status == 200) {
            view.deleteOneMile(mile);
        }
      },true);
    }
  }

  deleteOneMile(mile) {
      var deleteId = mile.id;
      var index = -1;
      for (let i=0; i<this.project.children.length; i++) {
          var milestone1 = this.project.children[i];
          if (deleteId == milestone1.id) {
              index = i;
              break;
          }
      }
      if (index >= 0) {
          this.project.children.splice(index, 1);
          for (let i=0; i<this.project.children.length; i++) {
              var milestone2 = this.project.children[i];
              milestone2.milestoneName = '里程碑'+(i+1);
          }
      }
  }

  onEndDirector($event) {
    this.navCtrl.push(ContactPage, {
        type: 1,
    });
  }

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
          this.project.children.push(milestone);
        }
      } else {

      }
      resolve();
    });
  };
}
