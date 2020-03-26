/**
 * Created by Lenovo on 18.04.2017.
 */

@IsTest
private class TestRestrictContactByName {


    @testSetup
    public static void setup() {

    }

    @isTest
    public static void testRestrictContactByNameWithWrongLastNames() {
        Contact contact = new Contact(
                LastName = 'INVALIDNAME'
        );


        Test.startTest();
        Database.SaveResult result = Database.insert(contact, false);
        Test.stopTest();

        System.debug('Rozmiar tablicy' + result);
        System.assert(!result.isSuccess());
        System.assert(result.getErrors().size() > 0);
        System.debug(result.getErrors()[0].getMessage());
        System.assertEquals('The Last Name "INVALIDNAME" is not allowed for DML',  result.getErrors()[0].getMessage());

    }
}