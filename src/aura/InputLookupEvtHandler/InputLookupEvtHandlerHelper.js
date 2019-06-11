({
    constants: {
        'ADD_ERROR_MSG_ACTION_TYPE': 'AddErrorMsg',
        'SELECT_RECORD_ACTION_TYPE': 'SelectRecord',
        'REMOVE_SELECTED_RECORD_ACTION_TYPE': 'RemoveSelectedRecord'
    },

    fireAddErrorMsgLookupEvt: function (cmp, helper, errorMsg) {
        var payload = {'message': errorMsg};
        var actionType = helper.constants.ADD_ERROR_MSG_ACTION_TYPE;
        helper.fireInputLookupEvt(cmp, payload, actionType);
    },

    isAddErrorMsgLookupEvtActionType: function (inputLookupEvtObj, helper) {
        var actionType = inputLookupEvtObj.getParam('actionType');

        return (helper.constants.ADD_ERROR_MSG_ACTION_TYPE == actionType);
    },

    fireSelectRecordLookupEvt: function (cmp, helper, selectedRecord) {
        var payload = {'selectedRecord': selectedRecord};
        var actionType = helper.constants.SELECT_RECORD_ACTION_TYPE;
        helper.fireInputLookupEvt(cmp, payload, actionType);
    },

    isSelectRecordLookupEvtActionType: function (inputLookupEvtObj, helper) {
        var actionType = inputLookupEvtObj.getParam('actionType');

        return (helper.constants.SELECT_RECORD_ACTION_TYPE == actionType);
    },

    fireRemoveSelectedRecordLookupEvt: function (cmp, helper) {
        var actionType = helper.constants.REMOVE_SELECTED_RECORD_ACTION_TYPE;
        helper.fireInputLookupEvt(cmp, {}, actionType);
    },

    isRemoveSelectedRecordLookupEvtActionType: function (inputLookupEvtObj, helper) {
        var actionType = inputLookupEvtObj.getParam('actionType');

        return (helper.constants.REMOVE_SELECTED_RECORD_ACTION_TYPE == actionType);
    },

    fireInputLookupEvt: function (cmp, payload, actionType) {
        var inputLookupEvt = cmp.getEvent("InputLookupEvt");

        inputLookupEvt.setParams({
            "payload" : payload,
            "actionType": actionType
        })

        inputLookupEvt.fire();
    }
})