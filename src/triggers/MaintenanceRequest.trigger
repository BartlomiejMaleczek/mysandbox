/**
 * Created by BMaleczek on 16.01.2018.
 */

trigger MaintenanceRequest on Case (after update) {
    new Triggers().bind(Triggers.Evt.afterupdate, new MaintenanceRequestHelper())
            .manage();
}