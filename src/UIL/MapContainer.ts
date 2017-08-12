/**
 * 操作地图图片，编辑网格的区域。也是主工作区
 * 一个可滚动的容器
 */
class MapContainer extends eui.Scroller{
    private SIZE:Object = Default_Sizes;    //规格,与逻辑层的同名属性来自相同引用
    private content:eui.Group;
    constructor() {
        super();
        this.set_SIZE();
        this.stuffing();
        this.positing_self();
        this.Overspread();
    }
    private set_SIZE(){
        /**
         * 设置规格参数 包括map图大小，格子数(也代表逻辑地图的大小)，格子大小等。
         * 如果以后有机会优化细化的话，这里的功能应该是可以随输入随时更改的，后话
         * 除了底图大小也即视窗大小是确定的，其他的先确定格子数量（确定一个方向的即可，因为目前格子是正的，即固定宽高比）再确定格子大小或反之都是可以得，
         */
        this.SIZE = {"mapjpg_width":2000,"mapjpg_height":2000};
        this.SIZE["EW_grids"] = 50;
        this.SIZE["grid_r"] = this.SIZE["mapjpg_width"]/((this.SIZE["EW_grids"]-1)*1.5);
        this.SIZE["SN_grids"] = Math.floor(this.SIZE["mapjpg_height"]/(Math.sqrt(3)*this.SIZE["grid_r"]))+1;
        console.log("EW_grids",this.SIZE["EW_grids"],"SN_grids",this.SIZE["SN_grids"],"grid_r",this.SIZE["grid_r"]);
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
        this.width = 600;
        this.height = 600;
        this.x = 200;
        this.y = 200;
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
                let a_grid = new HexagonGrid(i,j,t_x,t_y,this.SIZE["grid_r"]);
                this.content.addChild(a_grid);
            };
        };
    }
}