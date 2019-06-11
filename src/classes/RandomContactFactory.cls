/**
 * Created by Lenovo on 18.04.2017.
 */

public class RandomContactFactory {

    public static List<Contact> generateRandomContacts(Integer numOfContacts, String lastName) {
        List<Contact> genContacts = new List<Contact>();
        for (Integer i = 0; i < numOfContacts; i++) {
            genContacts.add(
                    new Contact(
                            FirstName = 'Test' + i,
                            LastName = lastName
                    )
            );
        }

        return genContacts;
    }

}