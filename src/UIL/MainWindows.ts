/**
 * 主界面
 */
class MainWindows extends eui.Group{
    private MapContainer:MapContainer;
    constructor() {
        super();
    }
    protected createChildren(): void {
        super.createChildren();
        this.width = parent.innerWidth;
        this.height = parent.innerHeight;

        this.MapContainer = new MapContainer();
        this.addChild(this.MapContainer);

        let save_button = new NormalButton("save");
        this.addChild(save_button);
        //save_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    private onButtonClick(e: egret.TouchEvent) {
        this.MapContainer.stuffing("bg_jpg");
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}