({
    onScrollDataTable: function (cmp, evt, helper) {
        var topOfDiv = Math.max(document.querySelector(".ux-data-table").scrollTop - 3, 0);
        document.getElementsByTagName('thead')[0].style.top = topOfDiv + "px;";
    }
})