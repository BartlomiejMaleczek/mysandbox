({
    handleRowActionEdit: function (cmp, evt, helper) {
        var rowActionTabIndex = cmp.get("v.index");
        var rowActionRole = 'editTrackedHotel';

        helper.fireRowActionEvt(cmp, rowActionRole, rowActionTabIndex);
    },

    handleRowActionRemove: function (cmp, evt, helper) {
        var rowActionTabIndex = cmp.get("v.index");
        var rowActionRole = 'removeRandomHotelRow';

        helper.fireRowActionEvt(cmp, rowActionRole, rowActionTabIndex);
    },

    handleOnBlurEditMenu: function (cmp, evt, helper) {
        cmp.find('UtilsService').setTimeout(
            cmp,
            function () {
                cmp.set("v.isRowActionMenuOpen", false);
            },
            150
        );
    },

    handleShowEditMenu: function (cmp, evt, helper) {
        cmp.set("v.isRowActionMenuOpen", true);
    }
})