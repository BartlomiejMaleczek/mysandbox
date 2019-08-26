({
    CONSTANTS: {
        MIN_COL_SIZE: 50,
        DEFAULT_COL_SIZE: 150
    },

    CurrentResizableCol: function (evt) {
        this.currElem = evt.target.parentElement.parentElement;
        this.nextElem = this.currElem.nextElementSibling;
        this.mousePosition = evt.pageX;
        this.currElemWidthBeforeResize = this.currElem.offsetWidth;

        this.calculateDiffWithMousePos = function (pageX) {
            return pageX - this.mousePosition;
        };

        this.calculateDiffCurrCol = function (diffWithMousePos) {
            return this.currElemWidthBeforeResize + diffWithMousePos;
        };

    }

})