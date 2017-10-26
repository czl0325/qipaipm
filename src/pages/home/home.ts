import {Component, ViewChild} from '@angular/core';
import {Content, Events, NavController} from 'ionic-angular';
import {ProjectCreatePage} from "../project-create/project-create";
import {ProjectDetailPage} from "../project-detail/project-detail";
import {SearchPage} from "../search/search";
import {AppService} from "../../app/app.service";
import {AppConfig} from "../../app/app.config";
import {AppSingleton} from "../../app/app.singleton";
import {Storage} from "@ionic/storage";
import {UserInfo} from "../../model/UserInfo";
import {LoginPage} from "../login/login";

//import { WechatService } from "../../app/wechat.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    type: number;
    namevalue: string;
    projects;
    projectsOnMonth;
    currentDate: string;
    timer;
    hideMaskView: boolean = true;

    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController, public appService: AppService,
                public events: Events, private storage: Storage) {
        this.type = 1;
        this.namevalue = "appname-list";
        this.projects = [];
        this.projectsOnMonth = [];
        this.currentDate = "";
    }

    ionViewDidLoad() {
        this.events.subscribe('homeProjectReload', () => {
            this.reloadProjectList(this.currentDate);
        });
        //this.wechat.share(0, "check-installed");
    }

    ionViewWillUnload() {
        this.events.unsubscribe('homeProjectReload');
    }

    onChangeDate() {

    }

    onSelectDate(date) {
        if (date instanceof Date) {
            var dateString = AppConfig.dateToString(date);
            this.currentDate = dateString;
            this.reloadProjectList(dateString);
        }
    }

    onChangeMonthProject(dayHasProjects) {
        this.projectsOnMonth = dayHasProjects;
    }

    reloadProjectList(dateString: string) {
        this.events.publish('onGetProjectDate');
        this.projects = [];
        this.appService.httpGet("item/searchAll", {
            "itemStartTime": dateString,
            "endTime": dateString,
            "empNum": AppSingleton.getInstance().currentUserInfo.username,
            "page": 1,
            "limit": 100
        }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.projects = data.data;
                for (let i = 0; i < view.projects.length; i++) {
                    var project = view.projects[i];
                    project.milestoneVo1 = [];
                    project.milestoneVo2 = [];
                    for (let j = 0; j < project.children.length; j++) {
                        var mile = project.children[j];
                        if (mile.milestoneType == 1) {
                            project.milestoneVo1.push(mile);
                        } else if (mile.milestoneType == 2) {
                            project.milestoneVo2.push(mile);
                        }
                    }
                }
                // setTimeout(()=> {
                //    if (view.content.scrollToTop) {
                //        view.content.scrollToTop(0);
                //    }
                // },200);
            }
        }, true);
    }

    sortPorjects(oldArray) {
        for (let i = 0; i < oldArray.length(); i++) {
            var pp = oldArray[i];
            if (pp.itemIsEnd == true) {
                pp.itemState = "07010040";
            } else {

            }
        }
    }

    onChangeType($event) {
        if (this.type == 1) {
            this.type = 2;
            this.namevalue = "appname-calendar";
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
            type: 1,
        });
    }

    onClickProject(project) {
        this.navCtrl.push(ProjectDetailPage, {
            project: project,
        });
    }

    onClickPerson($event) {
        this.hideMaskView = false;
        clearInterval(this.timer);
        var personView = document.getElementById('person-info');
        if (personView != null) {
            var left = parseInt(window.getComputedStyle(personView).left);
            this.timer = setInterval(() => {
                left = left + 10;
                personView.style.left = left + 'px';
                if (left >= 0) {
                    clearInterval(this.timer);
                    personView.style.left = 0 + 'px';
                }
            }, 1);
        }
    }

    onLogOut() {
        clearInterval(this.timer);
        var personView = document.getElementById('person-info');
        if (personView != null) {
            var left = parseInt(window.getComputedStyle(personView).left);
            this.timer = setInterval(() => {
                left = left - 10;
                personView.style.left = left + 'px';
                var screenw = AppConfig.getWindowWidth();
                if (left <= -screenw) {
                    clearInterval(this.timer);
                    personView.style.left = '-100%';
                    this.storage.remove('user');
                    AppSingleton.getInstance().currentUserInfo = new UserInfo();
                    this.navCtrl.insert(0, LoginPage);
                    this.navCtrl.popToRoot();
                }
            }, 1);
        }
    }

    onHideMask() {
        this.hideMaskView = true;
    }
}
