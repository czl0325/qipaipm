webpackJsonp([4],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(27);
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
    function ProjectCreatePage(navCtrl, navParams, appService, toastCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.project = {
            id: '',
            itemName: '',
            itemFounder: '陈昭良',
            founderEmpNum: '003169',
            leader: '',
            itemLeaderEmpNum: '',
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
            itemRaise: '',
            itemRevision: '',
            itemDept: '',
            itemState: '',
            itemCode: '',
            itemWeight: '',
            itemProgress: '',
            itemIsEnd: false,
        };
        this.milestoneCallback = function (milestone) {
            return new Promise(function (resolve, reject) {
                if (typeof (milestone) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.project.children.length; i++) {
                        var tempMile = _this.project.children[i];
                        if (tempMile.id == milestone.id) {
                            isIn = true;
                            _this.project.children.splice(i, 1, milestone);
                            break;
                        }
                    }
                    if (!isIn) {
                        _this.addOneMilestone(milestone);
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
            _this.project.leader = leader.name;
            _this.project.itemLeaderEmpNum = leader.username;
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
            milestoneName: '里程碑' + (this.project.children.length + 1),
            leader: '',
            leaderEmpNum: '',
            // milestoneDelivery : '',
            deliveryResult: '',
            itemProgress: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            planTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            remark: '',
            isAccomplish: false,
            delayDays: 0,
            children: [],
        };
        // this.project.children.push(milestone);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            milestone: milestone,
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
            this.appService.httpDelete("item/delete", { "ids": mile.id }, this, function (view, res) {
                if (res.status == 200) {
                    view.deleteOneMile(mile);
                }
            }, true);
        }
    };
    ProjectCreatePage.prototype.deleteOneMile = function (mile) {
        var deleteId = mile.id;
        var index = -1;
        for (var i = 0; i < this.project.children.length; i++) {
            var milestone1 = this.project.children[i];
            if (deleteId == milestone1.id) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            this.project.children.splice(index, 1);
            for (var i = 0; i < this.project.children.length; i++) {
                var milestone2 = this.project.children[i];
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
        if (this.project.children.length == 0) {
            this.project.children.push(milestone);
            if (this.isExpand != null) {
                this.isExpand.push(false);
            }
        }
        else if (this.project.children.length == 1) {
            var p1 = this.project.children[0];
            var d1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(p1.deliveryTime);
            var d2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
            if (d1 <= d2) {
                this.project.children.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            }
            else {
                this.project.children.splice(0, 0, milestone);
                if (this.isExpand != null) {
                    this.isExpand.splice(0, 0, false);
                }
            }
        }
        else {
            var isInsert = false;
            for (var i = 0; i < this.project.children.length - 1; i++) {
                var pp1 = this.project.children[i];
                var pp2 = this.project.children[i + 1];
                var dd1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp1.deliveryTime);
                var dd2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp2.deliveryTime);
                var dd3 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
                if (i == 0 && dd3 < dd1) {
                    isInsert = true;
                    this.project.children.splice(0, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(0, 0, false);
                    }
                    break;
                }
                if (dd3 > dd1 && dd3 < dd2) {
                    isInsert = true;
                    this.project.children.splice(i + 1, 0, milestone);
                    if (this.isExpand != null) {
                        this.isExpand.splice(i + 1, 0, false);
                    }
                    break;
                }
                if (i == this.project.children.length - 2 && dd3 > dd2) {
                    isInsert = true;
                    this.project.children.push(milestone);
                    if (this.isExpand != null) {
                        this.isExpand.push(false);
                    }
                    break;
                }
            }
            if (isInsert == false) {
                this.project.children.push(milestone);
                if (this.isExpand != null) {
                    this.isExpand.push(false);
                }
            }
            for (var i = 0; i < this.project.children.length; i++) {
                var mm = this.project.children[i];
                mm.milestoneName = '里程碑' + (i + 1);
            }
        }
    };
    return ProjectCreatePage;
}());
ProjectCreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-project-create',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-create/project-create.html"*/'<!--\n  Generated template for the ProjectCreatePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n  <ion-navbar >\n    <ion-title>{{viewTitle}}</ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onPublish()" color="danger">\n        {{this.project.itemName.length>0?"完成":"发布"}}\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n    <ion-list no-margin no-lines no-padding style="border-top: solid 10px #f5f6f7; border-bottom: solid 10px #f5f6f7;">\n      <ion-item>\n        <ion-icon item-start name="appname-pname"></ion-icon>\n        <ion-label>项目名称</ion-label>\n        <ion-input item-end text-right placeholder="请输入项目名称" [(ngModel)]="project.itemName"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目启动</ion-label>\n    </div>\n    <ion-list no-lines no-padding no-margin style="border-bottom: solid 10px #f5f6f7;">\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" [(ngModel)]="project.itemStartTime" cancelText="取消" doneText="确认"></ion-datetime>\n      </ion-item>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label>交付成果</ion-label>\n        <ion-input item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemStartResult" required></ion-input>\n      </ion-item>\n      <ion-item >\n        <ion-icon item-start name="appname-plan"></ion-icon>\n        <ion-label>项目级别</ion-label>\n        <ion-select interface="action-sheet" [(ngModel)]="project.itemLevel" cancelText="取消" doneText="确认">\n          <ion-option value="1">一级</ion-option>\n          <ion-option value="2">二级</ion-option>\n          <ion-option value="3">三级</ion-option>\n          <ion-option value="4">四级</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n\n    <div style="border-bottom: solid 10px #f5f6f7;" *ngFor="let mile of project.children">\n      <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n        <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n        <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{mile.milestoneName}}</ion-label>\n        <div style="float: right; width: 30px; height: 30px;position: relative">\n          <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onClickRemoveMilestone($event, mile)"></ion-icon>\n        </div>\n      </div>\n      <ion-list no-lines no-margin no-padding>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-admin"></ion-icon>\n          <ion-label>负责人</ion-label>\n          <ion-input item-end text-right [(ngModel)]="mile.leader"></ion-input>\n        </ion-item>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-time"></ion-icon>\n          <ion-label>交付时间</ion-label>\n          <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认"\n                        ngModel="{{mile.deliveryTime | stampToDate}}"\n                        (ngModelChange)="mile.deliveryTime = $event"></ion-datetime>\n        </ion-item>\n        <ion-item style="border-bottom: solid 1px #ececec">\n          <ion-icon item-start name="appname-plan"></ion-icon>\n          <ion-label>项目进度</ion-label>\n          <ion-select interface="action-sheet" [(ngModel)]="mile.itemProgress" cancelText="取消" doneText="确认">\n            <ion-option value="10%">10%</ion-option>\n            <ion-option value="20%">20%</ion-option>\n            <ion-option value="30%">30%</ion-option>\n            <ion-option value="40%">40%</ion-option>\n            <ion-option value="50%">50%</ion-option>\n            <ion-option value="60%">60%</ion-option>\n            <ion-option value="70%">70%</ion-option>\n            <ion-option value="80%">80%</ion-option>\n            <ion-option value="90%">90%</ion-option>\n            <ion-option value="100%">100%</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-icon item-start name="appname-result"></ion-icon>\n          <ion-label>交付成果</ion-label>\n          <ion-textarea item-end text-right [(ngModel)]="mile.deliveryResult"></ion-textarea>\n        </ion-item>\n      </ion-list>\n    </div>\n\n\n    <div style="padding: 10px; border-bottom: solid 10px #f5f6f7">\n      <button ion-button (click)="onAddMilestone()" style="background-color: #fc5c53" block>+ 添加里程碑</button>\n    </div>\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目结束</ion-label>\n    </div>\n    <ion-list no-lines no-margin no-padding>\n      <button ion-item style="border-bottom: solid 1px #ececec" (click)="onEndDirector($event)">\n        <ion-icon item-start name="appname-admin"></ion-icon>\n        <ion-label item-start>负责人</ion-label>\n        <!--<ion-input item-end text-right placeholder="请输入负责人" [(ngModel)]="project.itemLeader"></ion-input>-->\n        <ion-label item-end text-right>{{project.leader}}</ion-label>\n      </button>\n      <ion-item  style="border-bottom: solid 1px #ececec">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认" [(ngModel)]="project.endTime"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label>交付成果</ion-label>\n        <ion-textarea item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemEndResult"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n\n\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-create/project-create.html"*/,
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
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], ProjectCreatePage);

