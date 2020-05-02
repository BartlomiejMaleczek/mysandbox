({
    handleInit: function (cmp, evt, helper) {
    },

    handleFireAcceptRowEvt: function (cmp, evt, helper) {
        let row = cmp.get("v.row");
        let index = cmp.get("v.index");
        row.isAccepted = true;
        row.isRejected = false;
        cmp.find('CmpEventHandler').fireTimesheetAcceptOrRejectEvt({
            row: row,
            index: index
        });
    },

    handleFireRejectRowEvt: function (cmp, evt, helper) {
        let row = cmp.get("v.row");
        let index = cmp.get("v.index");
        row.isAccepted = false;
        row.isRejected = true;
        cmp.find('CmpEventHandler').fireTimesheetAcceptOrRejectEvt({
            row: row,
            index: index
        });
    }
})