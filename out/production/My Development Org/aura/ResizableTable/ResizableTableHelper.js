({
    CONSTANTS: {
        MIN_COL_SIZE: 50,
        DEFAULT_COL_SIZE: 150
    },

    CurrentResizableCol: function (evt) {
        // this.resizeableDivider = evt.target.parentElement.parentElement;
        // this.resizableCol = this.resizeableDivider.parentElement;

        // this.mousePosition = evt.pageX;


        // this.resizeableDividerWidthBeforeResize = this.resizeableDivider.offsetWidth;

        this.currentElement = evt.target;
        this.mouseStart = evt.clientX;
        this.newWidth;


        this.getParentElem = function (currentElement) {
            if( currentElement != null && currentElement.tagName ) {
                var parObj = currentElement;

                while(parObj.parentNode.tagName != 'TH') {
                    if( parObj.className == 'slds-resizable__handle')
                        currentElement = parObj;
                    parObj = parObj.parentNode;
                }

                return parObj;
            }



        };


        // this.calculateNewWidth = function (pageX) {
        //     return this.resizeableDividerWidthBeforeResize + (pageX - this.mousePosition);
        // };


        // Object.defineProperty(this, 'newWidth', {
        //    get: function () {
        //        return newWidth;
        //    },
        //    set: function (value) {
        //        newWidth = value
        //    }
        // });

    }

})