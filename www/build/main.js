webpackJsonp([1],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectCreatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contact_contact__ = __webpack_require__(42);
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
    function ProjectCreatePage(navCtrl, navParams, alertCtrl, appService, toastCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
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
        this.appService.httpPost("item/create", this.project, this, function (view, res) {
            var data = res.json();
            view.events.publish('homeCreateProject', data);
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
            planTime: new __WEBPACK_IMPORTED_MODULE_2__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: "",
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
    return ProjectCreatePage;
}());
ProjectCreatePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-project-create',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\project-create\project-create.html"*/'<!--\n\n  Generated template for the ProjectCreatePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header >\n\n  <ion-navbar >\n\n    <ion-title>{{viewTitle}}</ion-title>\n\n    <ion-buttons end >\n\n      <button ion-button (click)="onPublish()" color="danger">\n\n        {{this.project.itemName.length>0?"完成":"发布"}}\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content fullscreen>\n\n    <ion-list no-margin no-lines no-padding style="border-top: solid 10px #f5f6f7; border-bottom: solid 10px #f5f6f7;">\n\n      <ion-item>\n\n        <ion-icon item-start name="appname-pname"></ion-icon>\n\n        <ion-label>项目名称</ion-label>\n\n        <ion-input item-end text-right placeholder="请输入项目名称" [(ngModel)]="project.itemName"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目启动</ion-label>\n\n    </div>\n\n    <ion-list no-lines no-padding no-margin style="border-bottom: solid 10px #f5f6f7;">\n\n      <ion-item style="border-bottom: solid 1px #ececec;">\n\n        <ion-icon item-start name="appname-time"></ion-icon>\n\n        <ion-label>交付时间</ion-label>\n\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" [(ngModel)]="project.itemStartTime" cancelText="取消" doneText="确认"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item style="border-bottom: solid 1px #ececec;">\n\n        <ion-icon item-start name="appname-result"></ion-icon>\n\n        <ion-label>交付成果</ion-label>\n\n        <ion-input item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemStartResult" required></ion-input>\n\n      </ion-item>\n\n      <ion-item >\n\n        <ion-icon item-start name="appname-plan"></ion-icon>\n\n        <ion-label>项目级别</ion-label>\n\n        <ion-select interface="action-sheet" [(ngModel)]="project.itemLevel" cancelText="取消" doneText="确认">\n\n          <ion-option value="1">一级</ion-option>\n\n          <ion-option value="2">二级</ion-option>\n\n          <ion-option value="3">三级</ion-option>\n\n          <ion-option value="4">四级</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n    </ion-list>\n\n\n\n    <div style="border-bottom: solid 10px #f5f6f7;" *ngFor="let mile of project.children">\n\n      <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n\n        <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n\n        <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{mile.milestoneName}}</ion-label>\n\n        <div style="float: right; width: 30px; height: 30px;position: relative">\n\n          <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onClickRemoveMilestone($event, mile)"></ion-icon>\n\n        </div>\n\n      </div>\n\n      <ion-list no-lines no-margin no-padding>\n\n        <ion-item style="border-bottom: solid 1px #ececec">\n\n          <ion-icon item-start name="appname-admin"></ion-icon>\n\n          <ion-label>负责人</ion-label>\n\n          <ion-input item-end text-right [(ngModel)]="mile.leader"></ion-input>\n\n        </ion-item>\n\n        <ion-item style="border-bottom: solid 1px #ececec">\n\n          <ion-icon item-start name="appname-time"></ion-icon>\n\n          <ion-label>交付时间</ion-label>\n\n          <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认"\n\n                        ngModel="{{mile.planTime | stampToDate}}"\n\n                        (ngModelChange)="mile.planTime = $event"></ion-datetime>\n\n        </ion-item>\n\n        <ion-item style="border-bottom: solid 1px #ececec">\n\n          <ion-icon item-start name="appname-plan"></ion-icon>\n\n          <ion-label>项目进度</ion-label>\n\n          <ion-select interface="action-sheet" [(ngModel)]="mile.itemProgress" cancelText="取消" doneText="确认">\n\n            <ion-option value="10%">10%</ion-option>\n\n            <ion-option value="20%">20%</ion-option>\n\n            <ion-option value="30%">30%</ion-option>\n\n            <ion-option value="40%">40%</ion-option>\n\n            <ion-option value="50%">50%</ion-option>\n\n            <ion-option value="60%">60%</ion-option>\n\n            <ion-option value="70%">70%</ion-option>\n\n            <ion-option value="80%">80%</ion-option>\n\n            <ion-option value="90%">90%</ion-option>\n\n            <ion-option value="100%">100%</ion-option>\n\n          </ion-select>\n\n        </ion-item>\n\n        <ion-item>\n\n          <ion-icon item-start name="appname-result"></ion-icon>\n\n          <ion-label>交付成果</ion-label>\n\n          <ion-textarea item-end text-right [(ngModel)]="mile.deliveryResult"></ion-textarea>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n\n\n\n\n    <div style="padding: 10px; border-bottom: solid 10px #f5f6f7">\n\n      <button ion-button (click)="onAddMilestone()" style="background-color: #fc5c53" block>+ 添加里程碑</button>\n\n    </div>\n\n\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec">\n\n      <div style="width: 5px; height: 30px; background-color: orange; float: left;"></div>\n\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">项目结束</ion-label>\n\n    </div>\n\n    <ion-list no-lines no-margin no-padding>\n\n      <button ion-item style="border-bottom: solid 1px #ececec" (click)="onEndDirector($event)">\n\n        <ion-icon item-start name="appname-admin"></ion-icon>\n\n        <ion-label item-start>负责人</ion-label>\n\n        <!--<ion-input item-end text-right placeholder="请输入负责人" [(ngModel)]="project.itemLeader"></ion-input>-->\n\n        <ion-label item-end text-right>{{project.leader}}</ion-label>\n\n      </button>\n\n      <ion-item  style="border-bottom: solid 1px #ececec">\n\n        <ion-icon item-start name="appname-time"></ion-icon>\n\n        <ion-label>交付时间</ion-label>\n\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认" [(ngModel)]="project.endTime"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item>\n\n        <ion-icon item-start name="appname-result"></ion-icon>\n\n        <ion-label>交付成果</ion-label>\n\n        <ion-textarea item-end text-right placeholder="请输入交付成果" [(ngModel)]="project.itemEndResult"></ion-textarea>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-content>\n\n\n\n\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\project-create\project-create.html"*/,
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
    ,
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], ProjectCreatePage);

