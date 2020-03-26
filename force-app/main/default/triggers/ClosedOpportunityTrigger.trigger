/**
 * Created by Lenovo on 18.04.2017.
 */

trigger ClosedOpportunityTrigger on Opportunity (after insert, after update) {
    private static String Task_Subject = 'Follow Up Test Task';
    private static String Opportunity_Status = 'Closed Won';

    List<Task> tasksList = new List<Task>();

    for(Opportunity opportunity : Trigger.New) {
        if(opportunity.StageName.equals(Opportunity_Status)) {
            tasksList.add(new Task(
                Subject = Task_Subject,
                WhatId = opportunity.Id
            ));
        }
    }

    System.debug('Rozmiar tablicy tasks' + tasksList.size());
    if(tasksList.size() != 0) {
        insert tasksList;
    }

}