import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  project:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.project = this.navParams.get('project');
  }

  ionViewDidLoad() {

  }
}
