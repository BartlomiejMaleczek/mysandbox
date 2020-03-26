({
    onBoatSelected: function (component, evt, helper) {
        var selectedBoat = evt.getParam("boat");
        var recordData = component.find('service');
        component.set("v.id",selectedBoat.Id);
        component.set('v.boat',selectedBoat);
        recordData.reloadRecord();
    },

    onRecordUpdated: function (cmp, evt, helper) {
        if(cmp.find('BoatReviews')) {
            cmp.find('BoatReviews').refresh();
        }
    },

    onBoatReviewAdded: function (cmp, evt, helper) {
        var boatReview = evt.getParam("boatReview");
        console.log('FIRE onBoatReviewAdded', boatReview);
        cmp.find('boatTabSet').set("v.selectedTabId", 'boatreviewtab');
        cmp.find('BoatReviews').refresh();
    }

})