({
    queryBoatTypes: function (cmp, helper) {
        cmp.find('ApexService').callApex(
            cmp,
            "c.queryBoatTypesApex",
            {},
            function onSuccess(cmp, result) {
                cmp.set('v.boatTypes', result);
            },
            function onFailure(result) {
                cmp.find("UtilsService").showToast('Data Initalization:', result, 'error');

            }
        )
    }
})