import { NgModule } from '@angular/core';
import { DelayPipe } from './../pipes/delay/delay';
import { YearPipe } from './../pipes/year/year';
import { MonthPipe } from './../pipes/month/month';
import { DayPipe } from './day/day';
import { WeekayPipe } from './weekay/weekay';
import { YearAndMonthPipe } from './year-and-month/year-and-month';
import { StampToDatePipe } from './stamp-to-date/stamp-to-date';
@NgModule({
	declarations: [
      DelayPipe,
        YearPipe,
    MonthPipe,
    DayPipe,
    WeekayPipe,
    YearAndMonthPipe,
    StampToDatePipe,],
	imports: [],
	exports: [
	  DelayPipe,
    YearPipe,
    MonthPipe,
    DayPipe,
    WeekayPipe,
    YearAndMonthPipe,
    StampToDatePipe,]
})
export class PipesModule {}
