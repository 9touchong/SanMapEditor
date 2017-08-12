/**
 * 一些规格数据和默认变量
 * 因为逻辑层和UI层都可能会用到，就集中到这里，以便更改
 * 这里的变量主要是初始化的时候用，不一定是最后的数据，仅供参考
 * 为了便于管理 还是通过建立一个规格数据管控类 SizeKeeper 并直接实例化 这样的方式
 */
class SizeKeeper{
    public mapjpg_width: number;    //底层作为基础参考的map图片的规格之宽度 单位px
    public mapjpg_height: number;
    public EW_grids: number;    //横向即东西向的格子的数目
    public SN_grids: number;
    public grid_r: number;  //格子的半径
    constructor(){
        this.mapjpg_width = 4000;
        this.mapjpg_height = 3000;
        this.set_SIZE("EW_grids",200);
        console.log("sizekeeper 报告 mapjpg_width",this.mapjpg_width,"mapjpg_height",this.mapjpg_height,"EW_grids",this.EW_grids,"SN_grids",this.SN_grids,"grid_r",this.grid_r);
    }
    public set_SIZE(item_name:string,item_value:number){
        /**
         * 用来初始化或中间调整规格数据
         * 两个必须已知确定的属性 mapjpg_width mapjpg_height
         * 三个至少要已知确定一个的 EW_grids,SN_grids,grid_r 但因为格子规定是正六边形，只能变大变小不能随意拉伸宽高比 所以这三个如果先确定了多余两个就有可能被迫要牺牲某个或两个不得不做出改变
         * 所以这里处理的比较简明 接受参数：
         * item_name 字符串 EW_grids或SN_grids或grid_r中的一个
         * item_value 新的值
         * 结果为所有其他项赋新值
         */
        if (!this.mapjpg_width || !this.mapjpg_height){
            console.log("SizeKeeper中任何时候不能在mapjpg_width或mapjpg_height缺失情况下更新值");
            return 0;
        };
        switch(item_name){
            case "EW_grids":
                this.EW_grids = item_value;
                this.grid_r = this.mapjpg_width/((this.EW_grids-1)*1.5);
                this.SN_grids = Math.floor(this.mapjpg_height/(Math.sqrt(3)*this.grid_r))+1;
                break;
            default:
                return 0;
        };
    }
}
var Default_Sizes = new SizeKeeper();