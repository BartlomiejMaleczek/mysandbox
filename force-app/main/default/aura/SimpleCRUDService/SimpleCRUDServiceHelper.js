({
    queryRecord: function (recordData, id, fields) {
        return new Promise((function(resolve, reject) {
            recordData.set("v.recordId", id);
            recordData.set("v.fields", fields);
            recordData.reloadRecord(true, function () {
               resolve('Success');
            });
        }));
    },

    getNewSObject: function (recordData, sObjectType, recordTypeId, isCacheSkipped) {
        return new Promise((function(resolve, reject) {
            recordData.getNewRecord(
                sObjectType,
                recordTypeId,
                isCacheSkipped,
                function () {
                    resolve('Success');
                }
            )
        }));
    },
    
    insertRecord: function (recordData, recordToInsert) {
        return new Promise((function(resolve, reject) {
            recordData.saveRecord(function (saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    resolve('Success');
                } else if (saveResult.state === "INCOMPLETE") {
                   reject("User is offline, device doesn't support drafts.");

                } else if (saveResult.state === "ERROR") {
                    var errMsg = "";
                    for (var i = 0; i < saveResult.error.length; i++) {
                        errMsg += saveResult.error[i].message + "\n";
                    }
                    reject(errMsg);
                } else {
                    reject('Unknown problem, state: ' + saveResult.state +
                        ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }));
    }
})