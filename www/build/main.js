webpackJsonp([4],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_create_project_create__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








//import { WechatService } from "../../app/wechat.service";
var HomePage = (function () {
    function HomePage(navCtrl, appService, events) {
        this.navCtrl = navCtrl;
        this.appService = appService;
        this.events = events;
        this.type = 1;
        this.namevalue = "appname-list";
        this.projects = [];
        this.projectsOnMonth = [];
        this.currentDate = "";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('homeProjectReload', function () {
            _this.reloadProjectList(_this.currentDate);
        });
        //this.wechat.share(0, "check-installed");
    };
    HomePage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('homeProjectReload');
    };
    HomePage.prototype.onChangeDate = function () {
    };
    HomePage.prototype.onSelectDate = function (date) {
        if (date instanceof Date) {
            var dateString = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].dateToString(date);
            this.currentDate = dateString;
            this.reloadProjectList(dateString);
        }
    };
    HomePage.prototype.onChangeMonthProject = function (dayHasProjects) {
        this.projectsOnMonth = dayHasProjects;
    };
    HomePage.prototype.reloadProjectList = function (dateString) {
        this.events.publish('onGetProjectDate');
        this.projects = [];
        this.appService.httpGet("item/searchByCondition", { "itemStartTime": dateString, "endTime": dateString, "empNum": __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username, "page": 1, "limit": 100 }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.projects = data.data;
                for (var i = 0; i < view.projects.length; i++) {
                    var project = view.projects[i];
                    project.milestoneVo1 = [];
                    project.milestoneVo2 = [];
                    for (var j = 0; j < project.children.length; j++) {
                        var mile = project.children[j];
                        if (mile.milestoneType == 1) {
                            project.milestoneVo1.push(mile);
                        }
                        else if (mile.milestoneType == 2) {
                            project.milestoneVo2.push(mile);
                        }
                    }
                }
                console.log(view.projects);
            }
        }, true);
    };
    HomePage.prototype.sortPorjects = function (oldArray) {
        for (var i = 0; i < oldArray.length(); i++) {
            var pp = oldArray[i];
            if (pp.itemIsEnd == true) {
                pp.itemState = "07010040";
            }
            else {
            }
        }
    };
    HomePage.prototype.onChangeType = function ($event) {
        if (this.type == 1) {
            this.type = 2;
            this.namevalue = "appname-calendar";
        }
        else {
            this.type = 1;
            this.namevalue = "appname-list";
        }
    };
    HomePage.prototype.onClickSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */]);
    };
    HomePage.prototype.onCreateProject = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__project_create_project_create__["a" /* ProjectCreatePage */], {
            type: 1,
        });
    };
    HomePage.prototype.onClickProject = function (project) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__["b" /* ProjectDetailPage */], {
            project: project,
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar hideBackButton="true">\n    <ion-title [hidden]="type==1">\n        {{currentDate | YearAndMonthPipe}}\n    </ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onChangeType($event)" id="btMode">\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name={{namevalue}} >\n        </ion-icon>\n      </button>\n      <button ion-button (click)="onClickSearch()">\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name="appname-search" >\n        </ion-icon>\n      </button>\n      <button ion-button (click)="onCreateProject()">\n        <ion-icon style="color: #fc5c53; margin-right: 5px" name="appname-add" >\n        </ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <div [hidden]="type==2" no-padding no-margin>\n    <calendar id="calendar" (onChange)="onSelectDate($event)" (onChangeMonth)="onChangeMonthProject($event)">\n\n    </calendar>\n\n    <div style="margin-top: 10px; height: 1px; background-color: #c5c6c7; width: 100%"></div>\n    <ion-item (click)="onClickProject(project)" *ngFor="let project of projects">\n      <ion-label no-padding no-margin text-center float-left\n                 [ngClass]="{\'circle_home\':1===1,\'nostart\':project.itemState==\'07010010\',\'ing\':project.itemState==\'07010020\'|| project.itemState==\'07010030\',\'end\':project.itemState==\'07010040\'}">{{project.itemLevel}}</ion-label>\n          <!--<div [ngClass]="{\'circle_nostart\':project.itemState==\'未启动\',\'circle_ing\':project.itemState==\'进行中\',\'circle_end\':project.itemState==\'已结束\'}"></div>-->\n        <ion-label no-padding no-margin float-left class="pj-name" [ngStyle]="{\'color\':project.itemState==\'07010030\'?\'#fc780e\':\'black\'}">{{project.itemName}}</ion-label>\n        </ion-item>\n      </div>\n    <div [hidden]="type==1" no-padding no-margin>\n      <div no-margin no-padding style="background-color: #ececec; height: 50px">\n        <ion-label no-margin no-padding float-left style="margin-left: 10px; line-height: 50px">开始日期</ion-label>\n        <ion-label no-margin no-padding float-left style="margin-left: 50px; line-height: 50px">项目名称</ion-label>\n        <div float-end style="position: relative; width: 120px; height: 100%">\n          <div no-margin no-padding style="position:absolute; top: 4px; right: 10px; height: 40%; width: 100%">\n            <div style="float: left">\n              <div style="width: 10px; height: 10px; background-color: #fc780e; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">进行中</ion-label>\n            </div>\n            <div style="float: right">\n              <div style="width: 10px; height: 10px; background-color: #10c619; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">未开始</ion-label>\n            </div>\n          </div>\n          <div no-margin no-padding style="position:absolute; bottom: 0px; right: 10px; height: 40%; width: 100%">\n            <div style="float: left">\n              <div style="width: 10px; height: 10px; background-color: #fc780e; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">延期中</ion-label>\n            </div>\n           <div style="float: right">\n            <div style="width: 10px; height: 10px; background-color: #c1c8d2; float: left"></div>\n            <ion-label float-left no-margin no-padding style="line-height: 12px">已完成</ion-label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div *ngFor="let project of projectsOnMonth" style="position: relative; height: 50px; border-bottom: solid 1px #ececec" (click)="onClickProject(project)">\n      <ion-label float-left no-margin no-padding class="list_day">{{project.itemStartTime | DayPipe}}</ion-label>\n      <ion-label float-left no-margin no-padding class="list_weekday">{{project.itemStartTime | WeekayPipe}}</ion-label>\n      <ion-label float-left no-margin no-padding text-center\n          [ngClass]="{\'list_circle\':1===1,\'nostart\':project.itemState==\'07010010\',\'ing\':project.itemState==\'07010020\'|| project.itemState==\'07010030\',\'end\':project.itemState==\'07010040\'}">{{project.itemLevel}}</ion-label>\n      <ion-label float-left no-margin no-padding class="list_itemname" [ngStyle]="{\'color\':project.itemState==\'07010030\'?\'#fc780e\':\'black\'}">{{project.itemName}}</ion-label>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the ProjectCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProjectCreatePage = (function () {
    function ProjectCreatePage(navCtrl, navParams, appService, toastCtrl, events, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.project = {
            id: '',
            itemName: '',
            itemFounder: __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.name,
            founderEmpNum: __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username,
            itemEndLeader: '',
            itemEndLeaderNum: '',
            // empNum: '',
            itemCreateTime: '',
            itemStartTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            delayTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            delayDays: '',
            itemUpdate: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            endTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            itemVersion: '',
            itemLevel: '',
            itemStartResult: '',
            itemEndResult: '',
            children: [],
            milestoneVo1: [],
            milestoneVo2: [],
            itemRaise: '',
            itemRevision: '',
            itemDept: '',
            itemState: '',
            itemCode: '',
            itemWeight: '',
            itemProgress: '',
            itemIsEnd: false,
        };
        this.minTime = new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd');
        this.milestoneCallback = function (milestone) {
            return new Promise(function (resolve, reject) {
                if (typeof (milestone) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.project.milestoneVo1.length; i++) {
                        var tempMile = _this.project.milestoneVo1[i];
                        if (tempMile.id == milestone.id) {
                            isIn = true;
                            _this.project.milestoneVo1.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn) {
                        _this.addOneMilestone(milestone);
                        _this.project.children.push(milestone);
                    }
                }
                else {
                }
                resolve();
            });
        };
        var data = this.navParams.get('project');
        this.type = this.navParams.get('type');
        this.isExpand = this.navParams.get('isExpand');
        if (data) {
            this.project = data;
            this.viewTitle = this.project.itemName;
        }
        else {
            this.viewTitle = '新建项目';
        }
    }
    ProjectCreatePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('onConfirmProjectLeader', function (leader) {
            _this.project.itemEndLeader = leader.name;
            _this.project.itemEndLeaderNum = leader.username;
        });
    };
    ProjectCreatePage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('onConfirmProjectLeader');
    };
    ProjectCreatePage.prototype.onPublish = function () {
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
        if (this.project.itemLevel.length < 1) {
            var alert_1 = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请选择项目紧急程度!',
                buttons: ['确定']
            });
            alert_1.present();
            return;
        }
        this.appService.httpPost("item/createItem", this.project, this, function (view, res) {
            // var data = res.json().data;
            view.events.publish('homeProjectReload');
            var toast = view.toastCtrl.create({
                message: '创建项目成功!',
                duration: 3000
            });
            toast.present();
            view.navCtrl.pop();
        }, true);
    };
    ProjectCreatePage.prototype.onAddMilestone = function () {
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
            id: '',
            milestoneName: '里程碑' + (this.project.milestoneVo1.length + 1),
            itemEndLeader: '',
            itemEndLeaderNum: '',
            // milestoneDelivery : '',
            deliveryResult: '',
            itemProgress: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            planTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            remark: '',
            isAccomplish: false,
            delayDays: 0,
            milestoneType: 1,
            children: [],
        };
        // this.project.children.push(milestone);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            milestone: milestone,
            mileType: 1,
            project: this.project,
            type: this.type,
            callback: this.milestoneCallback,
        });
    };
    ProjectCreatePage.prototype.onLookMilestone = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            project: this.project
        });
    };
    ProjectCreatePage.prototype.onClickRemoveMilestone = function ($event, mile) {
        if (this.type == 1) {
            this.deleteOneMile(mile);
        }
        else {
            this.appService.httpDelete("item/deleteMilestone", { "ids": [mile.id] }, this, function (view, res) {
                if (res.status == 200) {
                    view.deleteOneMile(mile);
                }
            }, true);
        }
    };
    ProjectCreatePage.prototype.deleteOneMile = function (mile) {
        var deleteId = mile.id;
        var index = -1;
        for (var i = 0; i < this.project.milestoneVo1.length; i++) {
            var milestone1 = this.project.milestoneVo1[i];
            if (deleteId == milestone1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.project.milestoneVo1.splice(index, 1);
            for (var i = 0; i < this.project.milestoneVo1.length; i++) {
                var milestone2 = this.project.milestoneVo1[i];
                milestone2.milestoneName = '里程碑' + (i + 1);
            }
        }
    };
    ProjectCreatePage.prototype.onEndDirector = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__contact_contact__["a" /* ContactPage */], {
            type: 1,
        });
    };
    ProjectCreatePage.prototype.addOneMilestone = function (milestone) {
        if (this.project.milestoneVo1.length == 0) {
            this.project.milestoneVo1.push(milestone);
            if (this.isExpand != null) {
                this.isExpand.push(false);
            }
        }
        else if (this.project.milestoneVo1.length == 1) {
            var p1 = this.project.milestoneVo1[0];
            var d1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(p1.deliveryTime);
            var d2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
            if (d1 <= d2 || __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].isSameDay(d1, d2)) {
                this.project.milestoneVo1.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            }
            else {
                this.project.milestoneVo1.splice(0, 0, milestone);
                if (this.isExpand != null) {
                    this.isExpand.splice(0, 0, false);
                }
            }
        }
        else {
            var isInsert = false;
            for (var i = 0; i < this.project.milestoneVo1.length - 1; i++) {
                var pp1 = this.project.milestoneVo1[i];
                var pp2 = this.project.milestoneVo1[i + 1];
                var dd1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp1.deliveryTime);
                var dd2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp2.deliveryTime);
                var dd3 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
                if (i == 0 && dd3 < dd1) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(0, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(0, 0, false);
                    }
                    break;
                }
                if (dd3 > dd1 && dd3 < dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(i + 1, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(i + 1, 0, false);
                    }
                    break;
                }
                if (i == this.project.milestoneVo1.length - 2 && dd3 > dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.push(milestone);
                    if (this.isExpand != null) {
                        this.isExpand.push(false);
                    }
                    break;
                }
            }
            if (isInsert == false) {
                this.project.milestoneVo1.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            }
            for (var i = 0; i < this.project.milestoneVo1.length; i++) {
                var mm = this.project.milestoneVo1[i];
                mm.milestoneName = '里程碑' + (i + 1);
            }
        }
    };
    return ProjectCreatePage;
}());
ProjectCreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-project-create',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-create/project-create.html"*/'<!--\n  Generated template for the ProjectCreatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n  <ion-navbar >\n    <ion-title>{{viewTitle}}</ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onPublish()" color="danger">\n        {{this.project.itemName.length>0?"完成":"发布"}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n    <ion-list no-margin no-lines no-padding style="border-top: solid 10px #f5f6f7; border-bottom: solid 10px #f5f6f7;">\n      <ion-item>\n        <ion-icon item-start name="appname-pname"></ion-icon>\n        <ion-label>项目名称</ion-label>\n        <ion-input item-end text-right placeholder="请输入项目名称" [(ngModel)]="project.itemName"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目启动</ion-label>\n    </div>\n    <ion-list no-lines no-padding no-margin style="border-bottom: solid 10px #f5f6f7;">\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min={{minTime}}\n                      ngModel="{{project.itemStartTime | stampToDate}}"\n                      (ngModelChange)="project.itemStartTime = $event"\n                      cancelText="取消" doneText="确认"></ion-datetime>\n      </ion-item>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label>交付成果</ion-label>\n        <ion-input item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemStartResult" required></ion-input>\n      </ion-item>\n      <ion-item >\n        <ion-icon item-start name="appname-plan"></ion-icon>\n        <ion-label>项目级别</ion-label>\n        <ion-select interface="action-sheet" [(ngModel)]="project.itemLevel" cancelText="取消" doneText="确认">\n          <ion-option value="1">一级</ion-option>\n          <ion-option value="2">二级</ion-option>\n          <ion-option value="3">三级</ion-option>\n          <ion-option value="4">四级</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n\n    <div style="border-bottom: solid 10px #f5f6f7;" *ngFor="let mile of project.milestoneVo1">\n      <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n        <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n        <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{mile.milestoneName}}</ion-label>\n        <div style="float: right; width: 30px; height: 30px;position: relative">\n          <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onClickRemoveMilestone($event, mile)"></ion-icon>\n        </div>\n      </div>\n      <ion-list no-lines no-margin no-padding>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-admin"></ion-icon>\n          <ion-label>负责人</ion-label>\n          <ion-input item-end text-right [(ngModel)]="mile.itemEndLeader"></ion-input>\n        </ion-item>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-time"></ion-icon>\n          <ion-label>交付时间</ion-label>\n          <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min={{minTime}} cancelText="取消" doneText="确认"\n                        ngModel="{{mile.deliveryTime | stampToDate}}"\n                        (ngModelChange)="mile.deliveryTime = $event"></ion-datetime>\n        </ion-item>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-plan"></ion-icon>\n          <ion-label>项目进度</ion-label>\n          <ion-select interface="action-sheet" [(ngModel)]="mile.itemProgress" cancelText="取消" doneText="确认">\n            <ion-option value="10%">10%</ion-option>\n            <ion-option value="20%">20%</ion-option>\n            <ion-option value="30%">30%</ion-option>\n            <ion-option value="40%">40%</ion-option>\n            <ion-option value="50%">50%</ion-option>\n            <ion-option value="60%">60%</ion-option>\n            <ion-option value="70%">70%</ion-option>\n            <ion-option value="80%">80%</ion-option>\n            <ion-option value="90%">90%</ion-option>\n            <ion-option value="100%">100%</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-icon item-start name="appname-result"></ion-icon>\n          <ion-label>交付成果</ion-label>\n          <ion-textarea item-end text-right [(ngModel)]="mile.deliveryResult"></ion-textarea>\n        </ion-item>\n      </ion-list>\n    </div>\n\n\n    <div style="padding: 10px; border-bottom: solid 10px #f5f6f7">\n      <button ion-button (click)="onAddMilestone()" style="background-color: #fc5c53" block>+ 添加里程碑</button>\n    </div>\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目结束</ion-label>\n    </div>\n    <ion-list no-lines no-margin no-padding>\n      <button ion-item style="border-bottom: solid 1px #ececec" (click)="onEndDirector($event)">\n        <ion-icon item-start name="appname-admin"></ion-icon>\n        <ion-label item-start>负责人</ion-label>\n        <!--<ion-input item-end text-right placeholder="请输入负责人" [(ngModel)]="project.itemLeader"></ion-input>-->\n        <ion-label item-end text-right>{{project.itemEndLeader}}</ion-label>\n      </button>\n      <ion-item  style="border-bottom: solid 1px #ececec">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min={{minTime}}\n                      cancelText="取消" doneText="确认"\n                      ngModel="{{project.endTime | stampToDate}}"\n                      (ngModelChange)="project.endTime = $event"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label>交付成果</ion-label>\n        <ion-textarea item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemEndResult"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n\n\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-create/project-create.html"*/,
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
    //未开始(07010010)    进行中(07010020)      延期(07010030)     已结束(07010040)
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
], ProjectCreatePage);

