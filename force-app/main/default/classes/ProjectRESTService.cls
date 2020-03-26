@RestResource(urlMapping = '/project/*')
global with sharing class ProjectRESTService {
    @HttpPost
    global static String postProjectData(
            String ProjectRef,
            String ProjectName,
            String OpportunityId,
            Date StartDate,
            Date EndDate,
            Double Amount,
            String Status
    ) {

        Savepoint sp;

        try {

            sp = Database.setSavepoint();
            List<Project__c> projects = queryProjectByExternalId(ProjectRef);
            for(Project__c project : projects) {
                project.Name = ProjectName;
                project.Start_Date__c = StartDate;
                project.End_Date__c = EndDate;
                project.Billable_Amount__c = Amount;
                project.Status__c = Status;
            }


            if(!projects.isEmpty()) {
                update projects;
            } else {
                insert new Project__c(
                        ProjectRef__c = ProjectRef,
                        Name = ProjectName,
                        Opportunity__c = OpportunityId,
                        Start_Date__c = StartDate,
                        End_Date__c = EndDate,
                        Billable_Amount__c = Amount,
                        Status__c = Status

                );
            }

            List<Opportunity> opportunities = queryOpportunities(OpportunityId);
            for(Opportunity opportunity : opportunities) {
                opportunity.DeliveryInstallationStatus__c = 'In Progress';
            }

            if(!opportunities.isEmpty()) {
                update opportunities;
            }

            System.debug('ProjectRef' + ProjectRef);
            System.debug('StartDate' + StartDate);
            System.debug('EndDate' + EndDate);
            System.debug('Amount' + Amount);
            System.debug('Status' + Status);

            return 'OK';
        } catch (Exception ex) {
            Database.rollback(sp);
            return ex.getMessage();
        }
    }

    public static List<Project__c> queryProjectByExternalId(String projectRef) {
        return [
                SELECT Id
                FROM Project__c
                WHERE ProjectRef__c = :projectRef
        ];
    }

    public static List<Opportunity> queryOpportunities(String opportunityId) {
        return [
                SELECT Id
                FROM Opportunity
                WHERE Id = :opportunityId
        ];
    }

}