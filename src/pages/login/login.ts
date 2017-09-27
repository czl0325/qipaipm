import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AppService} from "../../app/app.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  errorText : string;
  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder, private appService: AppService) {
    this.errorText = '手机号码错误';
    this.loginForm = this.formBuilder.group({
          mobile: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
      })
  }

  ionViewDidLoad() {

  }

  login (value) {
    // this.appService.httpPost("http://192.168.10.118:8000/qipai/index.html",)
    console.log(value.mobile+"====="+value.password);
  }
}
