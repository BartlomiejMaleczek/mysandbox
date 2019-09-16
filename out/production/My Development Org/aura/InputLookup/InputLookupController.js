({
    handleInit: function (cmp, evt, helper) {
        var searchParams = cmp.get("v.searchParams");

        helper.callQueryRecordsWithValidation(cmp, helper, searchParams);
    },

    handleInputLookupEvt: function (cmp, evt, helper) {
        const inputLookupEvtHandler = cmp.find('InputLookupEvtHandler');

        if (inputLookupEvtHandler.isSelectRecordLookupEvtActionType(evt)) {
            var payload = evt.getParam('payload');
            cmp.set("v.selectedRecord", payload.selectedRecord);

        } else if (inputLookupEvtHandler.isRemoveSelectedRecordLookupEvtActionType(evt)) {
            var filterThroughQueriedRecords = cmp.get("v.filterThroughQueriedRecords");
            // var noDynamicParams = cmp.get("v.noDynamicParams");

            if (!filterThroughQueriedRecords) {
                helper.resetSearchLookup(cmp, helper);
            } else {
                cmp.set("v.currentRecords", cmp.get("v.records"));
            }

            cmp.set("v.selectedRecord", {});
            cmp.find('InputLookupNotSelectedRecordPill').focusInput();

        } else if (inputLookupEvtHandler.isFireModifySearchParamsLookupEvtActionType(evt)) {
            var payload = evt.getParam('payload');
            var searchParams = cmp.get("v.searchParams");

            if (payload.search && payload.search.length) {
                searchParams[searchParams.fieldOnChange] = payload.search;
                helper.callQueryRecordsWithValidation(cmp, helper, searchParams);
            } else {
                helper.resetSearchLookup(cmp, helper);
            }
        }
    },

    handleChangeSearchParams: function (cmp, evt, helper) {
        var searchParams = cmp.get("v.searchParams");

        // if(!cmp.get("v.noDynamicParams")) {
            helper.callQueryRecordsWithValidation(cmp, helper, searchParams);
        // }
    }
})