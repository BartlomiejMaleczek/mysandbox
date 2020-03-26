/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class LeadProcessorTest {

    @TestSetup
    public static void setup() {
        List<Lead> leadsList = new List<Lead>();
        for(Integer i = 0; i < 200 ; i++) {
            leadsList.add(new Lead(
               LastName = 'TestLead' + i,
               Company = 'TestCompany' + i,
               Status = 'Working - Contacted'
            ));
        }

        insert leadsList;
    }

    @isTest
    public static void testLeadProcessorBatch() {

        Test.startTest();
        LeadProcessor leadProcessor = new LeadProcessor();
        Id batchId = Database.executeBatch(leadProcessor);
        Test.stopTest();

        for(Lead lead : [SELECT LeadSource FROM Lead]){
            System.assertEquals('Dreamforce', lead.LeadSource);
        }

    }
}