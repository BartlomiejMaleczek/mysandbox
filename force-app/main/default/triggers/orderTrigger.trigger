/**
 * @name orderTrigger
 * @description
**/
trigger orderTrigger on Order (before insert, after insert,before update, after update, before delete, after delete, after undelete
) {
    try {
        if(Trigger.new != null && Trigger.isAfter && Trigger.isUpdate) {
            OrderHelper.AfterUpdate(Trigger.new, Trigger.old);
        }
    } catch ( Exception e ){
    
    }
}