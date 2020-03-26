({
    onInit: function (component, evt, helper) {
        var boatId = component.get("v.boat").Id;
        // component.find('ApexService').callApex(
        //     component,
        //     "c.getAll",
        //     {
        //         boatId : boatId
        //     },
        //     function onSuccess(cmp, result) {
        //         component.set('v.boatReviews', result);
        //     },
        //     function onFailure(result) {
        //         component.find("UtilsService").showToast('Data Initalization:', result, 'error');
        //     }
        // )


        var action = component.get("c.getAll");
        action.setParams({boatId: boatId});
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.boatReviews', response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
            }
            else if (state === "ERROR") {
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(action);
    }
})