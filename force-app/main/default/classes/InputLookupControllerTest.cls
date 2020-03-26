@IsTest
public class InputLookupControllerTest {
    public static User TEST_USER {
        get {
            User usr = [
                    SELECT Id
                    FROM User
                    WHERE Username = 'test.tester@weare4c.com.gighouse'
            ];
            return usr;
        }
    }

    @TestSetup
    public static void setup() {
//        User testAdminUser = TestDataFactory.createTestAdminUser();
//        insert testAdminUser;
//
//        Account testChainAccount = TestDataFactory.createChainAccount('Test Chain Account', null);
//        insert testChainAccount;
//
//        Contact contact = TestDataFactory.createContact('Test First Name', 'Test Last Name', testChainAccount.Id);
//        contact.Most_Recent_Inbound_Campaign__c = 'Test Inbound Campaign';
//        insert contact;
//
//        Campaign campaign = TestDataFactory.createCampaign('Test Inbound Campaign');
//        insert campaign;
    }

    @IsTest
    public static void queryRecordsApexTest() {
        System.runAs(TEST_USER) {
            Account account = queryAccountByName('Test Chain Account');
            String queryChainAccount = String.join(new List<String>{
                    'SELECT Id',
                    'FROM Account',
                    'WHERE Name = \'Test Chain Account\''
            }, ' ');
            System.Test.startTest();
            List<Account> accounts = InputLookupController.queryRecordsApex(queryChainAccount);
            System.Test.stopTest();

            System.assertEquals(1, accounts.size());
            System.assertEquals(account.Id, accounts.get(0).Id);
        }
    }

    @IsTest
    public static void queryRecordsApexExceptionTest() {
        System.runAs(TEST_USER) {
            try {
                List<Account> accounts = InputLookupController.queryRecordsApex('WRONG QUERY');
                System.assert(false);
            } catch (Exception ex) {
                System.assert(true);
            }
        }
    }

    public static Account queryAccountByName(String name) {
        return [
                SELECT Id
                FROM Account
                WHERE Name = :name
        ];
    }
}