//# sourceMappingURL=project-create.js.map

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilestoneDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__contact_contact__ = __webpack_require__(42);
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
    function MilestoneDetailPage(navCtrl, navParams, alertCtrl, appService, cd, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
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
            if (param.itemIsEnd == false) {
                param.itemState = '进行中';
            }
            else {
                param.itemState = '已结束';
            }
            this.appService.httpPost("item/create", param, this, function (view, res) {
                console.log(res);
                if (res.status == 200) {
                    view.tempMilestone = res.json();
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
            deliveryTime: '',
            deliveryResult: '',
            planTime: new __WEBPACK_IMPORTED_MODULE_3__angular_common__["c" /* DatePipe */]('en-US').transform(new Date(), 'yyyy-MM-dd'),
            realTime: '',
            isAccomplish: false,
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], MilestoneDetailPage.prototype, "content", void 0);
MilestoneDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-milestone-detail',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\milestone-detail\milestone-detail.html"*/'<!--\n\n  Generated template for the MilestoneDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>\n\n      {{this.type==1?"新建里程碑":"里程碑详情"}}\n\n    </ion-title>\n\n    <ion-buttons end >\n\n      <button ion-button (click)="onSaveMilestone($event)" style="color: #fc5c53">\n\n        保存\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content fullscreen>\n\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n\n    <ion-item >\n\n      <ion-icon item-start name="appname-pname"></ion-icon>\n\n      <ion-label>项目名称:</ion-label>\n\n      <ion-label right text-right>{{this.project.itemName}}</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-label full style="text-align: center">{{tempMilestone.milestoneName}}</ion-label>\n\n\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onMilestoneLeader($event)" >\n\n      <ion-icon item-start name="appname-admin"></ion-icon>\n\n      <ion-label item-start>负责人:</ion-label>\n\n      <ion-label item-end text-right>{{tempMilestone.leader}}</ion-label>\n\n    </button>\n\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n\n      <!--<ion-label>负责人:</ion-label>-->\n\n      <!--<ion-input text-right type="text" [(ngModel)]="tempMilestone.milestoneLeader" required [disabled]=""></ion-input>-->\n\n    <!--</ion-item>-->\n\n    <ion-item style="border-bottom: solid 1px #ececec;">\n\n      <ion-icon item-start name="appname-time"></ion-icon>\n\n      <ion-label>交付时间:</ion-label>\n\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min="2015" cancelText="取消" doneText="确认" required [disabled]=""\n\n                    ngModel="{{tempMilestone.planTime | stampToDate}}"\n\n                    (ngModelChange)="tempMilestone.planTime = $event">\n\n      </ion-datetime>\n\n    </ion-item>\n\n    <ion-item style="border-bottom: solid 1px #ececec">\n\n      <ion-icon item-start name="appname-plan"></ion-icon>\n\n      <ion-label>项目进度</ion-label>\n\n      <ion-select interface="action-sheet" [(ngModel)]="tempMilestone.itemProgress">\n\n        <ion-option value="10%">10%</ion-option>\n\n        <ion-option value="20%">20%</ion-option>\n\n        <ion-option value="30%">30%</ion-option>\n\n        <ion-option value="40%">40%</ion-option>\n\n        <ion-option value="50%">50%</ion-option>\n\n        <ion-option value="60%">60%</ion-option>\n\n        <ion-option value="70%">70%</ion-option>\n\n        <ion-option value="80%">80%</ion-option>\n\n        <ion-option value="90%">90%</ion-option>\n\n        <ion-option value="100%">100%</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n    <ion-item style="border-bottom: solid 1px #ececec;">\n\n      <ion-icon item-start name="appname-result"></ion-icon>\n\n      <ion-label no-padding no-margin>交付成果:</ion-label>\n\n      <ion-input text-right type="text" [(ngModel)]="tempMilestone.deliveryResult" required [disabled]=""></ion-input>\n\n    </ion-item>\n\n    <ion-item *ngIf="tempMilestone.delay > 0" style="border-bottom: solid 1px #ececec;">\n\n      <ion-label >延迟情况:</ion-label>\n\n      <ion-label text-right item-end></ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-list no-lines no-padding no-margin *ngIf="this.tempMilestone.id.length>0">\n\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n\n      <div item-start>是否完成</div>\n\n      <ion-label>完成</ion-label>\n\n      <ion-checkbox [(ngModel)]="tempMilestone.itemIsEnd"></ion-checkbox>\n\n    </ion-item>\n\n    <ion-item style="border-bottom: solid 10px #ececec; height: 100px;">\n\n      <ion-label item-start>备注:</ion-label>\n\n      <ion-textarea item-end no-padding no-margin [(ngModel)]="tempMilestone.remark"></ion-textarea>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <div *ngFor="let subtask of tempMilestone.children; let i = index">\n\n    <div style="height: 30px; border-bottom: solid 1px #ececec; ">\n\n      <div style="width: 5px; height: 30px; background-color: #555555; float: left;"></div>\n\n      <ion-label no-margin no-padding style="line-height: 30px; margin-left: 10px; float: left;">{{subtask.subtaskName}}</ion-label>\n\n      <div style="float: right; width: 30px; height: 30px;position: relative">\n\n        <ion-icon name="close" style="position: absolute; top: 50%; right: 0px; -webkit-transform: translateY(-50%); transform: translateY(-50%); margin-right: 10px; " (click)="onRemoveSubtask($event, subtask)"></ion-icon>\n\n      </div>\n\n    </div>\n\n    <ion-list no-lines no-padding no-margin>\n\n      <ion-item style="border-bottom: solid 1px #ececec;">\n\n        <ion-icon item-start name="appname-admin"></ion-icon>\n\n        <ion-label>负责人:</ion-label>\n\n        <ion-input text-right type="text" [(ngModel)]="subtask.leader" required [disabled]="type==2"></ion-input>\n\n      </ion-item>\n\n      <ion-item style="border-bottom: solid 1px #ececec;">\n\n        <ion-icon item-start name="appname-time"></ion-icon>\n\n        <ion-label>交付时间</ion-label>\n\n        <ion-datetime item-end displayFormat="YYYY年MM月DD日" max="2030" min="2015" cancelText="取消" doneText="确认"\n\n                      ngModel="{{subtask.planTime | stampToDate}}"\n\n                      (ngModelChange)="subtask.planTime = $event"\n\n                      [disabled]="type==2"></ion-datetime>\n\n      </ion-item>\n\n      <ion-item style="border-bottom: solid 10px #ececec;">\n\n        <ion-icon item-start name="appname-result"></ion-icon>\n\n        <ion-label no-padding no-margin>交付成果:</ion-label>\n\n        <ion-input text-right type="text" [(ngModel)]="subtask.deliveryResult" required [disabled]="type==2"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n\n\n  <div style="padding: 10px;" *ngIf="this.tempMilestone.id.length>0">\n\n    <button ion-button (click)="onAddSubtask($event)" block style="background-color: #fc5c53">+ 添加子任务</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\milestone-detail\milestone-detail.html"*/,
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["k" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], MilestoneDetailPage);

//# sourceMappingURL=milestone-detail.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubtaskPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contact_contact__ = __webpack_require__(42);
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
            deliveryTime: '',
            deliveryResult: '',
            planTime: '',
            realTime: '',
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
        if (param.itemIsEnd == false) {
            param.itemState = '进行中';
        }
        else {
            param.itemState = '已结束';
        }
        //param.sid = this.tempSubtask.id;
        this.appService.httpPost("item/create", param, this, function (view, res) {
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-subtask',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\subtask\subtask.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>子任务</ion-title>\n\n    <ion-buttons end >\n\n      <button ion-button (click)="onSaveSubtask()" color="danger">\n\n        保存\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content fullscreen>\n\n  <ion-list no-padding no-lines style="margin-bottom: 0px; border-bottom: solid 1px #ececec">\n\n    <ion-item >\n\n      <ion-icon item-start name="appname-pname"></ion-icon>\n\n      <ion-label>项目名称:</ion-label>\n\n      <ion-label right text-right>{{projectname}}</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-label full class="subtask-title-css">{{tempSubtask.subtaskName}}</ion-label>\n\n\n\n  <ion-list no-lines style="border: solid 1px #ececec">\n\n    <button ion-item style="border-bottom: solid 1px #ececec" (click)="onSubtaskLeader($event)">\n\n      <ion-icon item-start name="appname-admin"></ion-icon>\n\n      <ion-label item-start>负责人:</ion-label>\n\n      <ion-label item-end text-right>{{tempSubtask.leader}}</ion-label>\n\n    </button>\n\n    <!--<ion-item style="border-bottom: solid 1px #ececec;">-->\n\n      <!--<ion-icon item-start name="appname-admin"></ion-icon>-->\n\n      <!--<ion-label>负责人:</ion-label>-->\n\n      <!--<ion-input text-right type="text" [(ngModel)]="tempSubtask.subtaskLeader" required [disabled]=""></ion-input>-->\n\n    <!--</ion-item>-->\n\n    <ion-item style="border-bottom: solid 1px #ececec;">\n\n      <ion-icon item-start name="appname-time"></ion-icon>\n\n      <ion-label>交付时间:</ion-label>\n\n      <ion-datetime text-right displayFormat="YYYY-MM-DD" max="2030" min="2015" cancelText="取消" doneText="确认"\n\n                    ngModel="{{tempSubtask.planTime | stampToDate}}"\n\n                    (ngModelChange)="tempSubtask.planTime = $event"></ion-datetime>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-icon item-start name="appname-result"></ion-icon>\n\n      <ion-label>交付成果:</ion-label>\n\n      <ion-input text-right type="text" [(ngModel)]=tempSubtask.deliveryResult></ion-input>\n\n    </ion-item>\n\n    <ion-item *ngIf="tempSubtask.delayDays>0">\n\n      <ion-label>延迟情况:</ion-label>\n\n      <ion-label text-right item-end>{{tempSubtask.delayDays | delayPipe}}</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-list no-lines="" [hidden]="this.type==1">\n\n    <ion-item style="border-top: solid 1px #ececec;border-bottom: solid 1px #ececec">\n\n      <div item-start>是否完成</div>\n\n      <ion-label>完成</ion-label>\n\n      <ion-checkbox [(ngModel)]=tempSubtask.itemIsEnd></ion-checkbox>\n\n    </ion-item>\n\n    <ion-item style="border-bottom: solid 1px #ececec; height: 100px;">\n\n      <ion-label item-start>备注:</ion-label>\n\n      <ion-textarea item-end [(ngModel)]=tempSubtask.remark></ion-textarea>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\subtask\subtask.html"*/,
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], SubtaskPage);

//# sourceMappingURL=subtask.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProjectDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subtask_subtask__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__project_create_project_create__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(21);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        template: "\n    <ion-list>\n      <ion-item (click)=\"onClickEdit($event)\">\n        <ion-icon name=\"appname-edit\" item-start></ion-icon>\n        \u7F16\u8F91\n      </ion-item>\n      <ion-item (click)=\"onClickShare($event)\">\n        <ion-icon name=\"appname-share\" item-start></ion-icon>\n        \u5206\u4EAB\n      </ion-item>\n      <ion-item (click)=\"onClickDelete($event)\">\n        <ion-icon name=\"appname-delete\" item-start></ion-icon>\n        \u5220\u9664\n      </ion-item>\n      <ion-item (click)=\"onClickFinish($event)\">\n        <ion-icon name=\"appname-finish\" item-start></ion-icon>\n        \u7ED3\u675F\n      </ion-item>\n      <ion-item (click)=\"onClickDelay($event)\">\n        <ion-icon name=\"appname-delay\" item-start></ion-icon>\n        \u5EF6\u671F\n      </ion-item>\n    </ion-list>\n  "
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
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
                        _this.project.children.push(milestone);
                    }
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
                        if (isIn == true) {
                            break;
                        }
                    }
                }
                resolve();
            });
        };
        this.project = this.navParams.get('project');
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
                console.log(res);
                if (res.status == 200) {
                    view.events.publish('homeDeleteProject', view.project);
                    view.navCtrl.pop();
                }
            }, true);
        });
        this.events.subscribe('onEndProject', function () {
            _this.project.itemIsEnd = true;
            _this.project.itemState = '已结束';
            _this.appService.httpPost("item/create", _this.project, _this, function (view, res) {
                var data = res.json();
                view.events.publish('homeCreateProject', data);
                var toast = view.toastCtrl.create({
                    message: '项目已结束!',
                    duration: 3000
                });
                toast.present();
                view.navCtrl.pop();
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
        console.log(mile);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */], {
            milestone: mile,
            project: this.project,
            callback: this.milestoneCallback,
            type: 2,
        });
    };
    ProjectDetailPage.prototype.onClickSubtask = function ($event, subtask) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__subtask_subtask__["a" /* SubtaskPage */], {
            subtask: subtask,
            projectname: this.project.itemName,
            callback: this.subtaskCallback
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
    return ProjectDetailPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('popoverContent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
], ProjectDetailPage.prototype, "content", void 0);
ProjectDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-project-detail',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\project-detail\project-detail.html"*/'<!--\n\n  Generated template for the ProjectDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      {{project.itemName}}\n\n    </ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="presentPopover($event)">\n\n        <ion-icon name="more" style="color: #fc5c53"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content #popoverContent fullscreen>\n\n  <div class="pj-item">\n\n    <div class="mile-bottom">\n\n      <div class="item1">\n\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.itemStartTime | MonthPipe}}</ion-label>\n\n        <section class="line"></section>\n\n        <ion-label style="margin-top: 3px;font-size: 10px">{{project.itemStartTime | YearPipe}}</ion-label>\n\n      </div>\n\n      <div class="item2">\n\n        <ion-icon name="ios-arrow-dropdown-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n\n        <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">启动</ion-label>\n\n        <!--<div style="width: 1px; background-color: #ececec; height: 100%; position: absolute; left: 20px" ></div>-->\n\n      </div>\n\n      <ion-icon name="appname-arrow" class="arrow-css1"></ion-icon>\n\n      <div class="item3-1">\n\n        <ion-row>\n\n          <ion-col col-5 style="float: left">\n\n            负责人：\n\n          </ion-col>\n\n          <ion-col col-7 style="float: right">\n\n            {{project.leader}}\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-5 style="float: left">\n\n            交付成果：\n\n          </ion-col>\n\n          <ion-col col-7 style="float: right">\n\n        <span class="item-right">\n\n          {{project.itemStartResult}}\n\n        </span>\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-5 style="float: left">\n\n            紧急程度：\n\n          </ion-col>\n\n          <ion-col col-7 style="float: right">\n\n        <span class="item-right">\n\n          {{project.itemLevel | itemlevelPipe}}\n\n        </span>\n\n          </ion-col>\n\n        </ion-row>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <!-- 里程碑  -->\n\n  <div class="pj-item" *ngFor="let mile of project.children; let i = index">\n\n    <div class="mile-top" id="{{mile.id}}">\n\n      <div style="width: 1px; background-color: #ececec; height: 100%; position: absolute; left: 65px; top: 0px" >\n\n\n\n      </div >\n\n      <div class="subtask-title" *ngIf="isExpand[i]==false ">\n\n        <ion-label no-margin no-padding text-center class=" horizontal-center" style="line-height: 25px; font-size: 15px">{{mile.children.length+"个子任务"}}</ion-label>\n\n      </div>\n\n      <div class="subtask-wrap" *ngIf="isExpand[i]==true ">\n\n        <div class="subtask-item" *ngFor="let subtask of mile.children" (click)="onClickSubtask($event, subtask)">\n\n          <div class="subtask-css" >\n\n            <ion-label class="subtask-left">子任务:</ion-label>\n\n            <ion-label class="subtask-right" >{{subtask.subtaskName}}</ion-label>\n\n          </div>\n\n          <div class="subtask-css" >\n\n            <ion-label class="subtask-left">交付时间:</ion-label>\n\n            <ion-label class="subtask-right" >{{subtask.planTime | stampToDate}}</ion-label>\n\n          </div>\n\n          <div class="subtask-css" >\n\n            <ion-label class="subtask-left">负责人:</ion-label>\n\n            <ion-label class="subtask-right" >{{subtask.leader}}</ion-label>\n\n          </div>\n\n        </div>\n\n      </div>\n\n      <ion-icon [name]="isExpand[i]==false?\'appname-expand\':\'appname-fold\'"  class="fold" (click)="onClickExpand($event, i)">\n\n\n\n      </ion-icon>\n\n    </div>\n\n    <div class="mile-bottom">\n\n      <div class="item1">\n\n        <ion-label style="margin-bottom: 3px;font-size: 10px">{{mile.planTime | MonthPipe}}</ion-label>\n\n        <section class="line"></section>\n\n        <ion-label style="margin-top: 3px;font-size: 10px">{{mile.planTime | YearPipe}}</ion-label>\n\n      </div>\n\n      <div class="item2">\n\n        <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n\n        <ion-label no-padding no-margin class="label-radius">{{mile.itemProgress}}</ion-label>\n\n        <ion-label no-padding no-margin class="mile-number">{{"里程碑"+(i+1)}}</ion-label>\n\n        <ion-label no-padding no-margin class="delay-radius1" [hidden]="mile.delayDays==0">{{"延期"+mile.delayDays+"天"}}</ion-label>\n\n      </div>\n\n      <!--[ngClass]="{\'arrow-css1\':mile.type==0,\'arrow-css2\':mile.type==1,\'arrow-css3\':mile.type==2}"-->\n\n      <ion-icon name="appname-arrow" class="arrow-css2" ></ion-icon>\n\n      <div class="item3-2" (click)="onClickMilestone($event, mile)">\n\n        <ion-row>\n\n          <ion-col col-5 style="float: left">\n\n            负责人：\n\n          </ion-col>\n\n          <ion-col col-7 style="float: right">\n\n            {{mile.leader}}\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-5 style="float: left">\n\n            交付成果：\n\n          </ion-col>\n\n          <ion-col col-7 style="float: right">\n\n        <span class="item-right">\n\n          {{mile.deliveryResult}}\n\n        </span>\n\n          </ion-col>\n\n        </ion-row>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n  <!-- 项目结束 -->\n\n  <div class="mile-bottom">\n\n    <div class="item1">\n\n      <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.endTime | MonthPipe}}</ion-label>\n\n      <section class="line"></section>\n\n      <ion-label style="margin-top: 3px;font-size: 10px">{{project.endTime | YearPipe}}</ion-label>\n\n    </div>\n\n    <div class="item2">\n\n      <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n\n      <ion-icon name="ios-arrow-dropup-circle" style="color: #fc5c53;padding-top: 15px"></ion-icon>\n\n      <ion-label no-padding no-margin style="margin-top: 3px;font-size: 10px;text-align: center">结束</ion-label>\n\n    </div>\n\n    <ion-icon name="appname-arrow" class="arrow-css1"></ion-icon>\n\n    <div class="item3-1">\n\n      <ion-row>\n\n        <ion-col col-5 style="float: left">\n\n          负责人：\n\n        </ion-col>\n\n        <ion-col col-7 style="float: right">\n\n          {{project.leader}}\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-5 style="float: left">\n\n          交付成果：\n\n        </ion-col>\n\n        <ion-col col-7 style="float: right">\n\n        <span class="item-right">\n\n          {{project.itemEndResult}}\n\n        </span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n  </div>\n\n\n\n  <!-- 项目延期 -->\n\n  <div *ngIf="project.delayDays>0" class="mile-bottom" style="margin-top: 5px">\n\n    <div class="item1">\n\n      <ion-label style="margin-bottom: 3px;font-size: 10px">{{project.delayTime | MonthPipe}}</ion-label>\n\n      <section class="line"></section>\n\n      <ion-label style="margin-top: 3px;font-size: 10px">{{project.delayTime | YearPipe}}</ion-label>\n\n    </div>\n\n    <div class="item2">\n\n      <!--<div style="width: 1px; background-color: #ececec; height: 10px; position: absolute; left: 20px; top: 0px" ></div>-->\n\n      <ion-label no-padding no-margin class="delay-radius2">延</ion-label>\n\n      <ion-label no-padding no-margin class="item2_text">延期</ion-label>\n\n    </div>\n\n    <ion-icon name="appname-arrow" class="arrow-css3"></ion-icon>\n\n    <div class="item3-3">\n\n      <ion-row>\n\n        <ion-col col-5 style="float: left">\n\n          负责人：\n\n        </ion-col>\n\n        <ion-col col-7 style="float: right">\n\n          {{project.leader}}\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-5 style="float: left">\n\n          交付成果：\n\n        </ion-col>\n\n        <ion-col col-7 style="float: right">\n\n        <span class="item-right">\n\n          {{project.itemEndResult}}\n\n        </span>\n\n        </ion-col>\n\n      </ion-row>\n\n    </div>\n\n  </div>\n\n\n\n  <!--[ngStyle]="{\'bottom\':isShowShare==false?\'-200px\':\'0px\'}"-->\n\n  <div id="shareView" class="share-css" >\n\n    <ion-label text-center>分享到</ion-label>\n\n    <ion-row style="height: 100px;@extend .vertical-middle;">\n\n      <ion-col text-center >\n\n        <ion-icon name="appname-dingding"></ion-icon>\n\n      </ion-col>\n\n      <ion-col text-center>\n\n        <ion-icon name="appname-qq"></ion-icon>\n\n      </ion-col>\n\n      <ion-col text-center>\n\n        <ion-icon name="appname-weixin"></ion-icon>\n\n      </ion-col>\n\n    </ion-row>\n\n    <button ion-button no-padding no-margin style="width: 100%; height: 50px; border-top: solid 1px #ececec; background-color: white; color: black" (click)="onCancelShare($event)">取消</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\project-detail\project-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* PopoverController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
], ProjectDetailPage);

