import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { JsonpModule } from "@angular/http";
import { Keyboard } from "@ionic-native/keyboard";
import { HttpModule } from "@angular/http";
import { Network } from "@ionic-native/network";
import { AppShare } from "./app.share";
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { WechatService } from "./wechat.service";

//页面类
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectCreatePage } from "../pages/project-create/project-create";
import { MilestoneDetailPage } from "../pages/milestone-detail/milestone-detail";
import { ProjectDetailPage, PopoverPage } from "../pages/project-detail/project-detail";
import { SubtaskPage } from "../pages/subtask/subtask";
import { SearchPage } from "../pages/search/search";
import { ContactPage } from "../pages/contact/contact";
import { ForgetPage } from "../pages/forget/forget";
import { NewpwPage } from "../pages/newpw/newpw";

//组件类
import { ComponentsModule } from "../components/components.module";
import { CalendarModule }  from "ion2-calendar";
import { MultiPickerModule } from 'ion-multi-picker';

//pipe类
import { PipesModule } from "../pipes/pipes.module";
import { AppService } from "./app.service";
import {LoginPage} from "../pages/login/login";

//第三方库

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectCreatePage,
    MilestoneDetailPage,
    ProjectDetailPage,
    SubtaskPage,
    SearchPage,
    ContactPage,
    LoginPage,
    ForgetPage,
    NewpwPage,

    PopoverPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PipesModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      //mode: 'ios',
      tabsHideOnSubPages: true,
      modalEnter: 'modal-slide-in',
      modalLeave: 'model-slide-out',
      tabsPlacement: 'bottom', //tabweizhi
      pageTransition: 'ios-transition' //使用ios页面动画
    }),
    IonicStorageModule.forRoot(),
    JsonpModule,
    CalendarModule,
    MultiPickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectCreatePage,
    MilestoneDetailPage,
    ProjectDetailPage,
    SubtaskPage,
    SearchPage,
    ContactPage,
    LoginPage,
    ForgetPage,
    NewpwPage,

    PopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    AppService,
    Network,
    AppShare,
    NativeStorage,
    WechatService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
