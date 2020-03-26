({
    onBoatClick: function (cmp, evt, helper) {
        var selectedBoat = cmp.get("v.boat");

        var boatSelectEvt = cmp.getEvent("boatselect");
        var boatSelectedEvt = $A.get("e.c:BoatSelected");
        var plotMapMarkerEvt = $A.get("e.c:PlotMapMarker");

        boatSelectEvt.setParams({
            'boatId': selectedBoat.Id
        });
        boatSelectEvt.fire();

        boatSelectedEvt.setParams({
           'boat' :  selectedBoat
        });
        boatSelectedEvt.fire();
        
        plotMapMarkerEvt.setParams({
            'sObjectId' :  selectedBoat.Id,
            'lat' :  selectedBoat.Geolocation__Latitude__s,
            'long' :  selectedBoat.Geolocation__Longitude__s,
            'label' :  selectedBoat.Name
        });
        plotMapMarkerEvt.fire();
    }

})