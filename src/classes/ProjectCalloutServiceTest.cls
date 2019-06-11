@IsTest
public with sharing class ProjectCalloutServiceTest {
    public static User TEST_USER {
        get {
            User usr = [
                    SELECT Id
                    FROM User
                    WHERE Username = 'test.tester@weare4c.com.otapc'
            ];
            return usr;
        }
    }

    @TestSetup
    public static void setup() {
        Profile profile = [
                Select Id
                From Profile
                Where Name = 'System Administrator'
        ];

        User testUser = new User(
                FirstName = 'Testy',
                Alias = 'Tester',
                Email = 'Testy.Tester@test.domain',
                EmailEncodingKey = 'UTF-8',
                LastName = 'Tester',
                LanguageLocaleKey = 'en_US',
                LocaleSidKey = 'en_US',
                ProfileId = profile.Id,
                TimeZoneSidKey = 'America/Los_Angeles',
                UserName = 'test.tester@weare4c.com.otapc'
        );

        insert testUser;

        Schema.DescribeSObjectResult schemaOpp = Schema.SObjectType.Opportunity;
        Map<Id, Schema.RecordTypeInfo> rtMapById = schemaOpp.getRecordTypeInfosById();
        List<Id> oppRecordsIds = new List<Id>(rtMapById.keySet());

        Account account = new Account(
            Name = 'Test Account'
        );

        insert account;

        Opportunity opportunity = new Opportunity(
                Name = 'Test Opp',
                Type = 'New Project',
                StageName = 'Qualification',
                RecordTypeId = oppRecordsIds.get(0),
                CloseDate = System.today(),
                Amount = 6436,
                AccountId = account.Id
        );

        insert opportunity;

        ServiceTokens__c serviceTokens = new ServiceTokens__c();
        serviceTokens.Token__c = 'TestToken123456';
        serviceTokens.Name = 'ProjectServiceToken';
        insert serviceTokens;
    }

    @IsTest
    public static void updatePMSOppSuccess() {
        System.runAs(TEST_USER) {
            Opportunity opp = queryOpportunity();

            System.Test.startTest();
            Test.setMock(HttpCalloutMock.class, new ProjectCalloutServiceMock());
            opp.StageName = 'Closed Won';
            update opp;
            System.Test.stopTest();

            opp = queryOpportunity();

            System.assertEquals('Submitted Project', opp.StageName);

        }
    }

    @IsTest
    public static void updatePMSOppFailure() {
        System.runAs(TEST_USER) {
            Opportunity opp = queryOpportunity();

            System.Test.startTest();
            Test.setMock(HttpCalloutMock.class, new ProjectCalloutServiceMockFailure());
            opp.StageName = 'Closed Won';
            update opp;
            System.Test.stopTest();

            opp = queryOpportunity();

            System.assertEquals('Resubmit Project', opp.StageName);

        }
    }

    public static Opportunity queryOpportunity() {
        return [
                SELECT Id, Name, StageName, CloseDate, Amount, Account.Name
                FROM Opportunity
                WHERE Name = 'Test Opp'
        ];
    }
}