/**
 * Created by BMaleczek on 25.03.2020.
 */

public with sharing class WireAndApexCallController {
    @AuraEnabled(cacheable=true)
//    Id accountId
    public static List<Contact> getContactListApex( Id accountId) {
        return [
                SELECT Id, Name, Title, Phone, Email
                FROM Contact
                WHERE AccountId = :accountId
        ];
    }

    @AuraEnabled(cacheable=true)
//    Id accountId
    public static List<Contact> getContactListApex2( List<Id> accountIds) {
        return [
                SELECT Id, Name, Title, Phone, Email
                FROM Contact
                WHERE AccountId IN :accountIds
        ];
    }

    @AuraEnabled(cacheable=true)
//    Id accountId
    public static List<Contact> getContactListApex3( Id accountId) {
        return [
                SELECT Id, Name, Title, Phone, Email
                FROM Contact
                WHERE AccountId = :accountId
        ];
    }

    @AuraEnabled
//    Id accountId
    public static List<InnerWireAndApexCall> getInnerWireAndApexCallApex() {
        return new List<InnerWireAndApexCall>{
                new InnerWireAndApexCall('test1', 'testsecond1'),
                new InnerWireAndApexCall('test2', 'testsecond2')
        };
    }

    @AuraEnabled
//    Id accountId
    public static void setInnerWireAndApexCallApex(String innerWireAndApexCallsJSON) {
       System.debug('setInnerWireAndApexCallApex' + innerWireAndApexCallsJSON);

        List<InnerWireAndApexCall> innerWireAndApexCall =
                (List<InnerWireAndApexCall>) JSON.deserialize(innerWireAndApexCallsJSON, Type.forName('List<WireAndApexCallController.InnerWireAndApexCall>'));

        System.debug('setInnerWireAndApexCallApex' + innerWireAndApexCall);

    }

    public class InnerWireAndApexCall {
       @AuraEnabled public String name;
       @AuraEnabled public String secondName;

        public InnerWireAndApexCall() {

        }

        public InnerWireAndApexCall(String name, String secondName) {
            this.name = name;
            this.secondName = secondName;
        }
    }
}