//# sourceMappingURL=project-create.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilestoneDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_contact__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the MilestoneDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MilestoneDetailPage = (function () {
    function MilestoneDetailPage(navCtrl, navParams, appService, cd, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.cd = cd;
        this.events = events;
        this.milestone = {
            id: '',
            milestoneName: '',
            itemEndLeader: '',
            itemEndLeaderNum: '',
            deliveryResult: '',
            // milestoneSchedule : '',     //里程碑的进度
            itemProgress: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            planTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            remark: '',
            delayDays: 0,
            children: [],
            itemIsEnd: false,
            milestoneType: 1,
        };
        this.canEdit = true;
        this.canFinish = false;
        this.minTime = new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd');
        this.subtaskCallback = function (subtask) {
            return new Promise(function (resolve, reject) {
                if (typeof (subtask) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.tempMilestone.children.length; i++) {
                        var tempSubtask = _this.tempMilestone.children[i];
                        if (tempSubtask.id == subtask.id) {
                            isIn = true;
                            _this.tempMilestone.children.splice(i, 1, subtask);
                            _this.cd.detectChanges();
                            break;
                        }
                    }
                    if (!isIn) {
                        _this.tempMilestone.children.push(subtask);
                        _this.cd.detectChanges();
                    }
                    for (var i = 0; i < _this.tempMilestone.children.length; i++) {
                        var ss = _this.tempMilestone.children[i];
                        ss.subtaskName = '子任务' + (i + 1);
                    }
                    _this.milestone = _this.tempMilestone;
                    _this.events.publish('reloadMilestone', _this.milestone);
                    //this.content.resize();
                    setTimeout(function () {
                        if (_this.content.scrollToBottom) {
                            _this.content.scrollToBottom(0);
                        }
                    }, 200);
                }
                else {
                }
                resolve();
            });
        };
        var data = this.navParams.get('milestone');
        this.project = this.navParams.get('project');
        this.callback = this.navParams.get('callback');
        this.type = this.navParams.get('type');
        this.mileType = this.navParams.get('mileType');
        this.milestone = data;
        if (this.milestone.id.length < 1) {
            if (this.mileType == 1) {
                if (typeof (this.project.children) != 'undefined') {
                    this.milestone.milestoneName = '里程碑' + (this.project.children.length + 1);
                }
                else {
                    this.milestone.milestoneName = '里程碑' + '1';
                }
            }
            else {
                console.log();
                if (typeof (this.project.delayMilestone) != 'undefined') {
                    this.milestone.milestoneName = '延期' + (this.project.delayMilestone.length + 1);
                }
                else {
                    this.milestone.milestoneName = '延期' + '1';
                }
            }
        }
        if (typeof (this.milestone.children) != 'undefined') {
            for (var i = 0; i < this.milestone.children.length; i++) {
                var subtask = this.milestone.children[i];
                subtask.subtaskName = '子任务' + (i + 1);
            }
        }
        this.tempMilestone = __WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* AppConfig */].deepCopy(this.milestone);
        if (this.type == 2) {
            if (__WEBPACK_IMPORTED_MODULE_7__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username != this.project.founderEmpNum) {
                this.canEdit = false;
            }
            if (__WEBPACK_IMPORTED_MODULE_7__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username == this.milestone.itemEndLeaderNum) {
                this.canFinish = true;
            }
        }
    }
    MilestoneDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('onConfirmMilestoneLeader', function (leader) {
            _this.tempMilestone.itemEndLeader = leader.name;
            _this.tempMilestone.itemEndLeaderNum = leader.username;
        });
    };
    MilestoneDetailPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('onConfirmMilestoneLeader');
    };
    MilestoneDetailPage.prototype.ionViewWillLeave = function () {
    };
    MilestoneDetailPage.prototype.onMilestoneLeader = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__contact_contact__["a" /* ContactPage */], {
            type: 2,
        });
    };
    MilestoneDetailPage.prototype.onSaveMilestone = function ($event) {
        // if (this.tempMilestone.leader.length < 1) {
        //   let alert = this.alertCtrl.create({
        //     title: '错误信息',
        //     subTitle: '里程碑负责人为必填项!',
        //     buttons: ['确定']
        //   });
        //   alert.present();
        //   return;
        // }
        // if (this.tempMilestone.deliveryResult.length < 1) {
        //   let alert = this.alertCtrl.create({
        //     title: '错误信息',
        //     subTitle: '里程碑交付成果为必填项!',
        //     buttons: ['确定']
        //   });
        //   alert.present();
        //   return;
        // }
        var _this = this;
        var param = __WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* AppConfig */].deepCopy(this.tempMilestone);
        if (this.mileType == 1) {
            if (this.type == 1) {
                this.tempMilestone.milestoneType = 1;
                this.milestone = this.tempMilestone;
                this.callback(this.milestone).then(function () {
                    _this.navCtrl.pop();
                });
            }
            else {
                param.milestoneType = 1;
                param.projectinfo = this.project;
                this.appService.httpPost("item/createMilestone", param, this, function (view, res) {
                    if (res.status == 200) {
                        view.tempMilestone = res.json().data;
                        if (typeof (view.project.children != 'undefined')) {
                            view.tempMilestone.milestoneName = '里程碑' + (view.project.children.length + 1);
                        }
                        else {
                            view.tempMilestone.milestoneName = '里程碑1';
                        }
                        view.milestone = view.tempMilestone;
                        view.callback(view.milestone).then(function () {
                            view.navCtrl.pop();
                        });
                    }
                    else {
                        var toast = view.toastCtrl.create({
                            message: view.type == 1 ? '新建里程碑失败!' : '编辑里程碑失败!',
                            duration: 3000
                        });
                        toast.present();
                    }
                }, true);
            }
        }
        else {
            param.milestoneType = 2;
            param.projectinfo = this.project;
            this.appService.httpPost("item/createMilestone", param, this, function (view, res) {
                if (res.status == 200) {
                    view.tempMilestone = res.json().data;
                    if (typeof (view.project.children != 'undefined')) {
                        view.tempMilestone.milestoneName = '延期' + (view.project.children.length + 1);
                    }
                    else {
                        view.tempMilestone.milestoneName = '延期1';
                    }
                    view.milestone = view.tempMilestone;
                    view.callback(view.milestone).then(function () {
                        view.navCtrl.pop();
                    });
                }
                else {
                    var toast = view.toastCtrl.create({
                        message: view.type == 1 ? '新建里程碑失败!' : '编辑里程碑失败!',
                        duration: 3000
                    });
                    toast.present();
                }
            }, true);
        }
    };
    MilestoneDetailPage.prototype.onAddSubtask = function ($event) {
        var subtask = {
            id: '',
            subtaskName: '子任务' + (this.tempMilestone.children.length + 1),
            itemEndLeader: '',
            itemEndLeaderNum: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            deliveryResult: '',
            planTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            itemIsEnd: false,
            remark: '',
            delayDays: 0,
        };
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__subtask_subtask__["a" /* SubtaskPage */], {
            subtask: subtask,
            type: 1,
            projectname: this.project.itemName,
            milestone: this.tempMilestone,
            callback: this.subtaskCallback,
        });
    };
    MilestoneDetailPage.prototype.onRemoveSubtask = function ($event, subtask) {
        this.appService.httpDelete("item/delete", { "ids": subtask.id }, this, function (view, res) {
            if (res.status == 200) {
                view.deleteOneSubtask(subtask);
            }
        }, true);
    };
    MilestoneDetailPage.prototype.deleteOneSubtask = function (subtask) {
        var deleteId = subtask.id;
        var index = -1;
        for (var i = 0; i < this.tempMilestone.children.length; i++) {
            var subtask1 = this.tempMilestone.children[i];
            if (deleteId == subtask1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.tempMilestone.children.splice(index, 1);
            for (var i = 0; i < this.tempMilestone.children.length; i++) {
                var subtask2 = this.tempMilestone.children[i];
                subtask2.subtaskName = '子任务' + (i + 1);
            }
            this.milestone = this.tempMilestone;
            this.events.publish('reloadMilestone', this.milestone);
        }
    };
    return MilestoneDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Content"])
], MilestoneDetailPage.prototype, "content", void 0);
MilestoneDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-milestone-detail',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/milestone-detail/milestone-detail.html"*/'<!--\n  Generated template for the MilestoneDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      {{this.type==1?"新建里程碑":"里程碑详情"}}\n    </ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onSaveMilestone($event)" style="color: #fc5c53"\n            [hidden]="canEdit==false&&canFinish==false&&type==2">\n        保存\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content fullscreen>\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n    <ion-item >\n      <ion-icon item-start name="appname-pname"></ion-icon>\n      <ion-label>项目名称:</ion-label>\n      <ion-label right text-right>{{this.project.itemName}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-label full style="text-align: center">{{tempMilestone.milestoneName}}</ion-label>\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onMilestoneLeader($event)" [disabled]="canEdit==false">\n      <ion-icon item-start name="appname-admin"></ion-icon>\n      <ion-label item-start>负责人:</ion-label>\n      <ion-label item-end text-right>{{tempMilestone.itemEndLeader}}</ion-label>\n    </button>\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n      <!--<ion-label>负责人:</ion-label>-->\n      <!--<ion-input text-right type="text" [(ngModel)]="tempMilestone.milestoneLeader" required [disabled]=""></ion-input>-->\n    <!--</ion-item>-->\n    <ion-item style="border-bottom: solid 1px #ececec;">\n      <ion-icon item-start name="appname-time"></ion-icon>\n      <ion-label>交付时间:</ion-label>\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min={{minTime}} cancelText="取消" doneText="确认" required [disabled]="canEdit==false"\n                    ngModel="{{tempMilestone.deliveryTime | stampToDate}}"\n                    (ngModelChange)="tempMilestone.deliveryTime = $event">\n      </ion-datetime>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec"  >\n      <ion-icon item-start name="appname-plan"></ion-icon>\n      <ion-label>项目进度</ion-label>\n      <ion-select interface="action-sheet" [(ngModel)]="tempMilestone.itemProgress" cancelText="取消" doneText="确认" [disabled]="canEdit==false">\n        <ion-option value="10%">10%</ion-option>\n        <ion-option value="20%">20%</ion-option>\n        <ion-option value="30%">30%</ion-option>\n        <ion-option value="40%">40%</ion-option>\n        <ion-option value="50%">50%</ion-option>\n        <ion-option value="60%">60%</ion-option>\n        <ion-option value="70%">70%</ion-option>\n        <ion-option value="80%">80%</ion-option>\n        <ion-option value="90%">90%</ion-option>\n        <ion-option value="100%">100%</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec;"  >\n      <ion-icon item-start name="appname-result"></ion-icon>\n      <ion-label no-padding no-margin>交付成果:</ion-label>\n      <ion-input text-right type="text" [(ngModel)]="tempMilestone.deliveryResult" required [disabled]="canEdit==false"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="tempMilestone.delay > 0" style="border-bottom: solid 1px #ececec;" >\n      <ion-label >延迟情况:</ion-label>\n      <ion-label text-right item-end></ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-list no-lines no-padding no-margin *ngIf="this.tempMilestone.id.length>0">\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n      <div item-start>是否完成</div>\n      <ion-label>完成</ion-label>\n      <ion-checkbox [(ngModel)]="tempMilestone.itemIsEnd" [disabled]="canFinish==false"></ion-checkbox>\n    </ion-item>\n    <ion-item style="border-bottom: solid 10px #ececec; height: 100px;" >\n      <ion-label item-start>备注:</ion-label>\n      <ion-textarea item-end no-padding no-margin [(ngModel)]="tempMilestone.remark" [disabled]="canFinish==false"></ion-textarea>\n    </ion-item>\n  </ion-list>\n\n  <div *ngFor="let subtask of tempMilestone.children; let i = index">\n    <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n      <div style="width: 5px; height: 30px; background-color: #555555; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{subtask.subtaskName}}</ion-label>\n      <div style="float: right; width: 30px; height: 30px;position: relative">\n        <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onRemoveSubtask($event, subtask)"></ion-icon>\n      </div>\n    </div>\n    <ion-list no-lines no-padding no-margin>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-admin"></ion-icon>\n        <ion-label>负责人:</ion-label>\n        <ion-input text-right type="text" [(ngModel)]="subtask.itemEndLeader"\n                   required [disabled]="type==2"></ion-input>\n      </ion-item>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认"\n                      ngModel="{{subtask.deliveryTime | stampToDate}}"\n                      (ngModelChange)="subtask.deliveryTime = $event"\n                      [disabled]="type==2"></ion-datetime>\n      </ion-item>\n      <ion-item style="border-bottom: solid 10px #ececec;">\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label no-padding no-margin>交付成果:</ion-label>\n        <ion-input text-right type="text" [(ngModel)]="subtask.deliveryResult"\n                   required [disabled]="type==2"></ion-input>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <div style="padding: 10px;" *ngIf="this.tempMilestone.id.length>0&&canEdit==true">\n    <button ion-button (click)="onAddSubtask($event)" block style="background-color: #fc5c53">+ 添加子任务</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/milestone-detail/milestone-detail.html"*/,
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
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], MilestoneDetailPage);

