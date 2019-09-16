@IsTest
public with sharing class ProjectRESTServiceTest {
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
                Start_Date__c = System.today(),
                End_Date__c = System.today().addMonths(3),
                Status__c = 'Billable',
                Opportunity__c = opportunity.Id,
                ProjectRef__c = '34654',
                Billable_Amount__c = 3445
        );

        insert project;
    }

    @IsTest
    public static void createProjectCalloutServiceMethodTest() {
        System.debug('TESTS' + [SELECT Id, Username FROM User]);

        System.runAs(TEST_USER) {
            Opportunity opportunity = queryOpportunity();

            System.Test.startTest();
            String result = ProjectRESTService.postProjectData(
                    '346542',
                    'Test Project2',
                    opportunity.Id,
                    System.today(),
                    System.today().addMonths(3),
                    499416,
                    'Billable'
            );
            System.Test.stopTest();

            opportunity = queryOpportunity();
            List<Project__c> projects = queryProjectByName('Test Project2');

            System.assertEquals('OK', result);
            System.assertEquals('In progress', opportunity.DeliveryInstallationStatus__c);
            System.assertEquals(1, projects.size());
        }
    }

    @IsTest
    public static void updateProjectCalloutServiceMethodTest() {
        System.debug('TESTS' + [SELECT Id, Username FROM User]);

        System.runAs(TEST_USER) {
            Opportunity opportunity = queryOpportunity();
            List<Project__c> oldProjects = queryProjectByName('Test Project');


            System.Test.startTest();
            String result = ProjectRESTService.postProjectData(
                    '34654',
                    'Test Project2',
                    opportunity.Id,
                    System.today(),
                    System.today().addMonths(3),
                    499416,
                    'Billable'
            );
            System.Test.stopTest();

            opportunity = queryOpportunity();
            List<Project__c> projects = queryProjectByName('Test Project2');

            System.assertEquals('OK', result);
            System.assertEquals('In progress', opportunity.DeliveryInstallationStatus__c);
            System.assertEquals(1, projects.size());
            System.assertEquals(oldProjects.get(0).Id, projects.get(0).Id);
        }
    }

    public static Opportunity queryOpportunity() {
        return [
                SELECT Id, DeliveryInstallationStatus__c
                FROM Opportunity
                WHERE Name = 'Test Opp'
        ];
    }

    public static List<Project__c> queryProjectByName(String name) {
        return [
                SELECT Id, Name
                FROM Project__c
                WHERE Name = :name
        ];
    }
}