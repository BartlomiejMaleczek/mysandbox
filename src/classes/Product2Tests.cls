@isTest (seeAllData=false)
private class Product2Tests {
    /**
     * @name product2Extension_UnitTest
     * @description UnitTest for product2Extension
    **/
    @IsTest
    public static void Product2Extension_UnitTest() {
        List<Product2> products = [SELECT Id, Quantity_Ordered__c, Name, Family, IsActive  FROM Product2 LIMIT :Constants.DEFAULT_ROWS];

        System.Test.startTest();
        PageReference pageReference = Page.Product2New;
        Test.setCurrentPage(pageReference);
        Order order = [SELECT Id FROM Order LIMIT 1];
        ApexPages.StandardController sc = new ApexPages.StandardController(order);
        Product2Extension ext = new Product2Extension(sc);
        System.assertEquals(Constants.DEFAULT_ROWS, ext.productsToInsert.size());

        ext.addRows();
        System.assertEquals(Constants.DEFAULT_ROWS * 2, ext.productsToInsert.size());

        for(Integer i = 0; i < ext.productsToInsert.size(); i++) {
            ext.productsToInsert.get(i).productRecord.Name = 'Test Product' + i;
            ext.productsToInsert.get(i).productRecord.Family = 'Entree';
            ext.productsToInsert.get(i).productRecord.IsActive = true;
            ext.productsToInsert.get(i).pricebookEntryRecord.UnitPrice = 10;
            ext.productsToInsert.get(i).productRecord.Initial_Inventory__c = 10;
        }

        ext.save();
        ext.GetFamilyOptions();
        ext.GetInventory();
        System.Test.stopTest();

        List<Product2> createdProducts = [SELECT Id FROM Product2];
        System.assertEquals(ext.productsToInsert.size(), createdProducts.size());
    }

}