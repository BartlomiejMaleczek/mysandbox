({
    doInit: function (component, event, helper) {
        helper.onInit(component, event, helper);
    },

    onSave: function (component, event, helper) {
        var boatReview = component.get("v.boatReview");

        var recordData = component.find('service');
        recordData.saveRecord(function (saveResult) {
            console.log('NEW RECORD');
            console.log(JSON.stringify(saveResult));
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                var toastEvent = $A.get("e.force:showToast");
                if(toastEvent) {
                    toastEvent.setParams({
                        "title": "Success!",
                        "type": 'success',
                        "message": "The record has been inserted successfully."
                    });
                    toastEvent.fire();
                } else {
                    alert('The record has been inserted successfully.');
                }

                var boatReviewAddedEvt = component.getEvent("boatReviewAdded");
                boatReviewAddedEvt.setParam('boatReview', boatReview);
                boatReviewAddedEvt.fire();
                helper.onInit(component, event, helper);

            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");

            } else if (saveResult.state === "ERROR") {
                console.log('ERROR', saveResult.error);
                var errMsg = "";
                for (var i = 0; i < saveResult.error.length; i++) {
                    errMsg += saveResult.error[i].message + "\n";
                }
                console.log(errMsg);
            } else {
                console.log('Unknown problem, state: ' + saveResult.state +
                    ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },

    onRecordUpdated: function (component, event, helper) {
        
    }
})