import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { TestComponent } from './test/test';
import { CalendarComponent } from './calendar/calendar';
import { PersonInfoComponent } from './person-info/person-info';

@NgModule({
	declarations: [
	  TestComponent,
    CalendarComponent,
    PersonInfoComponent

  ],
	imports: [
    IonicPageModule.forChild(ComponentsModule),
  ],
	exports: [
	  TestComponent,
    CalendarComponent,
    PersonInfoComponent

  ]
})
export class ComponentsModule {}
