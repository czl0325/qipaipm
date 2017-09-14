export class ProjectModel {
  public id : string;            //项目id
  public  name : string;          //项目的名称
  public    itemFounder : string;   //项目的创建人
  public    startTime : string;     //项目的启动时间
  public   deliveryTime : string;  //项目的交付时间
  public   delayTime : string;     //项目延期的天数
  public  itemUpdate : string;    //项目更新时间
  public  endTime : string;       //项目结束时间
  public  itemVersion : string;   //项目版本
  public  milestone : any[];      //项目里程碑
  public  itemRaise : string;     //项目提出人
  public  itemDept : string;      //项目部门
  public  itemState : string;     //项目状态
  public  itemCode : string;      //项目编码
  public  itemWeight : string;    //项目权重
  public  itemProgress : string;  //项目进度

  constructor(){

  }
}
