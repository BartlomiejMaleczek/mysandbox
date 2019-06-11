( {
    init: function (component) {
        var accounts = [];
        console.log('start');

        for (var i = 0; i < 100; i++) {
            accounts.push({
                sObjectType:'Account',
                Name : 'Test Account #' +i,
                Type : 'Personal Accountaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                Stage: 'Stage' + i,
                Confidence: i + '%',
                Amount: '200' + 1,
                Contact: 'josaah' + i + '@email.com'
            });
        }

//        console.log(accounts);

        component.set("v.items", accounts);
    }
} )