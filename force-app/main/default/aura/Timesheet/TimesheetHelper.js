({
    services: {
        utils: {},
        apex: {},
        promises: {},
        eventHandler: {}
    },

    setServices: function (cmp, helper) {
        return new Promise(function (resolve, reject) {
            try {
                helper.services.utils = cmp.find('UtilsService');
                helper.services.apex = cmp.find('ApexService');
                helper.services.promises = cmp.find('PromisesService');
                helper.services.eventHandler = cmp.find('CmpEventHandler');
                resolve('Success');
            } catch (error) {
                console.log('setServices: ', error);
                reject(error);
            }
        });
    },

    getData: function (cmp, helper) {
        return new Promise(function (resolve, reject) {
            helper.services.apex.callApex(
                cmp,
                "c.getDataApex",
                {},
                function onSuccess(cmp, result) {
                    if (helper.services.utils.isValueNotUndefinedOrNull(result)) {
                        cmp.set("v.data", JSON.parse(result).rows);
                    }

                    resolve("Success");
                },
                function onFailure(result) {
                    helper.services.utils.showToast('Error', result, 'error');
                    reject('Failure');
                }
            )
        });
    },

    initDates: function (cmp, helper) {
        return new Promise(function (resolve, reject) {
            try {
                var startRangeWeekDate = helper.services.utils.startOfWeek(new Date());
                var endRangeWeekDate = helper.services.utils.addDays(startRangeWeekDate, 6);

                cmp.set("v.startRangeWeekDate", startRangeWeekDate);
                cmp.set("v.endRangeWeekDate", endRangeWeekDate);
                cmp.set("v.weekNumber", helper.services.utils.getWeekNumber(startRangeWeekDate));
                
                resolve('Success initDates');
            } catch (error) {
                console.log('initDates:', error);
                reject(error);
            }
        });

    },

    filterTimesheetEntriesWithId: function (helper, row) {
        return row.timesheetWeekDayEntries.filter(function (timesheetWeekDayEntry) {
            var containsEntriesWithId = false;

            if(timesheetWeekDayEntry.timeSheetEntries) {
                timesheetWeekDayEntry.timeSheetEntries = timesheetWeekDayEntry.timeSheetEntries.filter(function (timesheetEntry) {
                    return timesheetEntry.Id;
                });
            }

            containsEntriesWithId = !!timesheetWeekDayEntry.timeSheetEntries.length;

            return containsEntriesWithId;
        });
    },

    acceptOrRejectRow: function (cmp, helper, rowToAcceptOrReject) {
        return new Promise(function (resolve, reject) {
            helper.services.apex.callApex(
                cmp,
                "c.acceptOrRejectRowApex",
                {
                    "rowJSON": JSON.stringify(rowToAcceptOrReject.row)
                },
                function onSuccess(cmp, result) {
                    if (helper.services.utils.isValueNotUndefinedOrNull(result)) {
                        cmp.set("v.data", JSON.parse(result).rows);
                        cmp.set("v.rowToAcceptOrReject", {});
                    }
                    helper.services.utils.hideElement(cmp, 'spinner');
                    helper.services.utils.showToast('Success', 'Success', 'success');
                    resolve('Success');
                },
                function onFailure(result) {
                    cmp.set("v.isAcceptOrRejectPopupVisible", false);
                    cmp.set("v.rowToAcceptOrReject", {});
                    helper.services.utils.hideElement(cmp, 'spinner');
                    helper.services.utils.showToast('Error', result, 'error');
                    reject(result);
                }
            )
        });
    },

    finalizeRendering: function (cmp, helper) {
        helper.services.utils.hideElement(cmp, 'spinner');
    }
})