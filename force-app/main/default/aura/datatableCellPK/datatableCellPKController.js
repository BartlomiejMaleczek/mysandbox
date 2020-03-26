({
    handleInit: function (cmp) {
        // console.log('Jestesmy w handle init');
//        console.log(
//            cmp.get("v.row"),
//            cmp.get("v.field"),
//            cmp.get("v.row")[cmp.get("v.field")]
//        );

        // console.log('Row' +  cmp.get("v.row")['Name']);
        // console.log('Field ' + cmp.get("v.field"));
        // console.log('Combined' + cmp.get("v.row")[cmp.get("v.field")]);
        cmp.set("v.value", cmp.get("v.row")[cmp.get("v.field")]);
//        cmp.set("v.value", cmp.get("v.row")[cmp.get("v.field")]);
//        cmp.set("v.value", cmp.get("v.row")[cmp.get("v.field")]);
    }
})