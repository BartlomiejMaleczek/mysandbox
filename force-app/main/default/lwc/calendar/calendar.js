/**
 * Created by BMaleczek on 09.04.2020.
 */

import { ServiceAbstract } from "c/serviceAbstract";
import { api, track, wire } from "lwc";

export default class Calendar extends ServiceAbstract {
  startRangeWeekDate;
  endRangeWeekDate;
  isLoading;
  @track columns = [];

  weekDays = {};
  months = {};
  titleDate = {};
  nbrOfColsToGenerate;

  days = [];

  constructor() {
    super();
    this.isLoading = true;
    this.startRangeWeekDate = new Date();
    this.endRangeWeekDate = this.utils.jsUtils.addDays(
      this.startRangeWeekDate,
      this.nbrOfColsToGenerate
    );
    this.initWeekDaysMap();
    this.initMonthsMap();

    const screen = window.matchMedia("(max-width: 400px)");
    this.watchMedia(screen);
    screen.addListener(this.watchMedia.bind(this));
    this.isLoading = false;
  }

  watchMedia(event) {
    try {
      if (event.matches) {
        this.nbrOfColsToGenerate = 3;
      } else {
        this.nbrOfColsToGenerate = 5;
      }

      console.log(this.nbrOfColsToGenerate);

      this.generateColumns();
      this.generateRecords();
    } catch (e) {
      console.error(e);
    }
  }

  initWeekDaysMap() {
    this.weekDays[0] = "Ndz.";
    this.weekDays[1] = "Pon.";
    this.weekDays[2] = "Wt.";
    this.weekDays[3] = "Śr.";
    this.weekDays[4] = "Czw.";
    this.weekDays[5] = "Pt.";
    this.weekDays[6] = "Sob.";
  }

  initMonthsMap() {
    this.months[0] = "Styczeń";
    this.months[1] = "Luty";
    this.months[2] = "Marzec";
    this.months[3] = "Kwiecień";
    this.months[4] = "Maj";
    this.months[5] = "Czerwiec";
    this.months[6] = "Lipiec";
    this.months[7] = "Sierpień";
    this.months[8] = "Wrzesień";
    this.months[9] = "Październik";
    this.months[10] = "Listopad";
    this.months[11] = "Grudzień";
  }

  handlePreviousWeek() {
    this.isLoading = true;
    setTimeout(
      function() {
        this.endRangeWeekDate = this.utils.jsUtils.addDays(
          this.endRangeWeekDate,
          -this.nbrOfColsToGenerate
        );
        this.startRangeWeekDate = this.utils.jsUtils.addDays(
          this.startRangeWeekDate,
          -this.nbrOfColsToGenerate
        );
        this.generateColumns();

        this.isLoading = false;
      }.bind(this),
      1000
    );

    // let weekNumber;

    // if(weekNumber != 1) {
    //     let beforeChangedYear = this.startRangeWeekDate.getFullYear();
    //     this.startRangeWeekDate = this.utils.jsUtils.addDays(this.startRangeWeekDate, -7);
    //     let changedYear = this.startRangeWeekDate.getFullYear();
    //     if(beforeChangedYear != changedYear) {
    //         this.startRangeWeekDate = new Date(beforeChangedYear + '-01-01');
    //     }
    // } else {
    //     this.startRangeWeekDate = this.utils.startOfWeek(new Date(this.startRangeWeekDate.getFullYear() - 1 + '-12-31'));
    // }
  }

  handleNextWeek() {
    this.isLoading = true;
    setTimeout(
      function() {
        this.endRangeWeekDate = this.utils.jsUtils.addDays(
          this.endRangeWeekDate,
          this.nbrOfColsToGenerate
        );
        this.startRangeWeekDate = this.utils.jsUtils.addDays(
          this.startRangeWeekDate,
          this.nbrOfColsToGenerate
        );

        this.generateColumns();

        this.isLoading = false;
      }.bind(this),
      500
    );
  }

  generateColumns() {
    const columns = [];
    let date;

    for (let i = 0; i < this.nbrOfColsToGenerate; i++) {
      date = this.utils.jsUtils.addDays(this.startRangeWeekDate, i);
      columns.push({
        isTruncated: false,
        isSortable: false,
        isFixed: false,
        weekDay: this.weekDays[date.getDay()],
        date: date
      });
    }

    this.titleDate = this.months[date.getMonth()] + ", " + date.getFullYear();
    this.columns = columns;
  }

  handleClickButton(event) {
    let record = event.target.parentNode.getTableBodyRowValue();
    console.log(JSON.stringify(record));
  }

  generateRecords() {
    let days = [];
    for (let i = 0; i < 10; i++) {
      days.push({
        Id: i + "index",
        day: i,
        isDisabled: false,
        isVisible: true
      });
    }

    this.days = days;
  }

  get isPrevWeekButtonDisabled() {
    if (this && this.utils && this.utils.jsUtils) {
      return (
        this.utils.jsUtils.formatDateYYYYMMDD(this.startRangeWeekDate) ==
        this.utils.jsUtils.formatDateYYYYMMDD(new Date())
      );
    } else {
      return false;
    }
  }
}
