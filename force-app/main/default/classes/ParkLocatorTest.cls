/**
 * Created by Lenovo on 19.04.2017.
 */

@IsTest
private class ParkLocatorTest {

    @isTest
    public static void testParkLocator() {
        Test.setMock(WebServiceMock.class, new ParkServiceMock());
        String country = 'Germnay';
        String[] result = ParkLocator.country(country);
        System.assertEquals('Hamburg Wadden Sea National Park', result.get(0));
        System.assertEquals('Hainich National Park', result.get(1));
        System.assertEquals('Bavarian Forest National Park', result.get(2));
    }
}