//# sourceMappingURL=project-create.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilestoneDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_contact__ = __webpack_require__(59);
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
            leader: '',
            leaderEmpNum: '',
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
        };
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
        this.milestone = data;
        if (this.milestone.id.length < 1) {
            if (typeof (this.project.children != 'undefined')) {
                this.milestone.milestoneName = '里程碑' + (this.project.children.length + 1);
            }
            else {
                this.milestone.milestoneName = '里程碑1';
            }
        }
        if (typeof (this.milestone.children) != 'undefined') {
            for (var i = 0; i < this.milestone.children.length; i++) {
                var subtask = this.milestone.children[i];
                subtask.subtaskName = '子任务' + (i + 1);
            }
        }
        this.tempMilestone = __WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* AppConfig */].deepCopy(this.milestone);
    }
    MilestoneDetailPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('onConfirmMilestoneLeader', function (leader) {
            _this.tempMilestone.leader = leader.name;
            _this.tempMilestone.leaderEmpNum = leader.username;
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
        if (this.type == 1) {
            this.milestone = this.tempMilestone;
            this.callback(this.milestone).then(function () {
                _this.navCtrl.pop();
            });
        }
        else {
            // param.itemName = this.pname;
            // param.pid = this.pid;
            // param.mid = param.id;
            param.projectinfo = this.project;
            this.appService.httpPost("item/createMilestone", param, this, function (view, res) {
                if (res.status == 200) {
                    view.tempMilestone = res.json().data;
                    console.log(view.tempMilestone);
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
    };
    MilestoneDetailPage.prototype.onAddSubtask = function ($event) {
        var subtask = {
            id: '',
            subtaskName: '子任务' + (this.tempMilestone.children.length + 1),
            leader: '',
            leaderEmpNum: '',
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
        selector: 'page-milestone-detail',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/milestone-detail/milestone-detail.html"*/'<!--\n  Generated template for the MilestoneDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>\n      {{this.type==1?"新建里程碑":"里程碑详情"}}\n    </ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onSaveMilestone($event)" style="color: #fc5c53">\n        保存\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content fullscreen>\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n    <ion-item >\n      <ion-icon item-start name="appname-pname"></ion-icon>\n      <ion-label>项目名称:</ion-label>\n      <ion-label right text-right>{{this.project.itemName}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-label full style="text-align: center">{{tempMilestone.milestoneName}}</ion-label>\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onMilestoneLeader($event)" >\n      <ion-icon item-start name="appname-admin"></ion-icon>\n      <ion-label item-start>负责人:</ion-label>\n      <ion-label item-end text-right>{{tempMilestone.leader}}</ion-label>\n    </button>\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n      <!--<ion-label>负责人:</ion-label>-->\n      <!--<ion-input text-right type="text" [(ngModel)]="tempMilestone.milestoneLeader" required [disabled]=""></ion-input>-->\n    <!--</ion-item>-->\n    <ion-item style="border-bottom: solid 1px #ececec;">\n      <ion-icon item-start name="appname-time"></ion-icon>\n      <ion-label>交付时间:</ion-label>\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min="2015" cancelText="取消" doneText="确认" required [disabled]=""\n                    ngModel="{{tempMilestone.deliveryTime | stampToDate}}"\n                    (ngModelChange)="tempMilestone.deliveryTime = $event">\n      </ion-datetime>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec">\n      <ion-icon item-start name="appname-plan"></ion-icon>\n      <ion-label>项目进度</ion-label>\n      <ion-select interface="action-sheet" [(ngModel)]="tempMilestone.itemProgress">\n        <ion-option value="10%">10%</ion-option>\n        <ion-option value="20%">20%</ion-option>\n        <ion-option value="30%">30%</ion-option>\n        <ion-option value="40%">40%</ion-option>\n        <ion-option value="50%">50%</ion-option>\n        <ion-option value="60%">60%</ion-option>\n        <ion-option value="70%">70%</ion-option>\n        <ion-option value="80%">80%</ion-option>\n        <ion-option value="90%">90%</ion-option>\n        <ion-option value="100%">100%</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec;">\n      <ion-icon item-start name="appname-result"></ion-icon>\n      <ion-label no-padding no-margin>交付成果:</ion-label>\n      <ion-input text-right type="text" [(ngModel)]="tempMilestone.deliveryResult" required [disabled]=""></ion-input>\n    </ion-item>\n    <ion-item *ngIf="tempMilestone.delay > 0" style="border-bottom: solid 1px #ececec;">\n      <ion-label >延迟情况:</ion-label>\n      <ion-label text-right item-end></ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-list no-lines no-padding no-margin *ngIf="this.tempMilestone.id.length>0">\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n      <div item-start>是否完成</div>\n      <ion-label>完成</ion-label>\n      <ion-checkbox [(ngModel)]="tempMilestone.itemIsEnd"></ion-checkbox>\n    </ion-item>\n    <ion-item style="border-bottom: solid 10px #ececec; height: 100px;">\n      <ion-label item-start>备注:</ion-label>\n      <ion-textarea item-end no-padding no-margin [(ngModel)]="tempMilestone.remark"></ion-textarea>\n    </ion-item>\n  </ion-list>\n\n  <div *ngFor="let subtask of tempMilestone.children; let i = index">\n    <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n      <div style="width: 5px; height: 30px; background-color: #555555; float: left;"></div>\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{subtask.subtaskName}}</ion-label>\n      <div style="float: right; width: 30px; height: 30px;position: relative">\n        <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onRemoveSubtask($event, subtask)"></ion-icon>\n      </div>\n    </div>\n    <ion-list no-lines no-padding no-margin>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-admin"></ion-icon>\n        <ion-label>负责人:</ion-label>\n        <ion-input text-right type="text" [(ngModel)]="subtask.leader" required [disabled]="type==2"></ion-input>\n      </ion-item>\n      <ion-item style="border-bottom: solid 1px #ececec;">\n        <ion-icon item-start name="appname-time"></ion-icon>\n        <ion-label>交付时间</ion-label>\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认"\n                      ngModel="{{subtask.deliveryTime | stampToDate}}"\n                      (ngModelChange)="subtask.deliveryTime = $event"\n                      [disabled]="type==2"></ion-datetime>\n      </ion-item>\n      <ion-item style="border-bottom: solid 10px #ececec;">\n        <ion-icon item-start name="appname-result"></ion-icon>\n        <ion-label no-padding no-margin>交付成果:</ion-label>\n        <ion-input text-right type="text" [(ngModel)]="subtask.deliveryResult" required [disabled]="type==2"></ion-input>\n      </ion-item>\n    </ion-list>\n  </div>\n\n  <div style="padding: 10px;" *ngIf="this.tempMilestone.id.length>0">\n    <button ion-button (click)="onAddSubtask($event)" block style="background-color: #fc5c53">+ 添加子任务</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/milestone-detail/milestone-detail.html"*/,
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

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtaskPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_contact__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__(33);
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
            leader: '',
            leaderEmpNum: '',
            deliveryTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            deliveryResult: '',
            planTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: new __WEBPACK_IMPORTED_MODULE_5__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            remark: '',
            delayDays: 0,
            itemIsEnd: false,
        };
        var data = this.navParams.get('subtask');
        this.projectname = this.navParams.get('projectname');
        this.callback = this.navParams.get('callback');
        this.type = this.navParams.get("type");
        this.milestone = this.navParams.get("milestone");
        if (data != null) {
            this.subtask = data;
        }
        this.tempSubtask = __WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* AppConfig */].deepCopy(this.subtask);
    }
    SubtaskPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('onConfirmSubtaskLeader', function (leader) {
            _this.tempSubtask.leader = leader.name;
            _this.tempSubtask.leaderEmpNum = leader.username;
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
        console.log(param);
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
        selector: 'page-subtask',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/subtask/subtask.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>子任务</ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onSaveSubtask()" color="danger">\n        保存\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n    <ion-item >\n      <ion-icon item-start name="appname-pname"></ion-icon>\n      <ion-label>项目名称:</ion-label>\n      <ion-label right text-right>{{projectname}}</ion-label>\n    </ion-item>\n  </ion-list>\n  <ion-label full class="subtask-title-css">{{tempSubtask.subtaskName}}</ion-label>\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onSubtaskLeader($event)">\n      <ion-icon item-start name="appname-admin"></ion-icon>\n      <ion-label item-start>负责人:</ion-label>\n      <ion-label item-end text-right>{{tempSubtask.leader}}</ion-label>\n    </button>\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n      <!--<ion-label>负责人:</ion-label>-->\n      <!--<ion-input text-right type="text" [(ngModel)]="tempSubtask.subtaskLeader" required [disabled]=""></ion-input>-->\n    <!--</ion-item>-->\n    <ion-item style="border-bottom: solid 1px #ececec;">\n      <ion-icon item-start name="appname-time"></ion-icon>\n      <ion-label>交付时间:</ion-label>\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min="2015" cancelText="取消" doneText="确认"\n                    ngModel="{{tempSubtask.deliveryTime | stampToDate}}"\n                    (ngModelChange)="tempSubtask.deliveryTime = $event"></ion-datetime>\n    </ion-item>\n    <ion-item>\n      <ion-icon item-start name="appname-result"></ion-icon>\n      <ion-label>交付成果:</ion-label>\n      <ion-input text-right type="text" [(ngModel)]=tempSubtask.deliveryResult></ion-input>\n    </ion-item>\n    <ion-item *ngIf="tempSubtask.delayDays>0">\n      <ion-label>延迟情况:</ion-label>\n      <ion-label text-right item-end>{{tempSubtask.delayDays | delayPipe}}</ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-list no-lines="" [hidden]="this.type==1">\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n      <div item-start>是否完成</div>\n      <ion-label>完成</ion-label>\n      <ion-checkbox [(ngModel)]=tempSubtask.itemIsEnd></ion-checkbox>\n    </ion-item>\n    <ion-item style="border-bottom: solid 1px #ececec; height: 100px;">\n      <ion-label item-start>备注:</ion-label>\n      <ion-textarea item-end [(ngModel)]=tempSubtask.remark></ion-textarea>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/subtask/subtask.html"*/,
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

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProjectDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_create_project_create__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(27);
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
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n    <ion-list>\n      <ion-item (click)=\"onClickEdit($event)\">\n        <ion-icon name=\"appname-edit\" item-start></ion-icon>\n        \u7F16\u8F91\n      </ion-item>\n      <ion-item (click)=\"onClickShare($event)\">\n        <ion-icon name=\"appname-share\" item-start></ion-icon>\n        \u5206\u4EAB\n      </ion-item>\n      <ion-item (click)=\"onClickDelete($event)\">\n        <ion-icon name=\"appname-delete\" item-start></ion-icon>\n        \u5220\u9664\n      </ion-item>\n      <ion-item (click)=\"onClickFinish($event)\">\n        <ion-icon name=\"appname-finish\" item-start></ion-icon>\n        \u7ED3\u675F\n      </ion-item>\n      <ion-item (click)=\"onClickDelay($event)\">\n        <ion-icon name=\"appname-delay\" item-start></ion-icon>\n        \u5EF6\u671F\n      </ion-item>\n    </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], PopoverPage);

var ProjectDetailPage = (function () {
    function ProjectDetailPage(navCtrl, navParams, popoverCtrl, events, appService, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.events = events;
        this.appService = appService;
        this.toastCtrl = toastCtrl;
        //点击进入里程碑的回调
        this.milestoneCallback = function (milestone) {
            return new Promise(function (resolve, reject) {
                if (typeof (milestone) != 'undefined') {
                    var isIn = false;
                    for (var i = 0; i < _this.project.children.length; i++) {
                        var tempMile = _this.project.children[i];
                        if (tempMile.id == milestone.id) {
                            isIn = true;
                            _this.project.children.splice(i, 1, milestone);
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
        //点击进入子任务的回调
        this.subtaskCallback = function (subtask) {
            return new Promise(function (resolve, reject) {
                if (typeof (subtask) != 'undefined') {
                    for (var i = 0; i < _this.project.children.length; i++) {
                        var milestone = _this.project.children[i];
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
            var shareView = document.getElementById('shareView');
            var bottom = parseInt(window.getComputedStyle(shareView).bottom);
            _this.timer = setInterval(function () {
                bottom = bottom + 10;
                shareView.style.bottom = bottom + 'px';
                if (bottom >= 0) {
                    clearInterval(_this.timer);
                    shareView.style.bottom = 0 + 'px';
                }
            }, 16);
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
            _this.appService.httpDelete("item/delete", { "ids": _this.project.id }, _this, function (view, res) {
                if (res.status == 200) {
                    view.events.publish('homeProjectReload');
                    view.navCtrl.pop();
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
    };
    ProjectDetailPage.prototype.ionViewCanEnter = function () {
    };
    ProjectDetailPage.prototype.ionViewCanLeave = function () {
    };
    ProjectDetailPage.prototype.presentPopover = function ($event) {
        var popover = this.popoverCtrl.create(PopoverPage, {
            contentEle: this.content.nativeElement,
        });
        popover.present({
            ev: event
        });
    };
    ProjectDetailPage.prototype.onClickMilestone = function ($event, mile) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            milestone: mile,
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
        if (typeof (this.project.children) != 'undefined') {
            for (var i = 0; i < this.project.children.length; i++) {
                var milestone = this.project.children[i];
                milestone.milestoneName = '里程碑' + (i + 1);
                if (typeof (milestone.children) != 'undefined') {
                    for (var j = 0; j < milestone.children.length; j++) {
                        var subtask = milestone.children[j];
                        subtask.subtaskName = '子任务' + (j + 1);
                    }
                }
            }
        }
        this.isExpand = [];
        if (typeof (this.project.children) != 'undefined') {
            for (var i = 0; i < this.project.children.length; i++) {
                this.isExpand.push(false);
            }
        }
    };
    ProjectDetailPage.prototype.addOneMilestone = function (milestone) {
        if (this.project.children.length == 0) {
            this.project.children.push(milestone);
            this.isExpand.push(false);
        }
        else if (this.project.children.length == 1) {
            var p1 = this.project.children[0];
            var d1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(p1.deliveryTime);
            var d2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
            if (d1 <= d2) {
                this.project.children.push(milestone);
                this.isExpand.push(false);
            }
            else {
                this.project.children.splice(0, 0, milestone);
                this.isExpand.splice(0, 0, false);
            }
        }
        else {
            var isInsert = false;
            for (var i = 0; i < this.project.children.length - 1; i++) {
                var pp1 = this.project.children[i];
                var pp2 = this.project.children[i + 1];
                var dd1 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp1.deliveryTime);
                var dd2 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(pp2.deliveryTime);
                var dd3 = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].timestampToDate(milestone.deliveryTime);
                if (i == 0 && dd3 < dd1) {
                    isInsert = true;
                    this.project.children.splice(0, 0, milestone);
                    this.isExpand.splice(0, 0, false);
                    break;
                }
                if (dd3 > dd1 && dd3 < dd2) {
                    isInsert = true;
                    this.project.children.splice(i + 1, 0, milestone);
                    this.isExpand.splice(i + 1, 0, false);
                    break;
                }
                if (i == this.project.children.length - 2 && dd3 > dd2) {
                    isInsert = true;
                    this.project.children.push(milestone);
                    this.isExpand.push(false);
                    break;
                }
            }
            if (isInsert == false) {
                this.project.children.push(milestone);
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
        selector: 'page-project-detail',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-detail/project-detail.html"*/'<!--\n  Generated template for the ProjectDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{project.itemName}}\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)">\n        <ion-icon name="more" style="color: #fc5c53"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content #popoverContent fullscreen>\n  <div class="pj-item">\n    <div class="mile-bottom">\n      <div class="item1">\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.itemStartTime | MonthPipe}}</ion-label>\n        <section class="line"></section>\n        <ion-label style="margin-top: 3px;font-size: 10px">{{project.itemStartTime | YearPipe}}</ion-label>\n      </div>\n      <div class="item2">\n        <ion-icon name="ios-arrow-dropdown-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n        <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">启动</ion-label>\n        <!--<div style="width: 1px; background-color: #ececec; height: 100%; position: absolute; left: 20px" ></div>-->\n      </div>\n      <ion-icon name="appname-arrow" class="arrow-css1"></ion-icon>\n      <div class="item3-1">\n        <ion-row>\n          <ion-col col-5 style="float: left">\n            负责人：\n          </ion-col>\n          <ion-col col-7 style="float: right">\n            {{project.leader}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5 style="float: left">\n            交付成果：\n          </ion-col>\n          <ion-col col-7 style="float: right">\n        <span class="item-right">\n          {{project.itemStartResult}}\n        </span>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5 style="float: left">\n            紧急程度：\n          </ion-col>\n          <ion-col col-7 style="float: right">\n        <span class="item-right">\n          {{project.itemLevel | itemlevelPipe}}\n        </span>\n          </ion-col>\n        </ion-row>\n      </div>\n    </div>\n  </div>\n\n  <!-- 里程碑  -->\n  <div class="pj-item" *ngFor="let mile of project.children; let i = index">\n    <div class="mile-top" id="{{mile.id}}">\n      <div style="width: 1px; background-color: #ececec; height: 100%; position: absolute; left: 65px; top: 0px" >\n\n      </div >\n      <div class="subtask-title" *ngIf="isExpand[i]==false ">\n        <ion-label no-margin no-padding text-center class=" horizontal-center" style="line-height: 25px; font-size: 15px">{{mile.children.length+"个子任务"}}</ion-label>\n      </div>\n      <div class="subtask-wrap" *ngIf="isExpand[i]==true ">\n        <div class="subtask-item" *ngFor="let subtask of mile.children" (click)="onClickSubtask($event, subtask, mile)">\n          <div class="subtask-css" >\n            <ion-label class="subtask-left">子任务:</ion-label>\n            <ion-label class="subtask-right" >{{subtask.subtaskName}}</ion-label>\n          </div>\n          <div class="subtask-css" >\n            <ion-label class="subtask-left">交付时间:</ion-label>\n            <ion-label class="subtask-right" >{{subtask.deliveryTime | stampToDate}}</ion-label>\n          </div>\n          <div class="subtask-css" >\n            <ion-label class="subtask-left">负责人:</ion-label>\n            <ion-label class="subtask-right" >{{subtask.leader}}</ion-label>\n          </div>\n        </div>\n      </div>\n      <ion-icon [name]="isExpand[i]==false?\'appname-expand\':\'appname-fold\'"  class="fold" (click)="onClickExpand($event, i)">\n\n      </ion-icon>\n    </div>\n    <div class="mile-bottom">\n      <div class="item1">\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{mile.deliveryTime | MonthPipe}}</ion-label>\n        <section class="line"></section>\n        <ion-label style="margin-top: 3px;font-size: 10px">{{mile.deliveryTime | YearPipe}}</ion-label>\n      </div>\n      <div class="item2">\n        <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n        <ion-label no-padding no-margin class="label-radius">{{mile.itemProgress}}</ion-label>\n        <ion-label no-padding no-margin class="mile-number">{{"里程碑"+(i+1)}}</ion-label>\n        <ion-label no-padding no-margin class="delay-radius1" [hidden]="mile.delayDays==0">{{"延期"+mile.delayDays+"天"}}</ion-label>\n      </div>\n      <!--[ngClass]="{\'arrow-css1\':mile.type==0,\'arrow-css2\':mile.type==1,\'arrow-css3\':mile.type==2}"-->\n      <ion-icon name="appname-arrow" class="arrow-css2" ></ion-icon>\n      <div class="item3-2" (click)="onClickMilestone($event, mile)">\n        <ion-row>\n          <ion-col col-5 style="float: left">\n            负责人：\n          </ion-col>\n          <ion-col col-7 style="float: right">\n            {{mile.leader}}\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col col-5 style="float: left">\n            交付成果：\n          </ion-col>\n          <ion-col col-7 style="float: right">\n        <span class="item-right">\n          {{mile.deliveryResult}}\n        </span>\n          </ion-col>\n        </ion-row>\n      </div>\n    </div>\n  </div>\n\n  <!-- 项目结束 -->\n  <div class="mile-bottom">\n    <div class="item1">\n      <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.endTime | MonthPipe}}</ion-label>\n      <section class="line"></section>\n      <ion-label style="margin-top: 3px;font-size: 10px">{{project.endTime | YearPipe}}</ion-label>\n    </div>\n    <div class="item2">\n      <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n      <ion-icon name="ios-arrow-dropup-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n      <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">结束</ion-label>\n    </div>\n    <ion-icon name="appname-arrow" class="arrow-css1"></ion-icon>\n    <div class="item3-1">\n      <ion-row>\n        <ion-col col-5 style="float: left">\n          负责人：\n        </ion-col>\n        <ion-col col-7 style="float: right">\n          {{project.leader}}\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-5 style="float: left">\n          交付成果：\n        </ion-col>\n        <ion-col col-7 style="float: right">\n        <span class="item-right">\n          {{project.itemEndResult}}\n        </span>\n        </ion-col>\n      </ion-row>\n    </div>\n  </div>\n\n  <!-- 项目延期 -->\n  <div *ngIf="project.delayDays>0" class="mile-bottom" style="margin-top: 5px">\n    <div class="item1">\n      <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.delayTime | MonthPipe}}</ion-label>\n      <section class="line"></section>\n      <ion-label style="margin-top: 3px;font-size: 10px">{{project.delayTime | YearPipe}}</ion-label>\n    </div>\n    <div class="item2">\n      <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n      <ion-label no-padding no-margin class="delay-radius2">延</ion-label>\n      <ion-label no-padding no-margin class="item2_text">延期</ion-label>\n    </div>\n    <ion-icon name="appname-arrow" class="arrow-css3"></ion-icon>\n    <div class="item3-3">\n      <ion-row>\n        <ion-col col-5 style="float: left">\n          负责人：\n        </ion-col>\n        <ion-col col-7 style="float: right">\n          {{project.leader}}\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-5 style="float: left">\n          交付成果：\n        </ion-col>\n        <ion-col col-7 style="float: right">\n        <span class="item-right">\n          {{project.itemEndResult}}\n        </span>\n        </ion-col>\n      </ion-row>\n    </div>\n  </div>\n\n  <!--[ngStyle]="{\'bottom\':isShowShare==false?\'-200px\':\'0px\'}"-->\n  <div id="shareView" class="share-css" >\n    <ion-label text-center>分享到</ion-label>\n    <ion-row style="height: 100px;@extend .vertical-middle;">\n      <ion-col text-center >\n        <ion-icon name="appname-dingding"></ion-icon>\n      </ion-col>\n      <ion-col text-center>\n        <ion-icon name="appname-qq"></ion-icon>\n      </ion-col>\n      <ion-col text-center>\n        <ion-icon name="appname-weixin"></ion-icon>\n      </ion-col>\n    </ion-row>\n    <button ion-button no-padding no-margin style="width: 100%; height: 50px; border-top: solid 1px #ececec; background-color: white; color: black" (click)="onCancelShare($event)">取消</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/project-detail/project-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["PopoverController"],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ToastController"]])
], ProjectDetailPage);

//# sourceMappingURL=project-detail.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewpwPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
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
    function NewpwPage(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.newpwForm = this.formBuilder.group({
            newpw1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(16)])],
            newpw2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(16)])]
        });
    }
    NewpwPage.prototype.ionViewDidLoad = function () {
    };
    NewpwPage.prototype.onConfirmNewpw = function (value) {
        console.log(value.newpw1, value.newpw2);
        this.navCtrl.popToRoot();
    };
    return NewpwPage;
}());
NewpwPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-newpw',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/newpw/newpw.html"*/'<!--\n  Generated template for the NewpwPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>设置新密码</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <form [formGroup]="newpwForm" (ngSubmit)="onConfirmNewpw(newpwForm.value);">\n    <div class="wrap">\n      <div class="row">\n        <ion-input no-padding no-margin type="password" placeholder="请输入新密码" formControlName="newpw1" ></ion-input>\n      </div>\n      <div class="row">\n        <ion-input no-padding no-margin type="password" placeholder="请再次输入新密码" formControlName="newpw2" ></ion-input>\n      </div>\n      <div class="row">\n        <button ion-button clear no-margin no-padding type="submit" [disabled]="!newpwForm.valid">确认</button>\n      </div>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/newpw/newpw.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
], NewpwPage);

//# sourceMappingURL=newpw.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__newpw_newpw__ = __webpack_require__(140);
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
    function ForgetPage(navCtrl, navParams, formBuilder) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.defCountDownText = "发送验证码";
        this.defCountDownTime = 60;
        this.isCountDowning = false;
        this.countDownText = this.defCountDownText;
        this.forgetForm = this.formBuilder.group({
            mobile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            code: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)])]
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
        var _this = this;
        if (this.isCountDowning == true) {
            return;
        }
        this.countDownTime = this.defCountDownTime;
        this.isCountDowning = true;
        this.sub = this.timer.subscribe(function (t) {
            _this.countDownText = _this.countDownTime.toString() + 's';
            if (_this.countDownTime < 0) {
                _this.countDownText = _this.defCountDownText;
                _this.sub.unsubscribe();
                _this.isCountDowning = false;
            }
            _this.countDownTime--;
        });
    };
    ForgetPage.prototype.goNext = function (value) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__newpw_newpw__["a" /* NewpwPage */]);
    };
    return ForgetPage;
}());
ForgetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-forget',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/forget/forget.html"*/'<!--\n  Generated template for the ForgetPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>验证手机号</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <form [formGroup]="forgetForm" (ngSubmit)="goNext(forgetForm.value);">\n    <div class="wrap">\n      <div class="row">\n        <ion-input no-padding no-margin type="text" placeholder="输入手机号" formControlName="mobile" maxlength="11"></ion-input>\n      </div>\n      <div class="row">\n        <ion-input no-padding no-margin type="text" placeholder="输入验证码" formControlName="code" maxlength="8"></ion-input>\n        <a id="btn_code" (click)="sendCodeBtnEvent($event)" class="sendcode" [class.active]="isCountDowning" >{{countDownText}}</a>\n      </div>\n      <div class="row">\n        <button ion-button clear no-margin no-padding type="submit" [disabled]="!forgetForm.valid">确认</button>\n      </div>\n    </div>\n  </form>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/forget/forget.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
], ForgetPage);

//# sourceMappingURL=forget.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__forget_forget__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_keycloak_service_keycloak_service__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_keycloak2_keycloak2__ = __webpack_require__(223);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { KeycloakService } from "../../app/keycloak/keycloak.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, formBuilder, keycloak, keycloak2) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.keycloak = keycloak;
        this.keycloak2 = keycloak2;
        this.errorText = '手机号码错误';
        this.loginForm = this.formBuilder.group({
            mobile: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(11), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].maxLength(12)])]
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        // KeycloakServiceProvider.init();
        __WEBPACK_IMPORTED_MODULE_5__providers_keycloak2_keycloak2__["a" /* Keycloak2Provider */].init()
            .then(function () {
            console.log("成功");
        })
            .catch(function () {
        });
    };
    LoginPage.prototype.login = function (value) {
        //this.keycloak.login();
    };
    LoginPage.prototype.onForgetPassword = function ($event) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__forget_forget__["a" /* ForgetPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPage"])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<ion-content fullscreen>\n  <img class="login_icon" src="../../assets/png/login_logo.png">\n  <form [formGroup]="loginForm" (ngSubmit)="login(loginForm.value)">\n    <div style="margin: 0 30px;">\n      <div class="row">\n        <img class="area" src="../../assets/png/icon_tel.png">\n        <ion-input no-padding no-margin type="text" placeholder="输入手机号" formControlName="mobile" maxlength="11"></ion-input>\n      </div>\n      <div class="row">\n        <img class="area" src="../../assets/png/icon_pw.png">\n        <ion-input no-padding no-margin type="password" placeholder="输入密码" formControlName="password" maxlength="12"></ion-input>\n      </div>\n      <!--<input class="login_input" type="text" formControlName="mobile" placeholder="请输入手机号"/>-->\n      <!--<input class="login_input" type="password" formControlName="password" placeholder="请输入密码"/>-->\n      <!--<div style="width: 80%;height: 30px;margin: 30px auto">-->\n        <!--<p style="float: left; margin-left: 10px; color: red">{{errorText}}</p>-->\n        <!--<button ion-button no-padding no-margin clear style="margin-right: 10px; float: right">忘记密码?</button>-->\n      <!--</div>-->\n      <button ion-button block class="login_btn" type="submit">登录</button>\n    </div>\n  </form>\n  <div style="position: fixed;bottom: 20px;width: 100%">\n    <button ion-button no-border no-padding clear class="forget" (click)="onForgetPassword($event)">忘记密码?</button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/login/login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4__providers_keycloak_service_keycloak_service__["a" /* KeycloakServiceProvider */],
        __WEBPACK_IMPORTED_MODULE_5__providers_keycloak2_keycloak2__["a" /* Keycloak2Provider */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 153:
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
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 196:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/contact/contact.module": [
		726,
		3
	],
	"../pages/forget/forget.module": [
		728,
		2
	],
	"../pages/login/login.module": [
		729,
		1
	],
	"../pages/newpw/newpw.module": [
		727,
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
webpackAsyncContext.id = 196;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeycloakServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var keycloakConfig = __webpack_require__(682);
/*
  Generated class for the KeycloakServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var KeycloakServiceProvider = KeycloakServiceProvider_1 = (function () {
    function KeycloakServiceProvider(http) {
        this.http = http;
    }
    /**
     * Initialise the Keycloak Client Adapter
     */
    KeycloakServiceProvider.init = function () {
        // Create a new Keycloak Client Instance
        var keycloakAuth = new Keycloak(keycloakConfig);
        return new Promise(function (resolve, reject) {
            keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' }).success(function () {
                KeycloakServiceProvider_1.auth.authz = keycloakAuth;
                KeycloakServiceProvider_1.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/keypress/protocol/openid-connect/logout?redirect_uri=/";
                resolve();
            }).error(function (err) {
                reject(err);
            });
        });
    };
    /**
     * Redirect to logout
     */
    KeycloakServiceProvider.prototype.logout = function () {
        KeycloakServiceProvider_1.auth.authz.logout();
    };
    /**
     * Redirect to Login
     */
    KeycloakServiceProvider.prototype.login = function () {
        KeycloakServiceProvider_1.auth.authz.login();
    };
    /**
     * Clears Authentication State
     */
    KeycloakServiceProvider.prototype.clearToken = function () {
        KeycloakServiceProvider_1.auth.authz.clearToken();
    };
    /**
     * Return the users realm level roles
     */
    KeycloakServiceProvider.prototype.getRealmRoles = function () {
        return KeycloakServiceProvider_1.auth.authz.realmAccess.roles;
    };
    /**
     * Check if the user has a specified realm role
     */
    KeycloakServiceProvider.prototype.hasRealmRole = function (role) {
        return KeycloakServiceProvider_1.auth.authz.hasRealmRole(role);
    };
    /**
     * Get Server/Open ID Connect specific server info
     */
    KeycloakServiceProvider.prototype.getConfiguration = function () {
        var notAvailable = "N/A";
        return {
            "authServerUrl": KeycloakServiceProvider_1.auth.authz.authServerUrl ? KeycloakServiceProvider_1.auth.authz.authServerUrl : notAvailable,
            "openIdFlow": KeycloakServiceProvider_1.auth.authz.flow ? KeycloakServiceProvider_1.auth.authz.flow : notAvailable,
            "openIdResponseMode": KeycloakServiceProvider_1.auth.authz.responseMode ? KeycloakServiceProvider_1.auth.authz.responseMode : notAvailable,
            "openIdResponseType": KeycloakServiceProvider_1.auth.authz.responseType ? KeycloakServiceProvider_1.auth.authz.responseType : notAvailable,
            "realm": KeycloakServiceProvider_1.auth.authz.realm ? KeycloakServiceProvider_1.auth.authz.realm : notAvailable,
            "clientId": KeycloakServiceProvider_1.auth.authz.clientId ? KeycloakServiceProvider_1.auth.authz.clientId : notAvailable,
            "timeSkew": KeycloakServiceProvider_1.auth.authz.timeSkew ? KeycloakServiceProvider_1.auth.authz.timeSkew : notAvailable
        };
    };
    /**
     * Redirects to the Account Management Console
     */
    KeycloakServiceProvider.prototype.accountManagement = function () {
        KeycloakServiceProvider_1.auth.authz.accountManagement();
    };
    /**
     * Get the users profile
     */
    KeycloakServiceProvider.prototype.loadUserProfile = function () {
        // Retrieve User Profile
        return new Promise(function (resolve, reject) {
            KeycloakServiceProvider_1.auth.authz.loadUserProfile().success(function (profile) {
                resolve(profile);
            }).error(function () {
                reject('Failed to retrieve user profile');
            });
        });
    };
    /**
     * Check if the user has a given role
     * @param role The role to check if the user posesses
     */
    KeycloakServiceProvider.prototype.viewGuard = function (role) {
        if (KeycloakServiceProvider_1.auth.authz.hasRealmRole(role)) {
            return true;
        }
        else {
            //this.alertCtrl.create({title: 'Access Denied', subTitle: "You don't have access to the requested resource."}).present();
            return false;
        }
    };
    return KeycloakServiceProvider;
}());
KeycloakServiceProvider.auth = {};
KeycloakServiceProvider = KeycloakServiceProvider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], KeycloakServiceProvider);

