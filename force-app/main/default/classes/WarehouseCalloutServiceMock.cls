@IsTest
global class WarehouseCalloutServiceMock implements HttpCalloutMock{

    global HTTPResponse respond(HTTPRequest req) {
//        System.debug('HTTPREQUEST:' + req);
//        System.assertEquals('https://th-superbadge-apex.herokuapp.com/equipment', req.getEndpoint());
//        System.assertEquals('GET', req.getMethod());
        HttpResponse res = new HttpResponse();
        res.setHeader('Content-Type', 'application/json');
        res.setBody('[' +
                '{"_id":"55d66226726b611100aaf741","replacement":false,"quantity":5,"name":"Generator 1000 kW","maintenanceperiod":365,"lifespan":120,"cost":5000,"sku":"100003"},' +
                '{"_id":"55d66226726b611100aaf742","replacement":true,"quantity":183,"name":"Cooling Fan","maintenanceperiod":0,"lifespan":0,"cost":300,"sku":"100004"},' +
                '{"_id":"55d66226726b611100aaf743","replacement":true,"quantity":143,"name":"Fuse 20A","maintenanceperiod":0,"lifespan":0,"cost":22,"sku":"100005"},' +
                '{"_id":"55d66226726b611100aaf744","replacement":false,"quantity":5,"name":"Generator 2000 kw","maintenanceperiod":365,"lifespan":120,"cost":6000,"sku":"100006"},' +
                '{"_id":"55d66226726b611100aaf745","replacement":true,"quantity":142,"name":"Fuse 25A","maintenanceperiod":0,"lifespan":0,"cost":28,"sku":"100007"},' +
                '{"_id":"55d66226726b611100aaf746","replacement":true,"quantity":122,"name":"Fuse 13A","maintenanceperiod":0,"lifespan":0,"cost":10,"sku":"100008"},' +
                '{"_id":"55d66226726b611100aaf747","replacement":true,"quantity":90,"name":"Ball Valve 10 cm","maintenanceperiod":0,"lifespan":0,"cost":50,"sku":"100009"},' +
                '{"_id":"55d66226726b611100aaf748","replacement":false,"quantity":2,"name":"Converter","maintenanceperiod":180,"lifespan":120,"cost":3000,"sku":"100010"},' +
                '{"_id":"55d66226726b611100aaf749","replacement":true,"quantity":75,"name":"Ball Valve 8 cm","maintenanceperiod":0,"lifespan":0,"cost":42,"sku":"100011"},' +
                '{"_id":"55d66226726b611100aaf74a","replacement":true,"quantity":100,"name":"Breaker 25A","maintenanceperiod":0,"lifespan":0,"cost":30,"sku":"100012"},' +
                '{"_id":"55d66226726b611100aaf74b","replacement":true,"quantity":150,"name":"Switch","maintenanceperiod":0,"lifespan":0,"cost":100,"sku":"100013"},' +
                '{"_id":"55d66226726b611100aaf74c","replacement":true,"quantity":200,"name":"Ball Valve 5 cm","maintenanceperiod":0,"lifespan":0,"cost":30,"sku":"100014"},' +
                '{"_id":"55d66226726b611100aaf74d","replacement":false,"quantity":8,"name":"UPS 3000 VA","maintenanceperiod":180,"lifespan":60,"cost":1600,"sku":"100015"},' +
                '{"_id":"55d66226726b611100aaf74e","replacement":false,"quantity":10,"name":"UPS 1000 VA","maintenanceperiod":180,"lifespan":48,"cost":1000,"sku":"100016"},' +
                '{"_id":"55d66226726b611100aaf74f","replacement":true,"quantity":180,"name":"Breaker 8A","maintenanceperiod":0,"lifespan":0,"cost":10,"sku":"100017"},' +
                '{"_id":"55d66226726b611100aaf750","replacement":false,"quantity":2,"name":"Cooling Tower","maintenanceperiod":365,"lifespan":120,"cost":10000,"sku":"100018"},' +
                '{"_id":"55d66226726b611100aaf751","replacement":true,"quantity":165,"name":"Motor","maintenanceperiod":0,"lifespan":0,"cost":150,"sku":"100019"},' +
                '{"_id":"55d66226726b611100aaf752","replacement":true,"quantity":210,"name":"Breaker 13A","maintenanceperiod":0,"lifespan":0,"cost":20,"sku":"100020"},' +
                '{"_id":"55d66226726b611100aaf753","replacement":true,"quantity":100,"name":"Radiator Pump","maintenanceperiod":0,"lifespan":0,"cost":500,"sku":"100021"},' +
                '{"_id":"55d66226726b611100aaf754","replacement":true,"quantity":129,"name":"Breaker 20A","maintenanceperiod":0,"lifespan":0,"cost":25,"sku":"100022"},' +
                '{"_id":"55d66226726b611100aaf73f","replacement":false,"quantity":10,"name":"UPS 2000 VA","maintenanceperiod":180,"lifespan":60,"cost":1350,"sku":"100001"},' +
                '{"_id":"55d66226726b611100aaf740","replacement":true,"quantity":194,"name":"Fuse 8A","maintenanceperiod":0,"lifespan":0,"cost":5,"sku":"100002"}]');
        res.setStatusCode(200);
        return res;
    }

//    @future(callout=true)
//    public static void runWarehouseEquipmentSync() {
//        //
//        System.debug('WYWOLUJE SIE');
//        Http http = new Http();
//        HttpRequest request = new HttpRequest();
//        request.setEndpoint('https://th-superbadge-apex.herokuapp.com/equipment');
//        request.setMethod('GET');
//        HttpResponse response = http.send(request);
//
//        if (response.getStatusCode() == 200) {
//            System.debug('RESPONSE' + response.getBody());
//            upsert getEquipmentsBySKU(response);
//        } else {
//            System.debug('NIE KOD 200');
//        }
//    }
//
//    public static List<Product2> getEquipmentsBySKU(HttpResponse response) {
//        List<EquipmentWrapper> results = (List<EquipmentWrapper>) JSON.deserialize(response.getBody(), List<EquipmentWrapper>.class);
//        Set<String> uniqueSKUCalloutValues = getWarehouseSKU(results);
//        return prepareEquipmentsObjectsToUpsert(gueryEquipmentsBySKU(uniqueSKUCalloutValues), getEquipmentWrappersMap(results), uniqueSKUCalloutValues);
//    }
//
//    public static Map<String, EquipmentWrapper> getEquipmentWrappersMap(List<EquipmentWrapper> equipmentWrappers) {
//        Map<String, EquipmentWrapper> equipmentWrappersMap = new Map<String, EquipmentWrapper>();
//        for (EquipmentWrapper ew : equipmentWrappers) {
//            if (!equipmentWrappersMap.containsKey(ew.sku)) {
//                equipmentWrappersMap.put(ew.sku, ew);
//            }
//        }
//
//        return equipmentWrappersMap;
//    }
//
//    public static Set<String> getWarehouseSKU(List<EquipmentWrapper> equipments) {
//        Set<String> warehousesSKU = new Set<String>();
//        for (EquipmentWrapper ew : equipments) {
//            warehousesSKU.add(ew.sku);
//        }
//
//        return warehousesSKU;
//    }
//
//    public static List<Product2> prepareEquipmentsObjectsToUpsert(Map<String, Product2> equipmentsMap, Map<String, EquipmentWrapper> equipmentsCalloutMap, Set<String> uniqueSKUCalloutValues) {
//        List<Product2> productsToUpsert = new List<Product2>();
//        for (String uniqueSKUCalloutValue : uniqueSKUCalloutValues) {
//            if (equipmentsMap.containsKey(uniqueSKUCalloutValue)) {
//                productsToUpsert.add(modifyEquipmentObject(equipmentsMap.get(uniqueSKUCalloutValue), equipmentsCalloutMap.get(uniqueSKUCalloutValue)));
//            } else {
//                createEquipmentObject(equipmentsCalloutMap.get(uniqueSKUCalloutValue));
//            }
//        }
//
//        return productsToUpsert;
//    }
//
//    public static Product2 createEquipmentObject(EquipmentWrapper equipmentWrapper) {
//        return new Product2(
//                Cost__c = equipmentWrapper.cost,
//                Current_Inventory__c = equipmentWrapper.quantity,
//                Lifespan_Months__c = equipmentWrapper.lifespan,
//                Name = equipmentWrapper.name,
//                Maintenance_Cycle__c  = equipmentWrapper.maintenanceperiod
//        );
//    }
//
//    public static Product2 modifyEquipmentObject(Product2 product, EquipmentWrapper equipmentWrapper) {
//        return new Product2(
//                Id = product.Id,
//                Replacement_Part__c = true,
//                Cost__c = equipmentWrapper.cost,
//                Current_Inventory__c = equipmentWrapper.quantity,
//                Lifespan_Months__c = equipmentWrapper.lifespan,
//                Name = equipmentWrapper.name,
//                Maintenance_Cycle__c  = equipmentWrapper.maintenanceperiod
//        );
//    }
//
//    public static Map<String, Product2> gueryEquipmentsBySKU(Set<String> warehousesSKU) {
//        Map<String, Product2> productsMap = new Map<String, Product2>();
//
//        List<Product2> products = [
//                SELECT
//                        Id,
//                        Name,
//                        ProductCode,
//                        Description,
//                        Family,
//                        LastReferencedDate,
//                        Cost__c,
//                        Current_Inventory__c,
//                        Lifespan_Months__c,
//                        Maintenance_Cycle__c,
//                        Replacement_Part__c,
//                        Warehouse_SKU__c
//                FROM Product2
//                WHERE Warehouse_SKU__c IN :warehousesSKU
//        ];
//
//        for (Product2 product2 : products) {
//            if (!productsMap.containsKey(product2.Warehouse_SKU__c)) {
//                productsMap.put(product2.Warehouse_SKU__c, product2);
//            }
//        }
//
//        return productsMap;
//    }
//
//    public class EquipmentWrapper {
//        public String id;
//        public Boolean replacement;
//        public Decimal quantity;
//        public String name;
//        public Decimal maintenanceperiod;
//        public Decimal lifespan;
//        public Decimal cost;
//        public String sku;
//    }


}