//# sourceMappingURL=project-detail.js.map

/***/ }),

/***/ 115:
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
webpackEmptyAsyncContext.id = 115;

/***/ }),

/***/ 156:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/contact/contact.module": [
		285,
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
webpackAsyncContext.id = 156;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__project_create_project_create__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_service__ = __webpack_require__(21);
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
        this.projects = [];
        this.type = 1;
        this.namevalue = "appname-list";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.events.subscribe('homeCreateProject', function (project) {
            var isIn = false;
            for (var i = 0; i < _this.projects.length; i++) {
                var p = _this.projects[i];
                if (p.id == project.id) {
                    isIn = true;
                    _this.projects.splice(i, 1, project);
                    break;
                }
            }
            if (isIn == false) {
                _this.projects.push(project);
            }
        });
        this.events.subscribe('homeDeleteProject', function (project) {
            for (var i = 0; i < _this.projects.length; i++) {
                var p = _this.projects[i];
                if (p.id == project.id) {
                    _this.projects.splice(i, 1);
                    break;
                }
            }
        });
        this.events.subscribe('homeEditProject', function (project) {
            for (var i = 0; i < _this.projects.length; i++) {
                var p = _this.projects[i];
                if (p.id == project.id) {
                    _this.projects.splice(i, 1, project);
                    break;
                }
            }
        });
    };
    HomePage.prototype.ionViewWillUnload = function () {
        this.events.unsubscribe('homeCreateProject');
        this.events.unsubscribe('homeDeleteProject');
        this.events.unsubscribe('homeEditProject');
    };
    HomePage.prototype.onChangeDate = function () {
    };
    HomePage.prototype.onSelectDate = function (date) {
        if (date instanceof Date) {
            var dateString = __WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* AppConfig */].dateToString(date);
            this.appService.httpGet("item/searchByContion", { "startTime": dateString, "endTime": dateString, "page": 1, "limit": 100 }, this, function (view, res) {
                var data = res.json();
                if (data.success == true) {
                    view.projects = data.data;
                    console.log(view.projects);
                }
            }, true);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n\n\n    </ion-title>\n\n    <ion-buttons end >\n\n      <button ion-button (click)="onChangeType($event)" id="btMode">\n\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name={{namevalue}} >\n\n        </ion-icon>\n\n      </button>\n\n      <button ion-button (click)="onClickSearch()">\n\n        <ion-icon style="color: #fc5c53; margin-right: 10px" name="appname-search" >\n\n        </ion-icon>\n\n      </button>\n\n      <button ion-button (click)="onCreateProject()">\n\n        <ion-icon style="color: #fc5c53; margin-right: 5px" name="appname-add" >\n\n        </ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content fullscreen>\n\n  <div *ngIf="type==1" no-padding no-margin>\n\n    <calendar (onChange)="onSelectDate($event)">\n\n\n\n    </calendar>\n\n\n\n    <ion-item (click)="onClickProject(project)" *ngFor="let project of projects">\n\n      <ion-label no-padding no-margin text-center float-left [ngClass]="{\'circle_nostart\':project.itemState==\'未启动\',\'circle_ing\':project.itemState==\'进行中\',\'circle_end\':project.itemState==\'已结束\',\'circle_other\':project.itemState==\'\'}">{{project.itemLevel}}</ion-label>\n\n      <!--<div [ngClass]="{\'circle_nostart\':project.itemState==\'未启动\',\'circle_ing\':project.itemState==\'进行中\',\'circle_end\':project.itemState==\'已结束\'}"></div>-->\n\n      <ion-label no-padding no-margin float-left class="pj-name">{{project.itemName}}</ion-label>\n\n    </ion-item>\n\n  </div>\n\n  <div *ngIf="type==2" no-padding no-margin>\n\n    <div no-margin no-padding style="background-color: #ececec; height: 50px; position: relative">\n\n      <ion-label no-margin no-padding float-left style="line-height: 50px">开始日期</ion-label>\n\n      <ion-label no-margin no-padding float-left style="margin-left: 10px; line-height: 50px">项目名称</ion-label>\n\n      <div float-end style="position: relative; width: 120px; height: 100%">\n\n        <div no-margin no-padding style="top: 5px; position: absolute; right: 0px">\n\n          <div style="float: left">\n\n            <div style="width: 10px; height: 10px; background-color: green; float: left"></div>\n\n            <ion-label float-left no-margin no-padding style="line-height: 12px">进行中</ion-label>\n\n          </div>\n\n          <div style="float: right">\n\n            <div style="width: 10px; height: 10px; background-color: gray; float: left"></div>\n\n            <ion-label float-left no-margin no-padding style="line-height: 12px">未开始</ion-label>\n\n          </div>\n\n        </div>\n\n        <div no-margin no-padding style="bottom: 5px; position: absolute; right: 0px">\n\n          <div style="float: left">\n\n            <div style="width: 10px; height: 10px; background-color: #fc780e; float: left"></div>\n\n            <ion-label float-left no-margin no-padding style="line-height: 12px">延期中</ion-label>\n\n          </div>\n\n          <div style="float: right">\n\n            <div style="width: 10px; height: 10px; background-color: gray; float: left"></div>\n\n            <ion-label float-left no-margin no-padding style="line-height: 12px">已完成</ion-label>\n\n          </div>\n\n        </div>\n\n      </div>\n\n    </div>\n\n    <div *ngFor="let project of projects" style="position: relative; height: 50px; border-bottom: solid 1px #ececec" (click)="onClickProject(project)">\n\n      <ion-label float-left no-margin no-padding class="list_day">{{project.itemStartTime | DayPipe}}</ion-label>\n\n      <ion-label float-left no-margin no-padding class="list_weekday">{{project.itemStartTime | WeekayPipe}}</ion-label>\n\n      <ion-label float-left no-margin no-padding text-center [ngClass]="{\'list_level_nostart\':project.itemState==\'未启动\',\'list_level_ing\':project.itemState==\'进行中\',\'list_level_end\':project.itemState==\'已结束\',\'list_level_ing\':project.itemState==\'\'}">{{project.itemLevel}}</ion-label>\n\n      <ion-label float-left no-margin no-padding class="list_itemname">{{project.itemName}}</ion-label>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__app_app_service__["a" /* AppService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _c || Object])
], HomePage);

var _a, _b, _c;
//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__project_detail_project_detail__ = __webpack_require__(106);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-search',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\search\search.html"*/'<!--\n\n  Generated template for the SearchPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <form (submit)="onSearch($event)">\n\n      <ion-searchbar placeholder="搜索项目名称" [(ngModel)]=searchValue\n\n                     [showCancelButton]="false"\n\n                     (ionInput)="onSearchInput($event)"\n\n                     (ionCancel)="onSearchCancel($event)"\n\n                      name="itemName">\n\n      </ion-searchbar>\n\n    </form>\n\n  </ion-navbar>\n\n  <!--<div class="head" >-->\n\n    <!--<div class="icon-left" (click)="goBack()">-->\n\n      <!--<ion-icon name="arrow-back" ></ion-icon>-->\n\n    <!--</div>-->\n\n    <!--<div class="searchcotain">-->\n\n      <!--<div class="searchmain">-->\n\n        <!--<div class="searchicon"><ion-icon name="search"></ion-icon></div>-->\n\n        <!--<div class="searchinput"><input type="text" placeholder="搜索"></div>-->\n\n      <!--</div>-->\n\n    <!--</div>-->\n\n    <!--<div class="icon-rightnew">-->\n\n      <!--<a>搜索</a>-->\n\n    <!--</div>-->\n\n  <!--</div>-->\n\n</ion-header>\n\n\n\n<ion-content fullscreen>\n\n    <div *ngFor="let dic of array">\n\n      <div style="background-color: #f5f6f7; height: 20px;padding-left: 5px">{{dic.year+"年"}}</div>\n\n      <div style="height: 44px; border-bottom: solid 1px #f5f6f7; position:relative;" *ngFor="let project of dic.projects" (click)="onClickProject($event,project)">\n\n        <ion-label no-padding no-margin float-left class="vertical_center" style="left: 5px">{{project.itemStartTime | MonthPipe}}</ion-label>\n\n        <ion-label no-padding no-margin float-right class="vertical_center" style="right: 5px;">{{project.itemName}}</ion-label>\n\n      </div>\n\n    </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\search\search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AppGlobal */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(245);
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])()
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* ToastController */]])
], AppService);

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_search_search__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_components_module__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pipes_pipes_module__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__app_service__ = __webpack_require__(21);
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
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_15__components_components_module__["a" /* ComponentsModule */],
            __WEBPACK_IMPORTED_MODULE_16__pipes_pipes_module__["a" /* PipesModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {
                backButtonText: '',
                mode: 'ios',
                tabsHideOnSubPages: true,
                modalEnter: 'modal-slide-in',
                modalLeave: 'model-slide-out',
                tabsPlacement: 'bottom',
                pageTransition: 'ios-transition' //使用ios页面动画
            }, {
                links: [
                    { loadChildren: '../pages/contact/contact.module#ContactPageModule', name: 'ContactPage', segment: 'contact', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* JsonpModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_project_create_project_create__["a" /* ProjectCreatePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_milestone_detail_milestone_detail__["a" /* MilestoneDetailPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["b" /* ProjectDetailPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_subtask_subtask__["a" /* SubtaskPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_project_detail_project_detail__["a" /* PopoverPage */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_17__app_service__["a" /* AppService */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(22);

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
    return AppConfig;
}());

