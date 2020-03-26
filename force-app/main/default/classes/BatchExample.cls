global class BatchExample implements Database.Batchable<sObject> {
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator([
                SELECT Id
                FROM Case
        ]);
    }

    global void execute(Database.BatchableContext bc, List<sObject> cases) {
        for (Case caseToUpdt : (List<Case>) cases) {
            caseToUpdt.SuppliedCompany = '';
        }

        update cases;
    }

    global  void finish(Database.BatchableContext bc) {
        System.debug(LoggingLevel.INFO, 'Batch Has Finished');
    }

}