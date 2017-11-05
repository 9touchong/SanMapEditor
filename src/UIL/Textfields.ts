/**
 * 文本组件类
 * 状态栏和信息显示区域
 * 模式/状态显示栏
 * 坐标和地形显示栏
 */
class StatusBar extends eui.Label{
    /**
     * 顶部状态栏 标识编辑模式或查看模式等
     */
    constructor(){
        super();
        this.x = 120;
        this.y = 1;
        this.width = 1800;
        this.textAlign = "center";
        this.textColor = 0xFF0000;
        this.bold = true;
        this.set_text();
    }
    public set_text(){
        let t1:string,t2:string;
        if (Mode == "view"){
            t1 = "查看模式";
        }else{  //edit
            t1 = "编辑模式";
        };
        if (building_show){
            t2 = "建筑显";
        }else{
            t2 = "建筑隐";
        }
        this.text = t1+";"+t2;
    }
}

class CoordsBar extends eui.Label{
    /**
     * 底部坐标栏，顺便也显示地形
     */
    constructor(){
        super();
        this.x = 120;
        this.y = 901;
        this.width = 1800;
        this.textAlign = "center";
        this.textColor = 0xFFFF00;
        this.bold = true;
        this.set_text();
    }
    public set_text(t_x:number = 999,t_y:number = 999,t_label:string = "无地形"){
        this.text = t_x + "," + t_y + " " + t_label;
    }
}
class BuildingBar extends eui.Label{
    /**
     * 建筑信息栏
     */
     constructor(){
        super();
        this.x = 1;
        this.y = 320;
        this.width = 100;
        this.height = 400;
        this.textAlign = "center";
        this.verticalAlign = "middle";
        this.textColor = 0x0088F0;
        this.bold = true;
        this.set_text();
    }
    public set_text(building?){
        if (building){
            this.text = building["name"];
        }else{
            this.text = "无";
        }
    }
}