/**
 * HCPCommunitySelector.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            02.07.2020
 * @description
 *
 */
public inherited sharing class HCPCommunitySelector{

    public List<NavigationMenuItem> getNavigationMenuItems(String navigationMenu, String status){
        return [
            SELECT Id, NavigationLinkSetId, Label, Type, Target, Position, ParentId, AccessRestriction, DefaultListViewId, TargetPrefs, Status
            FROM NavigationMenuItem
            WHERE NavigationLinkSet.DeveloperName =: navigationMenu AND Status =: status
            ORDER BY ParentId, Position
        ];
    }
}