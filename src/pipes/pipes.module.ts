import { NgModule } from '@angular/core';
import { DelayPipe } from './../pipes/delay/delay';
import { YearPipe } from './../pipes/year/year';
import { MonthPipe } from './../pipes/month/month';
import { DayPipe } from './day/day';
import { WeekayPipe } from './weekay/weekay';
import { YearAndMonthPipe } from './year-and-month/year-and-month';
import { StampToDatePipe } from './stamp-to-date/stamp-to-date';
import { ItemlevelPipe } from './itemlevel/itemlevel';
@NgModule({
	declarations: [
      DelayPipe,
        YearPipe,
    MonthPipe,
    DayPipe,
    WeekayPipe,
    YearAndMonthPipe,
    StampToDatePipe,
    ItemlevelPipe,],
	imports: [],
	exports: [
	  DelayPipe,
    YearPipe,
    MonthPipe,
    DayPipe,
    WeekayPipe,
    YearAndMonthPipe,
    StampToDatePipe,
    ItemlevelPipe,]
})
export class PipesModule {}
