import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppService } from "../../app/app.service";
import { ProjectDetailPage } from "../project-detail/project-detail";

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
  searchValue : string;
  array : any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppService) {

  }

  ionViewDidLoad() {

  }

  onSearchInput(event) {
    // if (this.searchValue.length < 1) {
    //   this.array = [];
    // } else {
    //   this.appService.httpGet("item/searchByContion", {itemName:this.searchValue,page:1,limit:100}, this, function (view, res) {
    //       var response = res.json();
    //       if (response.success == true) {
    //           var data = response.data;
    //           view.array = [];
    //           for (let i=0; i<data.length; i++) {
    //               var one = data[i];
    //               var year = one.startTime.substr(0,4);
    //               var isIn = false;
    //               for (let j=0; j<view.array.length; j++) {
    //                   var d = view.array[j];
    //                   if (d.year == year) {
    //                       isIn = true;
    //                       d.projects.push(one);
    //                       break;
    //                   }
    //               }
    //               if (isIn == false) {
    //                   var dd = {year:year,projects:[one]};
    //                   view.array.push(dd);
    //               }
    //           }
    //       }
    //   },false);
    // }
  }

  onSearchCancel($event) {
    this.array = [];
  }

  onClickProject($event,project) {
      this.navCtrl.push(ProjectDetailPage, {
          project:project,
      });
  }

  onSearch($event) {
    if (this.searchValue.length < 1) {
        this.array = [];
    } else {
        this.appService.httpGet("item/searchByCondition", {itemName:this.searchValue,page:1,limit:100}, this, function (view, res) {
            var response = res.json();
            if (response.success == true) {
                var data = response.data;
                view.array = [];
                for (let i=0; i<data.length; i++) {
                    var one = data[i];
                    var year = one.itemStartTime.substr(0,4);
                    var isIn = false;
                    for (let j=0; j<view.array.length; j++) {
                        var d = view.array[j];
                        if (d.year == year) {
                            isIn = true;
                            d.projects.push(one);
                            break;
                        }
                    }
                    if (isIn == false) {
                        var dd = {year:year,projects:[one]};
                        view.array.push(dd);
                    }
                }
            }
        },false);
    }
  }
}
