({
    handleInit: function (cmp, evt, helper) {
        console.log('HANDLEINIT');
        cmp.find("PromisesService").callPromises(
            cmp,
            helper,
            [
                ['setServices'],
                ['getColumns']
            ],
            'finalizeRendering'
        );

    },

    handleTimeRangeChange: function (cmp, evt, helper) {
        helper.services.utils.showElement(cmp, 'spinner');

        helper.getColumns(cmp, helper);
        // helper.filterData(cmp, helper);

        helper.services.utils.hideElement(cmp, 'spinner');
    },

    handleDataChange: function (cmp, evt, helper) {
        // helper.services.utils.showElement(cmp, 'spinner');
        //
        // helper.filterData(cmp, helper);
        //
        // helper.services.utils.hideElement(cmp, 'spinner');
    }
})