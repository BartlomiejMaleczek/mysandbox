({
    onSearch: function (component, evt, helper) {
        var boatTypeId = component.get("v.boatTypeId");
        component.find('ApexService').callApex(
            component,
            "c.getBoats",
            {
                boatTypeId : boatTypeId
            },
            function onSuccess(cmp, result) {
                component.set('v.boats', result);
            },
            function onFailure(result) {
                component.find("UtilsService").showToast('Data Initalization:', result, 'error');
            }
        )
    }
})