var KeycloakServiceProvider_1;
//# sourceMappingURL=keycloak-service.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Keycloak2Provider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keycloak_js__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keycloak_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__keycloak_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Keycloak2Provider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var Keycloak2Provider = Keycloak2Provider_1 = (function () {
    function Keycloak2Provider(http) {
        this.http = http;
    }
    Keycloak2Provider.init = function () {
        // const keycloakAuth: any = Keycloak({
        //     "realm": "qipai",
        //     "url": "http://localhost:8080/auth",
        //     "clientId": "qipaipm",
        //     "cors": true,
        //     "ssl-required" : "external",
        //     "clientSecret": "affdd342-69ca-4887-acce-0f9114b26195",
        //     //"sessionId":"1619f21c-0292-4b9d-9e1c-dcd0fdd1a2a8",
        //     "publicClient":true,
        //     "use-resource-role-mappings": true,
        //     "bearer-only": false,
        //     "redirect_uri": "http://localhost:8100/*",
        //     "resource": "tutorial-frontend",
        // });
        var keycloakAuth = new Keycloak({
            "realm": "qipai",
            "auth-server-url": "http://localhost:8080/auth",
            "url": "http://localhost:8080/auth",
            "ssl-required": "external",
            "resource": "qipaipm",
            "clientId": "qipaipm",
            "credentials": {
                "secret": "affdd342-69ca-4887-acce-0f9114b26195"
            },
            "policy-enforcer": {}
        });
        Keycloak2Provider_1.auth.loggedIn = false;
        return new Promise(function (resolve, reject) {
            //adapter : 'cordova', checkLoginIframeInterval:1, checkLoginIframe: true
            keycloakAuth.init({ onLoad: 'login-required' })
                .success(function () {
                console.log(keycloakAuth);
                if (keycloakAuth.authenticated) {
                    console.log(keycloakAuth.tokenParsed);
                }
                else {
                    console.log("未认证");
                }
                Keycloak2Provider_1.auth.loggedIn = true;
                Keycloak2Provider_1.auth.authz = keycloakAuth;
                Keycloak2Provider_1.auth.logoutUrl = keycloakAuth.authServerUrl
                    + '/realms/afiliamedica/protocol/openid-connect/logout?redirect_uri='
                    + document.baseURI;
                resolve();
            })
                .error(function () {
                reject();
                console.log("失败");
            });
        });
    };
    Keycloak2Provider.prototype.logout = function () {
        Keycloak2Provider_1.auth.authz.logout();
        Keycloak2Provider_1.auth.loggedIn = false;
        Keycloak2Provider_1.auth.authz = null;
        //window.location.href = KeycloakService.auth.logoutUrl;
    };
    Keycloak2Provider.prototype.getToken = function () {
        return new Promise(function (resolve, reject) {
            if (Keycloak2Provider_1.auth.authz.token) {
                Keycloak2Provider_1.auth.authz
                    .updateToken(5)
                    .success(function () {
                    resolve(Keycloak2Provider_1.auth.authz.token);
                })
                    .error(function () {
                    reject('Failed to refresh token');
                });
            }
            else {
                reject('Not loggen in');
            }
        });
    };
    return Keycloak2Provider;
}());
Keycloak2Provider.auth = {};
Keycloak2Provider = Keycloak2Provider_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], Keycloak2Provider);

