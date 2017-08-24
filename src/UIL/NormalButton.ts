class NormalButton extends eui.Button{
    private flag:string;
    private call_back:Function;
    constructor(theflag:string){
        super();
        this.flag = theflag;
        this.set_label();
        this.positing_self();
        this.assign_callback();
    }
    private positing_self(x?:number,y?:number){
        if (!x || !y){
            switch (this.flag){
                case "save":
                    x = 10;
                    y = 10;
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
                case "save":
                    label = "写入";
                    break;
                default:
                    label = "按钮";
            }
        };
        this.label = label;
    }
    private assign_callback(){
        switch(this.flag){
            case "save":
                this.call_back = function(){
                    console.log("save按钮被点击了");
                    this.parent.tell("save_terrain");
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