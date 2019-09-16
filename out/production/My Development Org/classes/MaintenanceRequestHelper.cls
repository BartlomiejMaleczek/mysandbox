/**
 * Created by BMaleczek on 16.01.2018.
 */

public with sharing class MaintenanceRequestHelper implements Triggers.Handler {
    public Set<String> requestsTypesForFutureRoutineBackUp = new Set<String>{
            'Repair',
            'Routine Maintenance'
    };

    public static final String REQUEST_STATUS_CLOSED = 'Closed';
    public static final String REQUEST_TYPE_MAINTENANCE_REQUEST = 'Routine Maintenance';

    public void handle() {
        if (Trigger.isAfter && Trigger.isUpdate) {
            createNewMaintenanceRequestForFutureBackUpRoutine(getMaintenanceRequestNeededFutureBackUp());
        }
    }

    public List<Case> getMaintenanceRequestNeededFutureBackUp() {
        List<Case> cases = new List<Case>();
        for (Case newCase : (List<Case>) Trigger.new) {
            Case oldCase = (Case) Trigger.oldMap.get(newCase.Id);
            if (this.requestsTypesForFutureRoutineBackUp.contains(newCase.Type) && REQUEST_STATUS_CLOSED.equals(newCase.Status)) {
                cases.add(newCase);
            }
        }

        return cases;
    }

    public void createNewMaintenanceRequestForFutureBackUpRoutine(List<Case> cases) {
        List<Case> casesToInsert = new List<Case>();
        System.debug('Cases for new CASE TO BACKUP ROUTINE');
        System.debug(cases);
        if (!cases.isEmpty()) {
            for (Case casse : cases) {
                Integer equipmentLifespanInMonths;
                if (casse.Equipment__c != null) {
                    System.debug('NULLLXX');
                    equipmentLifespanInMonths = (casse.Equipment__r.Lifespan_Months__c != null ? casse.Equipment__r.Lifespan_Months__c.intValue() : 0) ;
                } else {
                    System.debug(' NIE NULLLXX');
                    equipmentLifespanInMonths = 0;
                }

                Date todayDate = Date.newInstance(System.today().year(), System.today().month(), System.today().day());
                casesToInsert.add(new Case(
                        Vehicle__c = casse.Vehicle__c,
                        Equipment__c = casse.Equipment__c,
                        Type = REQUEST_TYPE_MAINTENANCE_REQUEST,
                        Subject = 'Maintenance Request for future back up routine',
                        Date_Due__c = (equipmentLifespanInMonths != 0 ? todayDate.addMonths(equipmentLifespanInMonths) : null)
                ));
            }
            System.debug('Cases to insert' + casesToInsert);
            insert casesToInsert;
        }
    }
}