//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(200);
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
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"D:\qipaipm-company\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Config */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__test_test__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__ = __webpack_require__(275);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__test_test__["a" /* TestComponent */],
            __WEBPACK_IMPORTED_MODULE_3__calendar_calendar__["a" /* CalendarComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(ComponentsModule_1),
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

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'test',template:/*ion-inline-start:"D:\qipaipm-company\src\components\test\test.html"*/'<!-- Generated template for the TestComponent component -->\n\n<div>\n\n  {{text}}\n\n</div>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\components\test\test.html"*/
    }),
    __metadata("design:paramtypes", [])
], TestComponent);

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalendarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(27);
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
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var CalendarComponent = (function () {
    function CalendarComponent(datePipe, appService) {
        this.datePipe = datePipe;
        this.appService = appService;
        this.currentDate = new Date();
        this.events = [];
        this.disablePastDates = false;
        this.weekDaysToDisable = [];
        this.daysToDisable = [];
        this.useSwipe = false;
        this.showEventsList = false;
        this.showTodayButton = false;
        this.todayText = "转到今天";
        this.onChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.onEventClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
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
        if (changes["events"] && !changes["events"].isFirstChange()) {
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
        setTimeout(function () {
            _this.calc();
            _this.updateSelectedDate();
        });
    };
    CalendarComponent.prototype.setHasEventsClass = function () {
        var firstDayOfTheMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        var lastDayOfTheMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        if (this.events)
            this.events.forEach(function (item, index) {
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
        this.appService.httpGet("item/searchByContion", { "startTime": firstDateString, "endTime": lastDateString, "page": "1", "limit": "100" }, this, function (view, res) {
            var data = res.json();
            if (data.success == true) {
                view.dayHasProject = data.data;
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
        this.events.forEach(function (item) {
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
    return CalendarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('inputDate'),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "currentDate", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], CalendarComponent.prototype, "events", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "disablePastDates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array)
], CalendarComponent.prototype, "weekDaysToDisable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Array)
], CalendarComponent.prototype, "daysToDisable", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "useSwipe", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "showEventsList", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Boolean)
], CalendarComponent.prototype, "showTodayButton", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], CalendarComponent.prototype, "todayText", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _a || Object)
], CalendarComponent.prototype, "onChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]) === "function" && _b || Object)
], CalendarComponent.prototype, "onEventClicked", void 0);
CalendarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'calendar',template:/*ion-inline-start:"D:\qipaipm-company\src\components\calendar\calendar.html"*/'<!-- Generated template for the CalendarComponent component -->\n\n<div>\n\n  <ion-grid no-padding no-margin>\n\n    <ion-row class="calendar-controls" no-padding no-margin>\n\n      <ion-col no-padding no-margin text-right class="titleCol">\n\n        <button ion-button icon-only clear (click)="previousMonth()">\n\n          <ion-icon name="arrow-back"></ion-icon>\n\n        </button>\n\n      </ion-col>\n\n      <ion-col no-margin no-padding text-center class="selectedDateLabel">\n\n        <h5 class="selectedMonthLabel">{{ currentDate | date:\'yyyy-MM\' }}</h5>\n\n        <!--<button *ngIf="showTodayButton" (click)="setToday()" ion-button small outline>{{ todayText }}</button>-->\n\n      </ion-col>\n\n      <ion-col no-padding no-margin text-left class="titleCol">\n\n        <button ion-button icon-only clear (click)="nextMonth()">\n\n          <ion-icon name="arrow-forward"></ion-icon>\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n\n\n    <ion-row class="calendar-weekDays">\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[0] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[1] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[2] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[3] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[4] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[5] }}\n\n      </ion-col>\n\n      <ion-col text-center class="calendar-week-day">\n\n        {{ weekDays[6] }}\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <ion-grid (swipeleft)="useSwipe && nextMonth()" (swiperight)="useSwipe && previousMonth()">\n\n    <ion-row *ngFor="let row of rows" class="calendar-row">\n\n      <ion-col no-padding *ngFor="let day of row; let i = index" text-center class="calendar-col">\n\n        <button no-padding block class="calendar-day" *ngIf="day" ion-button clear (click)="dateClicked(day)"\n\n                id="calendar-day-{{day}}" [disabled]="pastDates.indexOf(day) > -1 || weekDaysToDisable.indexOf(i) > -1 || daysToDisable.indexOf(day) > -1">\n\n          {{ day }}\n\n          <div class="dot" id="dot-{{day}}"></div>\n\n        </button>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n\n\n  <!--<ion-list *ngIf="showEventsList">-->\n\n    <!--<button text-wrap ion-item *ngFor="let event of todayEvents" (click)="eventClicked(event)">-->\n\n      <!--{{ event.title }}-->\n\n      <!--<ion-icon name="arrow-forward" hideWhen="ios" item-right></ion-icon>-->\n\n    <!--</button>-->\n\n  <!--</ion-list>-->\n\n</div>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\components\calendar\calendar.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */]]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common__["c" /* DatePipe */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */]) === "function" && _d || Object])
], CalendarComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=calendar.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pipes_delay_delay__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pipes_year_year__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pipes_month_month__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__day_day__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__weekay_weekay__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__year_and_month_year_and_month__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__stamp_to_date_stamp_to_date__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__itemlevel_itemlevel__ = __webpack_require__(284);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
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

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DelayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'delayPipe',
    })
], DelayPipe);

