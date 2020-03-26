/**
 * Created by BMaleczek on 31.01.2018.
 */
({
    sortData: function (cmp, fieldName, sortDirection) {
        var sortedBy = cmp.get("v.sortedBy");
        var sortedDirection = cmp.get("v.sortedDirection");

        var data = cmp.get("v.mydata");
        console.log('sort direction', sortDirection);
        var reverse = sortDirection !== 'asc';
        // reverse = true;
        console.log('reverse sorted direction', reverse);
        //sorts the rows based on the column header that's clicked
        data.sort(this.sortBy(fieldName, reverse))
        cmp.set("v.mydata", data);
    },

    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};
        //checks if the two rows should switch places
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    }
})