( {
    handlePageChange: function ( component, event, helper ) {
        helper.getPaginationItems( component );
        var currentPageItems = component.get("v.currentPageItems");
        var items = component.get("v.items");
        var columnDefs = component.get("v.columnDefs");
        console.log('Column Defs: ' + columnDefs);
        console.log(columnDefs);
//        console.log('CurrentPageItems');
//        console.log(currentPageItems[1].Name);

        currentPageItems[1].Name = 'Test';
        currentPageItems[1].Type = 'Test2';
        component.set("v.currentPageItems", currentPageItems);
//        console.log(component.get("v.currentPageItems"));
//        console.log('Items');
//        console.log(items);
//        helper.firePaginationEvent( component );
    },

    handlePageSizeChange: function ( component, event, helper ) {
        component.set( "v.page", 0 );
        helper.getPaginationItems( component );
//        helper.firePaginationEvent( component );
    },

    goToFirst: function ( component ) {
        component.set( "v.page", 0 );
    },

    goToPrevious: function ( component ) {
        var currentPage = component.get( "v.page" );

        if ( currentPage > 0 ) {
            component.set( "v.page", currentPage - 1 );
        }
    },

    goToNext: function ( component, event, helper ) {
        var currentPage = component.get( "v.page" ),
            lastPage = helper.getLastPage( component );

        if ( currentPage < lastPage ) {
            component.set( "v.page", currentPage + 1 );
            console.log('CurrentPage');
            console.log(currentPage);
        }
    },

    goToLast: function ( component, event, helper ) {
        component.set( "v.page", helper.getLastPage( component ) );
    },

    goToPage: function ( component, event ) {
        var page = event.srcElement.dataset.page;
        component.set( "v.page", parseInt( page ) );
    }
} )