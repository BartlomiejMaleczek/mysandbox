/**
 * Created by BMaleczek on 17.01.2018.
 */

@IsTest
public with sharing class MaintenanceRequestTest {

    public static User User { get; set; }
    public static final Integer BATCH_SIZE = 300;
    public static final String REQUEST_STATUS_CLOSED = 'Closed';
    public static final String REQUEST_STATUS_NEW = 'New';
    public static final String REQUEST_TYPE_MAINTENANCE_REQUEST = 'Routine Maintenance';

    public static User getUserInfoApex() {
        if (User == null)
            User = [
                    SELECT Id, Username
                    FROM User
                    WHERE Id = :System.UserInfo.getUserId()
            ];

        return User;
    }

    @TestSetup
    public static void setup() {
        System.runAs(getUserInfoApex()) {
            List<Product2> productsToInsert = new List<Product2>();
            for (Integer i = 0; i < 10; i++) {
                productsToInsert.add(new Product2(
                        Cost__c = 20,
                        Current_Inventory__c = 10,
                        Lifespan_Months__c = 3.0,
                        Name = 'Test Equpiment' + i,
                        Maintenance_Cycle__c = 20,
                        Warehouse_SKU__c = '100' + i,
                        Replacement_Part__c = true
                ));
            }

            insert productsToInsert;

            List<Case> casesToInsert = new List<Case>();
            Integer iterator = 0;
            for (Integer i = 0; i < BATCH_SIZE; i++) {
                if (iterator == 10) {
                    iterator = 0;
                }

                casesToInsert.add(new Case(
                        Equipment__c = productsToInsert.get(iterator).Id,
                        Status = REQUEST_STATUS_NEW,
                        Subject = 'Maintenance Request for future back up routine',
                        Date_Due__c = System.today(),
                        Type = REQUEST_TYPE_MAINTENANCE_REQUEST
                ));
                iterator++;
            }

            casesToInsert.add(new Case(
                    Status = REQUEST_STATUS_NEW,
                    Subject = 'Maintenance Request for future back up routine',
                    Date_Due__c = System.today(),
                    Type = REQUEST_TYPE_MAINTENANCE_REQUEST
            ));

            insert casesToInsert;
        }
    }

    @IsTest
    public static void testCreateNewMaintenanceRequestForFutureBackUpRoutine() {
        System.runAs(getUserInfoApex()) {
            List<Case> casesToClosed = [
                    SELECT Id, Status, Subject, Date_Due__c, Equipment__c, Equipment__r.Lifespan_Months__c
                    FROM Case
                    WHERE Equipment__c != null
            ];

            for(Case caase : casesToClosed) {
                caase.Status = REQUEST_STATUS_CLOSED;
            }

            System.debug('CASESTOCLOSE' + casesToClosed);

            System.Test.startTest();
            update casesToClosed;
            System.Test.stopTest();

            List<Case> casesUpdt = [
                    SELECT Id, Status, Subject, Date_Due__c, Equipment__c, Equipment__r.Lifespan_Months__c
                    FROM Case
                    WHERE Equipment__c != null
            ];

            System.assertEquals(casesUpdt.size(), casesToClosed.size() * 2);
        }
    }

    @IsTest
    public static void testCreateNewMaintenanceRequestForFutureBackUpRoutineWithNullEquipment() {
        System.runAs(getUserInfoApex()) {
            List<Case> casesToClosed = [
                    SELECT Id, Status
                    FROM Case
                    WHERE Equipment__c = null
            ];

            System.debug('CASES TO CLOSE' + casesToClosed);

            for(Case caase : casesToClosed) {
                caase.Status = REQUEST_STATUS_CLOSED;
            }

            System.Test.startTest();
            update casesToClosed;
            System.Test.stopTest();

            List<Case> casesUpdt = [
                    SELECT Id, Status
                    FROM Case
                    WHERE Equipment__c = null
            ];

            System.assertEquals(casesUpdt.size(), casesToClosed.size() * 2);
        }
    }

}