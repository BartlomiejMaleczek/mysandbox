/**
 * @name OrderExtension
 * @description This class is provided for you to facilitate the Super Badge
**/
public class OrderExtension {

    public Order orderRecord { get; set; }
    public List<OrderItem> orderItemList { get; set; }
    public String selectedFamily { get; set; }
    public List<chartHelper.chartData> pieData { get; set; }
    public Decimal total { get; set; }

    public Map<Id, OrderItem> orderItemMap;
    ApexPages.StandardSetController standardSetController;

    public OrderExtension(ApexPages.StandardController standardController) {
//        selectedFamily = Constants.SELECT_ONE;
        this.orderRecord = (Order) standardController.getRecord();
        this.orderItemMap = new Map<id, OrderItem>();
        this.pieData = new List<ChartHelper.ChartData>();
        if (this.orderRecord.Id != null) {
            this.orderRecord = queryOrderRecord(orderRecord.Id);
        }

        this.getStandardController();

        this.total = 0;
        for (OrderItem orderItem : this.orderRecord.OrderItems) {
            this.orderItemMap.put(orderItem.Product2Id, orderItem);
            if (orderItem.Quantity > 0) {
                this.pieData.add(new chartHelper.ChartData(orderItem.Product2.Name, orderItem.Quantity * orderItem.UnitPrice));
                this.total += orderItem.UnitPrice * orderItem.Quantity;
            }
        }

        getOrderItemList();
    }

    public void getOrderItemList() {
        this.orderItemList = new List<OrderItem>();
        for (PricebookEntry pricebookEntry : (List<PricebookEntry>) this.standardSetController.getRecords()) {
            if (this.orderItemMap.containsKey(pricebookEntry.Product2Id)) {
                this.orderItemList.add(this.orderItemMap.get(pricebookEntry.Product2Id));
            } else {
                OrderItem orderItem = new OrderItem(
                        PricebookEntryId = pricebookEntry.Id,
                        Product2Id = pricebookEntry.Product2Id,
                        UnitPrice = pricebookEntry.UnitPrice,
                        Quantity = 0,
                        Product2 = pricebookEntry.Product2
                );
                this.orderItemList.add(orderItem);
                this.orderItemMap.put(pricebookEntry.Product2Id, orderItem);
            }
        }
    }

//ToDo: Implement your own method to populate orderItemList
//  that you will call after pagination and/or family selection
    public void getStandardController() {
        String selectedFamily = this.selectedFamily;
        Integer defaultRows = Constants.DEFAULT_ROWS;

        String query = String.join(new List<String>{
                'SELECT Id, UnitPrice, Product2.Name, Product2.Family, Product2Id, Product2.Quantity_Remaining__c',
                'FROM PricebookEntry ',
                'WHERE Product2.IsActive = true',
                (String.isNotBlank(this.selectedFamily) ? 'AND Product2.Family = :selectedFamily' : '')
        }, ' ');

        standardSetController = new ApexPages.StandardSetController(Database.getQueryLocator(query));
        standardSetController.setPageSize(Constants.DEFAULT_ROWS);
    }

/**
 * @name OnFieldChange
 * @description
**/
    public void OnFieldChange() {
//ToDo: Implement logic to store the values changed on the page
//      and populate pieData
//      and populate total
        this.total = 0;
        this.pieData = new List<ChartHelper.ChartData>();
        for (OrderItem orderItem : this.orderItemList) {
            if (orderItem.Quantity > 0) {
                if (this.orderItemMap.containsKey(orderItem.Product2Id)) {
                    this.orderItemMap.put(orderItem.Product2Id, orderItem);
                }
                this.pieData.add(new chartHelper.ChartData(orderItem.Product2.Name, orderItem.Quantity * orderItem.UnitPrice));
                this.total += orderItem.UnitPrice * orderItem.Quantity;
            }
        }
    }

/**
 * @name SelectFamily
 * @description
**/
    public void SelectFamily() {
//ToDo: Implement logic to filter based on the selected product family
        this.getStandardController();
        this.getOrderItemList();
    }

/**
 * @name Save
 * @description
**/
    public void Save() {
//ToDo: Implement logic to save the Order and populated OrderItems
        System.Savepoint sp = Database.setSavepoint();
        try {
            upsert this.orderRecord;

            List<OrderItem> orderItemsToUpsert = new List<OrderItem>();
            List<OrderItem> orderItemsToDelete = new List<OrderItem>();

            for (OrderItem orderItem : orderItemMap.values()) {
                if (orderItem.Quantity > 0) {
                    if (orderItem.OrderId == null) {
                        orderItem.OrderId = this.orderRecord.Id;
                    }
                    orderItemsToUpsert.add(orderItem);
                } else if (orderItem.Id != null) {
                    orderItemsToDelete.add(new OrderItem(id = orderItem.Id));
                    orderItem.Id = null;
                }
            }

            upsert orderItemsToUpsert;
            delete orderItemsToDelete;
        } catch (Exception ex) {
            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.INFO, Constants.ERROR_MESSAGE));
            Database.rollback(sp);
        }
    }


    /**
     * @name First
     * @description
     **/
    public void First() {
        standardSetController.first();
        getOrderItemList();
    }


    /**
     * @name Next
     * @description
     **/
    public void Next() {
        standardSetController.next();
        getOrderItemList();
    }


    /**
     * @name Previous
     * @description
     **/
    public void Previous() {
        standardSetController.previous();
        getOrderItemList();
    }

    /**
     * @name Last
     * @description
     **/
    public void Last() {
        standardSetController.last();
        getOrderItemList();
    }

    /**
     * @name GetHasPrevious
     * @description
     **/
    public Boolean GetHasPrevious() {
        return standardSetController.getHasPrevious();
    }

    /**
     * @name GetHasNext
     * @description
     **/
    public Boolean GetHasNext() {
        return standardSetController.getHasNext();
    }

    /**
     * @name GetTotalPages
     * @description
     **/
    public Integer GetTotalPages() {
        return  (Integer)Math.ceil(standardSetController.getResultSize() / (Decimal)Constants.DEFAULT_ROWS);
    }

    /**
     * @name GetPageNumber
     * @description
     **/
    public Integer GetPageNumber() {
        return standardSetController.getPageNumber();
    }

/**
 * @name GetFamilyOptions
 * @description
**/
    public List<SelectOption> GetFamilyOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption(Constants.SELECT_ONE, Constants.SELECT_ONE));
        for (PickListEntry eachPicklistValue : Constants.PRODUCT_FAMILY) {
            options.add(new SelectOption(eachPicklistValue.getValue(), eachPicklistValue.getLabel()));
        }
        return options;
    }

/**
 * @name QueryOrderRecord
 * @description
**/
    public static Order QueryOrderRecord(Id orderId) {
        return [
                SELECT Id, AccountId, EffectiveDate, Name, Status, Pricebook2Id, (
                        SELECT Id, OrderId, Quantity, UnitPrice, PricebookEntryId, Product2Id,
                                Product2.Name, Product2.Family, Product2.Quantity_Remaining__c
                        FROM OrderItems
                )
                FROM Order
                WHERE Id = :orderId
        ];
    }

}