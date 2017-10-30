import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {Keyboard} from "@ionic-native/keyboard";
import {SocialSharing} from '@ionic-native/social-sharing';
import {IonicStorageModule} from '@ionic/storage';
import {HttpModule} from "@angular/http";

//页面类
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProjectCreatePage} from "../pages/project-create/project-create";
import {MilestoneDetailPage} from "../pages/milestone-detail/milestone-detail";
import {ProjectDetailPage, PopoverPage} from "../pages/project-detail/project-detail";
import {SubtaskPage} from "../pages/subtask/subtask";
import {SearchPage} from "../pages/search/search";
import {ContactPage} from "../pages/contact/contact";
import {ForgetPage} from "../pages/forget/forget";
import {NewpwPage} from "../pages/newpw/newpw";
import {ProjectEndPage} from "../pages/project-end/project-end";
import {ProjectEndDetailPage} from "../pages/project-end-detail/project-end-detail";

//组件类
import {ComponentsModule} from "../components/components.module";

//pipe类
import {PipesModule} from "../pipes/pipes.module";
import {AppService} from "./app.service";
import {LoginPage} from "../pages/login/login";

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
        ProjectEndPage,
        ProjectEndDetailPage,

        PopoverPage,
    ],
    imports: [
        BrowserModule,
        ComponentsModule,
        PipesModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '',
            backButtonIcon: 'arrow-back',
            //mode: 'ios',
            tabsHideOnSubPages: true,
            modalEnter: 'modal-slide-in',
            modalLeave: 'model-slide-out',
            tabsPlacement: 'bottom', //tabweizhi
            pageTransition: 'ios-transition' //使用ios页面动画
        }),
        HttpModule,
        IonicStorageModule.forRoot(),
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
        ProjectEndPage,
        ProjectEndDetailPage,

        PopoverPage,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppService,
        Keyboard,
        SocialSharing,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
