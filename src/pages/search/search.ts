import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AppService} from "../../app/app.service";
import {ProjectDetailPage} from "../project-detail/project-detail";
import {AppSingleton} from "../../app/app.singleton";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the SearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {
    searchValue: string;
    array: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private appService: AppService, private toastCtrl: ToastController) {

    }

    ionViewDidLoad() {

    }

    onSearchInput(event) {

    }

    onSearchCancel($event) {
        this.array = [];
    }

    onClickProject($event, project) {
        this.navCtrl.push(ProjectDetailPage, {
            project: project,
        });
    }

    onSearch($event) {
        if (this.searchValue.length < 1) {
            this.array = [];
            let toast = this.toastCtrl.create({
                message: "请输入搜索关键字!",
                duration: 2000,
                dismissOnPageChange: true,
            });
            toast.present();
        } else {
            this.appService.httpGet("item/searchAll", {
                itemName: this.searchValue,
                "founderEmpNum": AppSingleton.getInstance().currentUserInfo.username,
                "itemEndLeaderNum": AppSingleton.getInstance().currentUserInfo.username,
                "leaderEmpNum": AppSingleton.getInstance().currentUserInfo.username,
                page: 1,
                limit: 100
            }, this, function (view, res) {
                var response = res.json();
                view.array = [];
                if (response.success == true) {
                    var data = response.data;
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            var one = data[i];
                            if (one.itemStartTime == null) {
                                continue;
                            }
                            one.milestoneVo1 = [];
                            one.milestoneVo2 = [];
                            for (let j = 0; j < one.children.length; j++) {
                                var mile = one.children[j];
                                if (mile.milestoneType == 1) {
                                    one.milestoneVo1.push(mile);
                                } else if (mile.milestoneType == 2) {
                                    one.milestoneVo2.push(mile);
                                }
                            }
                            var startTime = one.itemStartTime;
                            if (typeof (one.itemStartTime) == 'number') {
                                startTime = AppConfig.timestampToDatestring(one.itemStartTime);
                            }
                            var year = startTime.substr(0, 4);
                            var isIn = false;
                            for (let j = 0; j < view.array.length; j++) {
                                var d = view.array[j];
                                if (d.year == year) {
                                    isIn = true;
                                    d.projects.push(one);
                                    break;
                                }
                            }
                            if (isIn == false) {
                                var dd = {year: year, projects: [one]};
                                view.array.push(dd);
                            }
                        }
                        if (view.array.length < 1) {
                            let toast = view.toastCtrl.create({
                                message: "没有搜索到相关项目!",
                                duration: 2000,
                                dismissOnPageChange: true,
                            });
                            toast.present();
                        }
                    } else {
                        let toast = view.toastCtrl.create({
                            message: "没有搜索到相关项目!",
                            duration: 2000,
                            dismissOnPageChange: true,
                        });
                        toast.present();
                    }
                } else {
                    let toast = view.toastCtrl.create({
                        message: "没有搜索到相关项目!",
                        duration: 2000,
                        dismissOnPageChange: true,
                    });
                    toast.present();
                }
            }, false);
        }
    }
}
