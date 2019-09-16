/**
 * Created by Lenovo on 22.03.2017.
 */

public with sharing class PrintAllCustomersController {
    private List<APEX_Customer__c> customersList{get; private set;}
    private APEX_Customer__c customerObj{get; private set;}


    public List<APEX_Customer__c> getAllCustomers() {
        customersList = [SELECT Id, Name, APEX_Customer_Description__c, APEX_Customer_Status__c from APEX_Customer__c];
        return customersList;
    }

    public PageReference createNewCustomer() {
        PageReference createNewCustomerPage = Page.CreateCustomerView;
        createNewCustomerPage.setRedirect(true);
        return createNewCustomerPage;
    }

    public void save() {
        System.debug('Zapisuje!');
        for (APEX_Customer__c customer : customersList) {
            System.debug('Nowy customer' + customer.APEX_Customer_Description__c);
        }
        update customersList;
    }
}