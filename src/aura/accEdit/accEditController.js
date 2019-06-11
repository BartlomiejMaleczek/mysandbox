({
    handleSaveButton: function (cmp, evt, helper) {
        cmp.set("v.accountRecord.Id", cmp.get("v.recordId"));
        cmp.find("recordEditor").saveRecord(function(saveResult) {
            if (saveResult.state === "ERROR") {
                var errMsg = "";
                // saveResult.error is an array of errors,
                // so collect all errors into one message
                for (var i = 0; i < saveResult.error.length; i++) {
                    errMsg += saveResult.error[i].message + "\n";
                }
                cmp.set("v.recordSaveError", errMsg);
            } else {
                cmp.set("v.recordSaveError", "");
            }
            // if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
            //     // record is saved successfully
            //     var resultsToast = $A.get("e.force:showToast");
            //     resultsToast.setParams({
            //         "title": "Saved",
            //         "message": "The record was saved."
            //     });
            //     resultsToast.fire();
            // } else if (saveResult.state === "INCOMPLETE") {
            //     // handle the incomplete state
            //     console.log("User is offline, device doesn't support drafts.");
            // } else if (saveResult.state === "ERROR") {
            //     // handle the error state
            //     console.log('Problem saving contact, error: ' +
            //         JSON.stringify(saveResult.error));
            // } else {
            //     console.log('Unknown problem, state: ' + saveResult.state +
            //         ', error: ' + JSON.stringify(saveResult.error));
            // }
        });
    }
})