//# sourceMappingURL=milestone-detail.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtaskPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_contact__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SubtaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubtaskPage = (function () {
    function SubtaskPage(navCtrl, navParams, appService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.events = events;
        this.subtask = {
            id: '',
            subtaskName: '',
            itemEndLeader: '',
            itemEndLeaderNum: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            deliveryResult: '',
            planTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            remark: '',
            delayDays: 0,
            itemIsEnd: false,
        };
        this.canEdit = true;
        this.minTime = new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd');
        var data = this.navParams.get('subtask');
        this.projectname = this.navParams.get('projectname');
        this.callback = this.navParams.get('callback');
        this.type = this.navParams.get("type");
        this.milestone = this.navParams.get("milestone");
        if (data != null) {
            this.subtask = data;
        }
        this.tempSubtask = __WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* AppConfig */].deepCopy(this.subtask);
        if (this.type == 2) {
            if (this.subtask.itemEndLeaderNum != __WEBPACK_IMPORTED_MODULE_6__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username) {
                this.canEdit = false;
            }
        }
    }
    SubtaskPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('onConfirmSubtaskLeader', function (leader) {
            _this.tempSubtask.itemEndLeader = leader.name;
            _this.tempSubtask.itemEndLeaderNum = leader.username;
        });
    };
    SubtaskPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('onConfirmSubtaskLeader');
    };
    SubtaskPage.prototype.ionViewWillLeave = function () {
    };
    SubtaskPage.prototype.onSubtaskLeader = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__contact_contact__["a" /* ContactPage */], {
            type: 3,
        });
    };
    SubtaskPage.prototype.onSaveSubtask = function () {
        var param = this.tempSubtask;
        // if (this.type == 1) {
        //     this.callback(this.tempSubtask).then(()=>{
        //         this.navCtrl.pop()
        //     });
        // } else {
        param.projectinfo = this.milestone;
        //param.sid = this.tempSubtask.id;
        this.appService.httpPost("item/createSubtask", param, this, function (view, res) {
            if (res.status == 200) {
                if (typeof (res.json()) != 'undefined') {
                    view.subtask = res.json().data;
                    view.callback(view.subtask).then(function () {
                        view.navCtrl.pop();
                    });
                }
            }
            else {
                var toast = view.toastCtrl.create({
                    message: view.type == 1 ? '新建里程碑失败!' : '编辑里程碑失败!',
                    duration: 3000
                });
                toast.present();
            }
        }, true);
        //   }
    };
    return SubtaskPage;
}());
SubtaskPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-subtask',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/subtask/subtask.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>子任务</ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onSaveSubtask()" color="danger">\n        保存\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n    <ion-item >\n      <ion-icon item-start name="appname-pname"></ion-icon>\n      <ion-label>项目名称:</ion-label>\n      <ion-label right text-right>{{projectname}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-label full class="subtask-title-css">{{tempSubtask.subtaskName}}</ion-label>\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onSubtaskLeader($event)" [disabled]="type==2">\n      <ion-icon item-start name="appname-admin"></ion-icon>\n      <ion-label item-start>负责人:</ion-label>\n      <ion-label item-end text-right>{{tempSubtask.itemEndLeader}}</ion-label>\n    </button>\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n      <!--<ion-label>负责人:</ion-label>-->\n      <!--<ion-input text-right type="text" [(ngModel)]="tempSubtask.subtaskLeader" required [disabled]=""></ion-input>-->\n    <!--</ion-item>-->\n    <ion-item style="border-bottom: solid 1px #ececec;">\n      <ion-icon item-start name="appname-time"></ion-icon>\n      <ion-label>交付时间:</ion-label>\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min={{minTime}} cancelText="取消" doneText="确认"\n                    ngModel="{{tempSubtask.deliveryTime | stampToDate}}"\n                    (ngModelChange)="tempSubtask.deliveryTime = $event" [disabled]="type==2"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-icon item-start name="appname-result"></ion-icon>\n      <ion-label>交付成果:</ion-label>\n      <ion-input text-right type="text" [(ngModel)]=tempSubtask.deliveryResult [disabled]="type==2"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="tempSubtask.delayDays>0">\n      <ion-label>延迟情况:</ion-label>\n      <ion-label text-right item-end>{{tempSubtask.delayDays | delayPipe}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-list no-lines="" [hidden]="this.type==1">\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n      <div item-start>是否完成</div>\n      <ion-label>完成</ion-label>\n      <ion-checkbox [(ngModel)]=tempSubtask.itemIsEnd [disabled]="canEdit==false"></ion-checkbox>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec; height: 100px;">\n      <ion-label item-start>备注:</ion-label>\n      <ion-textarea item-end [(ngModel)]=tempSubtask.remark [disabled]="canEdit==false"></ion-textarea>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/subtask/subtask.html"*/,
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
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], SubtaskPage);

//# sourceMappingURL=subtask.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProjectDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_create_project_create__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_app_singleton__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the ProjectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopoverPage = (function () {
    function PopoverPage(viewCtrl, navParams, events) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.events = events;
    }
    PopoverPage.prototype.ngOnInit = function () {
        if (this.navParams.data) {
            this.contentEle = this.navParams.data.contentEle;
            this.canShow = this.navParams.data.canShow;
        }
    };
    PopoverPage.prototype.onClickEdit = function ($event) {
        this.viewCtrl.dismiss();
        this.events.publish('onPushProjectDetail');
    };
    PopoverPage.prototype.onClickShare = function ($event) {
        this.viewCtrl.dismiss();
        this.events.publish('showShareView');
    };
    PopoverPage.prototype.onClickDelete = function ($event) {
        this.viewCtrl.dismiss();
        this.events.publish('onDeleteProject');
    };
    PopoverPage.prototype.onClickFinish = function ($event) {
        this.viewCtrl.dismiss();
        this.events.publish('onEndProject');
    };
    PopoverPage.prototype.onClickDelay = function ($event) {
        this.viewCtrl.dismiss();
        this.events.publish('onDelayProject');
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n    <ion-list>\n      <ion-item (click)=\"onClickEdit($event)\" [hidden]=\"!canShow\">\n        <ion-icon name=\"appname-edit\" item-start></ion-icon>\n        \u7F16\u8F91\n      </ion-item>\n      <ion-item (click)=\"onClickShare($event)\">\n        <ion-icon name=\"appname-share\" item-start></ion-icon>\n        \u5206\u4EAB\n      </ion-item>\n      <ion-item (click)=\"onClickDelete($event)\" [hidden]=\"!canShow\">\n        <ion-icon name=\"appname-delete\" item-start></ion-icon>\n        \u5220\u9664\n      </ion-item>\n      <ion-item (click)=\"onClickFinish($event)\" [hidden]=\"!canShow\">\n        <ion-icon name=\"appname-finish\" item-start></ion-icon>\n        \u7ED3\u675F\n      </ion-item>\n      <ion-item (click)=\"onClickDelay($event)\" [hidden]=\"!canShow\">\n        <ion-icon name=\"appname-delay\" item-start></ion-icon>\n        \u5EF6\u671F\n      </ion-item>\n    </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], PopoverPage);

var ProjectDetailPage = (function () {
    function ProjectDetailPage(navCtrl, navParams, popoverCtrl, events, appService, toastCtrl, socialSharing) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        this.socialSharing = socialSharing;
        //点击进入里程碑的回调
        this.milestoneCallback = function (milestone) {
            return new Promise(function (resolve, reject) {
                if (typeof (milestone) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.project.milestoneVo1.length; i++) {
                        var tempMile = _this.project.milestoneVo1[i];
                        if (tempMile.id == milestone.id) {
                            isIn = true;
                            _this.project.milestoneVo1.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn) {
                        _this.addOneMilestone(milestone);
                        // var compare = function (obj1, obj2) {//比较函数
                        //     console.log(AppConfig.stringToDate(obj1.planTime));
                        //     var date1 = AppConfig.stringToDate(obj1.planTime);
                        //     var date2 = AppConfig.stringToDate(obj2.planTime);
                        //     if (date1 < date2) {
                        //         return -1;
                        //     } else if (date1 > date2) {
                        //         return 1;
                        //     } else {
                        //         return 0;
                        //     }
                        // }
                        // this.project.children.sort(compare);
                    }
                    _this.reloadArray();
                }
                else {
                }
                resolve();
            });
        };
        this.delayMilestoneCallback = function (milestone) {
            return new Promise(function (resolve, reject) {
                if (typeof (milestone) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.project.milestoneVo2.length; i++) {
                        var tempMile = _this.project.milestoneVo2[i];
                        if (tempMile.id == milestone.id) {
                            isIn = true;
                            _this.project.milestoneVo2.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn) {
                        _this.project.milestoneVo2.push(milestone);
                    }
                    _this.reloadArray();
                }
                else {
                }
                resolve();
            });
        };
        //点击进入子任务的回调
        this.subtaskCallback = function (subtask) {
            return new Promise(function (resolve, reject) {
                if (typeof (subtask) != 'undefined') {
                    for (var i = 0; i < _this.project.milestoneVo1.length; i++) {
                        var milestone = _this.project.milestoneVo1[i];
                        var isIn = false;
                        for (var j = 0; j < milestone.children.length; j++) {
                            var sub = milestone.children[j];
                            if (sub.id == subtask.id) {
                                milestone.children.splice(j, 1, subtask);
                                isIn = true;
                                break;
                            }
                        }
                        if (isIn == false) {
                            break;
                        }
                    }
                    _this.reloadArray();
                }
                resolve();
            });
        };
        this.project = this.navParams.get('project');
        this.isExpand = [];
        this.reloadArray();
    }
    ProjectDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('showShareView', function () {
            // var shareView = document.getElementById('shareView');
            // var bottom = parseInt(window.getComputedStyle(shareView).bottom) ;
            // this.timer = setInterval(()=> {
            //   bottom = bottom + 10;
            //   shareView.style.bottom = bottom+'px';
            //   if (bottom >= 0) {
            //     clearInterval(this.timer);
            //     shareView.style.bottom = 0+'px';
            //   }
            // }, 16);
            _this.socialSharing.share("项目分享", "柒牌项目管理", null, null);
        });
        this.events.subscribe('onPushProjectDetail', function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__project_create_project_create__["a" /* ProjectCreatePage */], {
                project: _this.project,
                isExpand: _this.isExpand,
                type: 2,
            });
        });
        this.events.subscribe('reloadMilestone', function (milestone) {
            var isIn = false;
            for (var i = 0; i < _this.project.children.length; i++) {
                var mile = _this.project.children[i];
                if (milestone.id == mile.id) {
                    _this.project.children.splice(i, 1, milestone);
                    isIn = true;
                    break;
                }
            }
            if (isIn == false) {
                _this.project.children.push(milestone);
            }
        });
        this.events.subscribe('onDeleteProject', function () {
            _this.appService.httpDelete("item/delete", { "ids": [_this.project.id] }, _this, function (view, res) {
                console.log(res._body);
                if (res.status == 200) {
                    view.events.publish('homeProjectReload');
                    view.navCtrl.pop();
                }
                else {
                    var data = res.json()._body.msg;
                    var toast = view.toastCtrl.create({
                        message: data.msg,
                        duration: 3000
                    });
                    toast.present();
                }
            }, true);
        });
        this.events.subscribe('onEndProject', function () {
            _this.project.itemIsEnd = true;
            _this.project.itemState = '07010040';
            _this.appService.httpPost("item/createItem", _this.project, _this, function (view, res) {
                //var data = res.json();
                view.events.publish('homeProjectReload');
                var toast = view.toastCtrl.create({
                    message: '项目已结束!',
                    duration: 3000
                });
                toast.present();
            }, true);
        });
        this.events.subscribe('onDelayProject', function () {
            var milestone = {
                id: '',
                milestoneName: '里程碑' + (_this.project.children.length + 1),
                leader: '',
                leaderEmpNum: '',
                // milestoneDelivery : '',
                deliveryResult: '',
                itemProgress: '',
                deliveryTime: new __WEBPACK_IMPORTED_MODULE_7__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
                planTime: new __WEBPACK_IMPORTED_MODULE_7__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
                realTime: new __WEBPACK_IMPORTED_MODULE_7__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
                remark: '',
                isAccomplish: false,
                delayDays: 0,
                milestoneType: 2,
                children: [],
            };
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
                milestone: milestone,
                mileType: 2,
                isExpand: _this.isExpand,
                project: _this.project,
                callback: _this.delayMilestoneCallback,
                type: 1,
            });
        });
    };
    ProjectDetailPage.prototype.ionViewWillEnter = function () {
    };
    ProjectDetailPage.prototype.ionViewDidEnter = function () {
    };
    ProjectDetailPage.prototype.ionViewWillLeave = function () {
    };
    ProjectDetailPage.prototype.ionViewDidLeave = function () {
    };
    ProjectDetailPage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('showShareView');
        this.events.unsubscribe('onPushProjectDetail');
        this.events.unsubscribe('reloadMilestone');
        this.events.unsubscribe('onEndProject');
        this.events.unsubscribe('onDelayProject');
    };
    ProjectDetailPage.prototype.ionViewCanEnter = function () {
    };
    ProjectDetailPage.prototype.ionViewCanLeave = function () {
    };
    ProjectDetailPage.prototype.presentPopover = function ($event) {
        var canShow = true;
        if (__WEBPACK_IMPORTED_MODULE_8__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username != this.project.founderEmpNum) {
            canShow = false;
        }
        var popover = this.popoverCtrl.create(PopoverPage, {
            contentEle: this.content.nativeElement,
            canShow: canShow,
        });
        popover.present({
            ev: event
        });
    };
    ProjectDetailPage.prototype.onClickMilestone = function ($event, mile) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            milestone: mile,
            mileType: 1,
            isExpand: this.isExpand,
            project: this.project,
            callback: this.milestoneCallback,
            type: 2,
        });
    };
    ProjectDetailPage.prototype.onClickSubtask = function ($event, subtask, mile) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__subtask_subtask__["a" /* SubtaskPage */], {
            subtask: subtask,
            projectname: this.project.itemName,
            callback: this.subtaskCallback,
            milestone: mile,
        });
    };
    ProjectDetailPage.prototype.onClickExpand = function ($event, index) {
        var mile = this.project.children[index];
        if (mile.children == null) {
            return;
        }
        if (mile.children.length < 1) {
            return;
        }
        this.isExpand[index] = !this.isExpand[index];
    };
    ProjectDetailPage.prototype.onCancelShare = function ($event) {
        var _this = this;
        var shareView = document.getElementById('shareView');
        var bottom = parseInt(window.getComputedStyle(shareView).bottom);
        this.timer = setInterval(function () {
            bottom = bottom - 10;
            shareView.style.bottom = bottom + 'px';
            if (bottom <= -200) {
                clearInterval(_this.timer);
                shareView.style.bottom = '-200px';
            }
        }, 16);
    };
    ProjectDetailPage.prototype.reloadArray = function () {
        if (typeof (this.project.milestoneVo1) != 'undefined') {
            for (var i = 0; i < this.project.milestoneVo1.length; i++) {
                var milestone = this.project.milestoneVo1[i];
                milestone.milestoneName = '里程碑' + (i + 1);
                if (typeof (milestone.children) != 'undefined') {
                    for (var j = 0; j < milestone.children.length; j++) {
                        var subtask = milestone.children[j];
                        subtask.subtaskName = '子任务' + (j + 1);
                    }
                }
            }
        }
        if (typeof (this.project.milestoneVo2) != 'undefined') {
            for (var i = 0; i < this.project.milestoneVo2.length; i++) {
                var delayMile = this.project.milestoneVo2[i];
                delayMile.milestoneName = '延期' + (i + 1);
            }
        }
        this.isExpand = [];
        if (typeof (this.project.milestoneVo1) != 'undefined') {
            for (var i = 0; i < this.project.milestoneVo1.length; i++) {
                this.isExpand.push(false);
            }
        }
    };
    ProjectDetailPage.prototype.addOneMilestone = function (milestone) {
        if (this.project.milestoneVo1.length == 0) {
            this.project.milestoneVo1.push(milestone);
            this.isExpand.push(false);
        }
        else if (this.project.milestoneVo1.length == 1) {
            var p1 = this.project.milestoneVo1[0];
            var d1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(p1.deliveryTime);
            var d2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
            if (d1 <= d2) {
                this.project.milestoneVo1.push(milestone);
                this.isExpand.push(false);
            }
            else {
                this.project.milestoneVo1.splice(0, 0, milestone);
                this.isExpand.splice(0, 0, false);
            }
        }
        else {
            var isInsert = false;
            for (var i = 0; i < this.project.milestoneVo1.length - 1; i++) {
                var pp1 = this.project.milestoneVo1[i];
                var pp2 = this.project.milestoneVo1[i + 1];
                var dd1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp1.deliveryTime);
                var dd2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp2.deliveryTime);
                var dd3 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
                if (i == 0 && dd3 < dd1) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(0, 0, milestone);
                    this.isExpand.splice(0, 0, false);
                    break;
                }
                if (dd3 > dd1 && dd3 < dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.splice(i + 1, 0, milestone);
                    this.isExpand.splice(i + 1, 0, false);
                    break;
                }
                if (i == this.project.milestoneVo1.length - 2 && dd3 > dd2) {
                    isInsert = true;
                    this.project.milestoneVo1.push(milestone);
                    this.isExpand.push(false);
                    break;
                }
            }
            if (isInsert == false) {
                this.project.milestoneVo1.push(milestone);
                this.isExpand.push(false);
            }
        }
    };
    return ProjectDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('popoverContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], ProjectDetailPage.prototype, "content", void 0);
ProjectDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-project-detail',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-detail/project-detail.html"*/'<!--\n  Generated template for the ProjectDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{project.itemName}}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="more" style="color: #fc5c53"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content #popoverContent fullscreen>\n  <div class="pj-item">\n    <div class="mile-bottom">\n      <div class="item1">\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.itemStartTime | MonthPipe}}</ion-label>\n        <section class="line"></section>\n        <ion-label style="margin-top: 3px;font-size: 10px">{{project.itemStartTime | YearPipe}}</ion-label>\n      </div>\n      <div class="item2">\n        <ion-icon name="ios-arrow-dropdown-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n        <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">启动</ion-label>\n      </div>\n        <div class="item3">\n            <ion-icon no-border no-margin no-padding name="md-arrow-dropleft" class="arrow-css1"></ion-icon>\n            <div class="item3-1">\n                <div class="text-wrap">\n                    <div class="text-left">负责人：</div>\n                    <div class="text-right">{{project.itemFounder}}</div>\n                    <!--<div style="clear: both"></div>-->\n                </div>\n                <div  class="text-wrap">\n                    <div class="text-left">交付成果：</div>\n                    <div class="text-right">{{project.itemStartResult}}</div>\n                    <!--<div style="clear: both"></div>-->\n                </div>\n                <div  class="text-wrap">\n                    <div class="text-left">紧急程度：</div>\n                    <div class="text-right">{{project.itemLevel | itemlevelPipe}}</div>\n                    <!--<div style="clear: both"></div>-->\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <!-- 里程碑  -->\n  <div class="pj-item" *ngFor="let mile of project.milestoneVo1; let i = index">\n    <div class="mile-top" id="{{mile.id}}">\n      <div style="width: 1px; background-color: #ececec; height: 100%; position: absolute; left: 65px; top: 0px" >\n\n      </div >\n      <div [hidden]="mile.children.length<=0">\n        <div class="subtask-title" *ngIf="isExpand[i]==false ">\n          <ion-label no-margin no-padding text-center class="horizontal-center" style="line-height: 25px; font-size: 15px">{{mile.children.length+"个子任务"}}</ion-label>\n        </div>\n        <div class="subtask-wrap" *ngIf="isExpand[i]==true ">\n          <div class="subtask-item" *ngFor="let subtask of mile.children" (click)="onClickSubtask($event, subtask, mile)">\n            <div class="subtask-css" >\n              <ion-label class="subtask-left">子任务:</ion-label>\n              <ion-label class="subtask-right" >{{subtask.subtaskName}}</ion-label>\n            </div>\n            <div class="subtask-css" >\n              <ion-label class="subtask-left">交付时间:</ion-label>\n              <ion-label class="subtask-right" >{{subtask.deliveryTime | stampToDate}}</ion-label>\n            </div>\n            <div class="subtask-css" >\n              <ion-label class="subtask-left">负责人:</ion-label>\n              <ion-label class="subtask-right" >{{subtask.itemEndLeader}}</ion-label>\n            </div>\n          </div>\n        </div>\n        <ion-icon [name]="isExpand[i]==false?\'appname-expand\':\'appname-fold\'" class="fold" (click)="onClickExpand($event, i)"></ion-icon>\n      </div>\n    </div>\n    <div class="mile-bottom">\n      <div class="item1">\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{mile.deliveryTime | MonthPipe}}</ion-label>\n        <section class="line"></section>\n        <ion-label style="margin-top: 3px;font-size: 10px">{{mile.deliveryTime | YearPipe}}</ion-label>\n      </div>\n      <div class="item2">\n        <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n        <ion-label no-padding no-margin class="label-radius">{{mile.itemProgress}}</ion-label>\n        <ion-label no-padding no-margin class="mile-number">{{"里程碑"+(i+1)}}</ion-label>\n        <ion-label no-padding no-margin class="delay-radius1" [hidden]="mile.delayDays==0">{{"延"+mile.delayDays}}</ion-label>\n      </div>\n      <!--[ngClass]="{\'arrow-css1\':mile.type==0,\'arrow-css2\':mile.type==1,\'arrow-css3\':mile.type==2}"-->\n\n        <div class="item3">\n            <ion-icon no-border no-padding no-margin name="md-arrow-dropleft" class="arrow-css2" ></ion-icon>\n            <div class="item3-2" (click)="onClickMilestone($event, mile)">\n                <div class="text-wrap">\n                    <div class="text-left">负责人：</div>\n                    <div class="text-right">{{mile.itemEndLeader}}</div>\n                </div>\n                <div  class="text-wrap">\n                    <div class="text-left">交付成果：</div>\n                    <div class="text-right">{{mile.deliveryResult}}</div>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n\n  <!-- 项目结束 -->\n  <div class="mile-bottom">\n    <div class="item1">\n      <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.endTime | MonthPipe}}</ion-label>\n      <section class="line"></section>\n      <ion-label style="margin-top: 3px;font-size: 10px">{{project.endTime | YearPipe}}</ion-label>\n    </div>\n    <div class="item2">\n      <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n      <ion-icon name="ios-arrow-dropup-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n      <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">结束</ion-label>\n    </div>\n      <div class="item3">\n          <ion-icon no-border no-padding no-margin name="md-arrow-dropleft" class="arrow-css1"></ion-icon>\n          <div class="item3-1">\n              <div  class="text-wrap">\n                  <div no-padding no-margin class="text-left">负责人：</div>\n                  <div no-padding no-margin class="text-right">{{project.itemEndLeader}}</div>\n              </div>\n              <div  class="text-wrap">\n                  <div no-padding no-margin class="text-left">交付成果：</div>\n                  <div no-padding no-margin class="text-right">{{project.itemEndResult}}</div>\n              </div>\n          </div>\n      </div>\n  </div>\n\n  <!-- 延期里程碑 -->\n  <div class="mile-bottom" style="margin-top: 5px"\n       *ngFor="let dalayMile of project.milestoneVo2; let i = index">\n      <div class="item1">\n          <ion-label style="margin-bottom: 3px;font-size: 10px">{{dalayMile.deliveryTime | MonthPipe}}</ion-label>\n          <section class="line"></section>\n          <ion-label style="margin-top: 3px;font-size: 10px">{{dalayMile.deliveryTime | YearPipe}}</ion-label>\n      </div>\n      <div class="item2">\n          <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n          <ion-label no-padding no-margin class="label-radius">{{dalayMile.itemProgress}}</ion-label>\n          <ion-label no-padding no-margin class="mile-number">{{"延期"+(i+1)}}</ion-label>\n          <ion-label no-padding no-margin class="delay-radius1" [hidden]="dalayMile.delayDays==0">{{"延"+dalayMile.delayDays}}</ion-label>\n      </div>\n      <!--[ngClass]="{\'arrow-css1\':mile.type==0,\'arrow-css2\':mile.type==1,\'arrow-css3\':mile.type==2}"-->\n\n      <div class="item3">\n          <ion-icon no-border no-padding no-margin name="md-arrow-dropleft" class="arrow-css3" ></ion-icon>\n          <div class="item3-3" (click)="onClickMilestone($event, dalayMile)">\n              <div class="text-wrap">\n                  <div class="text-left">负责人：</div>\n                  <div class="text-right">{{dalayMile.itemEndLeader}}</div>\n              </div>\n              <div  class="text-wrap">\n                  <div class="text-left">交付成果：</div>\n                  <div class="text-right">{{dalayMile.deliveryResult}}</div>\n              </div>\n          </div>\n      </div>\n    </div>\n\n  <!--[ngStyle]="{\'bottom\':isShowShare==false?\'-200px\':\'0px\'}"-->\n  <div id="shareView" class="share-css" >\n    <ion-label text-center>分享到</ion-label>\n    <ion-row style="height: 100px;@extend .vertical-middle;">\n      <ion-col text-center >\n        <ion-icon name="appname-dingding"></ion-icon>\n      </ion-col>\n      <ion-col text-center>\n        <ion-icon name="appname-qq"></ion-icon>\n      </ion-col>\n      <ion-col text-center>\n        <ion-icon name="appname-weixin"></ion-icon>\n      </ion-col>\n    </ion-row>\n    <button ion-button no-padding no-margin style="width: 100%; height: 50px; border-top: solid 1px #ececec; background-color: white; color: black" (click)="onCancelShare($event)">取消</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-detail/project-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_9__ionic_native_social_sharing__["a" /* SocialSharing */]])
], ProjectDetailPage);

