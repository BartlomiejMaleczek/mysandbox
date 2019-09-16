/**
 * Created by Lenovo on 18.04.2017.
 */

public with sharing class NewCaseListController {

    public List<Case> getNewCases() {
        return [SELECT
                Id,
                CaseNumber
                FROM Case
                WHERE Status = 'New'
        ];
    }

}