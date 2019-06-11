/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class DailyLeadProcessorTest {

    public static String CRON_EXP = '0 0 0 15 3 ? 2022';


    @TestSetup
    public static void setup() {

        List<Lead> leadsList = new List<Lead>();
        for (Integer i = 0; i < 250; i++) {
            leadsList.add(new Lead(
                    LastName = 'TestLead' + i,
                    Company = 'TestLeadCompany' + i,
                    Status = 'Working - contacted'
            ));
        }

        insert leadsList;
    }

    @isTest
    public static void testDailyLeadProcessor() {

        List<Lead> leadsList = [
                SELECT Id,
                        LeadSource
                FROM Lead
        ];

        Map<Id, Lead> leadsMap = new Map<Id, Lead>(leadsList);
        List<Id> leadsIdsSet = new List<Id>(leadsMap.keySet());

        Test.startTest();
        String jobId = System.schedule('ScheduledApexTest',
                CRON_EXP,
                new DailyLeadProcessor());
        Test.stopTest();

        leadsList = [
                SELECT Id,
                        LeadSource
                FROM Lead
                WHERE LeadSource = 'Dreamforce'
        ];

        System.assertEquals(200, leadsList.size());


    }
}