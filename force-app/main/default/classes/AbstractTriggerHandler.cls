public abstract class AbstractTriggerHandler {
    public TriggerEventType eventType { get; private set; }

    public virtual void run() {
        if (Trigger.isExecuting) {
            if (Trigger.isBefore) {
                if (Trigger.isInsert) {
                    this.eventType = TriggerEventType.BEFORE_INSERT;
                    this.onBeforeInsert((List<SObject>) Trigger.new);
                } else if (Trigger.isUpdate) {
                    this.eventType = TriggerEventType.BEFORE_UPDATE;
                    this.onBeforeUpdate((Map<Id, SObject>) Trigger.newMap, (Map<Id, SObject>) Trigger.oldMap);
                } else if (Trigger.isDelete) {
                    this.eventType = TriggerEventType.BEFORE_DELETE;
                    this.onBeforeDelete((Map<Id, SObject>) Trigger.oldMap);
                }
            } else if (Trigger.isAfter) {
                if (Trigger.isInsert) {
                    this.eventType = TriggerEventType.AFTER_INSERT;
                    this.onAfterInsert((Map<Id, SObject>) Trigger.newMap);
                } else if (Trigger.isUpdate) {
                    this.eventType = TriggerEventType.AFTER_UPDATE;
                    this.onAfterUpdate((Map<Id, SObject>) Trigger.newMap, (Map<Id, SObject>) Trigger.oldMap);
                } else if (Trigger.isDelete) {
                    this.eventType = TriggerEventType.AFTER_DELETE;
                    this.onAfterDelete((Map<Id, SObject>) Trigger.oldMap);
                } else if (Trigger.isUndelete) {
                    this.eventType = TriggerEventType.AFTER_UNDELETE;
                    this.onAfterUndelete((Map<Id, SObject>) Trigger.newMap);
                }
            }
        }
    }

    public Boolean isAfterInsert() {
        return (this.eventType == TriggerEventType.AFTER_INSERT);
    }

    public Boolean isAfterUpdate() {
        return (this.eventType == TriggerEventType.AFTER_UPDATE);
    }

    public Boolean isBeforeInsert() {
        return (this.eventType == TriggerEventType.BEFORE_INSERT);
    }

    public Boolean isBeforeUpdate() {
        return (this.eventType == TriggerEventType.BEFORE_UPDATE);
    }

    public Set<Id> getIdsFromLookups(List<SObject> sObjects, String fieldName) {
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Set<String> sObjectFieldsNames = schemaMap.get(String.valueOf(sObjects.getSObjectType())).getDescribe().fields.getMap().keySet();
        Set<Id> ids = new Set<Id>();
        if (sObjectFieldsNames.contains(fieldName.toLowerCase()) && !sObjects.isEmpty()) {
            for (SObject sObj : sObjects) {
                if (sObj.get(fieldName) != null) {
                    ids.add((Id) sObj.get(fieldName));
                }
            }
        }

        return ids;
    }

    public Boolean fieldValueHasChanged(SObject newSObject, String fieldName, Set<String> allFields) {
        if (isBeforeUpdate() || isAfterUpdate()) {
            SObject oldSObject = Trigger.oldMap.get(newSObject.Id);
            return (fieldName != null && allFields.contains(fieldName.toLowerCase()) && newSObject.get(fieldName) != oldSObject.get(fieldName));
        } else {
            return true;
        }
    }

    protected virtual void onBeforeInsert(List<SObject> newList) {
    }
    protected virtual void onAfterInsert(Map<Id, SObject> newMap) {
    }
    protected virtual void onBeforeUpdate(Map<Id, SObject> newMap, Map<Id, SObject> oldMap) {
    }
//    protected virtual void callBillingService(Map<Id, SObject> newMap, Map<Id, SObject> oldMap) {
//
//    }
    protected virtual void onAfterUpdate(Map<Id, SObject> newMap, Map<Id, SObject> oldMap) {
    }
    protected virtual void onBeforeDelete(Map<Id, SObject> oldMap) {
    }
    protected virtual void onAfterDelete(Map<Id, SObject> oldMap) {
    }
    protected virtual void onAfterUndelete(Map<Id, SObject> newMap) {
    }
}