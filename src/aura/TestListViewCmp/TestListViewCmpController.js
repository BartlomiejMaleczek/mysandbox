({
    handleInit: function (cmp, evt, helper) {
        console.log('WYWOLUJE SIĘ');
        console.log(cmp.get("v.selected"));
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
    }
})