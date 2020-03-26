public class Product2Extension {

    public List<Product2> productsToInsert { get; set; }
    public List<PricebookEntry> pricebookEntriesToInsert { get; set; }
    public List<ProductWrapper> productWrappers { get; set; }
    public Map<String, String> productsFieldsLabelsMap { get; set; }
    public Map<String, String> pricebookEntriesFieldsLabelsMap { get; set; }
    public Pricebook2 standardPricebook;

    public Product2Extension(ApexPages.StandardController stdController) {
        this.productsToInsert = new List<Product2>();
        this.pricebookEntriesToInsert = new List<PricebookEntry>();
        this.productsFieldsLabelsMap = new Map<String, String>();
        this.pricebookEntriesFieldsLabelsMap = new Map<String, String>();
        this.productWrappers = new List<ProductWrapper>();
        this.standardPricebook = queryStandardPricebook();
        getProductsFieldsLabelsMap();
        getPricebookEntriesFieldsLabelsMap();
        addRows();
    }

    public void getProductsFieldsLabelsMap() {
        Map<String, Schema.SObjectField> fieldsMap = Schema.getGlobalDescribe().get('Product2').getDescribe().fields.getMap();
        for (String field : fieldsMap.keySet()) {
            Schema.SObjectField sObjectField = fieldsMap.get(field);
            this.productsFieldsLabelsMap.put(field, sObjectField.getDescribe().getLabel());
        }
    }

    public void getPricebookEntriesFieldsLabelsMap() {
        Map<String, Schema.SObjectField> fieldsMap = Schema.getGlobalDescribe().get('PricebookEntry').getDescribe().fields.getMap();

        for (String field : fieldsMap.keySet()) {
            Schema.SObjectField sObjectField = fieldsMap.get(field);
            this.pricebookEntriesFieldsLabelsMap.put(field, sObjectField.getDescribe().getLabel());
        }
    }

    public void AddRows() {
        for (Integer i = 0; i < Constants.DEFAULT_ROWS; i++) {
            this.productWrappers.add(new ProductWrapper(this.standardPricebook.Id));
        }
    }

    public List<SelectOption> GetFamilyOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('', Constants.SELECT_ONE));
        for (Schema.PicklistEntry picklistEntry : Constants.PRODUCT_FAMILY) {
            options.add(new SelectOption(picklistEntry.getValue(), picklistEntry.getLabel()));
        }

        return options;
    }

    public List<ChartHelper.ChartData> GetInventory() {
        return ChartHelper.GetInventory();
    }

    public PageReference Save() {
        Savepoint sp = Database.setSavepoint();
        try {

//            insert productsToInsert;
            for(ProductWrapper productWrapper : this.productWrappers) {
                this.productsToInsert.add(productWrapper.productRecord);
                this.pricebookEntriesToInsert.add(productWrapper.pricebookEntryRecord);
            }

            insert this.productsToInsert;
            insert this.pricebookEntriesToInsert;
            //If successful clear the list and display an informational message
            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.INFO, productsToInsert.size() + ' Inserted'));
            this.productsToInsert.clear();   //Do not remove
            this.pricebookEntriesToInsert.clear();
            addRows();  //Do not remove
        } catch (Exception e) {
            apexPages.addMessage(new ApexPages.message(ApexPages.Severity.ERROR, 'Error occurs during saving products.'));
            Database.rollback(sp);
        }
        return null;
    }

    public Pricebook2 queryStandardPricebook() {
        return [
                SELECT Id
                FROM Pricebook2
                WHERE IsActive = true AND IsStandard = true
                LIMIT 1
        ];
    }

    public class ProductWrapper {
        public Product2 productRecord { get; set; }
        public PricebookEntry pricebookEntryRecord { get; set; }

        public ProductWrapper(Id pricebookId) {
            this.productRecord = new Product2();
            this.pricebookEntryRecord = new PricebookEntry(
                    Product2Id = this.productRecord.Id,
                    Pricebook2Id = pricebookId
            );
        }
    }
}