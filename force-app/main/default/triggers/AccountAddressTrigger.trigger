trigger AccountAddressTrigger on Account (before insert, before update ) {
//        Boolean wasEddited = false;
//        List<Account> accounts = [
//                SELECT
//                        Id,
//                        Match_Billing_Address__c,
//                        ShippingPostalCode,
//                        BillingPostalCode,
//                        Active__c
//                FROM Account
//                WHERE Id IN :Trigger.New
//        ];

        System.debug('Wykonuje sie!!');
        List<Account> tempList = new List<Account>(Trigger.new);
        System.debug('Rozmiar Trigger new' + tempList.size());
        for (Account account : Trigger.New) {
            System.debug(account);
            if (account.BillingPostalCode != null
                    && account.Match_Billing_Address__c
                    ) {
                System.debug('Wykonuje sie!');
                System.debug('Wartosc Billing postal code' + account.BillingPostalCode);
                account.ShippingPostalCode = account.BillingPostalCode;
            } else {
                System.debug('Cos sie wywalilo!');
            }
        }


    System.debug('Hejos');
}