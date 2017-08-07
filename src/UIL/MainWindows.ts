/**
 * 主界面
 */
class MainWindows extends eui.Group{
    private MapContainer:MapContainer;
    private LOGIC:LogicMaker;   //逻辑控制程序
    constructor() {
        super();
        this.LOGIC = new LogicMaker();
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
    public tell_logic(sth:string){
        this.LOGIC.hear_show(sth);
    }
}