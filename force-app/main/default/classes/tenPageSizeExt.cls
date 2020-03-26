public with sharing class tenPageSizeExt {
    public String selectedJSON {get;set;}

    public tenPageSizeExt(ApexPages.StandardSetController controller) {
        System.debug(controller.getSelected());
        this.selectedJSON = JSON.serialize(controller.getSelected());
        System.debug(this.selectedJSON);
        controller.setPageSize(10);
    }
}