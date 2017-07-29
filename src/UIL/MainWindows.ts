/**
 * 主界面
 */
class MainWindows extends eui.Group{
    constructor() {
        super();
    }
    protected createChildren(): void {
        super.createChildren();
        this.width = parent.innerWidth;
        this.height = parent.innerHeight;

        var myScroller = new MapContainer();
        this.addChild(myScroller);

        let button = new eui.Button();
        button.label = "Click!";
        this.addChild(button);
        button.x = 10;button.y = 10;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}