//# sourceMappingURL=project-detail.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewpwPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the NewpwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NewpwPage = (function () {
    function NewpwPage(navCtrl, navParams, formBuilder, appService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        this.newpwForm = this.formBuilder.group({
            newpw1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(16)])],
            newpw2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(16)])]
        });
        this.telPhone = this.navParams.get('telPhone');
    }
    NewpwPage.prototype.ionViewDidLoad = function () {
    };
    NewpwPage.prototype.onConfirmNewpw = function (value) {
        if (value.newpw1 != value.newpw2) {
            var toast = this.toastCtrl.create({
                message: "两次输入的密码不一致",
                duration: 2000,
                dismissOnPageChange: true,
            });
            toast.present();
        }
        else {
            this.appService.httpPost("http://192.168.10.118:8888/uc/user/resetByTelPhone", { "telPhone": this.telPhone, "newPassword": value.newpw1 }, this, function (view, res) {
                if (res.status == 200) {
                    var toast = view.toastCtrl.create({
                        message: "重置密码成功，请用新密码登录",
                        duration: 2000,
                        dismissOnPageChange: false,
                    });
                    toast.present();
                    view.navCtrl.popToRoot();
                }
            }, true);
        }
    };
    return NewpwPage;
}());
NewpwPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-newpw',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/newpw/newpw.html"*/'<!--\n  Generated template for the NewpwPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>设置新密码</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <form [formGroup]="newpwForm" (ngSubmit)="onConfirmNewpw(newpwForm.value);">\n    <div class="wrap">\n      <div class="row">\n        <ion-input no-padding no-margin type="password" placeholder="请输入新密码" formControlName="newpw1" ></ion-input>\n      </div>\n      <div class="row">\n        <ion-input no-padding no-margin type="password" placeholder="请再次输入新密码" formControlName="newpw2" ></ion-input>\n      </div>\n      <div class="row">\n        <button ion-button clear no-margin no-padding type="submit" [disabled]="!newpwForm.valid">确认</button>\n      </div>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/newpw/newpw.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
], NewpwPage);