//# sourceMappingURL=delay.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'YearPipe',
    })
], YearPipe);

//# sourceMappingURL=year.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'MonthPipe',
    })
], MonthPipe);

//# sourceMappingURL=month.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'DayPipe',
    })
], DayPipe);

//# sourceMappingURL=day.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeekayPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'WeekayPipe',
    })
], WeekayPipe);

//# sourceMappingURL=weekay.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return YearAndMonthPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
        return value.substr(0, 7);
    };
    return YearAndMonthPipe;
}());
YearAndMonthPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'YearAndMonthPipe',
    })
], YearAndMonthPipe);

//# sourceMappingURL=year-and-month.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StampToDatePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'stampToDate',
    })
], StampToDatePipe);

//# sourceMappingURL=stamp-to-date.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemlevelPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'itemlevelPipe',
    })
], ItemlevelPipe);

//# sourceMappingURL=itemlevel.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(21);
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
                    var index = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view = this.navCtrl.getByIndex(i);
                        if (view.name == 'ProjectCreatePage') {
                            index = i;
                            break;
                        }
                    }
                    if (index >= 0) {
                        this.events.publish('onConfirmProjectLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index)).then(function () {
                        });
                    }
                }
                else if (this.type == 2) {
                    var index = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view = this.navCtrl.getByIndex(i);
                        if (view.name == 'MilestoneDetailPage') {
                            index = i;
                            break;
                        }
                    }
                    if (index >= 0) {
                        this.events.publish('onConfirmMilestoneLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index)).then(function () {
                        });
                    }
                }
                else if (this.type == 3) {
                    var index = -1;
                    for (var i = 0; i < this.navCtrl.length(); i++) {
                        var view = this.navCtrl.getByIndex(i);
                        if (view.name == 'SubtaskPage') {
                            index = i;
                            break;
                        }
                    }
                    if (index >= 0) {
                        this.events.publish('onConfirmSubtaskLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index)).then(function () {
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
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"D:\qipaipm-company\src\pages\contact\contact.html"*/'<!--\n\n  Generated template for the ContactPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>通讯录</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n\n\n<ion-content fullscreen>\n\n  <form (submit)="onSearchContact($event)">\n\n    <ion-searchbar\n\n            placeholder="输入名字搜索" [(ngModel)]=searchValue\n\n            name="searchValue">\n\n    </ion-searchbar>\n\n  </form>\n\n  <div class="organization">\n\n    <ion-label no-margin no-padding class="vertical_center text">{{organization}}</ion-label>\n\n  </div>\n\n  <ion-item tappable *ngFor="let department of arrayDepartment" (click)="goNextDepartment($event, department)">\n\n    <ion-icon item-start name="appname-tree"></ion-icon>\n\n    <ion-label no-padding no-margin>{{department.text}}</ion-label>\n\n    <ion-note item-end>{{department.count+"人"}}</ion-note>\n\n  </ion-item>\n\n\n\n  <ion-item tappable *ngFor="let staff of arrayStaff" (click)="goNextDepartment($event, staff)">\n\n    <ion-icon item-start name="appname-head"></ion-icon>\n\n    <ion-label no-padding no-margin>{{staff.name}}</ion-label>\n\n    <ion-note item-end>{{staff.telphone}}</ion-note>\n\n  </ion-item>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"D:\qipaipm-company\src\pages\contact\contact.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]])
], ContactPage);

var ContactPage_1;
//# sourceMappingURL=contact.js.map

/***/ })

},[202]);
//# sourceMappingURL=main.js.map