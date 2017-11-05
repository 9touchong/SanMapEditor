/**
 * 操作地图图片，编辑网格的区域。也是主工作区
 * 一个可滚动的容器
 */
var building_show:boolean = true;
class MapContainer extends eui.Scroller{
    private SIZE:Object = Default_Sizes;    //规格,与逻辑层的同名属性来自相同引用
    private content:eui.Group;
    private grids_layer = new egret.DisplayObjectContainer; //所有格子所在的容器
    private grids_index :Array<Array<any>>; //格子索引列表
    private building_show:boolean = true;  //当前建筑是否显示
    private father;
    constructor(father) {
        super();
        this.father = father;
        this.stuffing();
        this.positing_self();
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
        this.Overspread();
        let arrow = new Arrow(this.grids_index);
        this.content.addChild(arrow);
        this.viewport = this.content;
    }
    private positing_self(){
        //给自己定位
        this.width = 1800;
        this.height = 840;
        this.x = 120;
        this.y = 60;
    }
    private Overspread(){   //用初始化的格子铺满全图
        this.content.addChild(this.grids_layer);
        var t_x:number;
        var t_y:number;
        var start_y = 0;
        this.grids_index = new Array();
        for (var i = 0; i<this.SIZE["EW_grids"]; i+=1){
            this.grids_index[i] = new Array();
            t_x = i*this.SIZE["grid_r"]*1.5;
            if (i%2 == 0){  //逻辑横坐标为偶数
                start_y = 0;
            }else{  //逻辑横坐标为奇数
                start_y = Math.sqrt(3)/2 * this.SIZE["grid_r"];
            };
            for (var j = 0; j<this.SIZE["SN_grids"]; j+=1){
                t_y = start_y + Math.sqrt(3) * this.SIZE["grid_r"] * j;
                let a_grid = new HexagonGrid(i,j,t_x,t_y,this.SIZE["grid_r"],now_terrain_map[i][j],this.father.coords_bar,this.father.building_bar);
                this.grids_layer.addChild(a_grid);
                this.grids_index[i][j] = a_grid;
            };
        };
        //处理建筑格子
        for (let t_building of now_building){
            this.grids_index[t_building["Lpos"]["x"]][t_building["Lpos"]["y"]].set_building(t_building);
        }
    }
    public showORhide(type:string){
        //显隐切换
        if (type == "T"){   //地形显隐
            this.grids_layer.visible = (this.grids_layer.visible)?false:true;
        }else{  //"B"建筑现隐
            this.building_show = (this.building_show)?false:true;
            building_show = this.building_show;
            if (this.building_show){
                for (let t_building of now_building){
                    this.grids_index[t_building["Lpos"]["x"]][t_building["Lpos"]["y"]].set_building();
                };
            }else{
                for (let t_building of now_building){
                    this.grids_index[t_building["Lpos"]["x"]][t_building["Lpos"]["y"]].hide_building();
                };
            }
        }
    }
    public update_building(){
        /**
         * 目前因为无法找到合适的方法实时的读取文件资源，这里也只能异步，那再在数据层实现在这调用就有些麻烦了,就在这读文件了
         */
        for (let t_building of now_building){
            this.grids_index[t_building["Lpos"]["x"]][t_building["Lpos"]["y"]].del_building();
        };
        RES.destroyRes("resource/for_map/Building.json");
        RES.getResByUrl("resource/for_map/Building.json",function(buildings:any){
            if (!buildings){
                return null;
            }
            now_building = buildings["all"];
            for (let t_building of now_building){
                this.grids_index[t_building["Lpos"]["x"]][t_building["Lpos"]["y"]].set_building(t_building);
            };
        },this,RES.ResourceItem.TYPE_JSON);
        
    }
}