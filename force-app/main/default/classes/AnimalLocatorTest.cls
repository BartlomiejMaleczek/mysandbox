/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class AnimalLocatorTest {

    @TestSetup
    public static void setup() {

    }

    @isTest
    public static void testAnimalLocatorGet() {
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());

        String response = AnimalLocator.getAnimalNameById(1);
        System.assertEquals('chicken', response);

    }
}