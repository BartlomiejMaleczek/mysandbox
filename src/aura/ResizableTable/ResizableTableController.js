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
        console.log('onMouseMove');
                if(cmp.get("v.isMouseDown")) {
                    var diffX = evt.pageX - cmp.get("v.mouseDown");

                    var currCol = cmp.get("v.curCol");
                    var nextCol = cmp.get("v.nxtCol");

                    nextCol.style.width = (cmp.get("v.nxtColWidth") - (diffX))+'px';
                    currCol.style.width = (cmp.get("v.curColWidth") + diffX)+'px';
                }
    },

    onMouseDown: function (cmp, evt, helper) {
        console.log('onMouseDown');

        var curCol = evt.target.parentElement.parentElement;
        var nxtCol = curCol.nextElementSibling;
        var pageX = evt.pageX;

        // console.log('Currcol', curCol);
        // console.log('NXT COl', nxtCol);

        cmp.set("v.mouseDown", pageX);
        cmp.set("v.curColWidth", curCol.offsetWidth);
        cmp.set("v.isMouseDown", true);
        cmp.set("v.curCol", curCol);
        if (nxtCol) {
            cmp.set("v.nxtColWidth", nxtCol.offsetWidth);
            cmp.set("v.nxtCol", nxtCol);
        }
    }
})