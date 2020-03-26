/**
 * Created by Lenovo on 07.04.2017.
 */

trigger OpportunityTrigger on Opportunity (after insert) {
    List<Opportunity> opportunities = [SELECT Id, Name from Opportunity WHERE Id IN :Trigger.New];
    System.debug(opportunities);
}