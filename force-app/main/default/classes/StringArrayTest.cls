/**
 * Created by Lenovo on 19.04.2017.
 */

public with sharing class StringArrayTest {

    public static List<String> generateStringArray(Integer numOfStrings) {
        List<String> tempStrings = new List<String>();
        for(Integer i = 0 ; i < numOfStrings ; i++) {
            tempStrings.add('Test ' + i);
        }

        return tempStrings;
    }

}