/**
 * Created by BMaleczek on 31.01.2018.
 */
({
    handleInit: function (cmp, evt, helper) {
        console.log('Wywoluje sie');
        cmp.set('v.mydata', [
            {
                id: 'c',
                opportunityName: 'CCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down',
                isVisible: true,
                isSelected: false
            },
            {
                id: 'b',
                opportunityName: 'BCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down',
                isVisible: true,
                isSelected: false
            },
            {
                id: 'a',
                opportunityName: 'AQuip',
                confidence: 0.78,
                amount: 740000,
                contact: 'quipy@quip.com',
                phone: '2352235235',
                trendIcon: 'utility:up',
                isVisible: true,
                isSelected: false
            },
            {
                id: 'd',
                opportunityName: 'DCloudhub',
                confidence: 0.2,
                amount: 25000,
                contact: 'jrogers@cloudhub.com',
                phone: '2352235235',
                trendIcon: 'utility:down',
                isVisible: true,
                isSelected: false
            }
        ]);
        cmp.set("v.currentMyData", cmp.get("v.mydata"));

        cmp.set('v.columns', [
            {
                label: 'Opportunity name',
                fieldName: 'opportunityName',
                type: 'text',
                sortable: true,
                sortDirection: ''

            },
            {
                label: 'Confidence', fieldName: 'confidence', type: 'percent', cellAttributes:
                {iconName: {fieldName: 'trendIcon'}, iconPosition: 'right'},
                sortable: true,
                sortDirection: ''
            },
            {
                label: 'Amount',
                fieldName: 'amount',
                type: 'currency',
                typeAttributes: {currencyCode: 'EUR'},
                sortable: true,
                sortDirection: ''
            },
            {
                label: 'Contact Email',
                fieldName: 'contact',
                type: 'email',
                sortable: true,
                sortDirection: ''
            },
            {
                label: 'Contact Phone',
                fieldName: 'phone',
                type: 'phone',
                sortable: true,
                sortDirection: ''
            }
        ]);

    },

    handleSorting: function (cmp, evt, help) {
        if (!$A.util.isUndefinedOrNull(evt.target.dataset) && !$A.util.isUndefinedOrNull(evt.target.dataset.sortfield)) {
            var fieldName = evt.target.dataset.sortfield;
            var sortDirection = help.setSortDirection(cmp, fieldName);
            help.sortData(cmp, fieldName, sortDirection);
            cmp.set("v.sortedByField", fieldName);
            cmp.set("v.sortedDirection", sortDirection);
        }
    },

    handleSearch: function (cmp, evt, help) {
        var search = cmp.get("v.search").trim();
        var items = cmp.get("v.mydata");
        var results = [];

        var time = new Date().getTime();
        if (search == '') {
            cmp.set("v.currentMyData", items);
        } else {
            results = items.filter(function (item) {
                for (var key in item) {
                    var value = item[key];
                    if (value && String(value).indexOf(search) != -1) {
                        return true;
                    }
                }
            });

            cmp.set("v.currentMyData", results);
        }
    },
    
    handleSelectAll: function (cmp, evt, help) {
        var currentMyData = cmp.get("v.currentMyData");
        var isSelectAllButtonChecked = evt.getSource().get("v.checked");
        currentMyData.forEach(function(elem) {
            elem.isSelected = isSelectAllButtonChecked;
        });
        cmp.set("v.currentMyData", currentMyData);
    }
})