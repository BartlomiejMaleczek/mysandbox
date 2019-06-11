public abstract class TriggerHandler {

    public void handle() {
        this.cast();
        if ( Trigger.isExecuting ) {
            if ( Trigger.isBefore ) {
                if ( Trigger.isInsert ) {
                    this.onBeforeInsert();
                }
                else if ( Trigger.isUpdate ) {
                    this.onBeforeUpdate();
                }
                else if ( Trigger.isDelete ) {
                    this.onBeforeDelete();
                }
            }
            else if ( Trigger.isAfter ) {
                if ( Trigger.isInsert ) {
                    this.onAfterInsert();
                }
                else if ( Trigger.isUpdate ) {
                    this.onAfterUpdate();
                }
                else if ( Trigger.isDelete ) {
                    this.onAfterDelete();
                }
                else if ( Trigger.isUndelete ) {
                    this.onAfterUndelete();
                }
            }
        }
    }


    /**
    * Utility method to check if value of the field changed on given record
    * @param object - record to check
    * @param field - SObject field to check
    * */
    public static Boolean isChanged( sObject sobj, Schema.SObjectField field ) {
        if(Trigger.oldMap == null){
            return true;
        }

        sObject old = Trigger.oldMap.get( sobj.Id );

        if ( old != null && old.get( field ) != sobj.get( field ) ) {
            return true;
        }
        return false;
    }


    /**
    * Cast Trigger input to implementation specific sObjects
    * */
    protected abstract void cast();

    /**
    * Trigger Event handling methods - to be overriden in TriggerHandler implementations
    * */
    protected virtual void onBeforeInsert() {
    }
    protected virtual void onBeforeUpdate() {
    }
    protected virtual void onBeforeDelete() {
    }
    protected virtual void onBeforeUndelete() {
    }

    protected virtual void onAfterInsert() {
    }
    protected virtual void onAfterUpdate() {
    }
    protected virtual void onAfterDelete() {
    }
    protected virtual void onAfterUndelete() {
    }

}