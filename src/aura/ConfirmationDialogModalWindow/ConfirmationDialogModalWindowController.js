({
    handleCloseDialogWindow: function (cmp, evt, helper) {
        cmp.set("v.isConfirmationDialogModalWindowOpened", false);
    },

    handleConfirmed: function (cmp, evt, helper) {
        var isConfirmed = true;

        var cmpEvent = cmp.getEvent("submitConfirmationEvt");
        cmpEvent.setParams({
            "isConfirmed" : isConfirmed
        });
        cmpEvent.fire();

    }
})