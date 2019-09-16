public with sharing class WarehouseCalloutService {


    private static final String WAREHOUSE_URL = 'https://th-superbadge-apex.herokuapp.com/equipment';
    
    // complete this method to make the callout (using @future) to the
    // REST endpoint and update equipment on hand.
    @future(callout=true)
    public static void runWarehouseEquipmentSync() {
        //
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(WAREHOUSE_URL);
        request.setMethod('GET');
        HttpResponse response = http.send(request);

        if (response.getStatusCode() == 200) {
            System.debug('RESPONSE' + response.getBody());
            upsert getEquipmentsBySKU(response);
        } else {
            System.debug('NIE KOD 200');
        }
    }

    public static List<Product2> getEquipmentsBySKU(HttpResponse response) {
        List<EquipmentWrapper> results = (List<EquipmentWrapper>) JSON.deserialize(response.getBody(), List<EquipmentWrapper>.class);
        Set<String> uniqueSKUCalloutValues = getWarehouseSKU(results);
        return prepareEquipmentsObjectsToUpsert(gueryEquipmentsBySKU(uniqueSKUCalloutValues), getEquipmentWrappersMap(results), uniqueSKUCalloutValues);
    }

    public static Map<String, EquipmentWrapper> getEquipmentWrappersMap(List<EquipmentWrapper> equipmentWrappers) {
        Map<String, EquipmentWrapper> equipmentWrappersMap = new Map<String, EquipmentWrapper>();
        for (EquipmentWrapper ew : equipmentWrappers) {
            if (!equipmentWrappersMap.containsKey(ew.sku)) {
                equipmentWrappersMap.put(ew.sku, ew);
            }
        }

        return equipmentWrappersMap;
    }

    public static Set<String> getWarehouseSKU(List<EquipmentWrapper> equipments) {
        Set<String> warehousesSKU = new Set<String>();
        for (EquipmentWrapper ew : equipments) {
            warehousesSKU.add(ew.sku);
        }

        return warehousesSKU;
    }

    public static List<Product2> prepareEquipmentsObjectsToUpsert(Map<String, Product2> equipmentsMap, Map<String, EquipmentWrapper> equipmentsCalloutMap, Set<String> uniqueSKUCalloutValues) {
        List<Product2> productsToUpsert = new List<Product2>();
        for (String uniqueSKUCalloutValue : uniqueSKUCalloutValues) {
            if (equipmentsMap.containsKey(uniqueSKUCalloutValue)) {
                productsToUpsert.add(modifyEquipmentObject(equipmentsMap.get(uniqueSKUCalloutValue), equipmentsCalloutMap.get(uniqueSKUCalloutValue)));
            } else {
                productsToUpsert.add(createEquipmentObject(equipmentsCalloutMap.get(uniqueSKUCalloutValue)));
            }
        }

        return productsToUpsert;
    }

    public static Product2 createEquipmentObject(EquipmentWrapper equipmentWrapper) {
        return new Product2(
                Cost__c = equipmentWrapper.cost,
                Current_Inventory__c = equipmentWrapper.quantity,
                Lifespan_Months__c = equipmentWrapper.lifespan,
                Name = equipmentWrapper.name,
                Maintenance_Cycle__c  = equipmentWrapper.maintenanceperiod,
                Warehouse_SKU__c = equipmentWrapper.sku,
                Replacement_Part__c = true
        );
    }

    public static Product2 modifyEquipmentObject(Product2 product, EquipmentWrapper equipmentWrapper) {
        return new Product2(
                Id = product.Id,
                Replacement_Part__c = true,
                Cost__c = equipmentWrapper.cost,
                Current_Inventory__c = equipmentWrapper.quantity,
                Lifespan_Months__c = equipmentWrapper.lifespan,
                Name = equipmentWrapper.name,
                Maintenance_Cycle__c  = equipmentWrapper.maintenanceperiod
        );
    }

    public static Map<String, Product2> gueryEquipmentsBySKU(Set<String> warehousesSKU) {
        Map<String, Product2> productsMap = new Map<String, Product2>();

        List<Product2> products = [
                SELECT
                        Id,
                        Name,
                        ProductCode,
                        Description,
                        Family,
                        LastReferencedDate,
                        Cost__c,
                        Current_Inventory__c,
                        Lifespan_Months__c,
                        Maintenance_Cycle__c,
                        Replacement_Part__c,
                        Warehouse_SKU__c
                FROM Product2
                WHERE Warehouse_SKU__c IN :warehousesSKU
        ];

        for (Product2 product2 : products) {
            if (!productsMap.containsKey(product2.Warehouse_SKU__c)) {
                productsMap.put(product2.Warehouse_SKU__c, product2);
            }
        }

        return productsMap;
    }

    public class EquipmentWrapper {
        public String id;
        public Boolean replacement;
        public Decimal quantity;
        public String name;
        public Decimal maintenanceperiod;
        public Decimal lifespan;
        public Decimal cost;
        public String sku;
    }


}