/**
 * Created by Lenovo on 19.04.2017.
 */

public with sharing class ParkLocator extends System.WebServiceCalloutFuture{

    public static String[] country(String country) {
        ParkService.ParksImplPort park = new ParkService.ParksImplPort();
        return park.byCountry(country);
    }
}