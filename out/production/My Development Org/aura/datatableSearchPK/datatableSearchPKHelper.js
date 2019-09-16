({
	fireEvent : function(component, query) {
        var event = component.getEvent("datatableQuery");

        event.setParams({'query': query});
        event.fire();
	}
})