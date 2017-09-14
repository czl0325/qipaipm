import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DatePipe } from "@angular/common";
import {AppService} from "../../app/app.service";
import {AppConfig} from "../../app/app.config";

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html',
  providers: [DatePipe]
})
export class CalendarComponent {
  @Input('inputDate') currentDate: Date = new Date();
  @Input() events: any = [];
  @Input() disablePastDates: boolean = false;
  @Input() weekDaysToDisable: number[] = [];
  @Input() daysToDisable: number[] = [];
  @Input() useSwipe: boolean = false;
  @Input() showEventsList: boolean = false;
  @Input() showTodayButton: boolean = false;
  @Input() todayText: string = "转到今天";

  @Output() onChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() onEventClicked: EventEmitter<any> = new EventEmitter<any>();

  weekDays: string[] = ["周日","周一","周二","周三","周四","周五","周六"];
  pastDates: number[] = [];

  rows = [];
  dayHasProject = [];
  stop = false;
  todayEvents = [];

  constructor(private datePipe: DatePipe, public appService: AppService) {
    //this.setUpWeekDaysLabels();
  }
  setUpWeekDaysLabels() {
    let date = new Date(2017, 0, 1); /* This date has to be a Sunday */
    for(let i=0; i < 7; i++, date.setDate(date.getDate() + 1)) {
      let str: string = this.datePipe.transform(date, "EEE");
      str = str[0].toUpperCase() + str.slice(1);
      this.weekDays.push(str);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    /* If the currentDate was changed outside (in the parent component), we need to call this.calc() */
    /* But only if the month is changed */
    if(changes["currentDate"] && !changes["currentDate"].isFirstChange()) {
      if (changes["currentDate"].currentValue.getMonth() != changes["currentDate"].previousValue.getMonth()) {
        this.calc();
      }
    }

    if(changes["events"] && !changes["events"].isFirstChange()) {
      let listToRemoveClasses: HTMLCollection = document.getElementsByClassName("hasEvents");
      let n: number = listToRemoveClasses.length;

      for(let i=0; i < n; i++)
        if(listToRemoveClasses[0])
          listToRemoveClasses[0].classList.remove("hasEvents"); /* Using index zero because the object is updated after we remove an item */

      this.setHasEventsClass();
      this.showTodayEvents();
    }
  }

  ngAfterViewInit(){
    /* Calls `this.calc()` after receiving an initial date */
    this.currentDate.setHours(0, 0, 0, 0);

    setTimeout(() => {
      this.calc();
      this.updateSelectedDate();
    });
  }

  setHasEventsClass(){
    let firstDayOfTheMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );

    let lastDayOfTheMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    if(this.events)
      this.events.forEach((item, index) => {
        if(item.starts.getTime() >= firstDayOfTheMonth.getTime() && item.ends.getTime() < lastDayOfTheMonth.getTime()) {
          if(document.getElementById("calendar-day-" + item.starts.getDate()))
            document.getElementById("calendar-day-" + item.starts.getDate()).classList.add('hasEvents');
        }
      });
  }

  setTodayClass() {
    /* Checks if the selected month and year are the current */
    let tmp = new Date();
    if (tmp.getFullYear() == this.currentDate.getFullYear() && tmp.getMonth() == this.currentDate.getMonth()){
      var element = document.getElementById("calendar-day-" + tmp.getDate());
      if (element) {
        element.classList.remove("button-clear", "button-clear-md");
        element.classList.add("button-outline", "button-outline-md");
        element.setAttribute("style","border: solid 1px #ececec");
      }
    }
  }

  setSelectedClass() {
    /* Removes previous selectedDate class */
    let listToRemoveClasses1: HTMLCollection = document.getElementsByClassName("selected");
    let n1: number = listToRemoveClasses1.length;
    for(let i=0; i < n1; i++)
      listToRemoveClasses1[0].classList.remove("selected"); /* Using index zero because the object is updated after we remove an item */

    let listToRemoveClasses2: HTMLCollection = document.getElementsByClassName("no-selected-dot");
    let n2: number = listToRemoveClasses2.length;
    for(let i=0; i < n2; i++)
      listToRemoveClasses2[0].classList.remove("no-selected-dot");

    let listToRemoveClasses3: HTMLCollection = document.getElementsByClassName("selected-dot");
    let n3: number = listToRemoveClasses3.length;
    for(let i=0; i < n3; i++)
      listToRemoveClasses3[0].classList.remove("selected-dot");

    var element = document.getElementById("calendar-day-" + this.currentDate.getDate());
    if(element)
      element.classList.add("selected");

    var dateString = AppConfig.dateToString(this.currentDate);
    for (let i=0; i<this.dayHasProject.length; i++) {
      var object = this.dayHasProject[i];
      var startTime = object.startTime;
      var day = startTime.substr(startTime.length-2,2);
      var dot = document.getElementById("dot-"+parseInt(day));
      if (dot != null) {
        if (startTime == dateString) {
          dot.classList.add("selected-dot");
        } else {
          dot.classList.add("no-selected-dot");
        }
      }
    }
  }

  setToday(){
    let tmp = new Date();
    tmp.setHours(0,0,0,0);

    let calc: boolean = tmp.getMonth() + "" + tmp.getFullYear() != this.currentDate.getMonth() + "" + this.currentDate.getFullYear();

    this.updateSelectedDate(tmp);

    calc && this.calc();
  }

