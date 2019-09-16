/**
 * Created by Lenovo on 20.04.2017.
 */

@RestResource(urlMapping='/Accounts/*/contacts')
global class AccountManager {

    @HttpGet
    global static Account getAccount() {
        String accountId = '';
        RestRequest request = RestContext.request;
        String requrl = request.requestURI;

        Pattern regexPattern = Pattern.compile('\\/Accounts\\/(.*)\\/contacts');
        Matcher regexMatcher = regexPattern.matcher(requrl);

        if(regexMatcher.find()) {
            System.debug('Match is true');
            accountId = regexMatcher.group(1);
        }

        System.debug('AccountId' + accountId);

        return  (Account) [
                SELECT
                        Id,
                        Name,
                (SELECT Id from Contacts)
                FROM Account
                WHERE Id = :accountId

        ];
    }
}