({
    onQueryRecord: function (cmp, evt, helper) {
        var recordData = cmp.find('recordData');
        const params = evt.getParams().arguments;
        const id = params.Id;
        const fields = params.fields;
        const mode = params.mode;
        const callback = params.callback;
        recordData.set("v.mode", mode);
        helper.queryRecord(recordData, id, fields).then((function (result) {
            callback(cmp.get("v.targetFieldsRecord"));
        })).catch((function (error) {
            console.log(error);
        }));
    },

    onGetNewSObject: function (cmp, evt, helper) {
        var recordData = cmp.find('recordData');
        const params = evt.getParams().arguments;
        const sObjectType = params.sObjectType;
        const recordTypeId = params.recordTypeId;
        const isCacheSkipped = params.isCacheSkipped;
        const callback = params.callback;

        helper.getNewSObject(recordData, sObjectType, recordTypeId, isCacheSkipped).then((function (result) {
            var error = cmp.get("v.recordError");
            var record = cmp.get("v.record");
            if(error || (record === null)) {
                console.log("Error initializing record template: " + error);
            }
            else {
                console.log("Record template initialized: " + record.sobjectType);
                callback(cmp.get("v.targetFieldsRecord"));
            }

        })).catch((function (error) {
            console.log(error);
        }));
    },

    onInsertRecord: function (cmp, evt, helper) {
        var recordData = cmp.find('recordData');
        const params = evt.getParams().arguments;
        const recordToInsert = params.recordToInsert;
        const callback = params.callback;

        helper.insertRecord(recordData, recordToInsert).then((function (result) {
            callback(cmp.get("v.targetFieldsRecord"));
        })).catch((function (error) {
            console.log(error);
            cmp.set("v.recordError", error);
        }));
    },

    onEditRecord: function (cmp, evt, helper) {
        var recordData = cmp.find('recordData');
        recordData.set("v.mode", 'EDIT');
        const params = evt.getParams().arguments;
        const recordToEdit = params.recordToEdit;
        const callback = params.callback;

        recordData.set('v.recordId', recordToEdit.Id);
        recordData.set('v.targetFields', recordToEdit);

        helper.insertRecord(recordData, recordToEdit).then((function (result) {
            callback(cmp.get("v.targetFieldsRecord"));
        })).catch((function (error) {
            console.log(error);
            cmp.set("v.recordError", error);
        }));

    },

    handleRecordUpdated: function (cmp, evt, helper) {
        var eventParams = evt.getParams();
        if (eventParams.changeType === "LOADED") {
            console.log("Record is loaded successfully.");
        } else if (eventParams.changeType === "CHANGED") {
            console.log('Record has changed');
        } else if (eventParams.changeType === "REMOVED") {
            console.log('Removed has changed');
        } else if (eventParams.changeType === "ERROR") {
            console.log('Error has changed');
        }
    }
})