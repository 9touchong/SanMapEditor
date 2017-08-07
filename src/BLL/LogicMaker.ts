/**
 * 逻辑层的主程序
 */
class LogicMaker{
    private terrain_map:Array<Array<number>>;   //地形级map，二维数组，基本元素为数字
    constructor(){
        this.init_terrain_map();
    }
    public hear_show(sth:string){
        /**
         * 处理表现层传来的要求
         */
        switch(sth){
            case "save_terrain":    //写入逻辑地形图文件
                this.save_terrain_map();
                break;
            default:
                console.log("逻辑层收到了无效的请求");
        }
    }
    private init_terrain_map(EW:number = 200,SN:number = 200){
        /**
         * 初始化terrain_map
         * EW，SN分别代表横纵方向的最大个数
         */
        this.terrain_map = new Array();
        for (let i = 0; i < EW; i++){
            this.terrain_map[i] = new Array();
            for (let j = 0; j < SN; j++){
                this.terrain_map[i][j] = 1; //这里初始值就设为1了
            }
        };
    }
    private save_terrain_map(){
        Write_terrain_map(this.terrain_map);
    }
}