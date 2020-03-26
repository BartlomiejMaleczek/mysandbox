({
    handleInit: function (component, evt, helper) {
        helper.onSearch(component, evt, helper);
    },

    doSearch: function (component, evt, helper) {
        const params = evt.getParams().arguments;
        const boatTypeId = params.boatTypeId;

        component.set("v.boatTypeId", boatTypeId);
        helper.onSearch(component, evt, helper);
    },

    onBoatSelect: function (component, evt, helper) {
        var selectedBoatId = evt.getParam("boatId");
        component.set("v.selectedBoatId", selectedBoatId);
    }
})