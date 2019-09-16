({
    doInit: function (component, evt, helper) {
        helper.onInit(component, evt, helper);
    },

    onUserInfoClick: function (component, evt, helper) {
        console.log(evt.target.getAttribute('data-userid'));
        console.log(evt.currentTarget.getAttribute('data-userid'));
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": evt.target.getAttribute('data-userid'),
            "slideDevName": "details"
        });
        navEvt.fire();
        console.log('CLICK');
    },

    refresh: function (component, evt, helper) {
        helper.onInit(component, evt, helper);
    }
})