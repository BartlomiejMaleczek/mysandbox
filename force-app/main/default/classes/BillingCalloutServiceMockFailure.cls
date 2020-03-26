@IsTest
global class BillingCalloutServiceMockFailure implements WebServiceMock{
   global void doInvoke(
           Object stub,
           Object request,
           Map<String, Object> response,
           String endpoint,
           String soapAction,
           String requestName,
           String responseNS,
           String responseName,
           String responseType) {
       BillingServiceProxy.billProjectResponse_element billProjectResponse_element = new BillingServiceProxy.billProjectResponse_element();
       billProjectResponse_element.status = 'NOT OK';
       response.put('response_x', billProjectResponse_element);
   }
}