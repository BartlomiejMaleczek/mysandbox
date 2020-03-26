/**
 * Created by BMaleczek on 18.08.2017.
 */
({
    doInit: function(cmp, event, helper) {
        var val = cmp.get("v.childItemInt");

////        var val2 = cmp.get("v.numerek");
//        var val2 = val + '5';
        cmp.set("v.numerek", val.Name);
    },

    onChange: function(cmp, event, helper) {
        var val = cmp.get("v.childItemInt");
        cmp.set("v.numerek", val.Name);
    }
})