//# sourceMappingURL=newpw.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__newpw_newpw__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ForgetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ForgetPage = (function () {
    function ForgetPage(navCtrl, navParams, formBuilder, appService, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.defCountDownText = "发送验证码";
        this.defCountDownTime = 60;
        this.isCountDowning = false;
        this.countDownText = this.defCountDownText;
        this.forgetForm = this.formBuilder.group({
            mobile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            code: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(1)])]
        });
        this.timer = __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__["Observable"].timer(1, 1000);
    }
    ForgetPage.prototype.ionViewDidLoad = function () {
    };
    ForgetPage.prototype.ionViewWillUnload = function () {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    };
    ForgetPage.prototype.sendCodeBtnEvent = function ($event) {
        if (this.isCountDowning == true) {
            return;
        }
        var test = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/;
        if (!test.test(this.forgetForm.value.mobile)) {
            var toast = this.toastCtrl.create({
                message: "手机号码输入错误!",
                duration: 2000,
                dismissOnPageChange: true,
            });
            toast.present();
        }
        this.appService.httpGet("http://192.168.10.118:8888/uc/user/findPassword", { "telPhone": this.forgetForm.value.mobile }, this, function (view, res) {
            if (res.json().result == "success") {
                view.appService.httpGet("http://192.168.10.120:8888/sms/sendSmg/" + view.forgetForm.value.mobile, {}, view, function (view1, res) {
                    if (res.status == 200) {
                        var alert_1 = view1.alertCtrl.create({
                            title: '提示',
                            subTitle: res.json()._return,
                            buttons: ['确定']
                        });
                        alert_1.present();
                    }
                }, true);
                view.countDownTime = view.defCountDownTime;
                view.isCountDowning = true;
                view.sub = view.timer.subscribe(function (t) {
                    view.countDownText = view.countDownTime.toString() + 's';
                    if (view.countDownTime < 0) {
                        view.countDownText = view.defCountDownText;
                        view.sub.unsubscribe();
                        view.isCountDowning = false;
                    }
                    view.countDownTime--;
                });
            }
            else {
                var alert_2 = view.alertCtrl.create({
                    title: '提示',
                    subTitle: '该手机号码未注册!',
                    buttons: ['确定']
                });
                alert_2.present();
            }
        }, true);
    };
    ForgetPage.prototype.goNext = function (value) {
        this.appService.httpGet("http://192.168.10.120:8888/sms/checkSmg/" + value.mobile + "/" + value.code, {}, this, function (view, res) {
            if (res.status == 200) {
                view.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__newpw_newpw__["a" /* NewpwPage */], {
                    telPhone: value.mobile
                });
            }
            else {
                var alert_3 = view.alertCtrl.create({
                    title: '错误信息',
                    subTitle: '验证码校对错误',
                    buttons: ['确定']
                });
                alert_3.present();
            }
        }, true);
    };
    return ForgetPage;
}());
ForgetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-forget',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/forget/forget.html"*/'<!--\n  Generated template for the ForgetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>验证手机号</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <form [formGroup]="forgetForm" (ngSubmit)="goNext(forgetForm.value);">\n    <div class="wrap">\n      <div class="row">\n        <ion-input no-padding no-margin type="text" placeholder="输入手机号" formControlName="mobile" maxlength="11"></ion-input>\n      </div>\n      <div class="row">\n        <ion-input no-padding no-margin type="text" placeholder="输入验证码" formControlName="code" maxlength="8"></ion-input>\n        <a id="btn_code" (click)="sendCodeBtnEvent($event)" class="sendcode" [class.active]="isCountDowning" >{{countDownText}}</a>\n      </div>\n      <div class="row">\n        <button ion-button clear no-margin no-padding type="submit" [disabled]="!forgetForm.valid">确认</button>\n      </div>\n    </div>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/forget/forget.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
], ForgetPage);

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forget_forget__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_singleton__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(119);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, appService, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.storage = storage;
        this.errorText = '手机号码错误';
        this.loginForm = this.formBuilder.group({
            mobile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(12)])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
    };
    LoginPage.prototype.login = function (value) {
        this.appService.httpGet("http://192.168.10.118:8888/uc/user/login", { "telPhone": value.mobile, "password": value.password }, this, function (view, res) {
            var data = res.json();
            console.log(data);
            if (data != null) {
                view.storage.ready().then(function () {
                    view.storage.set('user', data);
                    __WEBPACK_IMPORTED_MODULE_6__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo = data;
                });
                view.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]).then(function () {
                    //const index = view.navCtrl.getActive().index;
                    //view.navCtrl.remove(0, index);
                });
            }
            else {
                var toast = view.toastCtrl.create({
                    message: "登录失败",
                    duration: 2000,
                    dismissOnPageChange: true,
                });
                toast.present();
            }
        }, true);
    };
    LoginPage.prototype.onForgetPassword = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__forget_forget__["a" /* ForgetPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content fullscreen>\n  <img class="login_icon" src="assets/png/login_logo.png">\n  <form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)">\n    <div style="margin: 0 30px;">\n      <div class="row">\n        <img class="area" src="assets/png/icon_tel.png">\n        <ion-input no-padding no-margin type="text" placeholder="输入手机号" formControlName="mobile" maxlength="11"></ion-input>\n      </div>\n      <div class="row">\n        <img class="area" src="assets/png/icon_pw.png">\n        <ion-input no-padding no-margin type="password" placeholder="输入密码" formControlName="password" maxlength="12"></ion-input>\n      </div>\n      <!--<input class="login_input" type="text" formControlName="mobile" placeholder="请输入手机号"/>-->\n      <!--<input class="login_input" type="password" formControlName="password" placeholder="请输入密码"/>-->\n      <!--<div style="width: 80%;height: 30px;margin: 30px auto">-->\n        <!--<p style="float: left; margin-left: 10px; color: red">{{errorText}}</p>-->\n        <!--<button ion-button no-padding no-margin clear style="margin-right: 10px; float: right">忘记密码?</button>-->\n      <!--</div>-->\n      <button ion-button block class="login_btn" type="submit">登录</button>\n    </div>\n  </form>\n  <div style="position: fixed;bottom: 20px;width: 100%">\n    <button ion-button no-border no-padding clear class="forget" (click)="onForgetPassword($event)">忘记密码?</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/contact/contact.module": [
		734,
		3
	],
	"../pages/forget/forget.module": [
		736,
		2
	],
	"../pages/login/login.module": [
		737,
		1
	],
	"../pages/newpw/newpw.module": [
		735,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 198;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_singleton__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, appService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
    }
    SearchPage.prototype.ionViewDidLoad = function () {
    };
    SearchPage.prototype.onSearchInput = function (event) {
        // if (this.searchValue.length < 1) {
        //   this.array = [];
        // } else {
        //   this.appService.httpGet("item/searchByContion", {itemName:this.searchValue,page:1,limit:100}, this, function (view, res) {
        //       var response = res.json();
        //       if (response.success == true) {
        //           var data = response.data;
        //           view.array = [];
        //           for (let i=0; i<data.length; i++) {
        //               var one = data[i];
        //               var year = one.startTime.substr(0,4);
        //               var isIn = false;
        //               for (let j=0; j<view.array.length; j++) {
        //                   var d = view.array[j];
        //                   if (d.year == year) {
        //                       isIn = true;
        //                       d.projects.push(one);
        //                       break;
        //                   }
        //               }
        //               if (isIn == false) {
        //                   var dd = {year:year,projects:[one]};
        //                   view.array.push(dd);
        //               }
        //           }
        //       }
        //   },false);
        // }
    };
    SearchPage.prototype.onSearchCancel = function ($event) {
        this.array = [];
    };
    SearchPage.prototype.onClickProject = function ($event, project) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__["b" /* ProjectDetailPage */], {
            project: project,
        });
    };
    SearchPage.prototype.onSearch = function ($event) {
        if (this.searchValue.length < 1) {
            this.array = [];
        }
        else {
            this.appService.httpGet("item/searchByCondition", { itemName: this.searchValue, "empNum": __WEBPACK_IMPORTED_MODULE_4__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username, page: 1, limit: 100 }, this, function (view, res) {
                var response = res.json();
                view.array = [];
                if (response.success == true) {
                    var data = response.data;
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var one = data[i];
                            if (one.itemStartTime == null) {
                                continue;
                            }
                            var startTime = one.itemStartTime;
                            if (typeof (one.itemStartTime) == 'number') {
                                startTime = __WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* AppConfig */].timestampToDatestring(one.itemStartTime);
                            }
                            var year = startTime.substr(0, 4);
                            var isIn = false;
                            for (var j = 0; j < view.array.length; j++) {
                                var d = view.array[j];
                                if (d.year == year) {
                                    isIn = true;
                                    d.projects.push(one);
                                    break;
                                }
                            }
                            if (isIn == false) {
                                var dd = { year: year, projects: [one] };
                                view.array.push(dd);
                            }
                        }
                        if (view.array.length < 1) {
                            var toast = view.toastCtrl.create({
                                message: "没有搜索到相关项目!",
                                duration: 2000,
                                dismissOnPageChange: true,
                            });
                            toast.present();
                        }
                    }
                    else {
                        var toast = view.toastCtrl.create({
                            message: "没有搜索到相关项目!",
                            duration: 2000,
                            dismissOnPageChange: true,
                        });
                        toast.present();
                    }
                }
                else {
                    var toast = view.toastCtrl.create({
                        message: "没有搜索到相关项目!",
                        duration: 2000,
                        dismissOnPageChange: true,
                    });
                    toast.present();
                }
            }, false);
        }
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-search',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/search/search.html"*/'<!--\n  Generated template for the SearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <form (submit)="onSearch($event)">\n      <ion-searchbar placeholder="搜索项目名称" [(ngModel)]=searchValue\n                     [showCancelButton]="false"\n                     (ionInput)="onSearchInput($event)"\n                     (ionCancel)="onSearchCancel($event)"\n                      name="itemName">\n      </ion-searchbar>\n    </form>\n  </ion-navbar>\n  <!--<div class="head" >-->\n    <!--<div class="icon-left" (click)="goBack()">-->\n      <!--<ion-icon name="arrow-back" ></ion-icon>-->\n    <!--</div>-->\n    <!--<div class="searchcotain">-->\n      <!--<div class="searchmain">-->\n        <!--<div class="searchicon"><ion-icon name="search"></ion-icon></div>-->\n        <!--<div class="searchinput"><input type="text" placeholder="搜索"></div>-->\n      <!--</div>-->\n    <!--</div>-->\n    <!--<div class="icon-rightnew">-->\n      <!--<a>搜索</a>-->\n    <!--</div>-->\n  <!--</div>-->\n</ion-header>\n\n<ion-content fullscreen>\n    <div *ngFor="let dic of array">\n      <div style="background-color: #f5f6f7; height: 30px;padding-left: 5px; position:relative;">\n          <ion-label no-padding no-margin class="vertical_center" style="left: 5px; width: 120px">{{dic.year+"年"}}</ion-label>\n      </div>\n      <div style="height: 50px; border-bottom: solid 1px #f5f6f7; position:relative;" *ngFor="let project of dic.projects" (click)="onClickProject($event,project)">\n        <ion-label no-padding no-margin class="vertical_center" style="left: 5px; width: 120px">{{project.itemStartTime | MonthPipe}}</ion-label>\n        <ion-label no-padding no-margin class="vertical_center" style="left: 140px;">{{project.itemName}}</ion-label>\n      </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/search/search.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */]) === "function" && _c || Object])
], SearchPage);

var _a, _b, _c;
//# sourceMappingURL=search.js.map

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AppGlobal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppGlobal = (function () {
    function AppGlobal() {
    }
    return AppGlobal;
}());
//缓存key的配置
AppGlobal.cache = {
    slides: "_dress_slides",
    categories: "_dress_categories",
    products: "_dress_products"
};
//接口基地址
AppGlobal.domain = "http://192.168.72.224:8080/pm/";
//接口地址
AppGlobal.API = {
    getCategories: '/api/ionic3/getCategories',
    getProducts: '/api/ionic3/getProducts',
    getDetails: '/api/ionic3/details'
};
AppGlobal = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])()
], AppGlobal);

var AppService = (function () {
    function AppService(http, loadingCtrl, alertCtrl, toastCtrl) {
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
    }
    // 对参数进行编码
    AppService.prototype.encode = function (params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    };
    AppService.prototype.httpGet = function (url, params, view, callback, loader) {
        // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //     this.toast("网络未连接!");
        // });
        //
        // disconnectSubscription.unsubscribe();
        var _this = this;
        if (loader === void 0) { loader = false; }
        //let connectSubscription = this.network.onConnect().subscribe(() => {
        var loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        console.log("get请求地址=======" + (url.substr(0, 4) == 'http' ? "" : AppGlobal.domain) + url + this.encode(params));
        this.http.get((url.substr(0, 4) == 'http' ? "" : AppGlobal.domain) + url + this.encode(params))
            .toPromise()
            .then(function (res) {
            //var d = res.json();
            if (loader) {
                loading.dismiss();
            }
            //callback(d == null ? "[]" : d);
            callback(view, res);
        })
            .catch(function (error) {
            if (loader) {
                loading.dismiss();
            }
            _this.handleError(error);
        });
        // });
        // connectSubscription.unsubscribe();
    };
    AppService.prototype.httpPost = function (url, params, view, callback, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //     this.toast("网络未连接!");
        // });
        //
        // disconnectSubscription.unsubscribe();
        //
        // let connectSubscription = this.network.onConnect().subscribe(() => {
        var loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        this.http.post((url.substr(0, 4) == 'http' ? "" : AppGlobal.domain) + url, params)
            .toPromise()
            .then(function (res) {
            //var d = res.json();
            if (loader) {
                loading.dismiss();
            }
            //callback(d == null ? "[]" : d);
            callback(view, res);
        }).catch(function (error) {
            if (loader) {
                loading.dismiss();
            }
            _this.handleError(error);
        });
        // });
        // connectSubscription.unsubscribe();
    };
    AppService.prototype.httpDelete = function (url, params, view, callback, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
        // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //     this.toast("网络未连接!");
        // });
        //
        // disconnectSubscription.unsubscribe();
        //
        // let connectSubscription = this.network.onConnect().subscribe(() => {
        var loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        this.http.delete(AppGlobal.domain + url + this.encode(params))
            .toPromise()
            .then(function (res) {
            //var d = res.json();
            if (loader) {
                loading.dismiss();
            }
            //callback(d == null ? "[]" : d);
            callback(view, res);
        }).catch(function (error) {
            if (loader) {
                loading.dismiss();
            }
            _this.handleError(error);
        });
        // });
        // connectSubscription.unsubscribe();
    };
    AppService.prototype.handleError = function (error) {
        var msg = '';
        if (error != null) {
            if (error.status == 400) {
                msg = '请求无效(code：400)';
                console.log(error.json());
                var data1 = error.json();
                if (data1 != null) {
                    if (data1.msg != null) {
                        msg = data1.msg;
                    }
                }
                console.log('请检查参数类型是否匹配');
            }
            else if (error.status == 404) {
                msg = '请求资源不存在(code：404)';
                var data2 = error.json();
                if (data2 != null) {
                    if (data2.msg != null) {
                        msg = data2.msg;
                    }
                }
                console.error(msg + '，请检查路径是否正确');
            }
            else if (error.status == 500) {
                msg = '服务器发生错误(code：500)';
                var data3 = error.json();
                if (data3 != null) {
                    if (data3.msg != null) {
                        msg = data3.msg;
                    }
                }
                console.error(msg + '，请检查路径是否正确');
            }
            else {
                msg = '异常错误';
                console.log(error);
            }
        }
        else {
            msg = '未知错误';
        }
        if (msg != '') {
            this.toast(msg);
        }
    };
    AppService.prototype.alert = function (message, callback) {
        if (callback) {
            var alert_1 = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [{
                        text: "确定",
                        handler: function (data) {
                            callback();
                        }
                    }]
            });
            alert_1.present();
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert_2.present();
        }
    };
    AppService.prototype.toast = function (message, callback) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    };
    AppService.prototype.setItem = function (key, obj) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    AppService.prototype.getItem = function (key, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    return AppService;
}());
AppService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["LoadingController"],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["ToastController"]])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(29);

var AppConfig = (function () {
    function AppConfig() {
    }
    //测试环境URL
    AppConfig.getBaseUrl = function () {
        return "http://192.168.72.224:8080/pm/";
    };
    //获取设备高度
    AppConfig.getWindowHeight = function () {
        return window.screen.height;
    };
    //获取设备宽度
    AppConfig.getWindowWidth = function () {
        return window.screen.width;
    };
    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns {string}
     */
    AppConfig.dateFormat = function (date, sFormat) {
        if (sFormat === void 0) { sFormat = 'yyyy-MM-dd'; }
        var time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();
        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    };
    AppConfig.stringToDate = function (strTime) {
        return new Date(Date.parse(strTime.replace(/-/g, "/")));
    };
    AppConfig.dateToString = function (date) {
        return new __WEBPACK_IMPORTED_MODULE_0__angular_common__["c" /* DatePipe */]('en-US').transform(date, 'yyyy-MM-dd');
    };
    AppConfig.getDayCountInMonth = function (date) {
        var m_days = new Array(31, 28 + AppConfig.is_leap(date.getFullYear()), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        return m_days[date.getMonth()];
    };
    AppConfig.is_leap = function (year) {
        var res;
        return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
    };
    AppConfig.addDate = function (date, days) {
        var d = new Date(date);
        d.setDate(d.getDate() + days);
        var m = d.getMonth() + 1;
        return d.getFullYear() + '-' + m + '-' + d.getDate();
    };
    //时间戳转yyyy-mm-dd
    AppConfig.timestampToDatestring = function (timestamp) {
        var date = new Date(timestamp);
        var y = date.getFullYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    };
    //时间戳转date
    AppConfig.timestampToDate = function (timestamp) {
        return new Date(timestamp);
    };
    AppConfig.isSameDay = function (date1, date2) {
        return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth()
            && date1.getDate() == date2.getDate());
    };
    /**
     * 深拷贝
     */
    AppConfig.deepCopy = function (originObj) {
        return originObj ? JSON.parse(JSON.stringify(originObj)) : null;
    };
    //把字符串里面的数字都提取出来
    AppConfig.getNum = function (text) {
        return text.replace(/[^0-9]/ig, "");
    };
    AppConfig.prototype.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var currentdate = date.getFullYear() + seperator1
            + (month >= 1 && month <= 9) ? "0" : ""
            + month + seperator1
            + (strDate >= 1 && strDate <= 9) ? "0" : "" + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    };
    return AppConfig;
}());

//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppSingleton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_UserInfo__ = __webpack_require__(683);

var AppSingleton = (function () {
    function AppSingleton() {
        if (AppSingleton.instance) {
            throw new Error("错误: 请使用AppGlobal.getInstance() 代替使用new.");
        }
        this.currentUserInfo = new __WEBPACK_IMPORTED_MODULE_0__model_UserInfo__["a" /* UserInfo */]();
        AppSingleton.instance = this;
    }
    /**
     * 获取当前实例
     *
     * @static
     * @returns {AppGlobal}
     */
    AppSingleton.getInstance = function () {
        return AppSingleton.instance;
    };
    return AppSingleton;
}());

AppSingleton.instance = new AppSingleton();
//# sourceMappingURL=app.singleton.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(396);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_share__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__wechat_service__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_component__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_project_create_project_create__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_milestone_detail_milestone_detail__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_project_detail_project_detail__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_subtask_subtask__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_search_search__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_contact_contact__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_forget_forget__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_newpw_newpw__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_components_module__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_ion2_calendar__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ion_multi_picker__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_ion_multi_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_pipes_module__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_login_login__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














//页面类










//组件类



//pipe类