var Keycloak2Provider_1;
//# sourceMappingURL=keycloak2.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(138);
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
            this.appService.httpGet("item/searchByContion", { itemName: this.searchValue, page: 1, limit: 100 }, this, function (view, res) {
                var response = res.json();
                if (response.success == true) {
                    var data = response.data;
                    view.array = [];
                    for (var i = 0; i < data.length; i++) {
                        var one = data[i];
                        var year = one.itemStartTime.substr(0, 4);
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
                }
            }, false);
        }
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-search',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/search/search.html"*/'<!--\n  Generated template for the SearchPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <form (submit)="onSearch($event)">\n      <ion-searchbar placeholder="搜索项目名称" [(ngModel)]=searchValue\n                     [showCancelButton]="false"\n                     (ionInput)="onSearchInput($event)"\n                     (ionCancel)="onSearchCancel($event)"\n                      name="itemName">\n      </ion-searchbar>\n    </form>\n  </ion-navbar>\n  <!--<div class="head" >-->\n    <!--<div class="icon-left" (click)="goBack()">-->\n      <!--<ion-icon name="arrow-back" ></ion-icon>-->\n    <!--</div>-->\n    <!--<div class="searchcotain">-->\n      <!--<div class="searchmain">-->\n        <!--<div class="searchicon"><ion-icon name="search"></ion-icon></div>-->\n        <!--<div class="searchinput"><input type="text" placeholder="搜索"></div>-->\n      <!--</div>-->\n    <!--</div>-->\n    <!--<div class="icon-rightnew">-->\n      <!--<a>搜索</a>-->\n    <!--</div>-->\n  <!--</div>-->\n</ion-header>\n\n<ion-content fullscreen>\n    <div *ngFor="let dic of array">\n      <div style="background-color: #f5f6f7; height: 20px;padding-left: 5px">{{dic.year+"年"}}</div>\n      <div style="height: 44px; border-bottom: solid 1px #f5f6f7; position:relative;" *ngFor="let project of dic.projects" (click)="onClickProject($event,project)">\n        <ion-label no-padding no-margin float-left class="vertical_center" style="left: 5px">{{project.itemStartTime | MonthPipe}}</ion-label>\n        <ion-label no-padding no-margin float-right class="vertical_center" style="right: 5px;">{{project.itemName}}</ion-label>\n      </div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/search/search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(33);

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

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AppGlobal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(197);
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
        var _this = this;
        if (loader === void 0) { loader = false; }
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
    };
    AppService.prototype.httpPost = function (url, params, view, callback, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
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
    };
    AppService.prototype.httpDelete = function (url, params, view, callback, loader) {
        var _this = this;
        if (loader === void 0) { loader = false; }
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
    };
    AppService.prototype.handleError = function (error) {
        var msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error != null) {
            console.log(error);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["LoadingController"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["ToastController"]])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(395);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(704);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_search_search__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_forget_forget__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_newpw_newpw__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_components_module__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ion2_calendar__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pipes_pipes_module__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_keycloak_service_keycloak_service__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_keycloak2_keycloak2__ = __webpack_require__(223);
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
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_forget_forget__["a" /* ForgetPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_newpw_newpw__["a" /* NewpwPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_17__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_20__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicModule"].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
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
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_18_ion2_calendar__["a" /* CalendarModule */],
            __WEBPACK_IMPORTED_MODULE_19_ion_multi_picker__["MultiPickerModule"],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicApp"]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_forget_forget__["a" /* ForgetPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_newpw_newpw__["a" /* NewpwPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_21__app_service__["a" /* AppService */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["IonicErrorHandler"] },
            __WEBPACK_IMPORTED_MODULE_23__providers_keycloak_service_keycloak_service__["a" /* KeycloakServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_24__providers_keycloak2_keycloak2__["a" /* Keycloak2Provider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(36);
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
    }
    ContactPage.prototype.ionViewDidLoad = function () {
        if (typeof (this.arrayDepartment) == 'undefined') {
            this.appService.httpGet("http://192.168.10.118:8888/uc/group/searchAll", {}, this, function (view, res) {
                if (res.status == 200) {
                    var data = res.json();
                    if (data.id == null && data.children.length > 0) {
                        view.arrayDepartment = data.children;
                        console.log(view.arrayDepartment);
                    }
                }
            }, true);
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
                this.appService.httpGet("http://192.168.72.101:8888/uc/group/searchUsersByGroup", { "id": value.id }, this, function (view, res) {
                    if (res.status == 200) {
                        var array = res.json();
                        if (array == null) {
                            var alert_1 = view.alertCtrl.create({
                                title: '错误信息',
                                subTitle: '该组织架构没有成员!',
                                buttons: ['确定']
                            });
                            alert_1.present();
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
                                var alert_2 = view.alertCtrl.create({
                                    title: '错误信息',
                                    subTitle: '该组织架构没有成员!',
                                    buttons: ['确定']
                                });
                                alert_2.present();
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
        selector: 'page-contact',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/contact/contact.html"*/'<!--\n  Generated template for the ContactPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>通讯录</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content fullscreen>\n  <form (submit)="onSearchContact($event)">\n    <ion-searchbar\n            placeholder="输入名字搜索" [(ngModel)]=searchValue\n            name="searchValue">\n    </ion-searchbar>\n  </form>\n  <div class="organization">\n    <ion-label no-margin no-padding class="vertical_center text">{{organization}}</ion-label>\n  </div>\n  <ion-item tappable *ngFor="let department of arrayDepartment" (click)="goNextDepartment($event, department)">\n    <ion-icon item-start name="appname-tree"></ion-icon>\n    <ion-label no-padding no-margin>{{department.text}}</ion-label>\n    <ion-note item-end>{{department.count+"人"}}</ion-note>\n  </ion-item>\n\n  <ion-item tappable *ngFor="let staff of arrayStaff" (click)="goNextDepartment($event, staff)">\n    <ion-icon item-start name="appname-head"></ion-icon>\n    <ion-label no-padding no-margin>{{staff.name}}</ion-label>\n    <ion-note item-end>{{staff.telphone}}</ion-note>\n  </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/contact/contact.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], ContactPage);

var ContactPage_1;
//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = {
	"realm": "qipai",
	"url": "http://52.80.11.196:9090/auth",
	"ssl-required": "external",
	"clientId": "qipaipm",
	"public-client": true,
	"use-resource-role-mappings": true
};

