/**
 * 操作地图图片，编辑网格的区域。也是主工作区
 * 一个可滚动的容器
 */
class MapContainer extends eui.Scroller{
    private SIZE:Object = Default_Sizes;    //规格,与逻辑层的同名属性来自相同引用
    private content:eui.Group;
    constructor(terrain_map) {
        super();
        this.stuffing();
        this.positing_self();
        this.Overspread();
    }
    public stuffing(jpg_name?:string){
        //装填内容
        if (!jpg_name){
            jpg_name = "bigrefmap_jpg";
        }
        this.content = new eui.Group();
        let big_img = new eui.Image(RES.getRes(jpg_name));  //一个用来参考的底图，其实不十分重要
        big_img.x = 0;big_img.y = 0;
        big_img.width = this.SIZE["mapjpg_width"];big_img.height = this.SIZE["mapjpg_height"];
        this.content.removeChildren();
        this.content.addChild(big_img);
        this.viewport = this.content;
    }
    private positing_self(){
        //给自己定位
        this.width = 1000;
        this.height = 600;
        this.x = 100;
        this.y = 100;
    }
    private Overspread(){   //用初始化的格子铺满全图
        var t_x:number;
        var t_y:number;
        var start_y = 0;
        for (var i = 0; i<this.SIZE["EW_grids"]; i+=1){
            t_x = i*this.SIZE["grid_r"]*1.5;
            if (i%2 == 0){  //逻辑横坐标为偶数
                start_y = 0;
            }else{  //逻辑横坐标为奇数
                start_y = Math.sqrt(3)/2 * this.SIZE["grid_r"];
            };
            for (var j = 0; j<this.SIZE["SN_grids"]; j+=1){
                t_y = start_y + Math.sqrt(3) * this.SIZE["grid_r"] * j;
                let a_grid = new HexagonGrid(i,j,t_x,t_y,this.SIZE["grid_r"],now_terrain_map[i][j]);
                this.content.addChild(a_grid);
            };
        };
    }
}