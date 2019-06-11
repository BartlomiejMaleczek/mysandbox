/**
 * Created by Lenovo on 07.04.2017.
 */

public class OpportunityTriggerHandler extends TriggerHandler {

    private List<Case> triggerNew;
    private List<Case> triggerOld;
    private Map<Id, Case> triggerNewMap;
    private Map<Id, Case> triggerOldMap;

    protected override void cast() {
        this.triggerNew = Trigger.new;
        this.triggerOld = Trigger.old;
        this.triggerNewMap = (Map<Id, Case>) Trigger.newMap;
        this.triggerOldMap = (Map<Id, Case>) Trigger.oldMap;
    }
}