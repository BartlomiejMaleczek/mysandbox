public with sharing class OrderExtension2 {
    public ApexPages.StandardSetController standardSetController;
//    public Order orderRecord { get; set; }

    public OrderExtension2(ApexPages.StandardController standardController) {
//        this.orderRecord = (Order) standardController.getRecord();
    }

    public void saveButton() {
        System.debug('SAVE BUTTON ORDEREXTENSION2');
    }
}