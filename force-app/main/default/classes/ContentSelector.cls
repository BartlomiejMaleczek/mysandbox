/**
 * ContentSelector.cls
 *
 * @author          Piotrek, Finally Sp. z o.o.
 * @date            26.06.2020
 * @description
 *
 */
public inherited sharing class ContentSelector{
    public  final String HCP_CommunityId = '0DB1x0000004HUGGA2';
    public String communityId;
    public String language;
    public Integer pageParam;
    public Integer pageSize;

    public Enum ManagedContentType {
        Brand,
        Feature,
        Features_Group,
        News
    }

    public ContentSelector setCommunity(String communityId){
        this.communityId = communityId;
        return this;
    }

    public ContentSelector setLanguage(String language){
        this.language = language;
        return this;
    }

    public ContentSelector setPageParam(Integer pageParam){
        this.pageParam = pageParam;
        return this;
    }

    public ContentSelector setPageSize(Integer pageSize){
        this.pageSize = pageSize;
        return this;
    }

    public ContentSelector(){
        this
            .setCommunity(Network.getNetworkId() != null ? Network.getNetworkId() : HCP_CommunityId)
            .setLanguage('en_US');
    }

    public ConnectApi.ManagedContentVersionCollection getAllManagedContent(String managedContentType){
        return ConnectApi.ManagedContent.getAllManagedContent(this.communityId,this.pageParam, this.pageSize,  this.language, managedContentType);
    }

    public ConnectApi.ManagedContentVersionCollection getManagedContentByIds(List<String> contentIds, String managedContentType){
        return ConnectApi.ManagedContent.getManagedContentByIds(this.communityId, contentIds, this.pageParam, this.pageSize,  this.language, managedContentType);
    }

    public ConnectApi.ManagedContentVersionCollection getManagedContentByTopics(List<String> topics, String managedContentType){
        return ConnectApi.ManagedContent.getManagedContentByTopics(this.communityId, topics, this.pageParam, this.pageSize,  this.language, managedContentType);
    }

    public ConnectApi.ManagedContentVersionCollection getManagedContentByTopicsAndIds(List<String> contentIds, List<String> topics, String managedContentType){
        return ConnectApi.ManagedContent.getManagedContentByTopicsAndIds(this.communityId, contentIds, topics, this.pageParam, this.pageSize,  this.language, managedContentType);
    }
}