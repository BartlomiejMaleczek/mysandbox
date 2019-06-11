( {
    query: function ( component, event, helper ) {
        var query = component.find( "queryInput" ).get( "v.value" );
        helper.fireEvent( component, query || '');
    },

    viewAll: function ( component, event, helper ) {
        var inputField = component.find( "queryInput" );
        inputField.set( "v.value", '' );
        helper.fireEvent( component, '' );
    }
} )