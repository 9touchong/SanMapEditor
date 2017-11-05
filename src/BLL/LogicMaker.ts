/**
 * 逻辑层的主程序
 */
class LogicMaker{
    public terrain_map:Array<Array<number>>;   //地形级map，二维数组，基本元素为数字
    private SIZE = Default_Sizes;
    constructor(){
        this.init_terrain_map();
        now_terrain_map = this.terrain_map;
        this.init_building();
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
    public tell(sth:string,value?:any){
        /**
         * 传送消息给表现层
         * sth:事物名称
         * value：要传的数据，可能是数字 数组 甚至对象
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
            this.update_Size();
            return true;
        }else{
            this.reset_terrain_map(EW,SN);
        };
    }
    private init_building(){
        /**
         * 初始化building
         */
        let t_buildings = this.read_building();
        if (!t_buildings){
            console.log("逻辑层初始建筑 读取建筑信息无果");
            return 0;
        }else{
            now_building = t_buildings;
        }
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
    private update_Size(){
        /**
         * 根据当前terrain_map情况更新SIZE
         * 一般只在读取地形文件之后进行
         */
        if (this.SIZE.EW_grids != this.terrain_map.length || this.SIZE.SN_grids != this.terrain_map[0].length){
            //说明SIZE内容与terrain_map实际情况不符了，要以map为准
            this.SIZE.EW_grids = this.terrain_map.length;
            this.SIZE.SN_grids = this.terrain_map[0].length;
            this.SIZE.set_SIZE("EW_grids",this.SIZE.EW_grids);
            if (this.SIZE.SN_grids != this.terrain_map[0].length){
                console.log("严重提醒：SIZE与terrain_map规格无法统一，比例不对，必须检查，建议更换terrain_map文件");
                return 0;
            }
        }
    }
    private save_terrain_map(){
        Write_terrain_map(this.terrain_map);
    }
    private read_terrain_map(){
        let t_map = Read_terrain_map();
        if (typeof(t_map) == "object"){
            //因为ts对类型的严格要求，之前terrain_map又确定了类型，不想改为any，这里就只能这样处理否则无法编译成功
            this.terrain_map = t_map;
        }
        else{
            return 0;
        }
    }
    private read_building(){
        let build = Read_building();
        return build;
    }
}