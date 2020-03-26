({
    handleInit: function (cmp, evt, helper) {
        var selectedRecord = cmp.get("v.selectedRecord");
        helper.getMainFieldValueToDisplay(cmp, helper, selectedRecord);
    },

    handleSelectedRecordChange: function (cmp, evt, helper) {
        var selectedRecord = cmp.get("v.selectedRecord");
        helper.getMainFieldValueToDisplay(cmp, helper, selectedRecord);
    },

    handleRemoveSelectedRecord: function (cmp, evt, helper) {
        cmp.find('InputLookupEvtHandler').fireRemoveSelectedRecordLookupEvt();
    }
})