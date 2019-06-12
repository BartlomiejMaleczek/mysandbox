({
    handleInit: function (cmp, evt, helper) {
        var allRecordsQueryOnce = cmp.get("v.allRecordsQueryOnce");
        if (allRecordsQueryOnce) {
            cmp.find("PromisesService").callPromises(
                cmp,
                helper,
                [
                    ['queryRecords']
                ],
                'finalizeRendering'
            );
        }

    },

    handleInputLookupEvt: function (cmp, evt, helper) {
        if (cmp.find('InputLookupEvtHandler').isSelectRecordLookupEvtActionType(evt)) {
            var payload = evt.getParam('payload');
            cmp.set("v.selectedRecord", payload.selectedRecord);
        } else if (cmp.find('InputLookupEvtHandler').isRemoveSelectedRecordLookupEvtActionType(evt)) {

            var allRecordsQueryOnce = cmp.get("v.allRecordsQueryOnce");
            if (!allRecordsQueryOnce) {
                var searchParams = cmp.get("v.searchParams");
                searchParams[searchParams.fieldOnChange] = {};
                cmp.set("v.currentRecords", []);
                cmp.set("v.records", []);
                cmp.set("v.searchParams", searchParams);
            } else {
                cmp.set("v.currentRecords", cmp.get("v.records"));
            }
            cmp.set("v.selectedRecord", {});
            cmp.find('InputLookupNotSelectedRecordPill').focusInput();
        }
    },

    handleChangeSearchParams: function (cmp, evt, helper) {
        var searchParams = cmp.get("v.searchParams");

        if (searchParams && Object.keys(searchParams[searchParams.fieldOnChange]).length && !cmp.get('v.allRecordsQueryOnce')) {
            cmp.find("PromisesService").callPromises(
                cmp,
                helper,
                [
                    ['queryRecords'],
                ],
                'finalizeRendering'
            );
        }
    }
})