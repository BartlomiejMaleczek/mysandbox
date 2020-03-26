/**
 * Created by BMaleczek on 16.08.2017.
 */

public with sharing class UploadImageCtr {
    public Attachment testImg { get; set; }
    public Account acc { get; set; }
    public UploadImageCtr(ApexPages.StandardController controller) {
        this.testImg = new Attachment();
        this.acc = [
                SELECT Id
                FROM Account
                LIMIT 1
        ];
    }

    public void takeImage() {
        insert this.testImg;
        System.debug(this.testImg.Name);
        System.debug(this.testImg.Body);
    }

}