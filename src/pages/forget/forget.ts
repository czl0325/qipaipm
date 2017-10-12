import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { NewpwPage } from "../newpw/newpw";
import { AppService } from "../../app/app.service";

/**
 * Generated class for the ForgetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forget',
  templateUrl: 'forget.html',
})
export class ForgetPage {
    forgetForm: FormGroup;
    defCountDownText: string = "发送验证码";
    defCountDownTime: number = 60;
    countDownText: string;
    countDownTime: number;
    sub: Subscription;
    private timer: any;
    isCountDowning: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private appService: AppService,
              private toastCtrl: ToastController, private alertCtrl: AlertController) {
      this.countDownText = this.defCountDownText;
      this.forgetForm = this.formBuilder.group({
          mobile: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
          code: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
      })

      this.timer = Observable.timer(1, 1000);
  }

  ionViewDidLoad() {

  }

  ionViewWillUnload() {
      if (this.sub != null) {
          this.sub.unsubscribe();
      }
  }

  sendCodeBtnEvent($event) {
    if (this.isCountDowning == true) {
        return;
    }
    var test = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!test.test(this.forgetForm.value.mobile)) {
        let toast = this.toastCtrl.create({
            message: "手机号码输入错误!",
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
    }
    this.appService.httpGet("http://192.168.10.118:8888/uc/user/findPassword",{"telPhone":this.forgetForm.value.mobile},
        this,function (view, res) {
            if (res.json().result == "success") {
                view.appService.httpGet("http://192.168.10.120:8888/sms/sendSmg/"+view.forgetForm.value.mobile,{},
                    view,function (view1, res) {
                        if (res.status == 200) {
                            let alert = view1.alertCtrl.create({
                                title: '提示',
                                subTitle: res.json()._return,
                                buttons: ['确定']
                            });
                            alert.present();
                        }
                    },true);
                view.countDownTime = view.defCountDownTime;
                view.isCountDowning = true;
                view.sub = view.timer.subscribe(
                    t => {
                        view.countDownText = view.countDownTime.toString() + 's';
                        if (view.countDownTime < 0) {
                            view.countDownText = view.defCountDownText;
                            view.sub.unsubscribe();
                            view.isCountDowning = false;
                        }
                        view.countDownTime--;
                    }
                );
            } else {
                let alert = view.alertCtrl.create({
                    title: '提示',
                    subTitle: '该手机号码未注册!',
                    buttons: ['确定']
                });
                alert.present();
            }
        },true);

  }

    goNext(value) {
        this.appService.httpGet("http://192.168.10.120:8888/sms/checkSmg/"+value.mobile+"/"+value.code,{},
            this,function (view, res) {
            if (res.status == 200) {
                view.navCtrl.push(NewpwPage, {
                    telPhone: value.mobile
                });
            } else {
                let alert = view.alertCtrl.create({
                    title: '错误信息',
                    subTitle: '验证码校对错误',
                    buttons: ['确定']
                });
                alert.present();
            }
        },true);

    }
}
