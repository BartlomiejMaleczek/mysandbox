({
    handleInit: function (cmp, evt, helper) {
        cmp.set("v.searchParams", {name: 'Test Account 4', fieldOnChange: 'name'});
    },

    handleChangeSearchParams: function (cmp, evt, helper) {
        console.log('W USAGE');
    }
})