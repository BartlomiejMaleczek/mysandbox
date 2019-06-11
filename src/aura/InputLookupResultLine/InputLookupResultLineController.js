({
    handleInit: function (cmp, evt, helper) {
        var record = cmp.get("v.record");

        helper.getMainFieldValueToDisplay(cmp, helper, record);
        helper.fetchAdditionalFieldsToDisplay(cmp, helper, record);
    },

    handleSelectRecord: function (cmp, evt, helper) {
        cmp.find('InputLookupEvtHandler').fireSelectRecordLookupEvt(cmp.get("v.record"))
    }
})