({
    getColumnDefs: function (component) {
        var columns = component.get("v.columns"),
            columnDefs = [];

        for (var i = 0, j = columns.length; i < j; i++) {
            console.log('Columns: ' + columns[i].get("v.field"));
            console.log('Columns: ' + columns[i].get("v.label"));

            var columnDef = {
                field: columns[i].get("v.field"),
                label: columns[i].get("v.label"),
                targetID: columns[i].get("v.targetID")
            };

            columnDefs.push(columnDef);
        }

        component.set("v.columnDefs", columnDefs);
    }
})