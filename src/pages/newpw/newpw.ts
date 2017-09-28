import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.newpwForm = this.formBuilder.group({
        newpw1:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(16)])],
        newpw2:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(16)])]
    });
  }

  ionViewDidLoad() {

  }

  onConfirmNewpw(value) {
    console.log(value.newpw1,value.newpw2);
    this.navCtrl.popToRoot();
  }
}
