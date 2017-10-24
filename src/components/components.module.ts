import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { CalendarComponent } from './calendar/calendar';
import { PersonInfoComponent } from './person-info/person-info';

@NgModule({
	declarations: [
    CalendarComponent,
    PersonInfoComponent

  ],
	imports: [
    IonicPageModule.forChild(ComponentsModule),
  ],
	exports: [
    CalendarComponent,
    PersonInfoComponent

  ]
})
export class ComponentsModule {}
