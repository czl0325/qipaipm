import {Component} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppService} from "../../app/app.service";

/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html',
})
export class ContactPage {
    searchValue: string;
    organization: string;
    arrayDepartment: any[];
    arrayStaff: any[];
    type: number;//1是新建工程 2是新建里程碑 3是新建子任务
    hideDepartment: boolean = false;
    tempStaff: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService,
                public alertCtrl: AlertController, public events: Events) {
        this.organization = "福建柒牌集团";
        this.arrayDepartment = this.navParams.get('department');
        this.arrayStaff = this.navParams.get('staff');
        this.type = this.navParams.get('type');
        this.tempStaff = [];
        this.tempStaff = this.tempStaff.concat(this.arrayStaff);
    }

    ionViewDidLoad() {
        if (typeof (this.arrayDepartment) == 'undefined') {
            this.appService.httpGet("http://tgw.qipai.com.cn:6121/uc/group/searchAll", {}, this, function (view, res) {
                if (res.status == 200) {
                    var data = res.json();
                    if (data.id == null && data.children.length > 0) {
                        view.arrayDepartment = data.children;
                    }
                }
            }, true);
        }
    }


    onSearchContact($event) {
        if (this.searchValue.length == 0) {
            if (this.arrayDepartment != null) {
                this.hideDepartment = false;
            } else if (this.arrayStaff != null) {

            }
        } else {
            if (this.arrayDepartment != null) {
                this.hideDepartment = true;
            } else if (this.arrayStaff != null) {
                this.tempStaff = [];
                this.tempStaff = this.tempStaff.concat(this.arrayStaff);
            }
            this.appService.httpGet("http://tgw.qipai.com.cn:6121/uc/group/searchUsersByGroupAndKey", {"sKeyName": this.searchValue}, this, function (view, res) {
                if (res.status == 200) {
                    if (res.json() != null) {
                        var array = res.json();
                        view.arrayStaff = [];
                        if (array != null && array.length > 0) {
                            view.arrayStaff = view.arrayStaff.concat(array);
                        } else {
                            let alert = view.alertCtrl.create({
                                title: '错误信息',
                                subTitle: '未搜索到相关人员!',
                                buttons: ['确定']
                            });
                            alert.present();
                        }
                    } else {
                        let alert = view.alertCtrl.create({
                            title: '错误信息',
                            subTitle: '未搜索到相关人员!',
                            buttons: ['确定']
                        });
                        alert.present();
                    }
                }
            }, true);
        }
    }

    onSearchInput($event) {
        if (this.searchValue.length == 0) {
            if (this.arrayDepartment != null) {
                this.hideDepartment = false;
                this.arrayStaff = [];
                this.tempStaff = [];
            } else if (this.arrayStaff != null) {
                this.arrayStaff = [];
                this.arrayStaff = this.arrayStaff.concat(this.tempStaff);
                this.tempStaff = [];
            }
        }
    }

    onSearchCancel($event) {
        if (this.arrayDepartment != null) {
            this.hideDepartment = false;
        } else if (this.arrayStaff != null) {
            this.arrayStaff = [];
            this.arrayStaff = this.arrayStaff.concat(this.tempStaff);
            this.tempStaff = [];
        }
    }

    goNextDepartment($event, value) {
        if (value.children == null) {
            if (this.arrayStaff != null) {
                if (this.type == 1) {
                    var index1 = -1;
                    for (let i = 0; i < this.navCtrl.length(); i++) {
                        var view1 = this.navCtrl.getByIndex(i);
                        if (view1.name == 'ProjectCreatePage') {
                            index1 = i;
                            break;
                        }
                    }
                    if (index1 >= 0) {
                        this.events.publish('onConfirmProjectLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index1)).then(() => {

                        });
                    }
                } else if (this.type == 2) {
                    var index2 = -1;
                    for (let i = 0; i < this.navCtrl.length(); i++) {
                        var view2 = this.navCtrl.getByIndex(i);
                        if (view2.name == 'MilestoneDetailPage') {
                            index2 = i;
                            break;
                        }
                    }
                    if (index2 >= 0) {
                        this.events.publish('onConfirmMilestoneLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index2)).then(() => {

                        });
                    }
                } else if (this.type == 3) {
                    var index3 = -1;
                    for (let i = 0; i < this.navCtrl.length(); i++) {
                        var view3 = this.navCtrl.getByIndex(i);
                        if (view3.name == 'SubtaskPage') {
                            index3 = i;
                            break;
                        }
                    }
                    if (index3 >= 0) {
                        this.events.publish('onConfirmSubtaskLeader', value);
                        this.navCtrl.popTo(this.navCtrl.getByIndex(index3)).then(() => {

                        });
                    }
                }
            } else {
                this.appService.httpGet("http://tgw.qipai.com.cn:6121/uc/group/searchUsersByGroupAndKey", {"id": value.id}, this, function (view, res) {
                    if (res.status == 200) {
                        var array = res.json();
                        if (array == null) {
                            let alert = view.alertCtrl.create({
                                title: '错误信息',
                                subTitle: '该组织架构没有成员!',
                                buttons: ['确定']
                            });
                            alert.present();
                        } else {
                            if (array.length > 0) {
                                view.navCtrl.push(ContactPage, {
                                    department: null,
                                    staff: array,
                                    callback: view.callback,
                                    type: view.type,
                                });
                            } else {
                                let alert = view.alertCtrl.create({
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
        } else {
            if (value.children.length > 0) {
                this.navCtrl.push(ContactPage, {
                    department: value.children,
                    staff: null,
                    type: this.type,
                });
            }
        }
    }
}
