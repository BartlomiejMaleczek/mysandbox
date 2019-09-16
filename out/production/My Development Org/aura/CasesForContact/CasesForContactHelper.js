({
    getContactCases: function (cmp, helper) {
        var recordId = cmp.get("v.recordId");
        var action = cmp.get("c.getContactCasesApex");
        action.setParams({ recordId : recordId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.cases", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {

            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }

            $A.util.addClass(cmp.find('spinner'), 'slds-hide');

        });
        $A.enqueueAction(action);
    }
})