/***/ }),

/***/ 683:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function( window, undefined ) {

    var Keycloak = function (config) {
        if (!(this instanceof Keycloak)) {
            return new Keycloak(config);
        }

        var kc = this;
        var adapter;
        var refreshQueue = [];
        var callbackStorage;

        var loginIframe = {
            enable: true,
            callbackList: [],
            interval: 5
        };

        kc.init = function (initOptions) {
            kc.authenticated = false;

            callbackStorage = createCallbackStorage();

            if (initOptions && initOptions.adapter === 'cordova') {
                adapter = loadAdapter('cordova');
            } else if (initOptions && initOptions.adapter === 'default') {
                adapter = loadAdapter();
            } else {
                if (window.Cordova) {
                    adapter = loadAdapter('cordova');
                } else {
                    adapter = loadAdapter();
                }
            }

            if (initOptions) {
                if (typeof initOptions.checkLoginIframe !== 'undefined') {
                    loginIframe.enable = initOptions.checkLoginIframe;
                }

                if (initOptions.checkLoginIframeInterval) {
                    loginIframe.interval = initOptions.checkLoginIframeInterval;
                }

                if (initOptions.onLoad === 'login-required') {
                    kc.loginRequired = true;
                }

                if (initOptions.responseMode) {
                    if (initOptions.responseMode === 'query' || initOptions.responseMode === 'fragment') {
                        kc.responseMode = initOptions.responseMode;
                    } else {
                        throw 'Invalid value for responseMode';
                    }
                }

                if (initOptions.flow) {
                    switch (initOptions.flow) {
                        case 'standard':
                            kc.responseType = 'code';
                            break;
                        case 'implicit':
                            kc.responseType = 'id_token token';
                            break;
                        case 'hybrid':
                            kc.responseType = 'code id_token token';
                            break;
                        default:
                            throw 'Invalid value for flow';
                    }
                    kc.flow = initOptions.flow;
                }

                if (initOptions.timeSkew != null) {
                    kc.timeSkew = initOptions.timeSkew;
                }
            }

            if (!kc.responseMode) {
                kc.responseMode = 'fragment';
            }
            if (!kc.responseType) {
                kc.responseType = 'code';
                kc.flow = 'standard';
            }

            var promise = createPromise();

            var initPromise = createPromise();
            initPromise.promise.success(function() {
                kc.onReady && kc.onReady(kc.authenticated);
                promise.setSuccess(kc.authenticated);
            }).error(function(errorData) {
                promise.setError(errorData);
            });

            var configPromise = loadConfig(config);

            function onLoad() {
                var doLogin = function(prompt) {
                    if (!prompt) {
                        options.prompt = 'none';
                    }
                    kc.login(options).success(function () {
                        initPromise.setSuccess();
                    }).error(function () {
                        initPromise.setError();
                    });
                }

                var options = {};
                switch (initOptions.onLoad) {
                    case 'check-sso':
                        if (loginIframe.enable) {
                            setupCheckLoginIframe().success(function() {
                                checkLoginIframe().success(function () {
                                    doLogin(false);
                                }).error(function () {
                                    initPromise.setSuccess();
                                });
                            });
                        } else {
                            doLogin(false);
                        }
                        break;
                    case 'login-required':
                        doLogin(true);
                        break;
                    default:
                        throw 'Invalid value for onLoad';
                }
            }

            function processInit() {
                var callback = parseCallback(window.location.href);

                if (callback) {
                    setupCheckLoginIframe();
                    window.history.replaceState({}, null, callback.newUrl);
                    processCallback(callback, initPromise);
                    return;
                } else if (initOptions) {
                    if (initOptions.token && initOptions.refreshToken) {
                        setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);

                        if (loginIframe.enable) {
                            setupCheckLoginIframe().success(function() {
                                checkLoginIframe().success(function () {
                                    kc.onAuthSuccess && kc.onAuthSuccess();
                                    initPromise.setSuccess();
                                }).error(function () {
                                    setToken(null, null, null);
                                    initPromise.setSuccess();
                                });
                            });
                        } else {
                            kc.updateToken(-1).success(function() {
                                kc.onAuthSuccess && kc.onAuthSuccess();
                                initPromise.setSuccess();
                            }).error(function() {
                                kc.onAuthError && kc.onAuthError();
                                if (initOptions.onLoad) {
                                    onLoad();
                                } else {
                                    initPromise.setError();
                                }
                            });
                        }
                    } else if (initOptions.onLoad) {
                        onLoad();
                    } else {
                        initPromise.setSuccess();
                    }
                } else {
                    initPromise.setSuccess();
                }
            }

            configPromise.success(processInit);
            configPromise.error(function() {
                promise.setError();
            });

            return promise.promise;
        }

        kc.login = function (options) {
            return adapter.login(options);
        }

        kc.createLoginUrl = function(options) {
            var state = createUUID();
            var nonce = createUUID();

            var redirectUri = adapter.redirectUri(options);

            var callbackState = {
                state: state,
                nonce: nonce,
                redirectUri: encodeURIComponent(redirectUri),
            }

            if (options && options.prompt) {
                callbackState.prompt = options.prompt;
            }

            callbackStorage.add(callbackState);

            var action = 'auth';
            if (options && options.action == 'register') {
                action = 'registrations';
            }

            var scope = (options && options.scope) ? "openid " + options.scope : "openid";

            var url = getRealmUrl()
                + '/protocol/openid-connect/' + action
                + '?client_id=' + encodeURIComponent(kc.clientId)
                + '&redirect_uri=' + encodeURIComponent(redirectUri)
                + '&state=' + encodeURIComponent(state)
                + '&nonce=' + encodeURIComponent(nonce)
                + '&response_mode=' + encodeURIComponent(kc.responseMode)
                + '&response_type=' + encodeURIComponent(kc.responseType)
                + '&scope=' + encodeURIComponent(scope);

            if (options && options.prompt) {
                url += '&prompt=' + encodeURIComponent(options.prompt);
            }

            if (options && options.maxAge) {
                url += '&max_age=' + encodeURIComponent(options.maxAge);
            }

            if (options && options.loginHint) {
                url += '&login_hint=' + encodeURIComponent(options.loginHint);
            }

            if (options && options.idpHint) {
                url += '&kc_idp_hint=' + encodeURIComponent(options.idpHint);
            }

            if (options && options.locale) {
                url += '&ui_locales=' + encodeURIComponent(options.locale);
            }

            return url;
        }

        kc.logout = function(options) {
            return adapter.logout(options);
        }

        kc.createLogoutUrl = function(options) {
            var url = getRealmUrl()
                + '/protocol/openid-connect/logout'
                + '?redirect_uri=' + encodeURIComponent(adapter.redirectUri(options, false));

            return url;
        }

        kc.register = function (options) {
            return adapter.register(options);
        }

        kc.createRegisterUrl = function(options) {
            if (!options) {
                options = {};
            }
            options.action = 'register';
            return kc.createLoginUrl(options);
        }

        kc.createAccountUrl = function(options) {
            var url = getRealmUrl()
                + '/account'
                + '?referrer=' + encodeURIComponent(kc.clientId)
                + '&referrer_uri=' + encodeURIComponent(adapter.redirectUri(options));

            return url;
        }

        kc.accountManagement = function() {
            return adapter.accountManagement();
        }

        kc.hasRealmRole = function (role) {
            var access = kc.realmAccess;
            return !!access && access.roles.indexOf(role) >= 0;
        }

        kc.hasResourceRole = function(role, resource) {
            if (!kc.resourceAccess) {
                return false;
            }

            var access = kc.resourceAccess[resource || kc.clientId];
            return !!access && access.roles.indexOf(role) >= 0;
        }

        kc.loadUserProfile = function() {
            var url = getRealmUrl() + '/account';
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Authorization', 'bearer ' + kc.token);

            var promise = createPromise();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        kc.profile = JSON.parse(req.responseText);
                        promise.setSuccess(kc.profile);
                    } else {
                        promise.setError();
                    }
                }
            }

            req.send();

            return promise.promise;
        }

        kc.loadUserInfo = function() {
            var url = getRealmUrl() + '/protocol/openid-connect/userinfo';
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader('Accept', 'application/json');
            req.setRequestHeader('Authorization', 'bearer ' + kc.token);

            var promise = createPromise();

            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        kc.userInfo = JSON.parse(req.responseText);
                        promise.setSuccess(kc.userInfo);
                    } else {
                        promise.setError();
                    }
                }
            }

            req.send();

            return promise.promise;
        }

        kc.isTokenExpired = function(minValidity) {
            if (!kc.tokenParsed || (!kc.refreshToken && kc.flow != 'implicit' )) {
                throw 'Not authenticated';
            }

            if (kc.timeSkew == null) {
                console.info('[KEYCLOAK] Unable to determine if token is expired as timeskew is not set');
                return true;
            }

            var expiresIn = kc.tokenParsed['exp'] - Math.ceil(new Date().getTime() / 1000) + kc.timeSkew;
            if (minValidity) {
                expiresIn -= minValidity;
            }
            return expiresIn < 0;
        }

        kc.updateToken = function(minValidity) {
            var promise = createPromise();

            if (!kc.refreshToken) {
                promise.setError();
                return promise.promise;
            }

            minValidity = minValidity || 5;

            var exec = function() {
                var refreshToken = false;
                if (minValidity == -1) {
                    refreshToken = true;
                    console.info('[KEYCLOAK] Refreshing token: forced refresh');
                } else if (!kc.tokenParsed || kc.isTokenExpired(minValidity)) {
                    refreshToken = true;
                    console.info('[KEYCLOAK] Refreshing token: token expired');
                }

                if (!refreshToken) {
                    promise.setSuccess(false);
                } else {
                    var params = 'grant_type=refresh_token&' + 'refresh_token=' + kc.refreshToken;
                    var url = getRealmUrl() + '/protocol/openid-connect/token';

                    refreshQueue.push(promise);

                    if (refreshQueue.length == 1) {
                        var req = new XMLHttpRequest();
                        req.open('POST', url, true);
                        //req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        req.setRequestHeader('Content-type', 'application/vnd.google-earth.kml+xml; charset=utf-8')
                        req.withCredentials = true;

                        if (kc.clientId && kc.clientSecret) {
                            req.setRequestHeader('Authorization', 'Basic ' + btoa(kc.clientId + ':' + kc.clientSecret));
                        } else {
                            params += '&client_id=' + encodeURIComponent(kc.clientId);
                        }

                        var timeLocal = new Date().getTime();

                        req.onreadystatechange = function () {
                            if (req.readyState == 4) {
                                if (req.status == 200) {
                                    console.info('[KEYCLOAK] Token refreshed');

                                    timeLocal = (timeLocal + new Date().getTime()) / 2;

                                    var tokenResponse = JSON.parse(req.responseText);

                                    setToken(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], timeLocal);

                                    kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                                    for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                        p.setSuccess(true);
                                    }
                                } else {
                                    console.warn('[KEYCLOAK] Failed to refresh token');

                                    kc.onAuthRefreshError && kc.onAuthRefreshError();
                                    for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                                        p.setError(true);
                                    }
                                }
                            }
                        };

                        req.send(params);
                    }
                }
            }

            if (loginIframe.enable) {
                var iframePromise = checkLoginIframe();
                iframePromise.success(function() {
                    exec();
                }).error(function() {
                    promise.setError();
                });
            } else {
                exec();
            }

            return promise.promise;
        }

        kc.clearToken = function() {
            if (kc.token) {
                setToken(null, null, null);
                kc.onAuthLogout && kc.onAuthLogout();
                if (kc.loginRequired) {
                    kc.login();
                }
            }
        }

        function getRealmUrl() {
            if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == '/') {
                return kc.authServerUrl + 'realms/' + encodeURIComponent(kc.realm);
            } else {
                return kc.authServerUrl + '/realms/' + encodeURIComponent(kc.realm);
            }
        }

        function getOrigin() {
            if (!window.location.origin) {
                return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
            } else {
                return window.location.origin;
            }
        }

        function processCallback(oauth, promise) {
            var code = oauth.code;
            var error = oauth.error;
            var prompt = oauth.prompt;

            var timeLocal = new Date().getTime();

            if (error) {
                if (prompt != 'none') {
                    var errorData = { error: error, error_description: oauth.error_description };
                    kc.onAuthError && kc.onAuthError(errorData);
                    promise && promise.setError(errorData);
                } else {
                    promise && promise.setSuccess();
                }
                return;
            } else if ((kc.flow != 'standard') && (oauth.access_token || oauth.id_token)) {
                authSuccess(oauth.access_token, null, oauth.id_token, true);
            }

            if ((kc.flow != 'implicit') && code) {
                var params = 'code=' + code + '&grant_type=authorization_code';
                var url = getRealmUrl() + '/protocol/openid-connect/token';

                var req = new XMLHttpRequest();
                req.open('POST', url, true);
                //req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                req.setRequestHeader('Content-type', 'application/vnd.google-earth.kml+xml; charset=utf-8')

                if (kc.clientId && kc.clientSecret) {
                    req.setRequestHeader('Authorization', 'Basic ' + btoa(kc.clientId + ':' + kc.clientSecret));
                } else {
                    params += '&client_id=' + encodeURIComponent(kc.clientId);
                }

                params += '&redirect_uri=' + oauth.redirectUri;

                req.withCredentials = true;

                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        if (req.status == 200) {

                            var tokenResponse = JSON.parse(req.responseText);
                            authSuccess(tokenResponse['access_token'], tokenResponse['refresh_token'], tokenResponse['id_token'], kc.flow === 'standard');
                        } else {
                            kc.onAuthError && kc.onAuthError();
                            promise && promise.setError();
                        }
                    }
                };

                req.send(params);
            }

            function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
                timeLocal = (timeLocal + new Date().getTime()) / 2;

                setToken(accessToken, refreshToken, idToken, timeLocal);

                if ((kc.tokenParsed && kc.tokenParsed.nonce != oauth.storedNonce) ||
                    (kc.refreshTokenParsed && kc.refreshTokenParsed.nonce != oauth.storedNonce) ||
                    (kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce)) {

                    console.info('[KEYCLOAK] Invalid nonce, clearing token');
                    kc.clearToken();
                    promise && promise.setError();
                } else {
                    if (fulfillPromise) {
                        kc.onAuthSuccess && kc.onAuthSuccess();
                        promise && promise.setSuccess();
                    }
                }
            }

        }

        function loadConfig(url) {
            var promise = createPromise();
            var configUrl;

            if (!config) {
                configUrl = 'keycloak.json';
            } else if (typeof config === 'string') {
                configUrl = config;
            }

            if (configUrl) {
                var req = new XMLHttpRequest();
                req.open('GET', configUrl, true);
                req.setRequestHeader('Accept', 'application/json');

                req.onreadystatechange = function () {
                    if (req.readyState == 4) {
                        if (req.status == 200 || fileLoaded(req)) {
                            var config = JSON.parse(req.responseText);

                            kc.authServerUrl = config['auth-server-url'];
                            kc.realm = config['realm'];
                            kc.clientId = config['resource'];
                            kc.clientSecret = (config['credentials'] || {})['secret'];

                            promise.setSuccess();
                        } else {
                            promise.setError();
                        }
                    }
                };

                req.send();
            } else {
                if (!config['url']) {
                    var scripts = document.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        if (scripts[i].src.match(/.*keycloak\.js/)) {
                            config.url = scripts[i].src.substr(0, scripts[i].src.indexOf('/js/keycloak.js'));
                            break;
                        }
                    }
                }

                if (!config.realm) {
                    throw 'realm missing';
                }

                if (!config.clientId) {
                    throw 'clientId missing';
                }

                kc.authServerUrl = config.url;
                kc.realm = config.realm;
                kc.clientId = config.clientId;
                kc.clientSecret = (config.credentials || {}).secret;

                promise.setSuccess();
            }

            return promise.promise;
        }

        function fileLoaded(xhr) {
            return xhr.status == 0 && xhr.responseText && xhr.responseURL.startsWith('file:');
        }

        function setToken(token, refreshToken, idToken, timeLocal) {
            if (kc.tokenTimeoutHandle) {
                clearTimeout(kc.tokenTimeoutHandle);
                kc.tokenTimeoutHandle = null;
            }

            if (refreshToken) {
                kc.refreshToken = refreshToken;
                kc.refreshTokenParsed = decodeToken(refreshToken);
            } else {
                delete kc.refreshToken;
                delete kc.refreshTokenParsed;
            }

            if (idToken) {
                kc.idToken = idToken;
                kc.idTokenParsed = decodeToken(idToken);
            } else {
                delete kc.idToken;
                delete kc.idTokenParsed;
            }

            if (token) {
                kc.token = token;
                kc.tokenParsed = decodeToken(token);
                kc.sessionId = kc.tokenParsed.session_state;
                kc.authenticated = true;
                kc.subject = kc.tokenParsed.sub;
                kc.realmAccess = kc.tokenParsed.realm_access;
                kc.resourceAccess = kc.tokenParsed.resource_access;

                if (timeLocal) {
                    kc.timeSkew = Math.floor(timeLocal / 1000) - kc.tokenParsed.iat;
                }

                if (kc.timeSkew != null) {
                    console.info('[KEYCLOAK] Estimated time difference between browser and server is ' + kc.timeSkew + ' seconds');

                    if (kc.onTokenExpired) {
                        var expiresIn = (kc.tokenParsed['exp'] - (new Date().getTime() / 1000) + kc.timeSkew) * 1000;
                        console.info('[KEYCLOAK] Token expires in ' + Math.round(expiresIn / 1000) + ' s');
                        if (expiresIn <= 0) {
                            kc.onTokenExpired();
                        } else {
                            kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn);
                        }
                    }
                }
            } else {
                delete kc.token;
                delete kc.tokenParsed;
                delete kc.subject;
                delete kc.realmAccess;
                delete kc.resourceAccess;

                kc.authenticated = false;
            }
        }

        function decodeToken(str) {
            str = str.split('.')[1];

            str = str.replace('/-/g', '+');
            str = str.replace('/_/g', '/');
            switch (str.length % 4)
            {
                case 0:
                    break;
                case 2:
                    str += '==';
                    break;
                case 3:
                    str += '=';
                    break;
                default:
                    throw 'Invalid token';
            }

            str = (str + '===').slice(0, str.length + (str.length % 4));
            str = str.replace(/-/g, '+').replace(/_/g, '/');

            str = decodeURIComponent(escape(atob(str)));

            str = JSON.parse(str);
            return str;
        }

        function createUUID() {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            var uuid = s.join('');
            return uuid;
        }

        kc.callback_id = 0;

        function createCallbackId() {
            var id = '<id: ' + (kc.callback_id++) + (Math.random()) + '>';
            return id;

        }

        function parseCallback(url) {
            var oauth = new CallbackParser(url, kc.responseMode).parseUri();
            var oauthState = callbackStorage.get(oauth.state);

            if (oauthState && (oauth.code || oauth.error || oauth.access_token || oauth.id_token)) {
                oauth.redirectUri = oauthState.redirectUri;
                oauth.storedNonce = oauthState.nonce;
                oauth.prompt = oauthState.prompt;

                if (oauth.fragment) {
                    oauth.newUrl += '#' + oauth.fragment;
                }

                return oauth;
            }
        }

        function createPromise() {
            var p = {
                setSuccess: function(result) {
                    p.success = true;
                    p.result = result;
                    if (p.successCallback) {
                        p.successCallback(result);
                    }
                },

                setError: function(result) {
                    p.error = true;
                    p.result = result;
                    if (p.errorCallback) {
                        p.errorCallback(result);
                    }
                },

                promise: {
                    success: function(callback) {
                        if (p.success) {
                            callback(p.result);
                        } else if (!p.error) {
                            p.successCallback = callback;
                        }
                        return p.promise;
                    },
                    error: function(callback) {
                        if (p.error) {
                            callback(p.result);
                        } else if (!p.success) {
                            p.errorCallback = callback;
                        }
                        return p.promise;
                    }
                }
            }
            return p;
        }

        function setupCheckLoginIframe() {
            var promise = createPromise();

            if (!loginIframe.enable) {
                promise.setSuccess();
                return promise.promise;
            }

            if (loginIframe.iframe) {
                promise.setSuccess();
                return promise.promise;
            }

            var iframe = document.createElement('iframe');
            loginIframe.iframe = iframe;

            iframe.onload = function() {
                var realmUrl = getRealmUrl();
                if (realmUrl.charAt(0) === '/') {
                    loginIframe.iframeOrigin = getOrigin();
                } else {
                    loginIframe.iframeOrigin = realmUrl.substring(0, realmUrl.indexOf('/', 8));
                }
                promise.setSuccess();

                setTimeout(check, loginIframe.interval * 1000);
            }

            var src = getRealmUrl() + '/protocol/openid-connect/login-status-iframe.html';
            iframe.setAttribute('src', src );
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            var messageCallback = function(event) {
                if ((event.origin !== loginIframe.iframeOrigin) || (loginIframe.iframe.contentWindow !== event.source)) {
                    return;
                }

                if (!(event.data == 'unchanged' || event.data == 'changed' || event.data == 'error')) {
                    return;
                }


                if (event.data != 'unchanged') {
                    kc.clearToken();
                }

                var callbacks = loginIframe.callbackList.splice(0, loginIframe.callbackList.length);

                for (var i = callbacks.length - 1; i >= 0; --i) {
                    var promise = callbacks[i];
                    if (event.data == 'unchanged') {
                        promise.setSuccess();
                    } else {
                        promise.setError();
                    }
                }
            };

            window.addEventListener('message', messageCallback, false);

            var check = function() {
                checkLoginIframe();
                if (kc.token) {
                    setTimeout(check, loginIframe.interval * 1000);
                }
            };

            return promise.promise;
        }

        function checkLoginIframe() {
            var promise = createPromise();

            if (loginIframe.iframe && loginIframe.iframeOrigin ) {
                var msg = kc.clientId + ' ' + kc.sessionId;
                loginIframe.callbackList.push(promise);
                var origin = loginIframe.iframeOrigin;
                if (loginIframe.callbackList.length == 1) {
                    loginIframe.iframe.contentWindow.postMessage(msg, origin);
                }
            } else {
                promise.setSuccess();
            }

            return promise.promise;
        }

        function loadAdapter(type) {
            if (!type || type == 'default') {
                return {
                    login: function(options) {
                        window.location.href = kc.createLoginUrl(options);
                        return createPromise().promise;
                    },

                    logout: function(options) {
                        window.location.href = kc.createLogoutUrl(options);
                        return createPromise().promise;
                    },

                    register: function(options) {
                        window.location.href = kc.createRegisterUrl(options);
                        return createPromise().promise;
                    },

                    accountManagement : function() {
                        window.location.href = kc.createAccountUrl();
                        return createPromise().promise;
                    },

                    redirectUri: function(options, encodeHash) {
                        if (arguments.length == 1) {
                            encodeHash = true;
                        }

                        if (options && options.redirectUri) {
                            return options.redirectUri;
                        } else if (kc.redirectUri) {
                            return kc.redirectUri;
                        } else {
                            var redirectUri = location.href;
                            if (location.hash && encodeHash) {
                                redirectUri = redirectUri.substring(0, location.href.indexOf('#'));
                                redirectUri += (redirectUri.indexOf('?') == -1 ? '?' : '&') + 'redirect_fragment=' + encodeURIComponent(location.hash.substring(1));
                            }
                            return redirectUri;
                        }
                    }
                };
            }

            if (type == 'cordova') {
                loginIframe.enable = false;

                return {
                    login: function(options) {
                        var promise = createPromise();

                        var o = 'location=no';
                        if (options && options.prompt == 'none') {
                            o += ',hidden=yes';
                        }

                        var loginUrl = kc.createLoginUrl(options);
                        var ref = window.open(loginUrl, '_blank', o);

                        var completed = false;

                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                var callback = parseCallback(event.url);
                                processCallback(callback, promise);
                                ref.close();
                                completed = true;
                            }
                        });

                        ref.addEventListener('loaderror', function(event) {
                            if (!completed) {
                                if (event.url.indexOf('http://localhost') == 0) {
                                    var callback = parseCallback(event.url);
                                    processCallback(callback, promise);
                                    ref.close();
                                    completed = true;
                                } else {
                                    promise.setError();
                                    ref.close();
                                }
                            }
                        });

                        return promise.promise;
                    },

                    logout: function(options) {
                        var promise = createPromise();

                        var logoutUrl = kc.createLogoutUrl(options);
                        var ref = window.open(logoutUrl, '_blank', 'location=no,hidden=yes');

                        var error;

                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });

                        ref.addEventListener('loaderror', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            } else {
                                error = true;
                                ref.close();
                            }
                        });

                        ref.addEventListener('exit', function(event) {
                            if (error) {
                                promise.setError();
                            } else {
                                kc.clearToken();
                                promise.setSuccess();
                            }
                        });

                        return promise.promise;
                    },

                    register : function() {
                        var registerUrl = kc.createRegisterUrl();
                        var ref = window.open(registerUrl, '_blank', 'location=no');
                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });
                    },

                    accountManagement : function() {
                        var accountUrl = kc.createAccountUrl();
                        var ref = window.open(accountUrl, '_blank', 'location=no');
                        ref.addEventListener('loadstart', function(event) {
                            if (event.url.indexOf('http://localhost') == 0) {
                                ref.close();
                            }
                        });
                    },

                    redirectUri: function(options) {
                        return 'http://localhost';
                    }
                }
            }

            throw 'invalid adapter type: ' + type;
        }

        var LocalStorage = function() {
            if (!(this instanceof LocalStorage)) {
                return new LocalStorage();
            }

            localStorage.setItem('kc-test', 'test');
            localStorage.removeItem('kc-test');

            var cs = this;

            function clearExpired() {
                var time = new Date().getTime();
                for (var i = 0; i < localStorage.length; i++)  {
                    var key = localStorage.key(i);
                    if (key && key.indexOf('kc-callback-') == 0) {
                        var value = localStorage.getItem(key);
                        if (value) {
                            try {
                                var expires = JSON.parse(value).expires;
                                if (!expires || expires < time) {
                                    localStorage.removeItem(key);
                                }
                            } catch (err) {
                                localStorage.removeItem(key);
                            }
                        }
                    }
                }
            }

            cs.get = function(state) {
                if (!state) {
                    return;
                }

                var key = 'kc-callback-' + state;
                var value = localStorage.getItem(key);
                if (value) {
                    localStorage.removeItem(key);
                    value = JSON.parse(value);
                }

                clearExpired();
                return value;
            };

            cs.add = function(state) {
                clearExpired();

                var key = 'kc-callback-' + state.state;
                state.expires = new Date().getTime() + (60 * 60 * 1000);
                localStorage.setItem(key, JSON.stringify(state));
            };
        };

        var CookieStorage = function() {
            if (!(this instanceof CookieStorage)) {
                return new CookieStorage();
            }

            var cs = this;

            cs.get = function(state) {
                if (!state) {
                    return;
                }

                var value = getCookie('kc-callback-' + state);
                setCookie('kc-callback-' + state, '', cookieExpiration(-100));
                if (value) {
                    return JSON.parse(value);
                }
            };

            cs.add = function(state) {
                setCookie('kc-callback-' + state.state, JSON.stringify(state), cookieExpiration(60));
            };

            cs.removeItem = function(key) {
                setCookie(key, '', cookieExpiration(-100));
            };

            var cookieExpiration = function (minutes) {
                var exp = new Date();
                exp.setTime(exp.getTime() + (minutes*60*1000));
                return exp;
            };

            var getCookie = function (key) {
                var name = key + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return '';
            };

            var setCookie = function (key, value, expirationDate) {
                var cookie = key + '=' + value + '; '
                    + 'expires=' + expirationDate.toUTCString() + '; ';
                document.cookie = cookie;
            }
        };

        function createCallbackStorage() {
            try {
                return new LocalStorage();
            } catch (err) {
            }

            return new CookieStorage();
        }

        var CallbackParser = function(uriToParse, responseMode) {
            if (!(this instanceof CallbackParser)) {
                return new CallbackParser(uriToParse, responseMode);
            }
            var parser = this;

            var initialParse = function() {
                var baseUri = null;
                var queryString = null;
                var fragmentString = null;

                var questionMarkIndex = uriToParse.indexOf("?");
                var fragmentIndex = uriToParse.indexOf("#", questionMarkIndex + 1);
                if (questionMarkIndex == -1 && fragmentIndex == -1) {
                    baseUri = uriToParse;
                } else if (questionMarkIndex != -1) {
                    baseUri = uriToParse.substring(0, questionMarkIndex);
                    queryString = uriToParse.substring(questionMarkIndex + 1);
                    if (fragmentIndex != -1) {
                        fragmentIndex = queryString.indexOf("#");
                        fragmentString = queryString.substring(fragmentIndex + 1);
                        queryString = queryString.substring(0, fragmentIndex);
                    }
                } else {
                    baseUri = uriToParse.substring(0, fragmentIndex);
                    fragmentString = uriToParse.substring(fragmentIndex + 1);
                }

                return { baseUri: baseUri, queryString: queryString, fragmentString: fragmentString };
            }

            var parseParams = function(paramString) {
                var result = {};
                var params = paramString.split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = params[i].split('=');
                    var paramName = decodeURIComponent(p[0]);
                    var paramValue = decodeURIComponent(p[1]);
                    result[paramName] = paramValue;
                }
                return result;
            }

            var handleQueryParam = function(paramName, paramValue, oauth) {
                var supportedOAuthParams = [ 'code', 'state', 'error', 'error_description' ];

                for (var i = 0 ; i< supportedOAuthParams.length ; i++) {
                    if (paramName === supportedOAuthParams[i]) {
                        oauth[paramName] = paramValue;
                        return true;
                    }
                }
                return false;
            }


            parser.parseUri = function() {
                var parsedUri = initialParse();

                var queryParams = {};
                if (parsedUri.queryString) {
                    queryParams = parseParams(parsedUri.queryString);
                }

                var oauth = { newUrl: parsedUri.baseUri };
                for (var param in queryParams) {
                    switch (param) {
                        case 'redirect_fragment':
                            oauth.fragment = queryParams[param];
                            break;
                        default:
                            if (responseMode != 'query' || !handleQueryParam(param, queryParams[param], oauth)) {
                                oauth.newUrl += (oauth.newUrl.indexOf('?') == -1 ? '?' : '&') + param + '=' + encodeURIComponent(queryParams[param]);
                            }
                            break;
                    }
                }

                if (responseMode === 'fragment') {
                    var fragmentParams = {};
                    if (parsedUri.fragmentString) {
                        fragmentParams = parseParams(parsedUri.fragmentString);
                    }
                    for (var param in fragmentParams) {
                        oauth[param] = fragmentParams[param];
                    }
                }

                return oauth;
            }
        }

    }

    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = Keycloak;
    } else {
        window.Keycloak = Keycloak;

        if ( true ) {
            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return Keycloak; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        }
    }
})( window );
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(224)(module)))

