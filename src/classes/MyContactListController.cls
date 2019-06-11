/**
 * Created by BMaleczek on 16.05.2017.
 */

public with sharing class MyContactListController {
    @AuraEnabled
    public static List<Contact> getContacts() {
        return [Select Id, Name, Email, Title, Phone From Contact];
    }
}