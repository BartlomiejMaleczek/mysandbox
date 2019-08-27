({
    handleInit: function (cmp, evt, helper) {
        console.log('on rezise');
        var columns = ['Name', 'Account Name', 'Close Date', 'Stage', 'Confidence', 'Amount', 'Contact'];
        cmp.set("v.columns", columns);
    },

    onMouseUp: function (cmp, evt, helper) {
        cmp.set("v.currentResizableCol", undefined);
    },

    onMouseMove: function (cmp, evt, helper) {
        var currCol = cmp.get("v.currentResizableCol");
        if (currCol) {

            var currLastDifX = cmp.get("v.currLastDifX");
            var diffX = currCol.calculateDiffWithMousePos(evt.pageX);
            var diffCurrCol = currCol.calculateDiffCurrCol(diffX);

            currCol.currElem.style.width = diffCurrCol + 'px';
            // if ((currCol.currElem.offsetWidth > helper.CONSTANTS.MIN_COL_SIZE || currLastDifX < diffX)) {
            //     if (currCol.currElem && currCol.currElem.style) {
            //         currCol.currElem.style.width = diffCurrCol + 'px';
            //     }
            //     cmp.set("v.currLastDifX", undefined);
            // } else {
            //     cmp.set("v.currLastDifX", diffX);
            // }

        }

    },

    onMouseDown: function (cmp, evt, helper) {
        var currentResizableCol = new helper.CurrentResizableCol(evt);
        cmp.set("v.currentResizableCol", currentResizableCol);

        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.preventDefault) evt.preventDefault();
    },

    handleResetWidth: function (cmp, evt, helper) {
        document.querySelectorAll(".reset-width").forEach(function (trElem) {
            console.log(helper.CONSTANTS.DEFAULT_COL_SIZE);
            trElem.style.width = helper.CONSTANTS.DEFAULT_COL_SIZE + 'px';
        });
    }
})