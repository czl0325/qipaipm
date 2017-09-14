import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { JsonpModule } from "@angular/http";
import { Keyboard } from "@ionic-native/keyboard";
import { HttpModule } from "@angular/http";

//页面类
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProjectCreatePage } from "../pages/project-create/project-create";
import { MilestoneDetailPage } from "../pages/milestone-detail/milestone-detail";
import { ProjectDetailPage, PopoverPage } from "../pages/project-detail/project-detail";
import { SubtaskPage } from "../pages/subtask/subtask";
import { SearchPage } from "../pages/search/search";

//组件类
import { ComponentsModule } from "../components/components.module";

//pipe类
import { PipesModule } from "../pipes/pipes.module";
import { AppService } from "./app.service";

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

    PopoverPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    PipesModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      mode: 'ios',
      tabsHideOnSubPages: true,
      modalEnter: 'modal-slide-in',
      modalLeave: 'model-slide-out',
      tabsPlacement: 'bottom', //tabweizhi
      pageTransition: 'ios-transition' //使用ios页面动画
    }),
    JsonpModule,
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

    PopoverPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    AppService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
