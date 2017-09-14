import { NgModule } from '@angular/core';
import { IonicPageModule } from "ionic-angular";
import { TestComponent } from './test/test';
import { CalendarComponent } from './calendar/calendar';

@NgModule({
	declarations: [
	  TestComponent,
    CalendarComponent

  ],
	imports: [
    IonicPageModule.forChild(ComponentsModule),
  ],
	exports: [
	  TestComponent,
    CalendarComponent

  ]
})
export class ComponentsModule {}
