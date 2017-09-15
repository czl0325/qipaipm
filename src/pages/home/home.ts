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
  type:number ;
  namevalue:string;
  projects = [];


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
          console.log(view.projects);
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
    this.navCtrl.push(ProjectCreatePage, {
      type:1,
    });
  }

  onClickProject(project) {
    this.navCtrl.push(ProjectDetailPage, {
      project:project,
    });
  }
}
