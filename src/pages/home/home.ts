import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public appService: AppService, public events: Events) {
    this.type = 1;
    this.namevalue = "appname-list";
  }
  ionViewDidLoad() {
    this.events.subscribe('homeCreateProject', (project) => {
      var isIn = false;
      for (let i=0; i<this.projects.length; i++) {
          var p = this.projects[i];
          if (p.id == project.id) {
              isIn = true;
              this.projects.splice(i,1,project);
              break;
          }
      }
      if (isIn == false) {
        this.projects.push(project);
      }
    });
    this.events.subscribe('homeDeleteProject', (project) => {
      for (let i=0; i<this.projects.length; i++) {
        var p = this.projects[i];
        if (p.id == project.id) {
          this.projects.splice(i,1);
          break;
        }
      }
    });
    this.events.subscribe('homeEditProject', (project) => {
      for (let i=0; i<this.projects.length; i++) {
          var p = this.projects[i];
          if (p.id == project.id) {
              this.projects.splice(i,1,project);
              break;
          }
      }
    });
  }

  ionViewWillUnload() {
    this.events.unsubscribe('homeCreateProject');
    this.events.unsubscribe('homeDeleteProject');
    this.events.unsubscribe('homeEditProject');
  }

  onChangeDate() {

  }

  onSelectDate(date) {
    if (date instanceof Date) {
      var dateString = AppConfig.dateToString(date);
      this.appService.httpGet("item/searchByContion", {"startTime":dateString,"endTime":dateString,"page":1,"limit":100}, this, function (view ,res){
        var data = res.json();
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
