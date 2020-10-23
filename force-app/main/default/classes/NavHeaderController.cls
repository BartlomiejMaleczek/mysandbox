/**
 * Created by BMaleczek on 02.07.2020.
 */

public with sharing class NavHeaderController {

    @AuraEnabled
    public static List<HCPCommunityService.MenuItem> getMenuItemsApex() {
        return HCPCommunityService.getMenuItems();
    }
}