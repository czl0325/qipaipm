import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams, ToastController, Content} from 'ionic-angular';
import {AppService} from "../../app/app.service";

/**
 * Generated class for the ProjectEndPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
    selector: 'page-project-end',
    templateUrl: 'project-end.html',
})
export class ProjectEndPage {
    project: any;
    arrayCheckboxs: boolean[] = [];
    otherReason: string;

    @ViewChild('input1') input1: ElementRef;
    @ViewChild(Content) content: Content;
    @ViewChild('projectEndContent') projectEndContent:ElementRef;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private alertCtrl: AlertController, private appService: AppService,
                private events: Events, private toastCtrl: ToastController) {
        this.project = this.navParams.get('project');
        this.otherReason = '';
        for (let i = 0; i < 4; i++) {
            this.arrayCheckboxs.push(false);
        }
    }

    ionViewDidLoad() {
        // var input = document.getElementById('input2');
        // if (input != null) {
        //     setTimeout(function(){
        //         input.focus();
        //         console.log("获取焦点的控件"+document.activeElement.id);
        //     }, 1000);
        // }
    }

    ngAfterViewInit() {
        var input2 = document.getElementById('input2');
        if (input2 != null) {
            input2.setAttribute("readOnly", "readOnly");
            //input2.style.display="none";
            input2.style.visibility="hidden";
            //input2.style.opacity="0";
        }
        var maskView = document.getElementById('maskView');
        if (maskView != null) {
            maskView.style.height = "0px";
        }
    }

    onClickCheck(value, index) {
        if (value == false) {
            this.arrayCheckboxs[index] = false;
            this.project.multipleItemEndWhy = '';
            if (index == 3) {
                var input2_1 = document.getElementById('input2');
                if (input2_1 != null) {
                    input2_1.setAttribute("readOnly", "readOnly");
                    input2_1.style.visibility="hidden";
                }

                var maskView = document.getElementById('maskView');
                if (maskView != null) {
                    maskView.style.height = "0px";
                }
                setTimeout(() => {
                    if (this.content.scrollToTop) {
                        this.content.scrollToTop(0);
                    }
                }, 200);
            }
        } else {
            for (let i = 0; i < this.arrayCheckboxs.length; i++) {
                this.arrayCheckboxs[i] = false;
            }
            this.arrayCheckboxs[index] = true;
            switch (index) {
                case 0:
                    this.project.multipleItemEndWhy = '业务改变';
                    break;
                case 1:
                    this.project.multipleItemEndWhy = '资源不够';
                    break;
                case 2:
                    this.project.multipleItemEndWhy = '合作方退出';
                    break;
                case 3:
                    // this.ngZone.runOutsideAngular(() => {
                    //     setTimeout(() => {
                    //         this.renderer.selectRootElement('#box').focus();
                    //     }, 100);
                    // });
                    break;
                default:
                    break;
            }
            var input2_2 = document.getElementById('input2');
            var maskView = document.getElementById('maskView');
            if (index < 3) {
                if (input2_2 != null) {
                    input2_2.setAttribute("readOnly", "readOnly");
                    input2_2.style.visibility="hidden";
                }
                if (maskView != null) {
                    maskView.style.height = "0px";
                }
                setTimeout(() => {
                    if (this.content.scrollToTop) {
                        this.content.scrollToTop(0);
                    }
                }, 200);
            } else {
                input2_2.style.visibility="visible";
                input2_2.removeAttribute("readOnly");
                setTimeout(function () {
                    input2_2.focus();
                }, 100);
                if (maskView != null) {
                    maskView.style.height = "250px";
                }
                setTimeout(() => {
                    if (this.content.scrollToBottom) {
                        this.content.scrollToBottom(0);
                    }
                }, 200);
            }
        }
    }

    onEndSave($event) {
        if (this.arrayCheckboxs[3] == true) {
            this.project.multipleItemEndWhy = this.otherReason;
        }

        if (this.project.multipleItemEndWhy == null || this.project.multipleItemEndWhy.length < 1) {
            let alert = this.alertCtrl.create({
                title: '错误信息',
                subTitle: '请填写项目结束原因!',
                buttons: ['确定']
            });
            alert.present();
            return;
        }

        this.project.itemIsEnd = true;
        this.project.itemEndType = "07000020";
        this.appService.httpPost("item/createItem", this.project, this, function (view, res) {
            // var data = res.json().data;
            view.events.publish('homeProjectReload');
            let toast = view.toastCtrl.create({
                message: '项目已结束!',
                duration: 3000,
                dismissOnPageChange: false,
            });
            toast.present();
            view.navCtrl.popToRoot();
        }, true);
    }
}