/***/ }),

/***/ 704:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, 
        // private storage: Storage,
        // public geolocation: Geolocation,
        _config, 
        // public toastCtrl: ToastController,
        // public app: App,
        keyboard) {
        this._config = _config;
        this.keyboard = keyboard;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            //(<any>window).navigator.splashscreen.hide();
        });
        this.keyboard.hideKeyboardAccessoryBar(false);
        this.keyboard.disableScroll(true); //当输入焦点时，防止本机UIScrollView移动。
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
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Platform"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Config"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Config"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]) === "function" && _e || Object])
], MyApp);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 705:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_create_project_create__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







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
        this.appService.httpGet("item/searchByCondition", { "itemStartTime": dateString, "endTime": dateString, "itemIsEnd": "0", "page": 1, "limit": 100 }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.projects = data.data;
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
            this.namevalue = "ios-calendar-outline";
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
        selector: 'page-home',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n\n    </ion-title>\n    <ion-buttons end >\n      <button ion-button (click)="onChangeType($event)" id="btMode">\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name={{namevalue}} >\n        </ion-icon>\n      </button>\n      <button ion-button (click)="onClickSearch()">\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name="appname-search" >\n        </ion-icon>\n      </button>\n      <button ion-button (click)="onCreateProject()">\n        <ion-icon style="color: #fc5c53; margin-right: 5px" name="appname-add" >\n        </ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content fullscreen>\n  <div [hidden]="type==2" no-padding no-margin>\n    <calendar id="calendar" (onChange)="onSelectDate($event)" (onChangeMonth)="onChangeMonthProject($event)">\n\n    </calendar>\n\n    <div style="margin-top: 10px; height: 1px; background-color: #c5c6c7; width: 100%"></div>\n    <ion-item (click)="onClickProject(project)" *ngFor="let project of projects">\n      <ion-label no-padding no-margin text-center float-left\n                 [ngClass]="{\'circle_home\':1===1,\'nostart\':project.itemState==\'07010010\',\'ing\':project.itemState==\'07010020\'|| project.itemState==\'07010030\',\'end\':project.itemState==\'07010040\'}">{{project.itemLevel}}</ion-label>\n          <!--<div [ngClass]="{\'circle_nostart\':project.itemState==\'未启动\',\'circle_ing\':project.itemState==\'进行中\',\'circle_end\':project.itemState==\'已结束\'}"></div>-->\n        <ion-label no-padding no-margin float-left class="pj-name" [ngStyle]="{\'color\':project.itemState==\'07010030\'?\'#fc780e\':\'black\'}">{{project.itemName}}</ion-label>\n        </ion-item>\n      </div>\n    <div [hidden]="type==1" no-padding no-margin>\n      <div no-margin no-padding style="background-color: #ececec; height: 50px">\n        <ion-label no-margin no-padding float-left style="margin-left: 10px; line-height: 50px">开始日期</ion-label>\n        <ion-label no-margin no-padding float-left style="margin-left: 50px; line-height: 50px">项目名称</ion-label>\n        <div float-end style="position: relative; width: 120px; height: 100%">\n          <div no-margin no-padding style="position:absolute; top: 4px; right: 10px; height: 40%; width: 100%">\n            <div style="float: left">\n              <div style="width: 10px; height: 10px; background-color: #fc780e; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">进行中</ion-label>\n            </div>\n            <div style="float: right">\n              <div style="width: 10px; height: 10px; background-color: #10c619; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">未开始</ion-label>\n            </div>\n          </div>\n          <div no-margin no-padding style="position:absolute; bottom: 0px; right: 10px; height: 40%; width: 100%">\n            <div style="float: left">\n              <div style="width: 10px; height: 10px; background-color: #fc780e; float: left"></div>\n              <ion-label float-left no-margin no-padding style="line-height: 12px">延期中</ion-label>\n            </div>\n           <div style="float: right">\n            <div style="width: 10px; height: 10px; background-color: #c1c8d2; float: left"></div>\n            <ion-label float-left no-margin no-padding style="line-height: 12px">已完成</ion-label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div *ngFor="let project of projectsOnMonth" style="position: relative; height: 50px; border-bottom: solid 1px #ececec" (click)="onClickProject(project)">\n      <ion-label float-left no-margin no-padding class="list_day">{{project.itemStartTime | DayPipe}}</ion-label>\n      <ion-label float-left no-margin no-padding class="list_weekday">{{project.itemStartTime | WeekayPipe}}</ion-label>\n      <ion-label float-left no-margin no-padding text-center\n          [ngClass]="{\'list_circle\':1===1,\'nostart\':project.itemState==\'07010010\',\'ing\':project.itemState==\'07010020\'|| project.itemState==\'07010030\',\'end\':project.itemState==\'07010040\'}">{{project.itemLevel}}</ion-label>\n      <ion-label float-left no-margin no-padding class="list_itemname">{{project.itemName}}</ion-label>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 706:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_test__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__ = __webpack_require__(708);
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

/***/ 707:
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

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(12);
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
        this.weekDays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        this.pastDates = [];
        this.rows = [];
        this.dayHasProject = [];
        this.stop = false;
        this.todayEvents = [];
        //this.setUpWeekDaysLabels();
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
            var itemStartTime = object.itemStartTime;
            var day = "1970-01-01";
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
        while (tmp.getMonth() == this.currentDate.getMonth()) {
            /* Pushes a new empty row */
            this.rows.push(['', '', '', '', '', '', '']);
            while (tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()) {
                /* Populates the row only where needed */
                this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
                tmp.setDate(tmp.getDate() + 1);
            }
            if (tmp.getMonth() == this.currentDate.getMonth())
                this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
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
        this.appService.httpGet("item/searchByCondition", { "itemStartTime": firstDateString, "endTime": lastDateString, "itemIsEnd": "0", "page": "1", "limit": "100" }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.dayHasProject = data.data;
                view.onChangeMonth.emit(view.dayHasProject);
                for (var i = 0; i < view.dayHasProject.length; i++) {
                    var object = view.dayHasProject[i];
                    var itemStartTime = object.itemStartTime;
                    var day = "1970-01-01";
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
        selector: 'calendar',template:/*ion-inline-start:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/calendar/calendar.html"*/'<!-- Generated template for the CalendarComponent component -->\n<div>\n  <ion-grid no-padding no-margin>\n    <ion-row class="calendar-controls" no-padding no-margin>\n      <ion-col no-padding no-margin text-right class="titleCol">\n        <button ion-button icon-only clear (click)="previousMonth()">\n          <ion-icon name="arrow-back"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col no-margin no-padding text-center class="selectedDateLabel" (click)="openCalendar($event)">\n        <h5 no-padding no-margin class="selectedMonthLabel">{{ currentDate | date:\'yyyy-MM\' }}</h5>\n        <!--<ion-item no-lines style="background-color: #32db64">-->\n          <!--<ion-datetime no-padding no-margin class="selectedMonthLabel" text-center displayFormat="YYYY-MM" max="2030" min="1979" cancelText="取消" doneText="确认"-->\n                        <!--ngModel="{{currentDate | date:\'yyyy-MM\'}}"-->\n                        <!--(ngModelChange)="currentDate = $event"></ion-datetime>-->\n        <!--</ion-item>-->\n        <!--<ion-multi-picker item-content [multiPickerColumns]="simpleColumns"></ion-multi-picker>>-->\n        <!--<button *ngIf="showTodayButton" (click)="setToday()" ion-button small outline>{{ todayText }}</button>-->\n      </ion-col>\n      <ion-col no-padding no-margin text-left class="titleCol">\n        <button ion-button icon-only clear (click)="nextMonth()">\n          <ion-icon name="arrow-forward"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class="calendar-weekDays">\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[0] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[1] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[2] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[3] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[4] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[5] }}\n      </ion-col>\n      <ion-col text-center class="calendar-week-day">\n        {{ weekDays[6] }}\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid (swipeleft)="useSwipe && nextMonth()" (swiperight)="useSwipe && previousMonth()">\n    <ion-row *ngFor="let row of rows" class="calendar-row">\n      <ion-col no-padding *ngFor="let day of row; let i = index" text-center class="calendar-col">\n        <button no-padding block class="calendar-day" *ngIf="day" ion-button clear (click)="dateClicked(day)"\n                id="calendar-day-{{day}}" [disabled]="pastDates.indexOf(day) > -1 || weekDaysToDisable.indexOf(i) > -1 || daysToDisable.indexOf(day) > -1">\n          {{ day }}\n          <div class="dot" id="dot-{{day}}"></div>\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <!--<ion-list *ngIf="showEventsList">-->\n    <!--<button text-wrap ion-item *ngFor="let event of todayEvents" (click)="eventClicked(event)">-->\n      <!--{{ event.title }}-->\n      <!--<ion-icon name="arrow-forward" hideWhen="ios" item-right></ion-icon>-->\n    <!--</button>-->\n  <!--</ion-list>-->\n</div>\n'/*ion-inline-end:"/Users/zhaoliangchen/Desktop/qipaipm-company/src/components/calendar/calendar.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */]]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["ModalController"], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["Events"]])
], CalendarComponent);

