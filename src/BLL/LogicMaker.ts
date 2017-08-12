/**
 * 逻辑层的主程序
 */
class LogicMaker{
    public terrain_map:Array<Array<number>>;   //地形级map，二维数组，基本元素为数字
    private SIZE = Default_Sizes;
    constructor(){
        this.init_terrain_map();
    }
    public hear(sth:string){
        /**
         * 处理表现层传来的要求
         */
        switch(sth){
            case "save_terrain":    //写入逻辑地形图文件
                this.save_terrain_map();
                break;
            default:
                console.log("逻辑层收到了无效的请求");
        };
    }
    public tell(sth:string){
        /**
         * 传送消息给表现层
         */
    }
    private init_terrain_map(EW:number = this.SIZE.EW_grids,SN:number = this.SIZE.SN_grids){
        /**
         * 初始化terrain_map
         * EW，SN分别代表横纵方向的最大个数
         * 先读取默认地图文件 如果没结果 就采用重置的方式
         */
        this.read_terrain_map();
        if (this.terrain_map){
            return true;
        }else{
            this.reset_terrain_map(EW,SN);
        };
    }
    private reset_terrain_map(EW:number = this.SIZE.EW_grids,SN:number = this.SIZE.SN_grids){
        /**
         * 重置 terrain_map
         */
        this.terrain_map = new Array();
        for (let i = 0; i < EW; i++){
            this.terrain_map[i] = new Array();
            for (let j = 0; j < SN; j++){
                this.terrain_map[i][j] = 1; //这里初始值就设为1了
            };
        };
    }
    private save_terrain_map(){
        Write_terrain_map(this.terrain_map);
    }
    private read_terrain_map(){
        let t_map = Read_terrain_map();
        if (t_map){
            this.terrain_map = t_map;
        }
        else{
            return 0;
        }
    }
}