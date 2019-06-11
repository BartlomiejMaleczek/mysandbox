/**
 * Created by Lenovo on 19.04.2017.
 */

global class LeadProcessor implements Database.Batchable<sObject> {

    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator('SELECT Id, Company, Name, Address, LeadSource FROM Lead');
    }
    
    global void execute(Database.BatchableContext bc, List<Lead> scope) {
        for(Lead lead : scope) {
            lead.LeadSource = 'Dreamforce';
        }

        update scope;
    }

    global void finish(Database.BatchableContext bc) {

    }


}