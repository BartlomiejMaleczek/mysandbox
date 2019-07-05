@IsTest
private class OrderTests {

    @TestSetup
    private static void setupTestData () {
        TestDataFactory.InsertTestData(1);
    }

    @isTest
    private static void orderUpdate_UnitTest() {
        System.Test.startTest();
        Product2 product = [SELECT Id, Quantity_Ordered__c FROM Product2 LIMIT 1];

        List<OrderItem> orderItems = [SELECT Id, Quantity, OrderId FROM OrderItem WHERE Product2Id = :product.Id];

        Set<Id> orderIds = new Set<Id>();
        Decimal quantityOrder = 0;
        for (OrderItem orderItem : orderItems) {
            orderItem.Quantity += 5;
            quantityOrder += orderItem.Quantity;
            orderIds.add(orderItem.OrderId);
        }

        List<Order> orders = [SELECT Id FROM Order WHERE Id IN :orderIds];

        for (Order order : orders) {
            order.Status = Constants.ACTIVATED_ORDER_STATUS;
        }


        update orderItems;
        update orders;
        Product2 updatedProduct = [SELECT Id, Quantity_Ordered__c FROM Product2 WHERE Id = :product.Id];
        TestDataFactory.VerifyQuantityOrdered(product, updatedProduct, Integer.valueOf(quantityOrder));
        System.Test.stopTest();
    }

    @isTest
    private static void orderExtension_UnitTest(
        System.assert(true);
    )
}