/**
 * 操作地图图片，编辑网格的区域。也是主工作区
 * 一个可滚动的容器
 */
class MapContainer extends eui.Scroller{
    private content:eui.Group;
    constructor() {
        super();
        this.stuffing();
        this.positing_self();
    }
    private stuffing(){
        //装填内容
        this.content = new eui.Group();
        let big_img = new eui.Image(RES.getRes("bigsizetest_jpg"));
        this.content.addChild(big_img);
        this.viewport = this.content;
    }
    private positing_self(){
        //给自己定位
        this.width = 600;
        this.height = 600;
        this.x = 100;
        this.y = 100;
    }
}