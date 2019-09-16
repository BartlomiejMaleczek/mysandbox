/**
 * Created by BMaleczek on 31.01.2018.
 */
({
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.mydata");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.currentMyData", data);
    },

    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    
    setSortDirection: function (cmp, currrentSortField) {
        var previousSortDirection = cmp.get("v.sortedDirection");
        var previousSortField = cmp.get("v.sortedByField");
        if(previousSortField == currrentSortField) {
            return (previousSortDirection == 'asc' ? 'desc' : 'asc');
        } else {
          return 'asc';
        }
    },

    getColumnByFieldName:function (cmp, fieldName) {
        var columns = cmp.get("v.columns");
        var column = columns.filter(function(elem) {
            return elem.fieldName == fieldName;
        });

        return column;
    }


})