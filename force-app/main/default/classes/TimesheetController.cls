public without sharing class TimesheetController {
    private static final String ACCOUNT_ID_ON_RELATED_CONTACT_IS_EMPTY = 'Account Id on related Contact is empty.';
    private static final String TIMESHEET_ENTRY_STATUS_APPROVED = 'Approved';
    private static final String TIMESHEET_ENTRY_STATUS_REJECTED = 'Rejected';
    private static final String TIMESHEET_ENTRY_STATUS_SUBMITTED = 'Submitted';
    private static final String TIMESHEET_ENTRY_STATUS_DRAFT = 'Draft';

    @AuraEnabled
    public static String getDataApex() {
        Timesheet timesheet = new Timesheet();
//        timesheet.rows = new Map<Id, TimesheetRow>();
//
//        TimesheetRow timesheetRow;
//
//        Id accountId = queryUserAccountId(UserInfo.getUserId());
//        List<Opportunity> opportunities = queryOpportunitiesByAccId(accountId);
//        List<Time_Sheet_Entry__c> timeSheetEntries = queryTimesheetEntries(getProjectsIds(opportunities));
//
//        for (Time_Sheet_Entry__c timeSheetEntry : timeSheetEntries) {
//            if (timesheet.rows.containsKey(timeSheetEntry.Project_Member__c)) {
//                timesheetRow = timesheet.rows.get(timeSheetEntry.Project_Member__c);
//                timesheetRow.timesheetWeekDayEntries.get(0).timeSheetEntries.add(timeSheetEntry);
//            } else {
//                timesheetRow = new TimesheetRow(timeSheetEntry.Project_Member__r, timeSheetEntry);
//                timesheet.rows.put(timeSheetEntry.Project_Member__c, timesheetRow);
//            }
//        }

        return JSON.serialize(timesheet);
    }

    public static Id queryUserAccountId(Id userId) {
        String query = 'SELECT Id, Contact.AccountId FROM User WHERE Id = :userId';
        SObject sobj = Database.query(query);

        if (sobj.getSObject('Contact') == null) {
            throw new TimesheetControllerException(ACCOUNT_ID_ON_RELATED_CONTACT_IS_EMPTY);
        } else {
            return (Id) sobj.getSObject('Contact').get('AccountId');
        }
    }

    public static List<Opportunity> queryOpportunitiesByAccId(Id accId) {
        return [
                SELECT Id
                FROM Opportunity
                WHERE AccountId = :accId
        ];
    }

//    public static Set<Id> getProjectsIds(List<Opportunity> opportunities) {
//        Set<Id> projectIds = new Set<Id>();
//        for (Opportunity opportunity : opportunities) {
//            projectIds.add(opportunity.Project__c);
//        }
//
//        return projectIds;
//    }

//    public static List<Time_Sheet_Entry__c> queryTimesheetEntries(Set<Id> projectIds) {
//        return [
//                SELECT
//                        Id,
//                        Duration__c,
//                        Start__c,
//                        End__c,
//                        Time_Sheet__c,
//                        Status__c,
//                        Project_Member__c,
//                        Project_Member__r.Project__c,
//                        Project_Member__r.Project__r.Name,
//                        Project_Member__r.Project__r.Start_Date__c,
//                        Project_Member__r.Project__r.End_Date__c,
//                        Project_Member__r.Contact__c,
//                        Project_Member__r.Contact__r.Name,
//                        Customer_Comment__c
//                FROM Time_Sheet_Entry__c
//                WHERE Project__c IN :projectIds
//                AND Status__c != :TIMESHEET_ENTRY_STATUS_DRAFT
//        ];
//    }

    @AuraEnabled
    public static String acceptOrRejectRowApex(String rowJSON) {
//        try {
//            TimesheetRow timesheetRow = (TimesheetRow) JSON.deserialize(rowJSON, TimesheetRow.class);
//            String timesheetEntriesStatus = getTimesheetEntriesStatus(timesheetRow);
//            updateTimesheetsAndEntries(timesheetRow, timesheetEntriesStatus);
//
//            return getDataApex();
//        } catch (DmlException dmlEx) {
//            throw new AuraHandledException(dmlEx.getDmlMessage(0));
//        } catch (Exception ex) {
//            System.debug(LoggingLevel.ERROR, ex.getStackTraceString());
//            System.debug(LoggingLevel.ERROR, ex.getMessage());
//            throw new AuraHandledException(ex.getMessage());
//        }
        return null;
    }

    public static String getTimesheetEntriesStatus(TimesheetRow timesheetRow) {
        if (timesheetRow.isAccepted) {
            return TIMESHEET_ENTRY_STATUS_APPROVED;
        } else {
            return TIMESHEET_ENTRY_STATUS_REJECTED;
        }
    }

    public static void updateTimesheetsAndEntries(TimesheetRow timesheetRow, String timesheetEntriesStatus) {
//        List<Time_Sheet_Entry__c> timeSheetEntriesToUpdate = new List<Time_Sheet_Entry__c>();
//
//        for (TimesheetWeekDayEntry timesheetWeekDayEntry : timesheetRow.timesheetWeekDayEntries) {
//            for(Time_Sheet_Entry__c timeSheetEntry : timesheetWeekDayEntry.timeSheetEntries) {
//                timeSheetEntry.Status__c = timesheetEntriesStatus;
//
//                timeSheetEntriesToUpdate.add(new Time_Sheet_Entry__c(
//                        Id = timeSheetEntry.Id,
//                        Status__c = timeSheetEntry.Status__c,
//                        Customer_Comment__c = timesheetRow.comment
//                ));
//            }
//        }
//
//        updateTimesheetEntries(timeSheetEntriesToUpdate);
    }

//    public static void updateTimesheetEntries(List<Time_Sheet_Entry__c> timeSheetEntriesToUpdate) {
//        if (!timeSheetEntriesToUpdate.isEmpty()) {
//            update timeSheetEntriesToUpdate;
//        }
//    }


    public class Timesheet {
        @AuraEnabled
        public Map<Id, TimesheetRow> rows;
    }

    public class TimesheetRow {
        @AuraEnabled
        public User projectMember;
        @AuraEnabled
        public List<TimesheetWeekDayEntry> timesheetWeekDayEntries;
        @AuraEnabled
        public Decimal weeklySum;
        @AuraEnabled
        public String comment;
        @AuraEnabled
        public Boolean isRejected;
        @AuraEnabled
        public Boolean isAccepted;

        public TimesheetRow(User user, Time_Sheet_Entry__c timeSheetEntry) {
            this.projectMember = projectMember;
            this.timesheetWeekDayEntries = new List<TimesheetWeekDayEntry>{
                    new TimesheetWeekDayEntry(timeSheetEntry)
            };
            this.weeklySum = 0.0;
            this.comment = '';
            this.isAccepted = false;
            this.isRejected = false;
        }
    }

    public class TimesheetWeekDayEntry {
        @AuraEnabled
        public String weekDayDate;
        @AuraEnabled
        public Decimal hours;
        @AuraEnabled
        public List<Time_Sheet_Entry__c> timeSheetEntries;
//
//        public TimesheetWeekDayEntry(Time_Sheet_Entry__c timeSheetEntry) {
//            this.hours = 0;
//            this.timeSheetEntries = new List<Time_Sheet_Entry__c>{
//                    timeSheetEntry
//            };
//        }
    }

    public class TimesheetControllerException extends Exception {
    }
}