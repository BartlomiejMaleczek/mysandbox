({
    handleInit: function (cmp, evt, helper) {
        helper.fetchFieldsToSearch(cmp, helper);
    },

    handleOpenResultList: function (cmp, evt, helper) {
        cmp.set("v.isResultListVisible", true);
    },

    handleCloseResultList: function (cmp, evt, helper) {
        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                if (!cmp.get("v.isResultListScrolling")) {
                    cmp.set("v.isResultListVisible", false);
                }
            },
            200
        );
    },

    handleSearch: function (cmp, evt, helper) {
        cmp.set("v.isLoading", true);
        var allRecordsQueryOnce = cmp.get("v.allRecordsQueryOnce");
        var noDynamicParams = cmp.get("v.noDynamicParams");
        var search = cmp.get("v.search");
        var timer = cmp.get("v.timer");

        if (allRecordsQueryOnce || noDynamicParams) {
            cmp.find('UtilsService').setTimeout(
                cmp,
                function () {
                    helper.filterCurrentRecords(cmp, helper, search);
                },
                1000
            );
        } else {
            console.log('Strzelam eventem');
            clearTimeout(timer);
            timer = setTimeout($A.getCallback(function () {
                helper.fireModifySearchParamsEvt(cmp, helper, search)
            }), 1000);
            cmp.set("v.timer", timer);
        }
    },

    onFocusInput: function (cmp, evt, helper) {
        var lookupInput = cmp.find('lookupInput');
        if (lookupInput) {
            cmp.find('UtilsService').setTimeout(cmp, function () {
                lookupInput.focus();
            }, 1);
        }
    }
})