import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  projectname: string;
  callback ;
  type: number;

  subtask = {
    id:'',              //子任务的id
    subtaskName:'',     //子任务的名称
    subtaskLeader:'',   //子任务的负责人
    deliveryTime:'',    //子任务的交付时间
    deliveryResult:'',  //子任务交付成果
    planTime:'',        //子任务实际完成时间
    realTime:'',        //子任务实际完成时间
    isAccomplish:false, //子任务是否完成
    remark:'',          //子任务备注
  };


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var data = this.navParams.get('subtask');
    this.projectname = this.navParams.get('projectname');
    this.callback = this.navParams.get('callback');
    this.type = this.navParams.get("type");
    if (data != null)
      this.subtask = data;
  }

  ionViewDidLoad() {

  }

  ionViewWillLeave(){

  }

  onSaveSubtask() {
    //console.log(this.subtask.deliveryResult);
    this.callback(null).then(()=>{ this.navCtrl.pop() });
  }
}
