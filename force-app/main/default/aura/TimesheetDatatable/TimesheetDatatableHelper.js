({
    services: {
        utils: {},
        apex: {},
        promises: {}
    },

    setServices: function (cmp, helper) {
        return new Promise(function (resolve, reject) {
            try {
                helper.services.utils = cmp.find('UtilsService');
                helper.services.apex = cmp.find('ApexService');
                helper.services.promises = cmp.find('PromisesService');
                resolve('Success');
            } catch (error) {
                console.log('setServices: ', error);
                reject(error);
            }
        });
    },

    getColumns: function (cmp, helper) {
        return new Promise(function (resolve, reject) {
            try {
                var isLastDayOfTheYear = false;
                var startRangeWeekDate = cmp.get("v.startRangeWeekDate");
                debugger;
                isLastDayOfTheYear = helper.isLastDayOfTheYear(startRangeWeekDate);

                var columns = [];
                columns.push(startRangeWeekDate);

                if (!isLastDayOfTheYear) {
                    var columnDate;

                    for (var i = 1; i < 7; i++) {
                        columnDate = helper.services.utils.addDays(startRangeWeekDate, i);
                        columns.push(columnDate);

                        if (columnDate.getDay() == 0 || helper.isLastDayOfTheYear(columnDate)) {
                            break;
                        }
                    }

                    cmp.set("v.endRangeWeekDate", columns[columns.length - 1]);
                } else {
                    cmp.set("v.endRangeWeekDate", startRangeWeekDate);
                }
                debugger;
                cmp.set("v.columns", columns);
                resolve('Success');
            } catch (error) {
                console.log('getColumns: ', error);
                reject(error);
            }
        });

    },

    filterData: function (cmp, helper) {
        var columns = cmp.get("v.columns");
        var data = cmp.get("v.data");
        var currentData = [];
        var isTimeSheetEntryMatch = false;
        var keys = Object.keys(data);
        var timesheetWeekDayEntry = {};
        var rowTimesheetWeekDayEntry = {};
        var rowTimesheetEntry = {};

        for (var i = 0; i < keys.length; i++) {

            var row = data[keys[i]];

            if (helper.isProjectInWeekRange(cmp, helper, row)) {
                var defaultRecord = helper.getDefaultRecord(row);
                columns.forEach(function (columnDate) {
                    rowTimesheetWeekDayEntry = row.timesheetWeekDayEntries[0];
                    for (var j = 0; j < rowTimesheetWeekDayEntry.timeSheetEntries.length; j++) {
                        rowTimesheetEntry = rowTimesheetWeekDayEntry.timeSheetEntries[j];
                        var parsedStartDate = new Date(rowTimesheetEntry.Start__c);
                        var day = parsedStartDate.getDate();
                        var month = parsedStartDate.getMonth() + 1;
                        var year = parsedStartDate.getFullYear();

                        if (columnDate.getDate() == day && columnDate.getMonth() + 1 == month && columnDate.getFullYear() == year) {
                            if (defaultRecord.timesheetWeekDayEntries.length) {
                                timesheetWeekDayEntry = defaultRecord.timesheetWeekDayEntries.filter(function (timesheetWeekDayEntry) {
                                    return timesheetWeekDayEntry.weekDayDate == columnDate;
                                })[0];

                                if(timesheetWeekDayEntry) {
                                    timesheetWeekDayEntry.hours += rowTimesheetEntry.Duration__c;
                                    timesheetWeekDayEntry.timeSheetEntries.push(rowTimesheetEntry);
                                    defaultRecord.weeklySum += rowTimesheetEntry.Duration__c;
                                } else {
                                    timesheetWeekDayEntry = helper.getTimesheetWeekDayEntry(columnDate, rowTimesheetEntry);
                                    defaultRecord.timesheetWeekDayEntries.push(timesheetWeekDayEntry);
                                    defaultRecord.weeklySum += rowTimesheetEntry.Duration__c;
                                }
                            } else {
                                timesheetWeekDayEntry = helper.getTimesheetWeekDayEntry(columnDate, rowTimesheetEntry);
                                defaultRecord.timesheetWeekDayEntries.push(timesheetWeekDayEntry);
                                defaultRecord.weeklySum += rowTimesheetEntry.Duration__c;
                            }

                            isTimeSheetEntryMatch = true;
                            helper.getTimesheetEntryCommentAndStatus(defaultRecord, row, rowTimesheetEntry);
                        }
                    }

                    if (!isTimeSheetEntryMatch) {
                        defaultRecord.timesheetWeekDayEntries.push(helper.getTimesheetWeekDayEntry(columnDate, helper.getDefaultTimesheetEntry(columnDate, row.projectMember.Contact__r)));
                    }

                    isTimeSheetEntryMatch = false;
                });

                currentData.push(defaultRecord);
            }
        }

        cmp.set("v.currentData", currentData);
    },

    isProjectInWeekRange: function (cmp, helper, row) {
        var startRangeWeekDate = cmp.get("v.startRangeWeekDate");
        var endRangeWeekDate = cmp.get("v.endRangeWeekDate");

        var projectStartDate = new Date(row.projectMember.Project__r.Start_Date__c);
        var projectEndDate = new Date(row.projectMember.Project__r.End_Date__c);

        return !(helper.getDateWithoutTime(startRangeWeekDate) > helper.getDateWithoutTime(projectEndDate)
            || helper.getDateWithoutTime(endRangeWeekDate) < helper.getDateWithoutTime(projectStartDate));
    },

    getDateWithoutTime: function (date) {
        if (date) {
            return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
        }
    },

    getDefaultRecord: function (row) {
        var defaultRecord = Object.assign({}, row);
        defaultRecord.timesheetWeekDayEntries = [];
        defaultRecord.isAccepted = false;
        defaultRecord.isRejected = false;
        defaultRecord.comment = '';
        defaultRecord.weeklySum = 0;

        return defaultRecord;
    },

    getTimesheetWeekDayEntry: function (columnDate, rowTimesheetEntry) {
      return {
          weekDayDate: columnDate,
          hours: rowTimesheetEntry.Duration__c,
          timeSheetEntries: [rowTimesheetEntry]
      };
    },

    getDefaultTimesheetEntry: function (columnDate, contact) {
        var defaultTimesheetEntry = {
            Start__c: columnDate,
            End__c: columnDate,
            Contact__c: contact.Id,
            Duration__c: 0
        };

        return defaultTimesheetEntry;
    },

    getTimesheetEntryCommentAndStatus: function (defaultRecord, row, timesheetEntry) {
        if (timesheetEntry.Status__c == 'Approved') {
            defaultRecord.isAccepted = true;
            defaultRecord.comment = timesheetEntry.Customer_Comment__c;
        } else if (timesheetEntry.Status__c == 'Rejected') {
            defaultRecord.isRejected = true;
            defaultRecord.comment = timesheetEntry.Customer_Comment__c;
        }
    },

    isLastDayOfTheYear: function (date) {
        return date.getDate() == 31 && date.getMonth() + 1 == 12;
    },

    finalizeRendering: function (cmp, helper) {

    }
})