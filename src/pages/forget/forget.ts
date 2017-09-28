import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs/Rx';
import { NewpwPage } from "../newpw/newpw";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
      this.countDownText = this.defCountDownText;
      this.forgetForm = this.formBuilder.group({
          mobile: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
          code: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
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
    this.countDownTime = this.defCountDownTime;
    this.isCountDowning = true;
    this.sub = this.timer.subscribe(
        t => {
            this.countDownText = this.countDownTime.toString() + 's';
            if (this.countDownTime < 0) {
                this.countDownText = this.defCountDownText;
                this.sub.unsubscribe();
                this.isCountDowning = false;
            }
            this.countDownTime--;
        }
    );
  }

    goNext(value) {
        this.navCtrl.push(NewpwPage);

    }
}
