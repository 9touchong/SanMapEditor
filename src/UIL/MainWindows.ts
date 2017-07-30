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
    }
}