/**
 * Created by Lenovo on 19.04.2017.
 */

public with sharing class AddPrimaryContact implements Queueable {

    private Contact contact;
    private String stateAbbreviation;

    public AddPrimaryContact(Contact contact, String stateAbbreviation) {
        this.contact = contact;
        this.stateAbbreviation = stateAbbreviation;
    }

    public void execute(QueueableContext context) {
        List<Contact> contactsToInsert = new List<Contact>();
        for(Account account : [SELECT Id FROM Account WHERE BillingState = :stateAbbreviation]) {
           Contact clonedContact = this.contact.clone(false, false, false, false);
            clonedContact.AccountId = account.Id;
            contactsToInsert.add(clonedContact);
        }
        insert contactsToInsert;
    }

}