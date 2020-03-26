/**
 * Created by Lenovo on 22.03.2017.
 */

public with sharing class CreateCustomerController {
    public APEX_Customer__c customerObj { get; private set; }

    public CreateCustomerController() {

        customerObj = new APEX_Customer__c();
        System.debug(customerObj);
    }

    public PageReference save() {
        PageReference pageRef = Page.PrintAllCustomersView;
        try {
            System.debug(customerObj);
            insert customerObj;
            pageRef.setRedirect(true);
            return pageRef;

        } catch (Exception e) {
           // ApexPages.Message myMsg = new ApexPages.Message(ApexPages.Severity.FATAL, 'WYWALILO SIE');
           // ApexPages.addMessage(myMsg);
            return null;
        }
    }
}