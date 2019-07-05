/**
 * @name TestDataFactory
 * @description Contains methods to construct and/or validate commonly used records
**/
public with sharing class TestDataFactory {

    /**
     * @name ConstructCollaborationGroup
     * @description
    **/
    public static CollaborationGroup ConstructCollaborationGroup() {
        //ToDo: Ensure this method returns a single Chatter CollaborationGroup
        //    whose Name starts with 'TEST' followed by the INVENTORY_ANNOUNCEMENTS constant
        //    and configured so anyone can join, see and post updates.

        return new CollaborationGroup(
                Name = 'TEST' + Constants.INVENTORY_ANNOUNCEMENTS,
                CollaborationType = 'Public'
//                CanHaveGuests = false,
//                IsArchived = false,
//                IsAutoArchiveDisabled = false
        );
    }

    /**
     * @name CreateProducts
     * @description Constructs a list of Product2 records for unit tests
    **/
    public static List<Product2> ConstructProducts(Integer cnt) {
        //ToDo: Ensure this method returns a list, of size cnt, of uniquely named Product2 records
        //  with all the required fields populated
        //  and IsActive = true
        //  an Initial Inventory set to 10
        //  and iterating through the product family picklist values throughout the list.

        Schema.DescribeFieldResult fieldResult = Product2.Family.getDescribe();
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

        Integer pleItr = 0;
        List<Product2> products = new List<Product2>();
        for (Integer i = 0; i < cnt; i++) {
            if (pleItr >= ple.size()) {
                pleItr = 0;
            }

            products.add(new Product2(
                    Name = 'Product' + i,
                    Initial_Inventory__c = 10,
                    IsActive = true,
                    Family = ple.get(pleItr).value
            ));

            pleItr++;
        }

        return products;
    }

    /**
     * @name CreatePricebookEntries
     * @description Constructs a list of PricebookEntry records for unit tests
    **/
    public static List<PricebookEntry> ConstructPricebookEntries(List<Product2> prods) {
        //ToDo: Ensure this method returns a corresponding list of PricebookEntries records
        //  related to the provided Products
        //  with all the required fields populated
        //  and IsActive = true
        //  and belonging to the standard Pricebook

        List<PricebookEntry> pricebookEntries = new List<PricebookEntry>();
        for (Product2 product : prods) {
            pricebookEntries.add(new PricebookEntry(
                    IsActive = true,
                    Pricebook2Id = Constants.STANDARD_PRICEBOOK_ID,
                    UnitPrice = 10,
                    Product2Id = product.Id
            ));
        }

        return pricebookEntries;
    }

    /**
     * @name CreateAccounts
     * @description Constructs a list of Account records for unit tests
    **/
    public static List<Account> ConstructAccounts(Integer cnt) {
        //ToDo: Ensure this method returns a list of size cnt of uniquely named Account records
        //  with all of the required fields populated.
        List<Account> accounts = new List<Account>();
        for (Integer i = 0; i < cnt; i++) {
            accounts.add(new Account(
                    Name = 'Account' + i
            ));
        }

        return accounts;

    }

    /**
     * @name CreateContacts
     * @description Constructs a list of Contacxt records for unit tests
    **/
    public static List<Contact> constructContacts(Integer cnt, List<Account> accts) {
        //ToDo: Ensure this method returns a list, of size cnt, of uniquely named Contact records
        //  related to the provided Accounts
        //  with all of the required fields populated.
        List<Contact> contacts = new List<Contact>();
        Integer accountItr = 0;
        for (Integer i = 0; i < cnt; i++) {
            if (accountItr >= accts.size()) {
                accountItr = 0;
            }


            contacts.add(new Contact(
                    LastName = 'Contact ' + i,
                    AccountId = accts.get(accountItr).Id
            ));

            accountItr++;
        }

        return contacts;

    }

    /**
     * @name CreateOrders
     * @description Constructs a list of Order records for unit tests
    **/
    public static List<Order> ConstructOrders(Integer cnt, List<Account> accts) {
        //ToDo: Ensure this method returns a list of size cnt of uniquely named Order records
        //  related to the provided Accounts
        //  with all of the required fields populated.
        List<Order> orders = new List<Order>();
        Integer accountItr = 0;
        for (Integer i = 0; i < cnt; i++) {
            if (accountItr >= accts.size()) {
                accountItr = 0;
            }

            orders.add(new Order(
                    EffectiveDate = System.today(),
                    Status = 'Draft',
                    Pricebook2Id = Constants.STANDARD_PRICEBOOK_ID,
                    AccountId = accts.get(accountItr).Id
            ));

            accountItr++;
        }

        return orders;
    }

    /**
     * @name CreateOrderItems
     * @description Constructs a list of OrderItem records for unit tests
    **/
    public static List<OrderItem> ConstructOrderItems(integer cnt, list<pricebookentry> pbes, list<order> ords) {
        //ToDo: Ensure this method returns a list of size cnt of OrderItem records
        //  related to the provided Pricebook Entries
        //  and related to the provided Orders
        //  with all of the required fields populated.
        //  Hint: Use the DEFAULT_ROWS constant for Quantity as it will be used in the next challenge

        List<OrderItem> orderItems = new List<OrderItem>();
        Integer pbesItr = 0;
        Integer ordsItr = 0;
        for (Integer i = 0; i < cnt; i++) {
            if (pbesItr >= pbes.size()) {
                pbesItr = 0;
            }

            if (ordsItr >= ords.size()) {
                ordsItr = 0;
            }

            orderItems.add(new OrderItem(
                    Quantity = Constants.DEFAULT_ROWS,
                    UnitPrice = 1,
                    OrderId = ords.get(ordsItr).Id,
                    PricebookEntryId = pbes.get(pbesItr).Id
            ));

            pbesItr++;
            ordsItr++;
        }

        return orderItems;
    }

    /**
     * @name SetupTestData
     * @description Inserts accounts, contacts, Products, PricebookEntries, Orders, and OrderItems.
    **/
    public static void InsertTestData(Integer cnt) {
        //ToDo: Ensure this method calls each of the construct methods
        //  and inserts the results for use as test data.

        insert ConstructCollaborationGroup();
        List<Product2> products = ConstructProducts(cnt);
        insert products;

        List<PricebookEntry> pricebookentries = ConstructPricebookEntries(products);
        insert pricebookentries;

        List<Account> accounts = ConstructAccounts(cnt);
        insert accounts;

        insert constructContacts (cnt, accounts);

        List<Order> orders = ConstructOrders(cnt, accounts);
        insert orders;

        insert ConstructOrderItems(cnt, pricebookentries, orders);

    }

    public static void VerifyQuantityOrdered(Product2 originalProduct, Product2 updatedProduct, Integer qtyOrdered){
        Integer sumQuantity = Integer.valueOf(originalProduct.Quantity_Ordered__c) + qtyOrdered;
        System.assertEquals(updatedProduct.Quantity_Ordered__c, sumQuantity);
    }

}