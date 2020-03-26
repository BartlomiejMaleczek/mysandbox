({
    handleInit: function (component, evt, helper) {
        component.set("v.isNavigateEventAvailable", $A.get("e.force:navigateToSObject"));
    },

    onFullDetails: function (cmp, evt,helper) {
        console.log('onFullDetails');
        var boat = cmp.get("v.boat");
        var navEvt = $A.get("e.force:navigateToSObject");
        if(navEvt) {
            navEvt.setParams({
                "recordId": boat.Id,
                "slideDevName": "detail",
                "isredirect": false
            });
            navEvt.fire();
        }

    }
})