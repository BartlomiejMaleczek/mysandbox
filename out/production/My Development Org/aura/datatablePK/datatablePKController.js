({
      doInit: function ( component, event, helper ) {
            helper.getColumnDefs(component);
        },

        handleItemsChange: function ( component ) {
            var items = component.get( "v.items" );
            component.set( "v.currentPageItems", items.slice( 0, 10 ) );
        },

        handlePaginationChange: function ( component, event ) {
            var items = component.get( "v.displayedItems" ),
                length = items.length,
                page = event.getParam( 'page' ),
                pageSize = event.getParam( 'pageSize' );


            var pageItems = items.slice( page * pageSize, ( page + 1 ) * pageSize );

            component.set( "v.currentPageItems", pageItems );
        }
})