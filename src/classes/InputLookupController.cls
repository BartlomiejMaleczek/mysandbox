public abstract with sharing class InputLookupController {
    protected String sObjectName;
    protected List<String> fields;
    protected String whereCond;
    protected Integer recordsLimit;
    protected String orderBy;

    public abstract void setSelectedFields();
    public abstract void setWhereCond(Map<String, Object> searchParams);
    public abstract void setOrderBy();
    public abstract void setLimit();
    public abstract void setSobjectName();

    @AuraEnabled
    public static List<SObject> queryRecordsApex(String searchParamsMapJSON, String queryType) {
        try {
            Map<String, Object> searchParamsMap = (Map<String, Object>) JSON.deserializeUntyped(searchParamsMapJSON);

            for (Object obj : searchParamsMap.values()) {
                if(obj instanceof String) {
                    Date parsedDate = parseDate((String) obj);

                    if(parsedDate == null) {
                        obj = String.escapeSingleQuotes((String) obj);
                    } else {}
                } else if(obj instanceof Integer) {
                } else if(obj instanceof Boolean) {}
            }

            Type queryInstance = Type.forName(queryType);
            InputLookupController queryNewInstance = (InputLookupController) queryInstance.newInstance();
            queryNewInstance.setSelectedFields();
            queryNewInstance.setWhereCond(searchParamsMap);
            queryNewInstance.setSobjectName();
            queryNewInstance.setOrderBy();
            queryNewInstance.setLimit();

            return Database.query(queryNewInstance.buildAndGetQuery());
        } catch (Exception ex) {
            System.debug(LoggingLevel.ERROR, ex.getMessage());
            System.debug(LoggingLevel.ERROR, ex.getStackTraceString());
            throw new AuraHandledException(ex.getMessage());
        }
    }

    public static Date parseDate(String inDate) {
        Date dateRes = null;
        try {
            String candDate = inDate.substring(0, Math.min(10, inDate.length()));
            dateRes = Date.parse(candDate);
        } catch (Exception e) {}

        if (dateRes == null) {
            try {
                String candDate = inDate.substring(0, 10);
                dateRes = Date.valueOf(candDate);
            } catch (Exception e) {}
        }

        return dateRes;
    }

    public String buildAndGetQuery() {
        String query = String.join(new List<String>{
                'SELECT ' + String.join(this.fields, ','),
                'FROM ' + this.sObjectName,
                'WHERE ' + this.whereCond,
                'ORDER BY ' + this.orderBy,
                'LIMIT ' + this.recordsLimit
        }, ' ');

        return query;
    }

    public class AccountQuery extends InputLookupController {

        public AccountQuery() {}

        public override void setSelectedFields() {
            this.fields = new List<String>{
                    'Id', 'Name'
            };
        }

        public override void setWhereCond(Map<String, Object> searchParams) {
            this.whereCond = 'Name LIKE \'%' + searchParams.get('name') +'%\'';
        }

        public override void setOrderBy() {
            this.orderBy = 'Name ASC';
        }

        public override void setLimit() {
            this.recordsLimit = 50000;
        }

        public override void setSobjectName() {
            this.sObjectName = 'Account';
        }
    }

}