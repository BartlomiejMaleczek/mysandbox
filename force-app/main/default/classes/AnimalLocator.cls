/**
 * Created by Lenovo on 19.04.2017.
 */

global with sharing class AnimalLocator {

    global static String getAnimalNameById(Integer id) {

        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/' + id);
        request.setMethod('GET');

        HttpResponse response = http.send(request);
        System.debug(response.getBody());
        
        AnimalResponse aniResponse = (AnimalResponse) JSON.deserialize(response.getBody(), AnimalResponse.class);
        System.debug(aniResponse);


        return aniResponse.animal.name;
    }


    global class AnimalResponse {
        Animal animal;

    }

    global class Animal {
        Integer id;
        String name;
        String eats;
        String says;
    }

}