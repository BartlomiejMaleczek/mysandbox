({
    onFormSubmit: function (component, evt, helper) {
        var formSubmitEvt = evt.getParam("formData");
        component.find('BoatSearchResults').search(formSubmitEvt.boatTypeId);
        console.log(formSubmitEvt);
    },

    onBoatSelected: function (cmp, evt, helper) {

        console.log('FIRE onBoatSelected BOATSEARCH');
    }
})