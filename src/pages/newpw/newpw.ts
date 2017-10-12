import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app/app.service";

/**
 * Generated class for the NewpwPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newpw',
  templateUrl: 'newpw.html',
})
export class NewpwPage {
  newpwForm: FormGroup;
  telPhone: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private appService: AppService,
              private toastCtrl: ToastController) {
    this.newpwForm = this.formBuilder.group({
        newpw1:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(16)])],
        newpw2:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(16)])]
    });
      this.telPhone = this.navParams.get('telPhone');
  }

  ionViewDidLoad() {

  }

  onConfirmNewpw(value) {
      if (value.newpw1 != value.newpw2) {
          let toast = this.toastCtrl.create({
              message: "两次输入的密码不一致",
              duration: 2000,
              dismissOnPageChange: true,
          });
          toast.present();
      } else {
          this.appService.httpPost("http://192.168.10.118:8888/uc/user/resetByTelPhone",{"telPhone":this.telPhone,"newPassword":value.newpw1},
              this, function (view, res) {
                  if (res.status == 200) {
                      let toast = view.toastCtrl.create({
                          message: "重置密码成功，请用新密码登录",
                          duration: 2000,
                          dismissOnPageChange: false,
                      });
                      toast.present();
                      view.navCtrl.popToRoot();
                  }
              }, true);
      }
  }
}
