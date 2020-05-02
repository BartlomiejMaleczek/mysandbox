({
    handleHideInfoErrorPopup: function (cmp, evt, helper) {
        var popover = cmp.find('popover').getElement();
        $A.util.addClass(popover, 'slds-hide');
    },

    handleShowInfoErrorPopup: function (cmp, evt, helper) {
        var popover = cmp.find('popover').getElement();

        var amountOfLines = popover.textContent.split("\n").length;
        var basicErrorToolTipTopStyle = -2.0;

        for (var i = 1; i < amountOfLines; i++) {
            basicErrorToolTipTopStyle += -1;
        }

        popover.style.top = basicErrorToolTipTopStyle + "rem";

        $A.util.toggleClass(popover, 'slds-hide');
    }
})