/**
 * Created by Lenovo on 24.04.2017.
 */

public with sharing class ExtensionDataFix {
    private Id accountId;

    private ApexPages.StandardController standardController;

    public ExtensionDataFix(ApexPages.StandardController standardController)
    {
        this.standardController = standardController;
    }

    public ExtensionDataFix(Id accountId) {
        this.accountId = accountId;
    }

    public PageReference runBatch() {
        System.debug('Runuje batcha');
        Id account = (Id) standardController.getRecord().Id;
        System.debug('Return Id' + account);
        return standardController.view();
    }
    private String queryLocator =  String.join( new String[]{
            'Select ID,Typology__c,Accountlabel__c,Second_Account_Label__c,Segmentation__c,Name,Active_PICOS_Selection_Master__c,',
            '(Select ID FROM PICOS_Selection_Masters__r Order By CreatedDate DESC),',
            '(SELECT ID,Brand_ref__c FROM PICOS_Selected_Brands__r)',
            'FROM Account',
            'WHERE ID'
    }, ' ' );

}