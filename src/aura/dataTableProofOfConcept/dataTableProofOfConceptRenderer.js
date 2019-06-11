/**
 * Created by BMaleczek on 01.08.2017.
 */
({
    afterRender : function(component) {
           this.superAfterRender();
            console.log('JESTEM');
            console.log($, 'Jestem2');
            console.log($('#example'));
            $('#example').DataTable();
           console.log('jquery loaded');
           console.log(component.isRendered()); // is evaluating to true
           console.log($); // causes error overlay because $ is undefined
//           $A.get("e.myns:dataTableProofOfConcept").fire();
        }
})