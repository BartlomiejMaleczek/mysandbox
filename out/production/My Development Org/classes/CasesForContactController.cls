public with sharing class CasesForContactController {

    @AuraEnabled
    public static List<Case> getContactCasesApex(Id recordId) {
        List<Case> contactCases = new List<Case>();
        Case currCase = queryCurrentCase(recordId);
        if(currCase != null) {
            Contact contact = queryContactWithCases(currCase.ContactId, recordId);
            contactCases = contact.Cases;
        }

        return contactCases;
    }

    private static Case queryCurrentCase(Id caseId) {
        return [
                SELECT Id, ContactId
                FROM Case
                WHERE Id = :caseId
        ];
    }

    private static Contact queryContactWithCases(Id contactId, Id currCaseId) {
        return [
          SELECT Id, (SELECT Id FROM Cases WHERE Id != :currCaseId)
          FROM Contact
                WHERE Id = :contactId
        ];
    }
}