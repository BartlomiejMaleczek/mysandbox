({
    recordLoaded: function(component, event, helper) {
        var caseRecord = component.get("v.record"),
            recordData = component.find("recordData");
        caseRecord.OwnerId = component.get("$SObjectType.CurrentUser.Id");
        if (!component.get("v.complete")) { // Avoid infinite loop
            component.set("v.complete", true);
            component.set("v.record", caseRecord);
            recordData.saveRecord($A.getCallback(function (result) {
                if (result.state === "SUCCESS" || result.state === "DRAFT") {
                    $A.get("e.force:closeQuickAction").fire();
                    $A.get("e.force:refreshView").fire();
                } else { /* show an error here */
                }
            }));
        }
    }
    })