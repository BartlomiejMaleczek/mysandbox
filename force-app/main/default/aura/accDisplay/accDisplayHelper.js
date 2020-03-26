({
    queryAccounts: function (component, helper) {
        var action = component.get("c.queryAccounts");
        action.setStorable();
        // action.setParams();
        action.setCallback(this, function(response) {
            console.log(response);
            console.log("Accounts loaded in %fms",
                performance.now() - startTime);
            // handle response
        });
        var startTime = performance.now();
        $A.enqueueAction(action);
    }
})