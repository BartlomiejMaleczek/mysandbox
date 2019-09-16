({
    handleInit: function (cmp, evt, helper) {
        console.log('on rezise');
        var columns = ['Name', 'Account Name', 'Close Date', 'Stage', 'Confidence', 'Amount', 'Contact'];
        cmp.set("v.columns", columns);
    },

    onMouseUp: function (cmp, evt, helper) {
        cmp.set("v.isMouseUp", true);
        var currentResizableCol = cmp.get("v.currentResizableCol");
        if( currentResizableCol.currentElement !== null ) {
            var newWidth = currentResizableCol.newWidth;
            var currentEle = currentResizableCol.currentElement.parentNode.parentNode; // Get the DIV
            var parObj = currentEle.parentNode; // Get the TH Element
            parObj.style.width = newWidth+'px';
            currentEle.style.width = newWidth+'px';
            currentResizableCol.currentElement.style.right = 0; // Reset the column devided
            currentResizableCol.currentElement = null;
            cmp.set("v.currentResizableCol", currentResizableCol); // Reset null so mouse move doesn't react again
        }

        // window.setTimeout(function(){
        //     var currentResizableCol = cmp.get("v.currentResizableCol");
        //     if(currentResizableCol) {
        //         var newWidth = currentResizableCol.resizeableDivider.style.width;
        //         var newWidthSubStr = newWidth.substring(0, newWidth.length - 2);
        //
        //         if(newWidthSubStr >= 50) {
        //             currentResizableCol.resizableCol.style.width = newWidth;
        //         } else {
        //             currentResizableCol.resizableCol.style.width = helper.CONSTANTS.MIN_COL_SIZE + 'px';
        //             currentResizableCol.resizeableDivider.style.width = helper.CONSTANTS.MIN_COL_SIZE + 'px';
        //         }
        //     }
        //     cmp.set("v.currentResizableCol", undefined);
        //     }, 200);


    },

    onMouseMove: function (cmp, evt, helper) {
        var currentResizableCol = cmp.get("v.currentResizableCol");
        var isMouseUp = cmp.get("v.isMouseUp");
        if (currentResizableCol && !isMouseUp) {
            // var newWidth = currentResizableCol.calculateNewWidth(evt.pageX);
            // currentResizableCol.resizeableDivider.style.width = newWidth + 'px';

            var currentResizableCol = cmp.get("v.currentResizableCol");
            var currentEle = currentResizableCol.currentElement;

            if( currentEle != null && currentEle.tagName ) {
                var parObj = currentEle;
                while(parObj.parentNode.tagName != 'TH') {
                    if( parObj.className == 'slds-resizable__handle')
                        currentEle = parObj;
                    parObj = parObj.parentNode;
                    count++;
                }
                var count = 1;
                var mouseStart = currentResizableCol.mouseStart;
                var oldWidth = parObj.offsetWidth;  // Get the width of DIV
                var newWidth = oldWidth + (evt.clientX - parseFloat(mouseStart));

                // component.set("v.newWidth", newWidth);
                currentEle.style.right = ( oldWidth - newWidth ) +'px';
                currentResizableCol.currentElement = currentEle;
                currentResizableCol.newWidth = newWidth;
                cmp.set("v.currentResizableCol", currentResizableCol);
                // component.set("v.currentEle", currentEle);
            }
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