//第三方库
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_forget_forget__["a" /* ForgetPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_newpw_newpw__["a" /* NewpwPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_23__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_26__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */], {
                backButtonText: '',
                backButtonIcon: 'md-arrow-back',
                //mode: 'ios',
                tabsHideOnSubPages: true,
                modalEnter: 'modal-slide-in',
                modalLeave: 'model-slide-out',
                tabsPlacement: 'bottom',
                pageTransition: 'ios-transition' //使用ios页面动画
            }, {
                links: [
                    { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/newpw/newpw.module#NewpwPageModule', name: 'NewpwPage', segment: 'newpw', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/forget/forget.module#ForgetPageModule', name: 'ForgetPage', segment: 'forget', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_24_ion2_calendar__["a" /* CalendarModule */],
            __WEBPACK_IMPORTED_MODULE_25_ion_multi_picker__["MultiPickerModule"],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_13__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_14__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_forget_forget__["a" /* ForgetPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_newpw_newpw__["a" /* NewpwPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_27__app_service__["a" /* AppService */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_network__["a" /* Network */],
            __WEBPACK_IMPORTED_MODULE_8__app_share__["a" /* AppShare */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_11__wechat_service__["a" /* WechatService */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_social_sharing__["a" /* SocialSharing */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ContactPage = ContactPage_1 = (function () {
    function ContactPage(navCtrl, navParams, appService, alertCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.organization = "福建柒牌集团";
        this.arrayDepartment = this.navParams.get('department');
        this.arrayStaff = this.navParams.get('staff');
        this.type = this.navParams.get('type');
        this.arrayHidden = [];
        if (this.arrayDepartment != null) {
            for (var i1 = 0; i1 < this.arrayDepartment.length; i1++) {
                this.arrayHidden.push(false);
            }
        }
        else {
            if (this.arrayStaff != null) {
                for (var i2 = 0; i2 < this.arrayStaff.length; i2++) {
                    this.arrayHidden.push(false);
                }
            }
        }
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        if (typeof (this.arrayDepartment) == 'undefined') {
            this.appService.httpGet("http://192.168.10.118:8888/uc/group/searchAll", {}, this, function (view, res) {
                if (res.status == 200) {
                    var data = res.json();
                    if (data.id == null && data.children.length > 0) {
                        view.arrayDepartment = data.children;
                    }
                }
            }, true);
        }
    };
    ContactPage.prototype.onSearchContact = function ($event) {
        if (this.searchValue.length == 0) {
            for (var i = 0; i < this.arrayHidden.length; i++) {
                this.arrayHidden[i] = false;
            }
        }
        else {
            if (this.arrayDepartment != null) {
                for (var i1 = 0; i1 < this.arrayDepartment.length; i1++) {
                    var text = this.arrayDepartment[i1].text;
                    if (text.indexOf(this.searchValue) > -1) {
                        this.arrayHidden[i1] = false;
                    }
                    else {
                        this.arrayHidden[i1] = true;
                    }
                }
            }
            else {
                if (this.arrayStaff != null) {
                    for (var i2 = 0; i2 < this.arrayStaff.length; i2++) {
                        var text = this.arrayStaff[i2].name;
                        if (text.indexOf(this.searchValue) > -1) {
                            this.arrayHidden[i2] = false;
                        }
                        else {
                            this.arrayHidden[i2] = true;
                        }
                    }
                }
            }
        }
    };
    ContactPage.prototype.onSearchCancel = function ($event) {
        for (var i = 0; i < this.arrayHidden.length; i++) {
            this.arrayHidden[i] = false;
        }
    };
    ContactPage.prototype.goNextDepartment = function ($event, value) {
        if (value.children == null) {
            if (this.arrayStaff != null) {
                if (this.type == 1) {
                    var index1 = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view1 = this.navCtrl.getByIndex(i);
                        if (view1.name == 'ProjectCreatePage') {
                            index1 = i;
                            break;
                        }
                    }
                    if (index1 >= 0) {
                        this.events.publish('onConfirmProjectLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index1)).then(function () {
                        });
                    }
                }
                else if (this.type == 2) {
                    var index2 = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view2 = this.navCtrl.getByIndex(i);
                        if (view2.name == 'MilestoneDetailPage') {
                            index2 = i;
                            break;
                        }
                    }
                    if (index2 >= 0) {
                        this.events.publish('onConfirmMilestoneLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index2)).then(function () {
                        });
                    }
                }
                else if (this.type == 3) {
                    var index3 = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view3 = this.navCtrl.getByIndex(i);
                        if (view3.name == 'SubtaskPage') {
                            index3 = i;
                            break;
                        }
                    }
                    if (index3 >= 0) {
                        this.events.publish('onConfirmSubtaskLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index3)).then(function () {
                        });
                    }
                }
            }
            else {
                this.appService.httpGet("http://192.168.10.118:8888/uc/group/searchUsersByGroupAndKey", { "id": value.id }, this, function (view, res) {
                    if (res.status == 200) {
                        var array = res.json();
                        if (array == null) {
                            var alert = view.alertCtrl.create({
                                title: '错误信息',
                                subTitle: '该组织架构没有成员!',
                                buttons: ['确定']
                            });
                            alert.present();
                        }
                        else {
                            if (array.length > 0) {
                                view.navCtrl.push(ContactPage_1, {
                                    department: null,
                                    staff: array,
                                    callback: view.callback,
                                    type: view.type,
                                });
                            }
                            else {
                                var alert = view.alertCtrl.create({
                                    title: '错误信息',
                                    subTitle: '该组织架构没有成员!',
                                    buttons: ['确定']
                                });
                                alert.present();
                            }
                        }
                    }
                }, true);
            }
        }
        else {
            if (value.children.length > 0) {
                this.navCtrl.push(ContactPage_1, {
                    department: value.children,
                    staff: null,
                    type: this.type,
                });
            }
        }
    };
    return ContactPage;
}());
ContactPage = ContactPage_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contact',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/contact/contact.html"*/'<!--\n  Generated template for the ContactPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>通讯录</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <!--<form (submit)="onSearchContact($event)">-->\n    <ion-searchbar\n            placeholder="输入名字搜索"\n            [(ngModel)]=searchValue\n            (ionInput)="onSearchContact($event)"\n            (ionCancel)="onSearchCancel($event)"\n            name="searchValue">\n    </ion-searchbar>\n  <!--</form>-->\n  <div class="organization">\n    <ion-label no-margin no-padding class="vertical_center text">{{organization}}</ion-label>\n  </div>\n  <ion-item tappable *ngFor="let department of arrayDepartment; let i = index"\n            (click)="goNextDepartment($event, department)"\n            [hidden]="arrayHidden[i]==true">\n    <ion-icon item-start name="appname-tree"></ion-icon>\n    <ion-label no-padding no-margin>{{department.text}}</ion-label>\n    <ion-note item-end>{{department.count+"人"}}</ion-note>\n  </ion-item>\n\n  <ion-item tappable *ngFor="let staff of arrayStaff; let i = index"\n            (click)="goNextDepartment($event, staff)"\n            [hidden]="arrayHidden[i]==true">\n    <ion-icon item-start name="appname-head"></ion-icon>\n    <ion-label no-padding no-margin>{{staff.name}}</ion-label>\n    <ion-note item-end>{{staff.telPhone}}</ion-note>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/contact/contact.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]) === "function" && _e || Object])
], ContactPage);

var ContactPage_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfo; });
var UserInfo = (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

//# sourceMappingURL=UserInfo.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppShare; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppShare = (function () {
    function AppShare(loadingCtrl, platform) {
        this.loadingCtrl = loadingCtrl;
        //标题
        this.title = "柒牌项目管理";
        //描述
        this.description = "柒牌项目管理";
        //分享链接
        this.link = "http://dress.tongedev.cn";
        //分享图片
        this.image = "https://mmbiz.qlogo.cn/mmbiz_png/khImeKLbVF7u5qdXdicpapLl9diadj5db6xHxdlVgxmYPxkYOR8WyVgOw4tn3EHEsvd9hlfu7zEpgVLYkLh28Nibg/0?wx_fmt=png";
        if (platform.is('ios')) {
            this.link = "https://itunes.apple.com/cn/app/女装尖货-单件月销1-8万/id1194942857?mt=8";
        }
        else if (platform.is('android')) {
            this.link = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.tongedev.dress";
        }
        else {
            this.link = "http://dress.tongedev.cn";
        }
    }
    AppShare.prototype.wxShare = function (scene) {
        var loading = this.loadingCtrl.create({ showBackdrop: false });
        loading.present();
        try {
            Wechat.share({
                message: {
                    title: this.title,
                    description: this.description,
                    thumb: this.image,
                    mediaTagName: "TEST-TAG-001",
                    messageExt: "",
                    messageAction: "",
                    media: {
                        type: Wechat.Type.WEBPAGE,
                        webpageUrl: this.link
                    }
                },
                scene: scene == 0 ? Wechat.Scene.SESSION : Wechat.Scene.Timeline // share to Timeline
            }, function () {
                // alert("分享成功！");
            }, function (reason) {
                // alert("Failed: " + reason);
            });
        }
        catch (error) {
            console.log(error);
        }
        finally {
            loading.dismiss();
        }
    };
    AppShare.prototype.qqShare = function (scene) {
        var loading = this.loadingCtrl.create({ showBackdrop: false });
        loading.present();
        try {
            var args = {};
            if (scene == 0) {
                args.scene = QQSDK.Scene.QQ; //QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
            }
            else {
                args.scene = QQSDK.Scene.QQZone;
            }
            args.url = this.link;
            args.title = this.title;
            args.description = this.description;
            args.image = this.image;
            QQSDK.shareNews(function () {
                loading.dismiss();
            }, function (failReason) {
                loading.dismiss();
            }, args);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            loading.dismiss();
        }
    };
    return AppShare;
}());
AppShare = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["Platform"]])
], AppShare);

//# sourceMappingURL=app.share.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WechatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WechatService = (function () {
    function WechatService() {
    }
    WechatService.prototype.share = function (scene, id) {
        if (typeof window.Wechat === "undefined") {
            alert("Wechat plugin is not installed.");
            return false;
        }
        var params = {
            scene: scene
        };
        if (id == 'send-text') {
            params.text = "人文的东西并不是体现在你看得到的方面，它更多的体现在你看不到的那些方面，它会影响每一个功能，这才是最本质的。但是，对这点可能很多人没有思考过，以为人文的东西就是我们搞一个很小清新的图片什么的。”综合来看，人文的东西其实是贯穿整个产品的脉络，或者说是它的灵魂所在。";
        }
        else {
            params.message = {
                title: "[TEST]" + id,
                description: "[TEST]Sending from test application",
                mediaTagName: "TEST-TAG-001",
                messageExt: "这是第三方带的测试字段",
                messageAction: "<action>dotalist</action>",
                media: {}
            };
            switch (id) {
                case 'check-installed':
                    window.Wechat.isInstalled(function (installed) {
                        alert("Wechat installed: " + (installed ? "Yes" : "No"));
                    });
                    return true;
                case 'send-photo-local':
                    params.message.media.type = window.Wechat.Type.IMAGE;
                    params.message.media.image = "www/assets/img/res1.jpg";
                    break;
                case 'send-photo-remote':
                    params.message.media.type = window.Wechat.Type.IMAGE;
                    params.message.media.image = "https://cordova.apache.org/images/cordova_256.png";
                    break;
                case 'send-link-thumb-local':
                    params.message.title = "专访张小龙：产品之上的世界观";
                    params.message.description = "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                    params.message.thumb = "www/assets/img/res2.png";
                    params.message.media.type = window.Wechat.Type.LINK;
                    params.message.media.webpageUrl = "http://tech.qq.com/";
                    break;
                case 'send-link-thumb-remote':
                    params.message.title = "专访张小龙：产品之上的世界观";
                    params.message.description = "微信的平台化发展方向是否真的会让这个原本简洁的产品变得臃肿？在国际化发展方向上，微信面临的问题真的是文化差异壁垒吗？腾讯高级副总裁、微信产品负责人张小龙给出了自己的回复。";
                    params.message.thumb = "https://cordova.apache.org/images/cordova_256.png";
                    params.message.media.type = window.Wechat.Type.LINK;
                    params.message.media.webpageUrl = "http://tech.qq.com/";
                    break;
                case 'send-music':
                    params.message.title = "一无所有";
                    params.message.description = "崔健";
                    params.message.thumb = "www/assets/img/res3.jpg";
                    params.message.media.type = window.Wechat.Type.MUSIC;
                    params.message.media.musicUrl = "http://y.qq.com/i/song.html#p=7B22736F6E675F4E616D65223A22E4B880E697A0E68980E69C89222C22736F6E675F5761704C69766555524C223A22687474703A2F2F74736D7573696334382E74632E71712E636F6D2F586B30305156342F4141414130414141414E5430577532394D7A59344D7A63774D4C6735586A4C517747335A50676F47443864704151526643473444442F4E653765776B617A733D2F31303130333334372E6D34613F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D30222C22736F6E675F5769666955524C223A22687474703A2F2F73747265616D31342E71716D757369632E71712E636F6D2F33303130333334372E6D7033222C226E657454797065223A2277696669222C22736F6E675F416C62756D223A22E4B880E697A0E68980E69C89222C22736F6E675F4944223A3130333334372C22736F6E675F54797065223A312C22736F6E675F53696E676572223A22E5B494E581A5222C22736F6E675F576170446F776E4C6F616455524C223A22687474703A2F2F74736D757369633132382E74632E71712E636F6D2F586C464E4D313574414141416A41414141477A4C36445039536A457A525467304E7A38774E446E752B6473483833344843756B5041576B6D48316C4A434E626F4D34394E4E7A754450444A647A7A45304F513D3D2F33303130333334372E6D70333F7569643D3233343734363930373526616D703B63743D3026616D703B636869643D3026616D703B73747265616D5F706F733D35227D";
                    params.message.media.musicDataUrl = "http://stream20.qqmusic.qq.com/32464723.mp3";
                    break;
                case 'send-video':
                    params.message.title = "乔布斯访谈";
                    params.message.description = "饿着肚皮，傻逼着。";
                    params.message.thumb = "www/assets/img/res7.png";
                    params.message.media.type = window.Wechat.Type.VIDEO;
                    params.message.media.videoUrl = "http://v.youku.com/v_show/id_XNTUxNDY1NDY4.html";
                    break;
                case 'send-app':
                    params.message.title = "App消息";
                    params.message.description = "这种消息只有App自己才能理解，由App指定打开方式！";
                    params.message.thumb = "www/assets/img/res2.jpg";
                    params.message.media.type = window.Wechat.Type.APP;
                    params.message.media.extInfo = "<xml>extend info</xml>";
                    params.message.media.url = "http://weixin.qq.com";
                    break;
                case 'send-nongif':
                    params.message.thumb = "www/assets/img/res5thumb.png";
                    params.message.media.type = window.Wechat.Type.EMOTION;
                    params.message.media.emotion = "www/assets/img/res5.jpg";
                    break;
                case 'send-gif':
                    params.message.thumb = "www/assets/img/res6thumb.png";
                    params.message.media.type = window.Wechat.Type.EMOTION;
                    params.message.media.emotion = "www/assets/img/res6.gif";
                    break;
                case 'send-file':
                    params.message.title = "iphone4.pdf";
                    params.message.description = "Pro CoreData";
                    params.message.thumb = "www/assets/img/res2.jpg";
                    params.message.media.type = window.Wechat.Type.FILE;
                    params.message.media.file = "www/assets/resources/iphone4.pdf";
                    break;
                case 'auth':
                    window.Wechat.auth("snsapi_userinfo", function (response) {
                        // you may use response.code to get the access token.
                        alert(JSON.stringify(response));
                    }, function (reason) {
                        alert("Failed: " + reason);
                    });
                    return true;
                default:
                    alert(id + " can not be recognized!");
                    return false;
            }
        }
        window.Wechat.share(params, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
        return true;
    };
    return WechatService;
}());
WechatService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], WechatService);

//# sourceMappingURL=wechat.service.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { NativeStorage } from "@ionic-native/native-storage";


