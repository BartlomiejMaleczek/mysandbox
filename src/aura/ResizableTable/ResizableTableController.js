({
    handleInit: function (cmp, evt, helper) {
        console.log('on rezise');
        var columns = ['Name', 'Account Name', 'Close Date', 'Stage', 'Confidence', 'Amount', 'Contact'];
        cmp.set("v.columns", columns);
    },

    onMouseUp: function (cmp, evt, helper) {
        cmp.set("v.isMouseUp", true);
        window.setTimeout(function(){
            var currentResizableCol = cmp.get("v.currentResizableCol");
            if(currentResizableCol) {
                var newWidth = currentResizableCol.resizeableDivider.style.width;
                var newWidthSubStr = newWidth.substring(0, newWidth.length - 2);

                if(newWidthSubStr >= 50) {
                    currentResizableCol.resizableCol.style.width = newWidth;
                } else {
                    currentResizableCol.resizableCol.style.width = helper.CONSTANTS.MIN_COL_SIZE + 'px';
                    currentResizableCol.resizeableDivider.style.width = helper.CONSTANTS.MIN_COL_SIZE + 'px';
                }
            }
            cmp.set("v.currentResizableCol", undefined);
            }, 200);


    },

    onMouseMove: function (cmp, evt, helper) {
        var currentResizableCol = cmp.get("v.currentResizableCol");
        var isMouseUp = cmp.get("v.isMouseUp");
        if (currentResizableCol && !isMouseUp) {
            var newWidth = currentResizableCol.calculateNewWidth(evt.pageX);
            currentResizableCol.resizeableDivider.style.width = newWidth + 'px';
        }
    },

    onMouseDown: function (cmp, evt, helper) {
        var currentResizableCol = new helper.CurrentResizableCol(evt);
        cmp.set("v.currentResizableCol", currentResizableCol);
        cmp.set("v.isMouseUp", false);
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