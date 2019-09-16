/**
 * Created by BMaleczek on 17.05.2017.
 */

public with sharing class LoginFormController {

    @AuraEnabled
    public static User getUserByUsernameAndPassword(User user) {
        System.debug('Wywolalem sie po stronie serwera');
        return [
                SELECT
                        Id
                FROM User
                WHERE Username = :user.Username
                AND Password__c = :user.Password__c
                LIMIT 1
        ];
    }
}