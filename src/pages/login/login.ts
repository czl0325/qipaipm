import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {ForgetPage} from "../forget/forget";
import {AppService} from "../../app/app.service";
import {HomePage} from "../home/home";
import {AppSingleton} from "../../app/app.singleton";
import {Storage} from "@ionic/storage";

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
    errorText: string;
    loginForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private formBuilder: FormBuilder, private appService: AppService,
                private storage: Storage) {
        this.errorText = '手机号码错误';
        this.loginForm = this.formBuilder.group({
            mobile: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
        })
    }

    ionViewDidLoad() {
        if (this.storage.get('user') != null) {
            this.storage.remove('user');
        }
    }

    login(value) {
        this.appService.httpGet("http://tgw.qipai.com.cn:6121/uc/user/login",
            {"telPhone": value.mobile, "password": value.password}, this, function (view, res) {
                var data = res.json();
                if (data != null) {
                    view.storage.ready().then(() => {
                        view.storage.set('user', data);
                        AppSingleton.getInstance().currentUserInfo = data;
                    });
                    view.navCtrl.push(HomePage).then(() => {
                        const index = view.navCtrl.getActive().index;
                        view.navCtrl.remove(0, index);
                    });
                } else {
                    let toast = view.toastCtrl.create({
                        message: "登录失败",
                        duration: 2000,
                        dismissOnPageChange: true,
                    });
                    toast.present();
                }
            }, true);
    }

    onForgetPassword($event) {
        this.navCtrl.push(ForgetPage);
    }
}
