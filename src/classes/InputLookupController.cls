public with sharing class InputLookupController {
    private static final String SOBJECTNAME = 'Account';
    private static final List<String> FIELDS = new List<String>{'Id', 'Name'};
    private static final String WHERE_COND_TEMPLATE = 'Name = {0}';
    private static final Integer RECORD_LIMIT = 5000;
    private static final String ORDER_BY = 'Name ASC';

    @AuraEnabled
    public static List<SObject> queryRecordsApex(String whereParamsJSON) {
        try {
            List<String> whereParams = (List<String>) JSON.deserialize(whereParamsJSON, List<String>.class);

            for(Integer i = 0; i < whereParams.size(); i++) {
                whereParams.set(i, '\'' + String.escapeSingleQuotes(whereParams.get(i).replaceAll(' & ', '_')) + '\'');
            }

            List<SObject> records = Database.query(buildAndGetQuery(whereParams));
            return records;
        } catch (Exception ex) {
            System.debug(LoggingLevel.ERROR, ex.getMessage());
            System.debug(LoggingLevel.ERROR, ex.getStackTraceString());
            throw new AuraHandledException(ex.getMessage());
        }
    }

  public static String buildAndGetQuery(List<String> whereParams) {
      String formattedWhereCond = String.format(WHERE_COND_TEMPLATE, whereParams);
      String query = String.join(new List<String>{
              'SELECT ' + String.join(FIELDS, ','),
              'FROM ' + SOBJECTNAME,
              'WHERE ' + formattedWhereCond,
              'ORDER BY ' + ORDER_BY,
              'LIMIT ' + RECORD_LIMIT
      }, ' ');
      return query;
  }
}