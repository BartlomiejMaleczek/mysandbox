@isTest
private class BillingCalloutServiceTest {
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

        Project__c project = new Project__c(
                Name = 'Test Project',
                Opportunity__c = opportunity.Id,
                Start_Date__c = System.today(),
                End_Date__c = System.today().addMonths(2),
                Billable_Amount__c = 4325,
                Status__c = 'Running',
                ProjectRef__c = '03267bd7-b10e-42a4-9906-db51e3f7a159'
        );

        insert project;

        ServiceCredentials__c serviceCredentials = new ServiceCredentials__c();
        serviceCredentials.Username__c = 'pmsUser1';
        serviceCredentials.Password__c = 'pmsPass1';
        serviceCredentials.Name = 'BillingServiceCredential';
        insert serviceCredentials;
    }

    @IsTest
    public static void successBillToProjectTest() {
        System.runAs(TEST_USER) {
            Project__c project = queryProject();

            System.Test.startTest();
            Test.setMock(WebServiceMock.class, new BillingCalloutServiceMock());
            project.Status__c = 'Billable';
            update project;
            System.Test.stopTest();

            project = queryProject();
            System.assertEquals('Billed', project.Status__c);

        }
    }

    @IsTest
    public static void failureBillToProjectTest() {
        System.runAs(TEST_USER) {
            Project__c project = queryProject();

            System.Test.startTest();
            Test.setMock(WebServiceMock.class, new BillingCalloutServiceMockFailure());
            project.Status__c = 'Billable';
            update project;
            System.Test.stopTest();

            project = queryProject();
            System.assertEquals('Billable', project.Status__c);

        }
    }

    public static Project__c queryProject() {
        return [
                SELECT Id, Name, Status__c, Billable_Amount__c, ProjectRef__c
                FROM Project__c
                WHERE Name = 'Test Project'
        ];
    }

    public static Opportunity queryOpportunity() {
        return [
                SELECT Id, Name, StageName, CloseDate, Amount, Account.Name
                FROM Opportunity
                WHERE Name = 'Test Opp'
        ];
    }
}