public class Product2Helper {

    /**
     * @name COLLABORATION_GROUP
     * @description List of CollaborationGroup used in both business and test logic
    **/
    static List<CollaborationGroup> COLLABORATION_GROUP = [
            SELECT Id
            FROM CollaborationGroup
            WHERE Name = :Constants.INVENTORY_ANNOUNCEMENTS
            OR Name = :('TEST' + Constants.INVENTORY_ANNOUNCEMENTS)
            LIMIT 1
    ];

    /**
     * @name afterUpdate
     * @description called by product2 Trigger on After Update
     * @param List<Product2> newList
     * @param List<Product2> oldList
    **/
    public static void AfterUpdate() {
        //ToDo: Declare a List of Product2 records named needsAnnouncement
        List<Product2> needsAnnouncement = new List<Product2>();

        //ToDo: Declare a Map of Strings to Inventory_Setting__mdt records
        Map<String, Inventory_Setting__mdt> inventorySettingsMap = new Map<String, Inventory_Setting__mdt>();

        //ToDo: Loop through a query of Inventory_Setting__mdt records and populate the Map with Name as the key
        List<Inventory_Setting__mdt> inventorySettings = [SELECT Id, Low_Quantity_Alert__c, DeveloperName FROM Inventory_Setting__mdt];
        for (Inventory_Setting__mdt inventorySetting : inventorySettings) {
            if (!inventorySettingsMap.containsKey(inventorySetting.DeveloperName)) {
                inventorySettingsMap.put(inventorySetting.DeveloperName, inventorySetting);
            }
        }
        //ToDo: Loop through the Products in newList
        // Use the corresponding Inventory Setting record to determine the correct Low Quantity Alert
        // If the Product's Quantity Remaining has been changed to less than the Low Quantity Alert
        //      add it to the needsAnnouncement list
        Inventory_Setting__mdt inventorySetting;
        for (Product2 product2 : (List<Product2>) Trigger.new) {
            if (inventorySettingsMap.containsKey(product2.Family)) {
                inventorySetting = inventorySettingsMap.get(product2.Family);
                if (inventorySetting.Low_Quantity_Alert__c > product2.Quantity_Remaining__c) {
                    needsAnnouncement.add(product2);
                }
            }
        }
        //ToDo: Pass records to the postAlerts method

        if (needsAnnouncement.size() > 0) {
            PostAlerts(needsAnnouncement);
        }
    }

    /**
     * @name postAlerts
     * @description called by product2 Trigger on After Update
     * @param List<Product2> productList
    **/
    public static void PostAlerts(List<Product2> productList) {
        List<ConnectApi.AnnouncementInput> toPost = new List<ConnectApi.AnnouncementInput>();
        for (Product2 p : productList) {
            // ToDo: Construct a new AnnouncementInput for the Chatter Group so that it:
            // expires in a day
            // does not notify users via email.
            // and has a text body that includes the name of the product followed by the INVENTORY_LEVEL_LOW constant
            toPost.add(getAnnouncementInput(COLLABORATION_GROUP.get(0).Id, p.Name));
        }
        // ToDo: Create and enqueue an instance of the announcementQueuable class with the list of Products
        AnnouncementQueueable announcementQueueable = new AnnouncementQueueable();
        announcementQueueable.toPost = toPost;

        ID jobID = System.enqueueJob(announcementQueueable);
    }

    private static ConnectApi.AnnouncementInput getAnnouncementInput(Id groupId, String productName) {
        ConnectApi.MessageBodyInput messageInput = new ConnectApi.MessageBodyInput();
        messageInput.messageSegments = new List<ConnectApi.MessageSegmentInput>();

        String codeSnippet = productName + ' ' + Constants.INVENTORY_LEVEL_LOW;
        ConnectApi.TextSegmentInput textSegment = new ConnectApi.TextSegmentInput();
        textSegment.text = codeSnippet;
        messageInput.messageSegments.add(textSegment);

        ConnectApi.AnnouncementInput announcementInput = new ConnectApi.AnnouncementInput();
        announcementInput.parentId = groupId;
        announcementInput.body = messageInput;
        announcementInput.expirationDate = System.today().addDays(1);

        return announcementInput;
    }
}