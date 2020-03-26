public with sharing class BillingCalloutService{
    private static Set<String> projectFieldsNames;

    public static void callBillingService(List<Project__c> newList, Map<Id, Project__c> newMap, List<Project__c> oldList, Map<Id, Project__c> oldMap) {
        List<Project__c> projects = newList;
        List<Project__c> projectsToUpdate = new List<Project__c>();
        for (Project__c newProject : projects) {
            if('Billable'.equalsIgnoreCase(newProject.Status__c) && newProject.Status__c != oldMap.get(newProject.Id).Status__c) {
                ServiceCredentials__c credentials = ServiceCredentials__c.getInstance('BillingServiceCredential');
                billToProject(newProject.ProjectRef__c, newProject.Billable_Amount__c, credentials.Username__c, credentials.Password__c, newProject.Id);
            }
        }
    }

    @future(callout=true)
    public static void billToProject(String projectRef, Decimal billAmount, String username, String password, String projectId) {
        BillingServiceProxy billingServiceProxy = new BillingServiceProxy();

        BillingServiceProxy.project project = new BillingServiceProxy.project();
        project.username = username;
        project.password = password;
        project.projectid = projectId;
        project.billAmount = billAmount;
        project.projectRef = projectRef;

        BillingServiceProxy.InvoicesPortSoap11 invoicesPortSoap11 = new BillingServiceProxy.InvoicesPortSoap11();
        String response = invoicesPortSoap11.billProject(project);
        List<Project__c> projects = new List<Project__c>();
        if (response.equalsIgnoreCase('ok')) {
            projects = [
                    Select Id, Status__c
                    From Project__c
                    Where ProjectRef__c = :projectRef
            ];
            if(!projects.isEmpty()) {
                projects[0].Status__c = 'Billed';
                update projects;
            }
        }
    }
}