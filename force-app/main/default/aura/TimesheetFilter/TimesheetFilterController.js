({
    handleInit: function (cmp, evt, helper) {
        helper.setServices(cmp, helper);
    },

    handlePreviousWeek: function (cmp, evt, helper) {
        var startRangeWeekDate = cmp.get("v.startRangeWeekDate");
        var weekNumber = cmp.get("v.weekNumber");

        if(weekNumber != 1) {
            var beforeChangedYear = startRangeWeekDate.getFullYear();
            startRangeWeekDate = helper.services.utils.addDays(startRangeWeekDate, -7);
            var changedYear = startRangeWeekDate.getFullYear();
            if(beforeChangedYear != changedYear) {
                startRangeWeekDate = new Date(beforeChangedYear + '-01-01');
            }
        } else {
            startRangeWeekDate = helper.services.utils.startOfWeek(new Date(startRangeWeekDate.getFullYear() - 1 + '-12-31'));
        }

        cmp.set("v.startRangeWeekDate", startRangeWeekDate);
        cmp.set("v.weekNumber", helper.services.utils.getWeekNumber(startRangeWeekDate));
    },

    handleNextWeek: function (cmp, evt, helper) {
        var endRangeWeekDate = cmp.get("v.endRangeWeekDate");
        debugger;
        var startRangeWeekDate = helper.services.utils.addDays(endRangeWeekDate, 1);

        cmp.set("v.startRangeWeekDate", startRangeWeekDate);
        cmp.set("v.weekNumber", helper.services.utils.getWeekNumber(startRangeWeekDate));
    },

    handleToday: function (cmp, evt, helper) {
        var startRangeWeekDate = helper.services.utils.startOfWeek(new Date());

        cmp.set("v.startRangeWeekDate", startRangeWeekDate);
        cmp.set("v.weekNumber", helper.services.utils.getWeekNumber(startRangeWeekDate));
    }
})