var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, storage, 
        // public geolocation: Geolocation,
        _config, 
        // public toastCtrl: ToastController,
        // public app: App,
        keyboard) {
        var _this = this;
        this.storage = storage;
        this._config = _config;
        this.keyboard = keyboard;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //(<any>window).navigator.splashscreen.hide();
        });
        this.keyboard.hideKeyboardAccessoryBar(false);
        this.keyboard.disableScroll(true); //当输入焦点时，防止本机UIScrollView移动。
        this.storage.get('user').then(function (val) {
            if (val != null) {
                if (val.username != null) {
                    __WEBPACK_IMPORTED_MODULE_8__app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo = val;
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
                }
                else {
                    _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                }
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
            }
        });
        // if (platform.is('ios')) {
        //   this.config = {
        //     'backButtonIcon': 'arrow-back',
        //     'iconMode': 'ios',
        //     'tabsPlacement': 'bottom',
        //     'backButtonText': '',
        //     'tabsHideOnSubPages': 'true'
        //   };
        // } else if (platform.is('windows')) {
        //   this.config = {
        //     'backButtonIcon': 'arrow-back',
        //     'iconMode': 'ios',
        //     'tabsPlacement': 'top',
        //     'backButtonText': '',
        //     'tabsHideOnSubPages': 'true'
        //   };
        // } else {
        //   this.config = {
        //     'backButtonIcon': 'arrow-back',
        //     'iconMode': 'md',
        //     'tabsPlacement': 'bottom',
        //     'backButtonText': '',
        //     'tabsHideOnSubPages': 'true'
        //   };
        // }
        // this._config.set('tabsPlacement', this.config.tabsPlacement);
        // this._config.set('iconMode', this.config.iconMode);
        // this._config.set('backButtonIcon', this.config.backButtonIcon);
        // this._config.set('backButtonText', this.config.backButtonText);
        // this._config.set('tabsHideOnSubPages', this.config.tabsHideOnSubPages);
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Config"],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_test__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__ = __webpack_require__(714);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ComponentsModule = ComponentsModule_1 = (function () {
    function ComponentsModule() {
    }
    return ComponentsModule;
}());
ComponentsModule = ComponentsModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__test_test__["a" /* TestComponent */],
            __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__["a" /* CalendarComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(ComponentsModule_1),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__test_test__["a" /* TestComponent */],
            __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__["a" /* CalendarComponent */]
        ]
    })
], ComponentsModule);

var ComponentsModule_1;
//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 713:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the TestComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var TestComponent = (function () {
    function TestComponent() {
        console.log('Hello TestComponent Component');
        this.text = 'Hello World';
    }
    return TestComponent;
}());
TestComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'test',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/test/test.html"*/'<!-- Generated template for the TestComponent component -->\n<div>\n  {{text}}\n</div>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/test/test.html"*/
    }),
    __metadata("design:paramtypes", [])
], TestComponent);

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 714:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_singleton__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






// import { CalendarModal, CalendarModalOptions } from "ion2-calendar";
/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var CalendarComponent = (function () {
    function CalendarComponent(datePipe, appService, modalCtrl, events) {
        this.datePipe = datePipe;
        this.appService = appService;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.currentDate = new Date();
        this.events_calendar = [];
        this.disablePastDates = false;
        this.weekDaysToDisable = [];
        this.daysToDisable = [];
        this.useSwipe = false;
        this.showEventsList = false;
        this.showTodayButton = false;
        this.todayText = "转到今天";
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onChangeMonth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onEventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.weekDays = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        this.pastDates = [];
        this.rows = [];
        this.dayHasProject = [];
        this.stop = false;
        this.todayEvents = [];
        //this.setUpWeekDaysLabels();
        this.currentMonth = "2017-10";
    }
    CalendarComponent.prototype.setUpWeekDaysLabels = function () {
        var date = new Date(2017, 0, 1); /* This date has to be a Sunday */
        for (var i = 0; i < 7; i++, date.setDate(date.getDate() + 1)) {
            var str = this.datePipe.transform(date, "EEE");
            str = str[0].toUpperCase() + str.slice(1);
            this.weekDays.push(str);
        }
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
        /* But only if the month is changed */
        if (changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
            if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth()) {
                this.calc();
            }
        }
        if (changes["events_calendar"] && !changes["events_calendar"].isFirstChange()) {
            var listToRemoveClasses = document.getElementsByClassName("hasEvents");
            var n = listToRemoveClasses.length;
            for (var i = 0; i < n; i++)
                if (listToRemoveClasses[0])
                    listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */
            this.setHasEventsClass();
            this.showTodayEvents();
        }
    };
    CalendarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        /* Calls `this.calc()` after receiving an initial date */
        this.currentDate.setHours(0, 0, 0, 0);
        this.events.subscribe('onGetProjectDate', function () {
            _this.getProjectDate();
        });
        setTimeout(function () {
            _this.calc();
            _this.updateSelectedDate();
        });
    };
    CalendarComponent.prototype.ngOnDestroy = function () {
        this.events.unsubscribe('onGetProjectDate');
    };
    CalendarComponent.prototype.setHasEventsClass = function () {
        var firstDayOfTheMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        var lastDayOfTheMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        if (this.events_calendar)
            this.events_calendar.forEach(function (item, index) {
                if (item.starts.getTime() >= firstDayOfTheMonth.getTime() && item.ends.getTime() < lastDayOfTheMonth.getTime()) {
                    if (document.getElementById("calendar-day-" + item.starts.getDate()))
                        document.getElementById("calendar-day-" + item.starts.getDate()).classList.add('hasEvents');
                }
            });
    };
    CalendarComponent.prototype.setTodayClass = function () {
        /* Checks if the selected month and year are the current */
        var tmp = new Date();
        if (tmp.getFullYear() == this.currentDate.getFullYear() && tmp.getMonth() == this.currentDate.getMonth()) {
            var element = document.getElementById("calendar-day-" + tmp.getDate());
            if (element) {
                element.classList.remove("button-clear", "button-clear-md");
                element.classList.add("button-outline", "button-outline-md");
                element.setAttribute("style", "border: solid 1px #ececec");
            }
        }
    };
    CalendarComponent.prototype.setSelectedClass = function () {
        /* Removes previous selectedDate class */
        var listToRemoveClasses1 = document.getElementsByClassName("selected");
        var n1 = listToRemoveClasses1.length;
        for (var i = 0; i < n1; i++)
            listToRemoveClasses1[0].classList.remove("selected"); /* Using index zero because the object is updated after we remove an item */
        var listToRemoveClasses2 = document.getElementsByClassName("no-selected-dot");
        var n2 = listToRemoveClasses2.length;
        for (var i = 0; i < n2; i++)
            listToRemoveClasses2[0].classList.remove("no-selected-dot");
        var listToRemoveClasses3 = document.getElementsByClassName("selected-dot");
        var n3 = listToRemoveClasses3.length;
        for (var i = 0; i < n3; i++)
            listToRemoveClasses3[0].classList.remove("selected-dot");
        var element = document.getElementById("calendar-day-" + this.currentDate.getDate());
        if (element)
            element.classList.add("selected");
        var dateString = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].dateToString(this.currentDate);
        for (var i = 0; i < this.dayHasProject.length; i++) {
            var object = this.dayHasProject[i];
            var itemStartTime = "1970-01-01";
            if (typeof (object.itemStartTime) == 'string') {
                itemStartTime = object.itemStartTime;
            }
            else if (typeof (object.itemStartTime) == 'number') {
                itemStartTime = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].timestampToDatestring(object.itemStartTime);
            }
            var day = "01";
            if (itemStartTime != null) {
                day = itemStartTime.substr(itemStartTime.length - 2, 2);
            }
            var dot = document.getElementById("dot-" + parseInt(day));
            if (dot != null) {
                if (itemStartTime == dateString) {
                    dot.classList.add("selected-dot");
                }
                else {
                    dot.classList.add("no-selected-dot");
                }
            }
        }
    };
    CalendarComponent.prototype.setToday = function () {
        var tmp = new Date();
        tmp.setHours(0, 0, 0, 0);
        var calc = tmp.getMonth() + "" + tmp.getFullYear() != this.currentDate.getMonth() + "" + this.currentDate.getFullYear();
        this.updateSelectedDate(tmp);
        calc && this.calc();
    };
    /**
     * Recalculates the rows and columns needed to represent the new month selected
     */
    CalendarComponent.prototype.calc = function () {
        var _this = this;
        /* Resets the rows */
        this.rows = [];
        var tmp = new Date(this.currentDate.getTime());
        tmp.setDate(1);
        var myDay = -1;
        while (tmp.getMonth() == this.currentDate.getMonth()) {
            /* Pushes a new empty row */
            this.rows.push(['', '', '', '', '', '', '']);
            myDay = (tmp.getDay() - 1) < 0 ? 6 : tmp.getDay() - 1;
            while (myDay < 6 && tmp.getMonth() == this.currentDate.getMonth()) {
                /* Populates the row only where needed */
                this.rows[this.rows.length - 1][myDay] = tmp.getDate();
                tmp.setDate(tmp.getDate() + 1);
                myDay = (tmp.getDay() - 1) < 0 ? 6 : tmp.getDay() - 1;
            }
            if (tmp.getMonth() == this.currentDate.getMonth()) {
                this.rows[this.rows.length - 1][(tmp.getDay() - 1) < 0 ? 6 : tmp.getDay() - 1] = tmp.getDate();
                myDay = (tmp.getDay() - 1) < 0 ? 6 : tmp.getDay() - 1;
            }
            tmp.setDate(tmp.getDate() + 1);
        }
        setTimeout(function () {
            /* Needs to be executed only after the DOM has been updated */
            _this.setHasEventsClass();
            _this.setTodayClass();
            _this.disableDates();
            _this.getProjectDate();
        });
    };
    CalendarComponent.prototype.disableDates = function () {
        // Disabling past dates
        if (this.disablePastDates) {
            this.pastDates = [];
            var today = new Date();
            // Checks if the current month is being shown
            if (today.getFullYear() == this.currentDate.getFullYear() && today.getMonth() == this.currentDate.getMonth()) {
                // If current month is being shown, disable only the past days
                for (var i = 1; i < today.getDate(); i++) {
                    this.pastDates.push(i);
                }
            }
            else if (this.currentDate.getTime() < today.getTime()) {
                // If a previous month is being show (disable all days)
                for (var i = 1; i <= 31; i++) {
                    this.pastDates.push(i);
                }
            }
        }
        // Disable chosen week days
        if (this.weekDaysToDisable.length) {
        }
    };
    CalendarComponent.prototype.getProjectDate = function () {
        var dateString = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].dateToString(this.currentDate);
        var dayCount = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].getDayCountInMonth(this.currentDate);
        var firstDate = new Date(this.currentDate.getTime());
        firstDate.setDate(1);
        var firstDateString = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].dateToString(firstDate);
        var lastDate = new Date(this.currentDate.getTime());
        lastDate.setDate(dayCount);
        var lastDateString = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].dateToString(lastDate);
        var listToRemoveClasses1 = document.getElementsByClassName("no-selected-dot");
        var n1 = listToRemoveClasses1.length;
        for (var i = 0; i < n1; i++)
            listToRemoveClasses1[0].classList.remove("no-selected-dot");
        var listToRemoveClasses2 = document.getElementsByClassName("selected-dot");
        var n2 = listToRemoveClasses2.length;
        for (var i = 0; i < n2; i++)
            listToRemoveClasses2[0].classList.remove("selected-dot");
        for (var i = 1; i <= dayCount; i++) {
            var dot = document.getElementById("dot-" + i);
            if (dot != null) {
                dot.style.display = "none";
            }
        }
        this.appService.httpGet("item/searchByCondition", { "itemStartTime": firstDateString, "endTime": lastDateString, "empNum": __WEBPACK_IMPORTED_MODULE_5__app_app_singleton__["a" /* AppSingleton */].getInstance().currentUserInfo.username, "page": "1", "limit": "100" }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.dayHasProject = data.data;
                view.onChangeMonth.emit(view.dayHasProject);
                for (var i = 0; i < view.dayHasProject.length; i++) {
                    var object = view.dayHasProject[i];
                    var itemStartTime = "1970-01-01";
                    if (typeof (object.itemStartTime) == 'string') {
                        itemStartTime = object.itemStartTime;
                    }
                    else if (typeof (object.itemStartTime) == 'number') {
                        itemStartTime = __WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].timestampToDatestring(object.itemStartTime);
                    }
                    var day = "01";
                    if (itemStartTime != null) {
                        day = itemStartTime.substr(itemStartTime.length - 2, 2);
                    }
                    var dot = document.getElementById("dot-" + parseInt(day));
                    if (dot != null) {
                        dot.style.display = "block";
                        if (itemStartTime == dateString) {
                            dot.classList.add("selected-dot");
                        }
                        else {
                            dot.classList.add("no-selected-dot");
                        }
                    }
                }
            }
        }, false);
    };
    /**
     * Subtracts a month on currentDate
     */
    CalendarComponent.prototype.previousMonth = function () {
        var tmp = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate());
        /* Prevents skipping a month if the previous month doesn't have the selected day */
        /* Ex: Mar 31st -> Feb 28th (because Feb doesn't have a 31st) */
        while (tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
            tmp.setDate(tmp.getDate() - 1);
        }
        this.updateSelectedDate(tmp);
        this.calc();
    };
    /**
     * Adds a month on currentDate
     */
    CalendarComponent.prototype.nextMonth = function () {
        var tmp = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate());
        /* Prevents skipping a month if the next month doesn't have the selected day */
        /* Ex: Jan 31st -> Feb 28th (because Feb doesn't have a 31st) */
        while (tmp.getMonth() > this.currentDate.getMonth() + 1) {
            tmp.setDate(tmp.getDate() - 1);
        }
        this.updateSelectedDate(tmp);
        this.calc();
    };
    CalendarComponent.prototype.onSelectMonth = function (month) {
        var date = month + "-01 00:00:00";
        this.updateSelectedDate(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* AppConfig */].stringToDate(date));
        this.calc();
    };
    /**
     * Function fired when a date is clicked
     * (no need to call this.calc() because the user can't click a date on a different month)
     * @param day number The day that was clicked
     */
    CalendarComponent.prototype.dateClicked = function (day) {
        var clickedDate = new Date(this.currentDate);
        clickedDate.setDate(day);
        this.updateSelectedDate(clickedDate);
    };
    CalendarComponent.prototype.updateSelectedDate = function (newDate) {
        var _this = this;
        if (newDate === void 0) { newDate = null; }
        if (newDate) {
            this.currentDate = newDate;
        }
        this.onChange.emit(this.currentDate);
        setTimeout(function () {
            _this.showTodayEvents();
            _this.setSelectedClass();
        });
    };
    CalendarComponent.prototype.showTodayEvents = function () {
        var _this = this;
        var tmp = [];
        /* Checks for events on the new selected date */
        this.events_calendar.forEach(function (item) {
            var itemDay = new Date(item.starts);
            itemDay.setHours(0, 0, 0, 0);
            if (itemDay.getTime() == _this.currentDate.getTime())
                tmp.push(item);
        });
        this.todayEvents = tmp;
    };
    CalendarComponent.prototype.eventClicked = function (event) {
        this.onEventClicked.emit(event);
    };
    CalendarComponent.prototype.openCalendar = function ($event) {
    };
    return CalendarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('inputDate'),
    __metadata("design:type", Date)
], CalendarComponent.prototype, "currentDate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "events_calendar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "disablePastDates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CalendarComponent.prototype, "weekDaysToDisable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CalendarComponent.prototype, "daysToDisable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "useSwipe", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "showEventsList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "showTodayButton", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], CalendarComponent.prototype, "todayText", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CalendarComponent.prototype, "onChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CalendarComponent.prototype, "onChangeMonth", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
], CalendarComponent.prototype, "onEventClicked", void 0);
CalendarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'calendar',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/calendar/calendar.html"*/'<!-- Generated template for the CalendarComponent component -->\n<div>\n  <ion-grid no-padding no-margin>\n    <ion-row class="calendar-controls" no-padding no-margin>\n      <ion-col no-padding no-margin text-right class="titleCol">\n        <button ion-button icon-only clear (click)="previousMonth()">\n          <ion-icon name="arrow-back"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col no-margin no-padding text-center class="selectedDateLabel" (click)="openCalendar($event)">\n        <h5 no-padding no-margin class="selectedMonthLabel">{{ currentDate | date:\'yyyy-MM\' }}\n            <ion-datetime class="selectedDatetime"\n                          displayFormat="YYYY年MM月" pickerFormat="YYYY MMMM" max="2030" min="2015"\n                          cancelText="取消" doneText="确认"\n                          monthNames="1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"\n                          monthShortNames="1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12"\n                          ngModel="{{currentMonth}}"\n                          (ngModelChange)=onSelectMonth($event)></ion-datetime>\n        </h5>\n\n      </ion-col>\n      <ion-col no-padding no-margin text-left class="titleCol">\n        <button ion-button icon-only clear (click)="nextMonth()">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class="calendar-weekDays">\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[0] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[1] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[2] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[3] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[4] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[5] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[6] }}\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid (swipeleft)="useSwipe && nextMonth()" (swiperight)="useSwipe && previousMonth()">\n    <ion-row *ngFor="let row of rows" class="calendar-row">\n      <ion-col no-padding *ngFor="let day of row; let i = index" text-center class="calendar-col">\n        <button no-padding block class="calendar-day" *ngIf="day" ion-button clear (click)="dateClicked(day)"\n                id="calendar-day-{{day}}" [disabled]="pastDates.indexOf(day) > -1 || weekDaysToDisable.indexOf(i) > -1 || daysToDisable.indexOf(day) > -1">\n          {{ day }}\n          <div class="dot" id="dot-{{day}}"></div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--<ion-list *ngIf="showEventsList">-->\n    <!--<button text-wrap ion-item *ngFor="let event of todayEvents" (click)="eventClicked(event)">-->\n      <!--{{ event.title }}-->\n      <!--<ion-icon name="arrow-forward" hideWhen="ios" item-right></ion-icon>-->\n    <!--</button>-->\n  <!--</ion-list>-->\n</div>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/calendar/calendar.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Events"]])
], CalendarComponent);

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 270,
	"./af.js": 270,
	"./ar": 271,
	"./ar-dz": 272,
	"./ar-dz.js": 272,
	"./ar-kw": 273,
	"./ar-kw.js": 273,
	"./ar-ly": 274,
	"./ar-ly.js": 274,
	"./ar-ma": 275,
	"./ar-ma.js": 275,
	"./ar-sa": 276,
	"./ar-sa.js": 276,
	"./ar-tn": 277,
	"./ar-tn.js": 277,
	"./ar.js": 271,
	"./az": 278,
	"./az.js": 278,
	"./be": 279,
	"./be.js": 279,
	"./bg": 280,
	"./bg.js": 280,
	"./bn": 281,
	"./bn.js": 281,
	"./bo": 282,
	"./bo.js": 282,
	"./br": 283,
	"./br.js": 283,
	"./bs": 284,
	"./bs.js": 284,
	"./ca": 285,
	"./ca.js": 285,
	"./cs": 286,
	"./cs.js": 286,
	"./cv": 287,
	"./cv.js": 287,
	"./cy": 288,
	"./cy.js": 288,
	"./da": 289,
	"./da.js": 289,
	"./de": 290,
	"./de-at": 291,
	"./de-at.js": 291,
	"./de-ch": 292,
	"./de-ch.js": 292,
	"./de.js": 290,
	"./dv": 293,
	"./dv.js": 293,
	"./el": 294,
	"./el.js": 294,
	"./en-au": 295,
	"./en-au.js": 295,
	"./en-ca": 296,
	"./en-ca.js": 296,
	"./en-gb": 297,
	"./en-gb.js": 297,
	"./en-ie": 298,
	"./en-ie.js": 298,
	"./en-nz": 299,
	"./en-nz.js": 299,
	"./eo": 300,
	"./eo.js": 300,
	"./es": 301,
	"./es-do": 302,
	"./es-do.js": 302,
	"./es.js": 301,
	"./et": 303,
	"./et.js": 303,
	"./eu": 304,
	"./eu.js": 304,
	"./fa": 305,
	"./fa.js": 305,
	"./fi": 306,
	"./fi.js": 306,
	"./fo": 307,
	"./fo.js": 307,
	"./fr": 308,
	"./fr-ca": 309,
	"./fr-ca.js": 309,
	"./fr-ch": 310,
	"./fr-ch.js": 310,
	"./fr.js": 308,
	"./fy": 311,
	"./fy.js": 311,
	"./gd": 312,
	"./gd.js": 312,
	"./gl": 313,
	"./gl.js": 313,
	"./gom-latn": 314,
	"./gom-latn.js": 314,
	"./he": 315,
	"./he.js": 315,
	"./hi": 316,
	"./hi.js": 316,
	"./hr": 317,
	"./hr.js": 317,
	"./hu": 318,
	"./hu.js": 318,
	"./hy-am": 319,
	"./hy-am.js": 319,
	"./id": 320,
	"./id.js": 320,
	"./is": 321,
	"./is.js": 321,
	"./it": 322,
	"./it.js": 322,
	"./ja": 323,
	"./ja.js": 323,
	"./jv": 324,
	"./jv.js": 324,
	"./ka": 325,
	"./ka.js": 325,
	"./kk": 326,
	"./kk.js": 326,
	"./km": 327,
	"./km.js": 327,
	"./kn": 328,
	"./kn.js": 328,
	"./ko": 329,
	"./ko.js": 329,
	"./ky": 330,
	"./ky.js": 330,
	"./lb": 331,
	"./lb.js": 331,
	"./lo": 332,
	"./lo.js": 332,
	"./lt": 333,
	"./lt.js": 333,
	"./lv": 334,
	"./lv.js": 334,
	"./me": 335,
	"./me.js": 335,
	"./mi": 336,
	"./mi.js": 336,
	"./mk": 337,
	"./mk.js": 337,
	"./ml": 338,
	"./ml.js": 338,
	"./mr": 339,
	"./mr.js": 339,
	"./ms": 340,
	"./ms-my": 341,
	"./ms-my.js": 341,
	"./ms.js": 340,
	"./my": 342,
	"./my.js": 342,
	"./nb": 343,
	"./nb.js": 343,
	"./ne": 344,
	"./ne.js": 344,
	"./nl": 345,
	"./nl-be": 346,
	"./nl-be.js": 346,
	"./nl.js": 345,
	"./nn": 347,
	"./nn.js": 347,
	"./pa-in": 348,
	"./pa-in.js": 348,
	"./pl": 349,
	"./pl.js": 349,
	"./pt": 350,
	"./pt-br": 351,
	"./pt-br.js": 351,
	"./pt.js": 350,
	"./ro": 352,
	"./ro.js": 352,
	"./ru": 353,
	"./ru.js": 353,
	"./sd": 354,
	"./sd.js": 354,
	"./se": 355,
	"./se.js": 355,
	"./si": 356,
	"./si.js": 356,
	"./sk": 357,
	"./sk.js": 357,
	"./sl": 358,
	"./sl.js": 358,
	"./sq": 359,
	"./sq.js": 359,
	"./sr": 360,
	"./sr-cyrl": 361,
	"./sr-cyrl.js": 361,
	"./sr.js": 360,
	"./ss": 362,
	"./ss.js": 362,
	"./sv": 363,
	"./sv.js": 363,
	"./sw": 364,
	"./sw.js": 364,
	"./ta": 365,
	"./ta.js": 365,
	"./te": 366,
	"./te.js": 366,
	"./tet": 367,
	"./tet.js": 367,
	"./th": 368,
	"./th.js": 368,
	"./tl-ph": 369,
	"./tl-ph.js": 369,
	"./tlh": 370,
	"./tlh.js": 370,
	"./tr": 371,
	"./tr.js": 371,
	"./tzl": 372,
	"./tzl.js": 372,
	"./tzm": 373,
	"./tzm-latn": 374,
	"./tzm-latn.js": 374,
	"./tzm.js": 373,
	"./uk": 375,
	"./uk.js": 375,
	"./ur": 376,
	"./ur.js": 376,
	"./uz": 377,
	"./uz-latn": 378,
	"./uz-latn.js": 378,
	"./uz.js": 377,
	"./vi": 379,
	"./vi.js": 379,
	"./x-pseudo": 380,
	"./x-pseudo.js": 380,
	"./yo": 381,
	"./yo.js": 381,
	"./zh-cn": 382,
	"./zh-cn.js": 382,
	"./zh-hk": 383,
	"./zh-hk.js": 383,
	"./zh-tw": 384,
	"./zh-tw.js": 384
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 718;

