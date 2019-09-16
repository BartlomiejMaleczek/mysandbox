/**
 * Created by Lenovo on 18.04.2017.
 */

@IsTest
private class TestVerifyDate {

    public static Date date1;
    public static Date date2;

    @testSetup
    public static void setup() {
    }

    @isTest
    public static void testDateWithin30Days() {
        date1 = Date.newInstance(2017, 1, 1);
        date2 = Date.newInstance(2017, 1, 15);
        System.assertEquals(date2, VerifyDate.CheckDates(date1, date2));
    }

    @isTest
    public static void testSetEndOfMonthDate() {
        date1 = Date.newInstance(2017, 1, 1);
        date2 = Date.newInstance(2017, 3, 15);
        Date endOfMonth = Date.newInstance(2017, 1, 31);
        System.assertEquals(endOfMonth, VerifyDate.CheckDates(date1, date2));
    }
}