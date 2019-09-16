trigger ProjectTrigger on Project__c (after update) {
    BillingCalloutService.callBillingService(Trigger.new, Trigger.newMap, Trigger.old, Trigger.oldMap);
//    new BillingCalloutService().callBillingService(Trigger.new, Trigger.newMap, Trigger.old, Trigger.oldMap);
}