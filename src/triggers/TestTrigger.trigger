/**
 * Created by Lenovo on 22.03.2017.
 */

trigger TestTrigger on APEX_Customer__c (after insert) {
    System.debug('Wywoluje trigger biczys');
}