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
    public static List<SObject> queryRecordsApex(String searchParamsMapJSON, String classType) {
        try {

            Type type = Type.forName(classType);
            InputLookupController newTypeInstance = (InputLookupController) type.newInstance();
            newTypeInstance.setSelectedFields();
            newTypeInstance.setSobjectName();
            newTypeInstance.setOrderBy();
            newTypeInstance.setLimit();

            if(String.isNotBlank(searchParamsMapJSON)) {
                Map<String, Object> searchParamsMap = (Map<String, Object>) JSON.deserializeUntyped(searchParamsMapJSON);

                for (Object obj : searchParamsMap.values()) {
                    if(obj instanceof String) {
                        Date parsedDate = parseDate((String) obj);

                        if(parsedDate == null) {
                            if(String.isBlank((String) obj)) {
                                throw new InputLookupControllerException('String param is blank.');
                            }
                            obj = String.escapeSingleQuotes((String) obj);
                        } else {}
                    } else if(obj instanceof Integer) {
                    } else if(obj instanceof Boolean) {}
                }

                newTypeInstance.setWhereCond(searchParamsMap);
            }

            return Database.query(newTypeInstance.buildAndGetQuery());
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
        List<String> queryElements = new List<String>();
        queryElements.add('SELECT ' + String.join(this.fields, ','));
        queryElements.add('FROM ' + this.sObjectName);


        if(String.isNotBlank(this.whereCond)) {
            queryElements.add('WHERE ' + this.whereCond);
        }

        if(String.isNotBlank(this.orderBy)) {
            queryElements.add('ORDER BY ' + this.orderBy);
        }

        if(this.recordsLimit != null) {
            queryElements.add('LIMIT ' + this.recordsLimit);
        }


        String query = String.join(queryElements, ' ');

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

    public class InputLookupControllerException extends Exception{}

}