({
    jsLoaded: function(component) {
        component.set("v.jsLoaded", true);
    },

    onPlotMapMarker: function (component, event, helper) {
        var boatGeolocation = event.getParams();
        component.set("v.location", boatGeolocation);
    }
})