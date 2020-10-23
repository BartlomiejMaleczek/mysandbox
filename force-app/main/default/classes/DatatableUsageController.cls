public with sharing class DatatableUsageController {
  @AuraEnabled
  public static List<Account> getAccountsApex() {
    List<Account> accounts = [
      SELECT
        Id,
        Name,
        OwnerId,
        Owner.Name,
        AccountNumber,
        Description,
        Phone,
        Website,
        Type
      FROM Account
    ];

    //        Account cloned;
    //        List<Account> newColl = new List<Account>();
    //        for(Integer i = 0; i < 10; i++) {
    //            for(Account account : accounts) {
    //                cloned = account.clone(true, false, false, false);
    //                newColl.add(cloned);
    //            }
    //        }

    return accounts;
  }
}
