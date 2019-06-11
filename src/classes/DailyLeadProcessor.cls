/**
 * Created by Lenovo on 19.04.2017.
 */

global class DailyLeadProcessor implements Schedulable {

    global void execute(SchedulableContext ctx) {
        List<Lead> leadsList = [
          SELECT
                  Id,
                  LeadSource
          FROM Lead
          WHERE LeadSource = null
          LIMIT 200
        ];

        for(Lead lead : leadsList) {
            lead.LeadSource = 'Dreamforce';
        }

        update leadsList;
    }
}