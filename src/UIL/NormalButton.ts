class NormalButton extends eui.Button{
    private flag:string;
    private call_back:Function;
    constructor(theflag:string){
        super();
        this.flag = theflag;
        this.set_label();
        this.size_self();
        this.positing_self();
        this.assign_callback();
    }
    private size_self(width?:number,height?:number){
        if (!width || !height){
            this.width = 100;
            this.height = 50;
        }
    }
    private positing_self(x?:number,y?:number){
        if (!x || !y){
            switch (this.flag){
                case "save_T":
                    x = 10;
                    y = 10;
                    break;
                case "showORhide_T":
                    x = 10;
                    y = 70;
                    break;
                case "read_B":
                    x = 10;
                    y = 130;
                    break;
                case "showORhide_B":
                    x = 10;
                    y = 190;
                    break;
                case "switch_mode":
                    x = 10;
                    y = 250;
                    break;
                default:
                    x = 107;
                    y = 107;
            }
        };
        this.x = x;
        this.y = y;
    }
    private set_label(label?:string){
        if (!label){
            switch(this.flag){
                case "save_T":
                    label = "写入地形";
                    break;
                case "showORhide_T":
                    label = "显隐地形";
                    break;
                case "read_B":
                    label = "更新建筑";
                    break;
                case "showORhide_B":
                    label = "显隐建筑";
                    break;
                case "switch_mode":
                    label = "切换模式";
                    break;
                default:
                    label = "按钮";
            }
        };
        this.label = label;
    }
    private assign_callback(){
        switch(this.flag){
            case "save_T":
                this.call_back = function(){
                    //console.log("save按钮被点击了");
                    this.parent.hear("save_terrain");
                };
                break;
            case "showORhide_T":
                this.call_back = function(){
                    //console.log("showhideT按钮被点击了");
                    this.parent.hear("showORhide_T");
                };
                break;
            case "read_B":
                this.call_back = function(){
                    //console.log("read_Building按钮被点击了");
                    this.parent.hear("read_Building");
                };
                break;
            case "showORhide_B":
                this.call_back = function(){
                    //console.log("showhideB按钮被点击了");
                    this.parent.hear("showORhide_B");
                };
                break;
            case "switch_mode":
                this.call_back = function(){
                    //console.log("switch_mode按钮被点击了");
                    this.parent.hear("switch_mode");
                };
                break;
            default:
                this.call_back = function(){
                    let panel = new eui.Panel();
                    panel.title = "Title";
                    panel.horizontalCenter = 0;
                    panel.verticalCenter = 0;
                    this.parent.addChild(panel);
                };
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function(e: egret.TouchEvent){
            this.call_back();
        }, this);
    }
}