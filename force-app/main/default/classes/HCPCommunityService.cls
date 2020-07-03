/**
 * HCPCommunityService.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            02.07.2020
 * @description
 *
 */
public inherited sharing class HCPCommunityService{


    public static List<HCPCommunityService.MenuItem> getMenuItems(){
        List<HCPCommunityService.MenuItem>  items = new List<HCPCommunityService.MenuItem>();
        Map<Id, HCPCommunityService.MenuItem> parentItemsByIds = new Map<Id, HCPCommunityService.MenuItem>();

        for(NavigationMenuItem item : new HCPCommunitySelector().getNavigationMenuItems(HCPApplication.MENU_NAME, HCPApplication.MENU_STATUS.Draft.name())) {
            HCPCommunityService.MenuItem hcpMenuItem = new HCPCommunityService.MenuItem(item);

            if(hcpMenuItem.item.ParentId==null){
                items.add(hcpMenuItem);
                parentItemsByIds.put(hcpMenuItem.item.Id, hcpMenuItem);
            }
            else {
                parentItemsByIds.get(hcpMenuItem.item.ParentId).addSubItem(hcpMenuItem);
            }
        }

        return items;
    }

    public class MenuItem {
        @AuraEnabled public NavigationMenuItem item;
        @AuraEnabled public List<HCPCommunityService.MenuItem> subItems;
        @AuraEnabled public Boolean hasSubItems;

        public MenuItem(NavigationMenuItem item){
            this.item = item;
            this.subItems = new List<HCPCommunityService.MenuItem>();
            this.hasSubItems = false;
        }

        public MenuItem addSubItem(HCPCommunityService.MenuItem item){
            this.subItems.add(item);
            this.hasSubItems = true;
            return this;
        }
    }
}