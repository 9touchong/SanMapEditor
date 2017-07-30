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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.ontap,this);
    }
    public stuffing(jpg_name?:string){
        //装填内容
        if (!jpg_name){
            jpg_name = "bigsizetest_jpg";
        }
        this.content = new eui.Group();
        let big_img = new eui.Image(RES.getRes(jpg_name));
        this.content.removeChildren();
        this.content.addChild(big_img);
        this.viewport = this.content;
    }
    private positing_self(){
        //给自己定位
        this.width = 600;
        this.height = 600;
        this.x = 200;
        this.y = 200;
    }
    private ontap(e: egret.TouchEvent){
        console.log("MapContainer 检测到点击了",e.localX);
    };
}