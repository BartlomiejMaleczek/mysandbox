/**
 * Created by BMaleczek on 18.08.2017.
 */
({
    updateChildAttr: function(cmp) {
        var items = cmp.get("v.childItems");
        items[0].Name = 'Test';
               cmp.set("v.childItems", items);

//
//            cmp.set("v.childAtr", "updated child attribute");
//            var childItems = cmp.get("v.childItems");
//            childItems[0] = 4;
//            console.log(childItems);
//            cmp.set("v.childItems", childItems);
        }

})