({
    onResize: function (cmp, evt, helper) {
        console.log('on rezise');
    },

    onMouseUp: function (cmp, evt, helper) {
        console.log('onMouseUp');
        cmp.set("v.isMouseDown", false);
        cmp.set("v.mouseDown", undefined);
        cmp.set("v.curColWidth", undefined);
        cmp.set("v.nxtColWidth", undefined);
    },

    onMouseMove: function (cmp, evt, helper) {
        if (cmp.get("v.isMouseDown")) {
            var currLastDifX = cmp.get("v.currLastDifX");
            var nextLastDifX = cmp.get("v.nextLastDifX");

            var diffX = evt.pageX - cmp.get("v.mouseDown");
            // console.log('diffX', diffX);

            var currCol = cmp.get("v.curCol");
            var nextCol = cmp.get("v.nxtCol");

            var diffNextCol = (cmp.get("v.nxtColWidth") - diffX);
            var diffCurrCol = (cmp.get("v.curColWidth") + diffX);

            if (nextCol) {
                if ((currCol.offsetWidth > 40 || currLastDifX < diffX) ) {
                    if(currCol) {
                        console.log('wchodze');
                        currCol.style.width = diffCurrCol + 'px';
                    }

                    cmp.set("v.currLastDifX", undefined);
                } else {
                    cmp.set("v.currLastDifX", diffX);
                }

                if((nextCol.offsetWidth > 40 || nextLastDifX > diffX)) {
                        nextCol.style.width = diffNextCol + 'px';
                        cmp.set("v.nextLastDifX", undefined);
                } else {
                    cmp.set("v.nextLastDifX", diffX);
                }
            }
        }
    },

    onMouseDown: function (cmp, evt, helper) {
        var curCol = evt.target.parentElement.parentElement;
        var nxtCol = curCol.nextElementSibling;
        var pageX = evt.pageX;

        cmp.set("v.mouseDown", pageX);
        cmp.set("v.curColWidth", curCol.offsetWidth);
        cmp.set("v.isMouseDown", true);
        cmp.set("v.curCol", curCol);
        if (nxtCol) {
            cmp.set("v.nxtColWidth", nxtCol.offsetWidth);
            cmp.set("v.nxtCol", nxtCol);
        }
    },

    handleResetWidth: function (cmp, evt, helper) {
        
    }
})