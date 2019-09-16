public with sharing class AccountMembersManagerController {
    @AuraEnabled
    public static List<TeamMember> qetAccountTeamMembersApex(Id accountId) {
        try {
            List<AccountTeamMember> accountTeamMembers = queryAccountTeamMembers(accountId);

            return getTeamMembers(accountTeamMembers);
        } catch (Exception ex) {
            System.debug(LoggingLevel.ERROR, ex.getMessage());
            System.debug(LoggingLevel.ERROR, ex.getStackTraceString());
            throw new AuraHandledException('The problem occurred during querying Account Members.');
        }
    }

    public static List<AccountTeamMember> queryAccountTeamMembers(Id accountId) {
        return [
                SELECT Id, User.Name, UserId, AccountId
                FROM AccountTeamMember
                WHERE AccountId = :accountId
        ];
    }

    public static List<TeamMember> getTeamMembers(List<AccountTeamMember> accountTeamMembers) {
        List<TeamMember> teamMembers = new List<TeamMember>();
        for(AccountTeamMember accountTeamMember : accountTeamMembers) {
            TeamMember teamMember = new TeamMember();
            teamMember.accountTeamMember = accountTeamMember;
            teamMember.isAssigned = true;
            teamMember.isSelected = true;

            teamMembers.add(teamMember);
        }

        return teamMembers;
    }

    public class TeamMember {
        @AuraEnabled public AccountTeamMember accountTeamMember;
        @AuraEnabled public Boolean isSelected;
        @AuraEnabled public Boolean isAssigned;
        @AuraEnabled public Boolean isToAdd;
        @AuraEnabled public Boolean isToRemove;
        @AuraEnabled public Boolean isError;
        @AuraEnabled public String errorMsg;

        public TeamMember() {
            this.isToAdd = false;
            this.isToRemove = false;
            this.isError = false;
            this.errorMsg = '';
        }
    }
}