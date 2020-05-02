({
    handleInit: function (cmp, evt, helper) {
        // ['setServices'],
        //     ['getData'],
        helper.setServices(cmp, helper);
        helper.initDates(cmp, helper);
        helper.finalizeRendering(cmp, helper);
        // cmp.find("PromisesService").callPromises(
        //     cmp,
        //     helper,
        //     [
        //         ['setServices']
        //         // ['initDates']
        //     ],
        //     'finalizeRendering'
        // );
    },

    handleAcceptOrRejectRow: function (cmp, evt, helper) {
        var acceptOrRejectRowTextArea = cmp.find('acceptOrRejectRowTextArea');
        var rowToAcceptOrReject = cmp.get("v.rowToAcceptOrReject");

        if (acceptOrRejectRowTextArea.checkValidity()) {
            helper.services.utils.showElement(cmp, 'spinner');
            cmp.set("v.isAcceptOrRejectPopupVisible", false);

            rowToAcceptOrReject.row.comment = acceptOrRejectRowTextArea.get("v.value");
            rowToAcceptOrReject.row.timesheetWeekDayEntries = helper.filterTimesheetEntriesWithId(helper, rowToAcceptOrReject.row);

            if (helper.services.utils.isValueNotUndefinedOrNull(rowToAcceptOrReject.row.timesheetWeekDayEntries) && rowToAcceptOrReject.row.timesheetWeekDayEntries.length != 0) {
                helper.acceptOrRejectRow(cmp, helper, rowToAcceptOrReject);
            } else {
                helper.services.utils.showToast('Error', 'Has not entries', 'error');
                helper.services.utils.hideElement(cmp, 'spinner');
            }
        } else {
            acceptOrRejectRowTextArea.reportValidity();
        }
    },

    handleCloseAcceptOrRejectPopup: function (cmp, evt, helper) {
        cmp.set("v.isAcceptOrRejectPopupVisible", false);
        cmp.set("v.rowToAcceptOrReject", {});
    },

    handleComponentEvent: function (cmp, evt, helper) {
        helper.services.eventHandler.isTimesheetAcceptOrRejectEvtActionType(evt, function (row) {
            cmp.set("v.isAcceptOrRejectPopupVisible", true);
            cmp.set("v.rowToAcceptOrReject", row);
        });
    }
})