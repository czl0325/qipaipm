import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from "@ionic-native/keyboard";

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";

import { Storage } from "@ionic/storage";
import { AppSingleton } from "./app.singleton";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private storage: Storage, private keyboard: Keyboard) {
    this.keyboard.hideKeyboardAccessoryBar(false);
    if (platform.is('ios')) {
      this.keyboard.disableScroll(true);//当输入焦点时，防止本机UIScrollView移动。
    }
    this.storage.get('user').then((val) => {
      if (val != null) {
        if (val.username != null) {
          AppSingleton.getInstance().currentUserInfo = val;
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      } else {
        this.rootPage = LoginPage;
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