//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 269,
	"./af.js": 269,
	"./ar": 270,
	"./ar-dz": 271,
	"./ar-dz.js": 271,
	"./ar-kw": 272,
	"./ar-kw.js": 272,
	"./ar-ly": 273,
	"./ar-ly.js": 273,
	"./ar-ma": 274,
	"./ar-ma.js": 274,
	"./ar-sa": 275,
	"./ar-sa.js": 275,
	"./ar-tn": 276,
	"./ar-tn.js": 276,
	"./ar.js": 270,
	"./az": 277,
	"./az.js": 277,
	"./be": 278,
	"./be.js": 278,
	"./bg": 279,
	"./bg.js": 279,
	"./bn": 280,
	"./bn.js": 280,
	"./bo": 281,
	"./bo.js": 281,
	"./br": 282,
	"./br.js": 282,
	"./bs": 283,
	"./bs.js": 283,
	"./ca": 284,
	"./ca.js": 284,
	"./cs": 285,
	"./cs.js": 285,
	"./cv": 286,
	"./cv.js": 286,
	"./cy": 287,
	"./cy.js": 287,
	"./da": 288,
	"./da.js": 288,
	"./de": 289,
	"./de-at": 290,
	"./de-at.js": 290,
	"./de-ch": 291,
	"./de-ch.js": 291,
	"./de.js": 289,
	"./dv": 292,
	"./dv.js": 292,
	"./el": 293,
	"./el.js": 293,
	"./en-au": 294,
	"./en-au.js": 294,
	"./en-ca": 295,
	"./en-ca.js": 295,
	"./en-gb": 296,
	"./en-gb.js": 296,
	"./en-ie": 297,
	"./en-ie.js": 297,
	"./en-nz": 298,
	"./en-nz.js": 298,
	"./eo": 299,
	"./eo.js": 299,
	"./es": 300,
	"./es-do": 301,
	"./es-do.js": 301,
	"./es.js": 300,
	"./et": 302,
	"./et.js": 302,
	"./eu": 303,
	"./eu.js": 303,
	"./fa": 304,
	"./fa.js": 304,
	"./fi": 305,
	"./fi.js": 305,
	"./fo": 306,
	"./fo.js": 306,
	"./fr": 307,
	"./fr-ca": 308,
	"./fr-ca.js": 308,
	"./fr-ch": 309,
	"./fr-ch.js": 309,
	"./fr.js": 307,
	"./fy": 310,
	"./fy.js": 310,
	"./gd": 311,
	"./gd.js": 311,
	"./gl": 312,
	"./gl.js": 312,
	"./gom-latn": 313,
	"./gom-latn.js": 313,
	"./he": 314,
	"./he.js": 314,
	"./hi": 315,
	"./hi.js": 315,
	"./hr": 316,
	"./hr.js": 316,
	"./hu": 317,
	"./hu.js": 317,
	"./hy-am": 318,
	"./hy-am.js": 318,
	"./id": 319,
	"./id.js": 319,
	"./is": 320,
	"./is.js": 320,
	"./it": 321,
	"./it.js": 321,
	"./ja": 322,
	"./ja.js": 322,
	"./jv": 323,
	"./jv.js": 323,
	"./ka": 324,
	"./ka.js": 324,
	"./kk": 325,
	"./kk.js": 325,
	"./km": 326,
	"./km.js": 326,
	"./kn": 327,
	"./kn.js": 327,
	"./ko": 328,
	"./ko.js": 328,
	"./ky": 329,
	"./ky.js": 329,
	"./lb": 330,
	"./lb.js": 330,
	"./lo": 331,
	"./lo.js": 331,
	"./lt": 332,
	"./lt.js": 332,
	"./lv": 333,
	"./lv.js": 333,
	"./me": 334,
	"./me.js": 334,
	"./mi": 335,
	"./mi.js": 335,
	"./mk": 336,
	"./mk.js": 336,
	"./ml": 337,
	"./ml.js": 337,
	"./mr": 338,
	"./mr.js": 338,
	"./ms": 339,
	"./ms-my": 340,
	"./ms-my.js": 340,
	"./ms.js": 339,
	"./my": 341,
	"./my.js": 341,
	"./nb": 342,
	"./nb.js": 342,
	"./ne": 343,
	"./ne.js": 343,
	"./nl": 344,
	"./nl-be": 345,
	"./nl-be.js": 345,
	"./nl.js": 344,
	"./nn": 346,
	"./nn.js": 346,
	"./pa-in": 347,
	"./pa-in.js": 347,
	"./pl": 348,
	"./pl.js": 348,
	"./pt": 349,
	"./pt-br": 350,
	"./pt-br.js": 350,
	"./pt.js": 349,
	"./ro": 351,
	"./ro.js": 351,
	"./ru": 352,
	"./ru.js": 352,
	"./sd": 353,
	"./sd.js": 353,
	"./se": 354,
	"./se.js": 354,
	"./si": 355,
	"./si.js": 355,
	"./sk": 356,
	"./sk.js": 356,
	"./sl": 357,
	"./sl.js": 357,
	"./sq": 358,
	"./sq.js": 358,
	"./sr": 359,
	"./sr-cyrl": 360,
	"./sr-cyrl.js": 360,
	"./sr.js": 359,
	"./ss": 361,
	"./ss.js": 361,
	"./sv": 362,
	"./sv.js": 362,
	"./sw": 363,
	"./sw.js": 363,
	"./ta": 364,
	"./ta.js": 364,
	"./te": 365,
	"./te.js": 365,
	"./tet": 366,
	"./tet.js": 366,
	"./th": 367,
	"./th.js": 367,
	"./tl-ph": 368,
	"./tl-ph.js": 368,
	"./tlh": 369,
	"./tlh.js": 369,
	"./tr": 370,
	"./tr.js": 370,
	"./tzl": 371,
	"./tzl.js": 371,
	"./tzm": 372,
	"./tzm-latn": 373,
	"./tzm-latn.js": 373,
	"./tzm.js": 372,
	"./uk": 374,
	"./uk.js": 374,
	"./ur": 375,
	"./ur.js": 375,
	"./uz": 376,
	"./uz-latn": 377,
	"./uz-latn.js": 377,
	"./uz.js": 376,
	"./vi": 378,
	"./vi.js": 378,
	"./x-pseudo": 379,
	"./x-pseudo.js": 379,
	"./yo": 380,
	"./yo.js": 380,
	"./zh-cn": 381,
	"./zh-cn.js": 381,
	"./zh-hk": 382,
	"./zh-hk.js": 382,
	"./zh-tw": 383,
	"./zh-tw.js": 383
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
webpackContext.id = 711;

/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipes_delay_delay__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_year_year__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_month_month__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__day_day__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weekay_weekay__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__year_and_month_year_and_month__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stamp_to_date_stamp_to_date__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemlevel_itemlevel__ = __webpack_require__(725);
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

/***/ 718:
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

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(27);
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

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(27);
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

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(27);
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

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeekayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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
        if (typeof (value) == 'string') {
            var date = new Date(value.replace(/-/g, "/"));
            switch (date.getDay()) {
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

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearAndMonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(27);
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

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StampToDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_config__ = __webpack_require__(27);
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

/***/ 725:
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

},[390]);
//# sourceMappingURL=main.js.map