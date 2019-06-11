public class OrderHelper {

    /**
     * @name AfterUpdate
     * @description 
     * @param List<Order> newList
     * @param List<Order> oldList
     * @return void
    **/
    public static void AfterUpdate(List<Order> newList, List<Order> oldList) {
        Set<Id> orderIds = new Set<Id>();
        for (Integer i = 0; i < newList.size(); i++) {
            if (Constants.ACTIVATED_ORDER_STATUS.equalsIgnoreCase(newList[i].Status)) {
                orderIds.add(newList[i].Id);
            }
        }

        RollUpOrderItems(orderIds);
    }

    /**
     * @name RollUpOrderItems
     * @description Given a set of Activated Order ids, query the child Order Items and related Products to calculate Inventory levels
     * @param Set<Id> activatedOrderIds
     * @return void
    **/
    public static void RollUpOrderItems(Set<Id> activatedOrderIds) {
        //ToDo: Declare a Map named "productMap" of Ids to Product2 records
        Map<Id, Product2> productMap = new Map<Id, Product2>();
        //ToDo: Loop through a query of OrderItems related to the activatedOrderIds
        //ToDo: Populate the map with the Id of the related Product2 as the key and Product2 record as the value
        for (OrderItem orderItem : queryOrderItems(activatedOrderIds)) {
            if(!productMap.containsKey(orderItem.Product2Id)) {
                productMap.put(orderItem.Product2Id, orderItem.Product2);
            }
        }

        //ToDo: Loop through a query that aggregates the OrderItems related to the Products in the ProductMap keyset
        //ToDo: Perform an update on the records in the productMap
        Id product2Id;
        for(AggregateResult aggregateResult : queryOrderItemsGroupedResult(productMap.keySet())) {
            product2Id = (Id) aggregateResult.get('Product2Id');
            if(productMap.containsKey(product2Id)) {
                productMap.get(product2Id).Quantity_Ordered__c = (Decimal) aggregateResult.get('quantityOrdered');
            }
        }

        if(!productMap.values().isEmpty()) {
            update productMap.values();
        }
    }

    public static List<OrderItem> queryOrderItems(Set<Id> activatedOrderIds) {
        return [
                SELECT
                        Id,
                        Product2Id,
                        Product2.Name,
                        Product2.Current_Inventory__c,
                        Product2.IsActive,
                        Product2.Family,
                        Product2.Initial_Inventory__c,
                        Product2.Quantity_Ordered__c
                FROM OrderItem
                WHERE OrderId IN :activatedOrderIds
        ];
    }

    public static AggregateResult[] queryOrderItemsGroupedResult(Set<Id> product2Ids) {
        return [
                SELECT SUM(Quantity)quantityOrdered, Product2Id
                FROM OrderItem
                WHERE Product2Id IN : product2Ids
                GROUP BY Product2Id
        ];
    }

}