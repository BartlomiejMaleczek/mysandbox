/**
 * Created by Lenovo on 19.04.2017.
 */

public with sharing class ContactAndLeadSearch {

    public static List<List< SObject>> searchContactsAndLeads(String lastName) {
        List<List<sObject>> searchList = [
            FIND 'Smith' IN ALL FIELDS
            RETURNING Lead(LastName), Contact(LastName)
        ];

        return searchList;
    }

}