/**
 * 主界面
 * 可以看作UI层的主程序
 */
class MainWindows extends eui.Group{
    private MapContainer:MapContainer;
    private LOGIC:LogicMaker;   //逻辑控制程序
    constructor() {
        super();
        this.LOGIC = new LogicMaker();  //逻辑先行
    }
    protected createChildren(): void {
        super.createChildren();
        this.width = parent.innerWidth;
        this.height = parent.innerHeight;

        this.MapContainer = new MapContainer(this.LOGIC.terrain_map);
        this.addChild(this.MapContainer);

        let save_button = new NormalButton("save");
        this.addChild(save_button);
    }
    public tell(sth:string){
        /**
         * 向逻辑层传送消息
         */
        switch (sth){
            case "save_terrain":
                this.LOGIC.hear(sth);
                break;
            default:
                return 0;
        };
    }
    public hear(sth:string,value:any){
        /**
         * 听取逻辑层的消息
         */
    }
}