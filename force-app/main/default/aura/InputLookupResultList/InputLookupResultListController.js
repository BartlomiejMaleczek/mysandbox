({
    handleInit: function (cmp, evt, helper) {
    },

    handleResultListScroll: function (cmp, evt, helper) {
        cmp.find('scrollableResultList').getElement().focus();
        cmp.set("v.isResultListScrolling", true);
    },

    handleOnResultListBlur: function (cmp, evt, helper) {
        cmp.set("v.isResultListScrolling", false);
        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                    cmp.set("v.isResultListVisible", false);
            },
            200
        );
    }
})