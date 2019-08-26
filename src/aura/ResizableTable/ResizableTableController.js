({
    onResize: function (cmp, evt, helper) {
        console.log('on rezise');
    },

    onMouseUp: function (cmp, evt, helper) {
        console.log('onMouseUp');
        cmp.set("v.isMouseDown", false);
        cmp.set("v.mousePosition", undefined);
        cmp.set("v.curColWidth", undefined);
        cmp.set("v.nxtColWidth", undefined);
    },

    onMouseMove: function (cmp, evt, helper) {
        // window.setTimeout(function() {
                if (cmp.get("v.isMouseDown")) {
                    var currCol = cmp.get("v.curCol");
                    var nextCol = cmp.get("v.nxtCol");

                    var currLastDifX = cmp.get("v.currLastDifX");
                    var nextLastDifX = cmp.get("v.nextLastDifX");

                    var diffX = evt.pageX - cmp.get("v.mousePosition");

                    var diffCurrCol = (cmp.get("v.curColWidth") + diffX);
                    var diffNextCol = (cmp.get("v.nxtColWidth") - diffX);

                    if (nextCol) {
                        if ((currCol.offsetWidth > helper.CONSTANTS.MIN_COL_SIZE || currLastDifX < diffX)) {
                            if (currCol && currCol.style) {
                                currCol.style.width = diffCurrCol + 'px';
                            }

                            cmp.set("v.currLastDifX", undefined);
                        } else {
                            cmp.set("v.currLastDifX", diffX);
                        }

                        if ((nextCol.offsetWidth > helper.CONSTANTS.MIN_COL_SIZE || nextLastDifX > diffX)) {
                            if (nextCol.style) {
                                nextCol.style.width = diffNextCol + 'px';
                            }

                            cmp.set("v.nextLastDifX", undefined);
                        } else {
                            cmp.set("v.nextLastDifX", diffX);
                        }
                    }
                }
        // }
        //     ,0);

    },

    onMouseDown: function (cmp, evt, helper) {
        var curCol = evt.target.parentElement.parentElement;
        var nxtCol = curCol.nextElementSibling;
        var pageX = evt.pageX;

        console.log(curCol);

        if(!cmp.get("v.defaultColWidth")) {
            cmp.set("v.defaultColWidth", curCol.offsetWidth);
        }

        cmp.set("v.mousePosition", pageX);
        cmp.set("v.curColWidth", curCol.offsetWidth);
        cmp.set("v.isMouseDown", true);
        cmp.set("v.curCol", curCol);
        if (nxtCol) {
            cmp.set("v.nxtColWidth", nxtCol.offsetWidth);
            cmp.set("v.nxtCol", nxtCol);
        }

        if(evt.stopPropagation) evt.stopPropagation();
        if(evt.preventDefault) evt.preventDefault();
    },

    handleResetWidth: function (cmp, evt, helper) {
        var defaultColWidth = cmp.get("v.defaultColWidth");
        if(defaultColWidth) {
            document.querySelectorAll(".reset-width").forEach(function (trElem) {
                trElem.style.width = defaultColWidth + 'px';
            });
        }
    }
})