/***/ }),

/***/ 725:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipes_delay_delay__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_year_year__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_month_month__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__day_day__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weekay_weekay__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__year_and_month_year_and_month__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stamp_to_date_stamp_to_date__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemlevel_itemlevel__ = __webpack_require__(733);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var PipesModule = (function () {
    function PipesModule() {
    }
    return PipesModule;
}());
PipesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__pipes_delay_delay__["a" /* DelayPipe */],
            __WEBPACK_IMPORTED_MODULE_2__pipes_year_year__["a" /* YearPipe */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_month_month__["a" /* MonthPipe */],
            __WEBPACK_IMPORTED_MODULE_4__day_day__["a" /* DayPipe */],
            __WEBPACK_IMPORTED_MODULE_5__weekay_weekay__["a" /* WeekayPipe */],
            __WEBPACK_IMPORTED_MODULE_6__year_and_month_year_and_month__["a" /* YearAndMonthPipe */],
            __WEBPACK_IMPORTED_MODULE_7__stamp_to_date_stamp_to_date__["a" /* StampToDatePipe */],
            __WEBPACK_IMPORTED_MODULE_8__itemlevel_itemlevel__["a" /* ItemlevelPipe */],
        ],
        imports: [],
        exports: [
            __WEBPACK_IMPORTED_MODULE_1__pipes_delay_delay__["a" /* DelayPipe */],
            __WEBPACK_IMPORTED_MODULE_2__pipes_year_year__["a" /* YearPipe */],
            __WEBPACK_IMPORTED_MODULE_3__pipes_month_month__["a" /* MonthPipe */],
            __WEBPACK_IMPORTED_MODULE_4__day_day__["a" /* DayPipe */],
            __WEBPACK_IMPORTED_MODULE_5__weekay_weekay__["a" /* WeekayPipe */],
            __WEBPACK_IMPORTED_MODULE_6__year_and_month_year_and_month__["a" /* YearAndMonthPipe */],
            __WEBPACK_IMPORTED_MODULE_7__stamp_to_date_stamp_to_date__["a" /* StampToDatePipe */],
            __WEBPACK_IMPORTED_MODULE_8__itemlevel_itemlevel__["a" /* ItemlevelPipe */],
        ]
    })
], PipesModule);

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DelayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the DelayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var DelayPipe = (function () {
    function DelayPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    DelayPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var j;
        if (typeof (value) == "string") {
            j = parseInt(value);
        }
        else {
            j = value;
        }
        if (j < 1) {
            return '无延迟';
        }
        else {
            return '延迟' + j + '天';
        }
    };
    return DelayPipe;
}());
DelayPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'delayPipe',
    })
], DelayPipe);

//# sourceMappingURL=delay.js.map

/***/ }),

/***/ 727:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the YearPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var YearPipe = (function () {
    function YearPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    YearPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof (value) != "string") {
            if (typeof (value) == "number") {
                if (__WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).length < 10) {
                    return "未知日期";
                }
                else {
                    return __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).substr(0, 4);
                }
            }
            else {
                return "未知日期";
            }
        }
        if (value == null || value.length < 4) {
            return "未知日期";
        }
        return value.substr(0, 4);
    };
    return YearPipe;
}());
YearPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'YearPipe',
    })
], YearPipe);

//# sourceMappingURL=year.js.map

/***/ }),

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the MonthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var MonthPipe = (function () {
    function MonthPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    MonthPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof (value) != "string") {
            if (typeof (value) == "number") {
                if (__WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).length < 10) {
                    return "未知日期";
                }
                else {
                    return __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).substr(5, 5);
                }
            }
            else {
                return "未知日期";
            }
        }
        if (value == null || value.length < 10) {
            return "未知日期";
        }
        return value.substr(5, 5);
    };
    return MonthPipe;
}());
MonthPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'MonthPipe',
    })
], MonthPipe);

//# sourceMappingURL=month.js.map

/***/ }),

/***/ 729:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the DayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var DayPipe = (function () {
    function DayPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    DayPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof (value) != "string") {
            if (typeof (value) == "number") {
                if (__WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).length < 10) {
                    return "未知日期";
                }
                else {
                    return __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value).substr(8, 2);
                }
            }
            else {
                return "未知日期";
            }
        }
        if (value == null) {
            return "未知日期";
        }
        if (value.length < 10) {
            return "未知日期";
        }
        return value.substr(8, 2);
    };
    return DayPipe;
}());
DayPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'DayPipe',
    })
], DayPipe);

//# sourceMappingURL=day.js.map

/***/ }),

/***/ 730:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeekayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the WeekayPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var WeekayPipe = (function () {
    function WeekayPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    WeekayPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof (value) == 'number') {
            var dateString = "";
            dateString = __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value);
            var date1 = new Date(dateString.replace(/-/g, "/"));
            switch (date1.getDay()) {
                case 1:
                    return '周一';
                case 2:
                    return '周二';
                case 3:
                    return '周三';
                case 4:
                    return '周四';
                case 5:
                    return '周五';
                case 6:
                    return '周六';
                case 7:
                    return '周天';
                default:
                    return '未知';
            }
        }
        else {
            if (typeof (value) == 'string') {
                var date2 = new Date(value.replace(/-/g, "/"));
                switch (date2.getDay()) {
                    case 1:
                        return '周一';
                    case 2:
                        return '周二';
                    case 3:
                        return '周三';
                    case 4:
                        return '周四';
                    case 5:
                        return '周五';
                    case 6:
                        return '周六';
                    case 7:
                        return '周天';
                    default:
                        return '未知';
                }
            }
            else {
                return '未知';
            }
        }
    };
    return WeekayPipe;
}());
WeekayPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'WeekayPipe',
    })
], WeekayPipe);

//# sourceMappingURL=weekay.js.map

/***/ }),

/***/ 731:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearAndMonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the YearAndMonthPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var YearAndMonthPipe = (function () {
    function YearAndMonthPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    YearAndMonthPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (value == null || value.length < 7) {
            return "未知日期";
        }
        if (value instanceof Date) {
            return __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].dateToString(value).substr(0, 7);
        }
        return value.substr(0, 7);
    };
    return YearAndMonthPipe;
}());
YearAndMonthPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'YearAndMonthPipe',
    })
], YearAndMonthPipe);

//# sourceMappingURL=year-and-month.js.map

/***/ }),

/***/ 732:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StampToDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the StampToDatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var StampToDatePipe = (function () {
    function StampToDatePipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    StampToDatePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var timeStamp = "";
        if (typeof (value) == "number") {
            timeStamp = __WEBPACK_IMPORTED_MODULE_1__app_app_config__["a" /* AppConfig */].timestampToDatestring(value);
        }
        else {
            timeStamp = value;
        }
        return timeStamp;
    };
    return StampToDatePipe;
}());
StampToDatePipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'stampToDate',
    })
], StampToDatePipe);

//# sourceMappingURL=stamp-to-date.js.map

/***/ }),

/***/ 733:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemlevelPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the ItemlevelPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
var ItemlevelPipe = (function () {
    function ItemlevelPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ItemlevelPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (parseInt(value)) {
            case 1:
                return "一级";
            case 2:
                return "二级";
            case 3:
                return "三级";
            case 4:
                return "四级";
            default:
                return "未知级别";
        }
    };
    return ItemlevelPipe;
}());
ItemlevelPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'itemlevelPipe',
    })
], ItemlevelPipe);

//# sourceMappingURL=itemlevel.js.map

/***/ })

},[391]);
//# sourceMappingURL=main.js.map