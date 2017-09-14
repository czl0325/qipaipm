import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProjectCreatePage } from "../project-create/project-create";
import { ProjectDetailPage } from "../project-detail/project-detail";
import { SearchPage } from "../search/search";
import { AppService} from "../../app/app.service";
import { AppConfig} from "../../app/app.config";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  type ;
  namevalue;

  public projects = [
    {
      id : '1',                    //项目id
      itemName : '促销系统',              //项目的名称
      itemFounder : '陈昭良',           //项目的创建人
      itemLeader : '陈昭良',            //项目负责人
      itemCreate : '2017-08-01',            //项目的创建时间
      startTime : '2017-08-08',   //项目的启动时间
      delayTime : '2017-08-08',   //项目的延期时间
      delayDays : '',             //项目延期的天数
      itemUpdate : '2017-08-08',  //项目更新时间
      endTime : '2017-08-08',     //项目结束时间
      itemVersion : '',           //项目版本
      startResult : '',           //项目启动的交付成果
      endResult : '',             //项目结束的交付成果
      milestone : [{
        id:'1',
        milestoneName:'里程碑1',
        milestoneLeader:'陈昭良',
        milestoneDelivery:'111111',
        milestoneSchedule:'100%',
        planTime:'2017-08-08',
        step:'启动',
        type:0,
        isFold:true,
        subtasks:[
          {
            id:'1',
            subtaskName:'子任务1.1',
            subtaskLeader:'陈昭良',
            deliveryTime:'2017-08-08',
            deliveryResult:'完成',
            planTime:'2017-08-08',
            realTime:'2017-08-08',
            isAccomplish:true,
            remark:'无',
          },
          {
            id:'2',
            subtaskName:'子任务1.2',
            subtaskLeader:'陈昭良',
            deliveryTime:'2017-08-08',
            deliveryResult:'完成',
            planTime:'2017-08-08',
            realTime:'2017-08-08',
            isAccomplish:true,
            remark:'无',
          }
        ]
      },{
        id:'2',
        milestoneName:'里程碑1',
        milestoneLeader:'陈昭良',
        milestoneDelivery:'222222222',
        milestoneSchedule:'100%',
        planTime:'2017-08-01',
        step:'启动',
        type:0,
        isFold:true,
        subtasks:[
          {
            id:'1',
            subtaskName:'子任务1.1',
            subtaskLeader:'陈昭良',
            deliveryTime:'2017-08-08',
            deliveryResult:'完成',
            planTime:'2017-08-08',
            realTime:'2017-08-08',
            isAccomplish:true,
            remark:'无',
          },
        ]
      }],             //项目里程碑
      itemRaise : '',             //项目提出人
      itemRevision : '',          //项目修订人
      itemDept : '',              //项目部门
      itemState : '',             //项目状态
      itemCode : '',              //项目编码
      itemWeight : '',            //项目权重
      itemProgress : '',          //项目进度
      isEnd : false,              //是否结束项目
    },{
      id : '2',                    //项目id
      itemName : '商品中心',              //项目的名称
      itemFounder : '陈昭良',           //项目的创建人
      itemLeader : '陈昭良',            //项目负责人
      itemCreate : '2017-08-01',            //项目的创建时间
      startTime : '2017-08-08',   //项目的启动时间
      delayTime : '2017-08-08',   //项目的延期时间
      delayDays : '',             //项目延期的天数
      itemUpdate : '2017-08-08',  //项目更新时间
      endTime : '2017-08-08',     //项目结束时间
      itemVersion : '',           //项目版本
      startResult : '',           //项目启动的交付成果
      endResult : '',             //项目结束的交付成果
      milestone : [{
        id:'1',
        milestoneName:'里程碑1',
        milestoneLeader:'陈昭良',
        milestoneDelivery:'1111111123123123123123123',
        milestoneSchedule:'100%',
        planTime:'2017-08-08',
        step:'启动',
        type:0,
        isFold:true,
        subtasks:[
          {
            id:'1',
            subtaskName:'子任务1.1',
            subtaskLeader:'陈昭良',
            deliveryTime:'2017-08-08',
            deliveryResult:'完成',
            planTime:'2017-08-08',
            realTime:'2017-08-08',
            isAccomplish:true,
            remark:'无',
          }
        ]
      }],             //项目里程碑
      itemRaise : '',             //项目提出人
      itemRevision : '',          //项目修订人
      itemDept : '',              //项目部门
      itemState : '',             //项目状态
      itemCode : '',              //项目编码
      itemWeight : '',            //项目权重
      itemProgress : '',          //项目进度
      isEnd : false,              //是否结束项目
    }
    ];


  constructor(public navCtrl: NavController, public appService: AppService) {
    this.type = 1;
    this.namevalue = "appname-list";
  }

  onChangeDate() {

  }

  onSelectDate(date) {
    if (date instanceof Date) {
      var dateString = AppConfig.dateToString(date);
      this.appService.httpGet("item/searchByContion", {"startTime":dateString,"endTime":dateString,"page":1,"limit":100}, this, function (view ,res){
        var data = res.json();
        console.log(data);
        if (data.success == true) {
          view.projects = data.data;
        }
      } ,true);
    }
  }

  onChangeType($event) {
    if (this.type == 1) {
      this.type = 2;
      this.namevalue = "ios-calendar-outline";
    } else {
      this.type = 1;
      this.namevalue = "appname-list";
    }
  }

  onClickSearch() {
    this.navCtrl.push(SearchPage);
  }

  onCreateProject() {
    this.navCtrl.push(ProjectCreatePage);
  }

  onClickProject(project) {
    this.navCtrl.push(ProjectDetailPage, {
      project:project,
    });
  }
}
