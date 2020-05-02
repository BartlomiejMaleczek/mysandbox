({
    fireRowActionEvt: function (cmp, rowActionRole, rowActionTabIndex) {
        var cmpEvent = cmp.getEvent("rowActionEvt");
        cmpEvent.setParams({
            "rowActionRole": rowActionRole,
            "rowActionTabIndex": rowActionTabIndex
        });
        cmpEvent.fire();
    }
})