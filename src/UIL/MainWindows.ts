/**
 * 主界面
 * 可以看作UI层的主程序
 */
var Mode:string = "edit";   //两种模式 编辑edit查看view，编辑室编辑地形查看是查看地形和建筑，建筑不再UI界面编辑 直接手动改文本文件
class MainWindows extends eui.Group{
    private MapContainer:MapContainer;
    private LOGIC:LogicMaker;   //逻辑控制程序
    private status_bar:StatusBar;   //状态显示栏
    public coords_bar:CoordsBar; //坐标显示栏
    public building_bar:BuildingBar;    //建筑信息栏
    constructor() {
        super();
        this.LOGIC = new LogicMaker();  //逻辑先行
    }
    protected createChildren(): void {
        super.createChildren();
        this.width = parent.innerWidth;
        this.height = parent.innerHeight;

        let saveT_button = new NormalButton("save_T");
        this.addChild(saveT_button);
        let showhideT_btn = new NormalButton("showORhide_T");
        this.addChild(showhideT_btn);
        let updateB_btn = new NormalButton("read_B");
        this.addChild(updateB_btn);
        let showhideB_btn = new NormalButton("showORhide_B");
        this.addChild(showhideB_btn);
        let view_btn = new NormalButton("switch_mode");
        this.addChild(view_btn);

        this.status_bar = new StatusBar();
        this.addChild(this.status_bar); 
        this.coords_bar = new CoordsBar();
        this.addChild(this.coords_bar);
        this.building_bar = new BuildingBar();
        this.addChild(this.building_bar);

        this.MapContainer = new MapContainer(this);
        this.addChild(this.MapContainer);
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
         * 听取逻辑层或下级的消息
         */
        switch (sth){
            case "save_terrain":    //保存文件工作转发给逻辑层处理即可
                this.tell(sth);
                break;
            case "showORhide_T":
                this.MapContainer.showORhide("T");
                break;
            case "read_Building":
                console.log("读取建筑信息功能正在开发");
                break;
            case "showORhide_B":
                this.MapContainer.showORhide("B");
                break;
            case "switch_mode":
                this.switch_mode();
                break;
            default:
                return 0;
        };
    }
    private switch_mode(){
        /**
         * 切换观察和编辑模式
         */
        if (Mode == "edit"){
            Mode = "view";
        }else{
            Mode = "edit";
        }
        this.status_bar.set_text();
    }
}