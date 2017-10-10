import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { NativeStorage } from "@ionic-native/native-storage";
import { Storage } from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  config: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private storage: Storage,
              // public geolocation: Geolocation,
              public _config: Config,
              // public toastCtrl: ToastController,
              // public app: App,
              public keyboard: Keyboard,
              // private ionicApp: IonicApp,
              private nativeStorage: NativeStorage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //(<any>window).navigator.splashscreen.hide();
    });

    this.keyboard.hideKeyboardAccessoryBar(false);
    this.keyboard.disableScroll(true);//当输入焦点时，防止本机UIScrollView移动。
      this.storage.get('user').then((val) => {
         if (val.username != null) {
             this.rootPage = HomePage;
         }
      });


    // if (platform.is('ios')) {
    //   this.config = {
    //     'backButtonIcon': 'arrow-back',
    //     'iconMode': 'ios',
    //     'tabsPlacement': 'bottom',
    //     'backButtonText': '',
    //     'tabsHideOnSubPages': 'true'
    //   };
    // } else if (platform.is('windows')) {
    //   this.config = {
    //     'backButtonIcon': 'arrow-back',
    //     'iconMode': 'ios',
    //     'tabsPlacement': 'top',
    //     'backButtonText': '',
    //     'tabsHideOnSubPages': 'true'
    //   };
    // } else {
    //   this.config = {
    //     'backButtonIcon': 'arrow-back',
    //     'iconMode': 'md',
    //     'tabsPlacement': 'bottom',
    //     'backButtonText': '',
    //     'tabsHideOnSubPages': 'true'
    //   };
    // }
    // this._config.set('tabsPlacement', this.config.tabsPlacement);
    // this._config.set('iconMode', this.config.iconMode);
    // this._config.set('backButtonIcon', this.config.backButtonIcon);
    // this._config.set('backButtonText', this.config.backButtonText);
    // this._config.set('tabsHideOnSubPages', this.config.tabsHideOnSubPages);
  }

  // //根据不同状态 进入程序
  // private getFollowingPage(user: models.User) {
  //   // TODO 这里的逻辑与LoginPage页面对应的逻辑有点重复，待重构
  //   if (user) {
  //     if (user.type === 1) {
  //       return TabsPage;
  //     } else if (user.type === 2) {
  //       switch (user.status) {
  //         case -1:
  //           //刚注册完 还未输入邀请码
  //           return InvitationCodePage;
  //         case 1:
  //           //TODO 显示正在等待审批对应的页面
  //           return CheckProcessPage;
  //         case 2:
  //           //TODO 显示正在审批失败对应的页面
  //           return CheckProcessPage;
  //         case 0:
  //           return TabsPage;
  //         case 3:
  //           //取消加入
  //           return InvitationCodePage;
  //
  //         default:
  //           //TODO 未定义的用户状态
  //           return LoginPage;
  //       }
  //     }
  //   } else {
  //     return LoginPage;
  //   }
  // }
}

