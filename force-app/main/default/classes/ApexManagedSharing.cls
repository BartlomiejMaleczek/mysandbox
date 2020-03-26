public with sharing class ApexManagedSharing {
    public static boolean manualShareRead(){
        // Create new sharing object for the custom object Job.
        Apex_Managed_Sharing__Share apexManagedShare  = new Apex_Managed_Sharing__Share();

        // Set the ID of record being shared.
        apexManagedShare.ParentId = 'a0q1n0000094oR4AAI';

        // Set the ID of user or group being granted access.
        apexManagedShare.UserOrGroupId = '0051n000004zUil';

        // Set the access level.
        apexManagedShare.AccessLevel = 'Read';

        // Set rowCause to 'manual' for manual sharing.
        // This line can be omitted as 'manual' is the default value for sharing objects.
        apexManagedShare.RowCause = Schema.Apex_Managed_Sharing__Share.RowCause.New_Custom_Reason__c;


        // Insert the sharing record and capture the save result.
        // The false parameter allows for partial processing if multiple records passed
        // into the operation.
        Database.SaveResult sr = Database.insert(apexManagedShare,false);

        // Process the save results.
        if(sr.isSuccess()){
            // Indicates success
            return true;
        }
        else {
            // Get first save result error.
            Database.Error err = sr.getErrors()[0];

            // Check if the error is related to trival access level.
            // Access level must be more permissive than the object's default.
            // These sharing records are not required and thus an insert exception is acceptable.
            if(err.getStatusCode() == StatusCode.FIELD_FILTER_VALIDATION_EXCEPTION  &&
                    err.getMessage().contains('AccessLevel')){
                // Indicates success.
                return true;
            }
            else{
                // Indicates failure.
                return false;
            }
        }
    }
}