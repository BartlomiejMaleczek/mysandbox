/**
 * Created by BMaleczek on 16.05.2017.
 */
({
    doInit: function (cmp, event, helper) {
        cmp.set('v.mycolumns', [
            {
                label: 'Opportunity name',
                fieldName: 'opportunityName',
                type: 'text',
                sortable: true
            },
            {
                label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:
                {iconName: {fieldName: 'trendIcon'}, iconPosition: 'right'},
                sortable: true
            },
            {
                label: 'Amount',
                fieldName: 'amount',
                type: 'currency',
                typeAttributes: {currencyCode: 'EUR'},
                sortable: true
            },
            {label: 'Contact Email', fieldName: 'contact', type: 'email', sortable: true},
            {label: 'Contact Phone', fieldName: 'phone', type: 'phone', sortable: true}
        ]);
        cmp.set('v.mydata', [
            {
                id: 'c',
                opportunityName: 'CCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down'
            },
            {
                id: 'b',
                opportunityName: 'BCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down'
            },
            {
                id: 'a',
                opportunityName: 'AQuip',
                confidence: 0.78,
                amount: 740000,
                contact: 'quipy@quip.com',
                phone: '2352235235',
                trendIcon: 'utility:up'
            },
            {
                id: 'd',
                opportunityName: 'DCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down'
            }
        ]);
    },

    getSelectedName: function (cmp, event) {
        var selectedRows = event.getParam('selectedRows');
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++) {
            alert("You selected: " + selectedRows[i].opportunityName);
        }
    },

    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        event.setParam({ "sortDirection" : "desc" });
        // event.setParams({ "sortDirection" : "desc" });
        console.log(event.getParams());
        console.log('SORT DIRECTION', sortDirection);

        // assign the latest attribute with the sorted column fieldName and sorted direction
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    }
})