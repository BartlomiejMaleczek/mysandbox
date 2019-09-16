({
    onFireAddErrorMsgLookupEvt: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const errorMsg = params.errorMsg;

        helper.fireAddErrorMsgLookupEvt(cmp, helper, errorMsg);
    },

    onIsAddErrorMsgLookupEvtActionType: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputLookupEvtObj = params.inputLookupEvtObj;

        return helper.isAddErrorMsgLookupEvtActionType(inputLookupEvtObj, helper);
    },

    onFireSelectRecordLookupEvt: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const selectedRecord = params.selectedRecord;

        helper.fireSelectRecordLookupEvt(cmp, helper, selectedRecord);
    },

    onIsSelectRecordLookupEvtActionType: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputLookupEvtObj = params.inputLookupEvtObj;

        return helper.isSelectRecordLookupEvtActionType(inputLookupEvtObj, helper);
    },

    onFireRemoveSelectedRecordLookupEvt: function (cmp, evt, helper) {
        helper.fireRemoveSelectedRecordLookupEvt(cmp, helper);
    },

    onIsRemoveSelectedRecordLookupEvtActionType: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputLookupEvtObj = params.inputLookupEvtObj;

        return helper.isRemoveSelectedRecordLookupEvtActionType(inputLookupEvtObj, helper);
    },

    onFireModifySearchParamsLookupEvt: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const search = params.search;

        helper.fireModifySearchParamsLookupEvt(cmp, helper, search);
    },

    onIsFireModifySearchParamsLookupEvtActionType: function (cmp, evt, helper) {
        const params = evt.getParams().arguments;
        const inputLookupEvtObj = params.inputLookupEvtObj;

        return helper.isFireModifySearchParamsLookupEvtActionType(inputLookupEvtObj, helper);
    }
})