  /**
   * Recalculates the rows and columns needed to represent the new month selected
   */
  calc(){
    /* Resets the rows */
    this.rows = [];

    let tmp = new Date(this.currentDate.getTime());
    tmp.setDate(1);

    while(tmp.getMonth() == this.currentDate.getMonth()){
      /* Pushes a new empty row */
      this.rows.push(['', '', '', '', '', '', '']);
      while(tmp.getDay() < 6 && tmp.getMonth() == this.currentDate.getMonth()){
        /* Populates the row only where needed */
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
        tmp.setDate(tmp.getDate() + 1);
      }
      if(tmp.getMonth() == this.currentDate.getMonth())
        this.rows[this.rows.length - 1][tmp.getDay()] = tmp.getDate();
      tmp.setDate(tmp.getDate() + 1);
    }

    setTimeout(() => {
      /* Needs to be executed only after the DOM has been updated */
      this.setHasEventsClass();
      this.setTodayClass();
      this.disableDates();
      this.getProjectDate();
    });
  }

  disableDates(){
    // Disabling past dates
    if(this.disablePastDates){
      this.pastDates = [];
      let today = new Date();
      // Checks if the current month is being shown
      if (today.getFullYear() == this.currentDate.getFullYear() && today.getMonth() == this.currentDate.getMonth()) {
        // If current month is being shown, disable only the past days
        for(let i = 1; i < today.getDate(); i++){
          this.pastDates.push(i);
        }
      } else if(this.currentDate.getTime() < today.getTime()){
        // If a previous month is being show (disable all days)
        for(let i = 1; i <= 31; i++){
          this.pastDates.push(i);
        }
      }
    }

    // Disable chosen week days
    if(this.weekDaysToDisable.length){

    }
  }

  getProjectDate(){
    var dateString = AppConfig.dateToString(this.currentDate);
    var dayCount = AppConfig.getDayCountInMonth(this.currentDate);
    var firstDate = new Date(this.currentDate.getTime());
    firstDate.setDate(1);
    var firstDateString = AppConfig.dateToString(firstDate);
    var lastDate = new Date(this.currentDate.getTime());
    lastDate.setDate(dayCount);
    var lastDateString = AppConfig.dateToString(lastDate);

    let listToRemoveClasses1: HTMLCollection = document.getElementsByClassName("no-selected-dot");
    let n1: number = listToRemoveClasses1.length;
    for(let i=0; i < n1; i++)
      listToRemoveClasses1[0].classList.remove("no-selected-dot");

    let listToRemoveClasses2: HTMLCollection = document.getElementsByClassName("selected-dot");
    let n2: number = listToRemoveClasses2.length;
    for(let i=0; i < n2; i++)
      listToRemoveClasses2[0].classList.remove("selected-dot");

    for (let i=1; i<=dayCount; i++) {
      var dot = document.getElementById("dot-"+i);
      if (dot != null) {
        dot.style.display = "none";
      }
    }

    this.appService.httpGet("item/searchMonthItem", {"startTime":firstDateString,"endTime":lastDateString}, this,function (view, res){
      var data = res.json();
      if (data.success == true) {
        view.dayHasProject = data.data;
        console.log("有项目的日期是=====",view.dayHasProject);
        for (let i=0; i<view.dayHasProject.length; i++) {
          var object = view.dayHasProject[i];
          var startTime = object.startTime;
          var day = startTime.substr(startTime.length-2,2);
          var dot = document.getElementById("dot-"+parseInt(day));
          if (dot != null) {
            dot.style.display = "";
            if (startTime == dateString) {
              dot.classList.add("selected-dot");
            } else {
              dot.classList.add("no-selected-dot");
            }
          }
        }
      }
    }, false);
  }

  /**
   * Subtracts a month on currentDate
   */
  previousMonth(){
    let tmp = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      this.currentDate.getDate()
    );

    /* Prevents skipping a month if the previous month doesn't have the selected day */
    /* Ex: Mar 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while(tmp.getMonth() > this.currentDate.getMonth() - 1 && tmp.getFullYear() == this.currentDate.getFullYear()) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
  }

  /**
   * Adds a month on currentDate
   */
  nextMonth(){
    let tmp = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      this.currentDate.getDate()
    );

    /* Prevents skipping a month if the next month doesn't have the selected day */
    /* Ex: Jan 31st -> Feb 28th (because Feb doesn't have a 31st) */
    while(tmp.getMonth() > this.currentDate.getMonth() + 1) {
      tmp.setDate(tmp.getDate() - 1);
    }

    this.updateSelectedDate(tmp);

    this.calc();
  }

  /**
   * Function fired when a date is clicked
   * (no need to call this.calc() because the user can't click a date on a different month)
   * @param day number The day that was clicked
   */
  dateClicked(day){
    let clickedDate = new Date(this.currentDate);
    clickedDate.setDate(day);
    this.updateSelectedDate(clickedDate);
  }

  updateSelectedDate(newDate: Date = null){
    if(newDate) {
      this.currentDate = newDate;
    }

    this.onChange.emit(this.currentDate);

    setTimeout(() => {
      this.showTodayEvents();
      this.setSelectedClass();
    });
  }

  showTodayEvents(){
    let tmp = [];

    /* Checks for events on the new selected date */
    this.events.forEach((item) => {
      var itemDay = new Date(item.starts);
      itemDay.setHours(0,0,0,0);

      if(itemDay.getTime() == this.currentDate.getTime())
        tmp.push(item);
    });

    this.todayEvents = tmp;
  }

  eventClicked(event) {
    this.onEventClicked.emit(event);
  }
}
