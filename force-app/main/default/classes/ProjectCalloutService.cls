global class ProjectCalloutService {

    @InvocableMethod(label='Post Opportunity To PMS' description='Update Opportunity process to call an Apex action')
    public static void PostOpportunityToPMS(List<Id> oppIds) {
        System.debug('OPPS IDS:' + oppIds);
        Opportunity opportunity = queryOpportunity(oppIds.get(0));
        PMSOpportunity pmsOpportunity = new PMSOpportunity(opportunity);
        ID jobID = System.enqueueJob(new QueueablePMSCall(pmsOpportunity));
    }

    public static Opportunity queryOpportunity(Id oppId) {
        return [
                SELECT Id, Name, Account.Name, CloseDate, Amount
                FROM Opportunity
                WHERE Id = :oppId
                LIMIT 1
        ];
    }

    public class QueueablePMSCall implements Queueable, Database.AllowsCallouts {
        private PMSOpportunity pmsOpportunity;

        public QueueablePMSCall(PMSOpportunity pmsOpportunity) {
            this.pmsOpportunity = pmsOpportunity;
        }

        public void execute(QueueableContext context) {
            Http http = new Http();
            HttpRequest request = new HttpRequest();

            String pmsOpportunityJSON = JSON.serialize(this.pmsOpportunity);

            request.setEndpoint('callout:ProjectService');
            request.setMethod('POST');
            request.setHeader('token', getProjectServiceToken());
            request.setHeader('Content-Type', 'application/json');
            request.setBody(pmsOpportunityJSON);
            HttpResponse response = http.send(request);

            if(response.getStatusCode() == 201) {
                update new Opportunity(
                        Id = this.pmsOpportunity.opportunityId,
                        StageName = 'Submitted Project'
                );
            } else {
                update new Opportunity(
                        Id = this.pmsOpportunity.opportunityId,
                        StageName = 'Resubmit Project'
                );
            }
        }

        public String getProjectServiceToken() {
            ServiceTokens__c serviceTokens = [
                    SELECT Token__c
                    FROM ServiceTokens__c
                    WHERE Name = 'ProjectServiceToken'
                    LIMIT 1
            ];

            return serviceTokens.Token__c;
        }
    }

    public class PMSOpportunity {
        public String opportunityId;
        public String opportunityName;
        public String accountName;
        public String closeDate;
        public Decimal amount;

        public PMSOpportunity(Opportunity opportunity) {
            this.opportunityId = opportunity.Id;
            this.opportunityName = opportunity.Name;
            this.accountName = opportunity.Account.Name;
            this.closeDate = String.valueOf(opportunity.CloseDate);
            this.amount = opportunity.Amount;
        }
    }
}