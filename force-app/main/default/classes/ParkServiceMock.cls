/**
 * Created by Lenovo on 19.04.2017.
 */
@isTest
global class ParkServiceMock implements WebServiceMock{
    global void doInvoke(
            Object stub,
            Object request,
            Map<String, Object> response,
            String endpoint,
            String soapAction,
            String requestName,
            String responseNS,
            String responseName,
            String responseType){
        ParkService.byCountryResponse reponse_x = new ParkService.byCountryResponse();
        String[] arrResponse = new String[] {
                'Hamburg Wadden Sea National Park',
                'Hainich National Park',
                'Bavarian Forest National Park'
        };
        reponse_x.return_x = arrResponse;
        response.put('response_x', reponse_x);
    }
}