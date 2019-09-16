public with sharing class RefreshComponentController {
    @AuraEnabled
    public static Opportunity queryRecordApex(Id recordId) {

        Opportunity opportunity = [
                SELECT Id, Name
                FROM Opportunity
                WHERE Id = :String.escapeSingleQuotes(recordId)
//                WHERE Id = '0061n00000V0bfOAAR'
                LIMIT 1
        ];

        System.debug('JESTEM TUTAJ' + opportunity);
        return opportunity;
    }
}