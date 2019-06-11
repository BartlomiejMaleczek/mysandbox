/**
 * Created by BMaleczek on 31.07.2017.
 */
({
jqueryLoaded: function (component, event, helper){

    $('#example').ready(function() {
         $('#example').DataTable({
         });
     });
     console.log('jquery loaded');
}
})