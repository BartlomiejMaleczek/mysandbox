@isTest
private class WarehouseCalloutServiceTest {

    public static User User { get; set; }
    public static User getUserInfoApex() {
        if (User == null)
            User = [
                    SELECT Id, Username
                    FROM User
                    WHERE Id = :System.UserInfo.getUserId()
            ];

        return User;
    }
    public static final String ENDPOINT = 'https://th-superbadge-apex.herokuapp.com/equipment';
    // implement your mock callout test here

    @TestSetup
    public static void setup() {
        System.runAs(getUserInfoApex()) {
            List<Product2> productsToInsert = new List<Product2>();
            productsToInsert.add(new Product2(
                    Cost__c = 30,
                    Current_Inventory__c = 20,
                    Lifespan_Months__c = 3,
                    Name = 'Test Product',
                    Maintenance_Cycle__c = 10,
                    Warehouse_SKU__c = '100003',
                    Replacement_Part__c = true
            ));

            insert productsToInsert;
        }
    }


    @IsTest
    public static void testRunWarehouseEquipmentSync() {
        System.runAs(getUserInfoApex()) {
            Test.setMock(HttpCalloutMock.class, new WarehouseCalloutServiceMock());

            System.Test.startTest();
            WarehouseCalloutService.runWarehouseEquipmentSync();
            System.Test.stopTest();

            System.assertEquals('test', 'test');
            System.assertEquals('test2', 'test2');

        }
    }

    @IsTest
    public static void testWarehouseSyncSchedule() {
        System.runAs(getUserInfoApex()) {
            Test.setMock(HttpCalloutMock.class, new WarehouseCalloutServiceMock());

            System.Test.startTest();
            Datetime dt = Datetime.now().addMinutes(1);
            String CRON_EXP = '0 ' + dt.minute() + ' * ' + dt.day() + ' ' + dt.month() + ' ? ' + dt.year();
            String jobId = System.schedule('WarehouseSyncScheduleTest',
                    CRON_EXP,
                    new WarehouseSyncSchedule());

            CronTrigger ct = [
                    SELECT Id,
                            CronExpression,
                            TimesTriggered,
                            NextFireTime
                    FROM CronTrigger
                    WHERE id = :jobId
            ];

            System.Test.stopTest();

            System.assertEquals(CRON_EXP, ct.CronExpression);

        }
    }
}