({
    doInit: function (component, event, helper) {
        helper.getColumnDefs(component);
    },

    handleItemsChange: function (component) {
        var items = component.get("v.items");
        component.set("v.currentPageItems", items.slice(0, 10));
    },

    handlePaginationChange: function (component, event) {
        var items = component.get("v.displayedItems"),
            length = items.length,
            page = event.getParam('page'),
            pageSize = event.getParam('pageSize');


        var pageItems = items.slice(page * pageSize, ( page + 1 ) * pageSize);

        component.set("v.currentPageItems", pageItems);
    },

    onChangeSorting: function (component, event, helper) {
        console.log('wywoluje');
        // console.log("cmp.getElements(): ", component.getElements());
        var target = event.target;
        console.log(target.id);
        // console.log('Event', event.getSource());
        // var array = component.find("link");
        // console.log("link: ", array[1].getElement().id);
        // console.log(array.target);

    }
})