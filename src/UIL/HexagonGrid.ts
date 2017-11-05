/**
 * 六边形网格,用位图表示
 * 这里有一个相当于全局变量的last_HexagonGrid，代表最近被点击的格子对象。为了在希望下一个格子与上一个相同类别时不用点击多次，类似于格式刷的弱化。这么处理也只是方便才作此选择，比较粗糙，而且这种工作放到逻辑层似乎更合理，只是处理起来麻烦，就这样了。
 */
var last_HexagonGrid:HexagonGrid;
class HexagonGrid extends egret.Bitmap{
    private m_x:number;
    private m_y:number;
    private px_x:number;
    private px_y:number;
    private px_r:number;
    public terrain:number; //表示地形类别的数字，数字是TerrainSymbols中的序号
    public building; //表示建筑信息的,可以为空。
    private de_alph:number = 0.4; //默认的alpha值
    private coords_bar:CoordsBar; //坐标显示栏
    private building_bar:BuildingBar;   //建筑信息栏
    constructor(m_x:number,m_y:number,x:number,y:number,radius:number = 50,terrain:number = 1,coords_bar,building_bar){
        super();
        this.px_x = x;this.px_y = y;this.px_r = radius;
        this.m_x = m_x;
        this.m_y = m_y;
        this.terrain = terrain;
        this.draw();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        this.coords_bar = coords_bar;
        this.building_bar = building_bar;
    }
    private draw(x:number = this.px_x,y:number = this.px_y,radius:number = this.px_r,texture:string = TerrainSymbols[this.terrain]["res_name"]){
        this.texture = RES.getRes(texture);
        let WH_bi = this.width/this.height; this.width = 2*radius; this.height = this.width/WH_bi;
        this.anchorOffsetX = this.width/2; this.anchorOffsetY = this.width/2;  
        this.x = x; this.y = y;
        this.alpha = this.de_alph;
    }
    public showORhide(){
        //单体切换显隐
        console.log("grid show hide");
        //this.alpha = (!this.alpha)?this.de_alph:0;
    }
    private onTap(e:egret.TouchEvent){
        if (Mode == "edit"){
            this.change();
        }
        this.coords_bar.set_text(this.m_x,this.m_y,TerrainSymbols[this.terrain]["label"]);
        this.building_bar.set_text(this.building);
        
    }
    public change(){
        if (this == last_HexagonGrid || !last_HexagonGrid){
            this.terrain = (this.terrain + 1) % TerrainSymbols.length;
            
        }else{
            this.terrain = last_HexagonGrid.terrain;
        };
        this.texture = RES.getRes(TerrainSymbols[this.terrain]["res_name"]);
        now_terrain_map[this.m_x][this.m_y] = this.terrain;
        last_HexagonGrid = this;
    }
    public set_building(building?){
        /**
         * 设置building属性并开启building显示
         */
        if (building){
            this.building = building;
        }
        if (!this.building){
            console.log("格子",this.m_x,this.m_y,"在无building属性有效值的情况下被要求开启building,请检查bug");
            return 0;
        }
        //改变外观
        this.texture = RES.getRes(BuildingSymbols[signalTOnum_B[typeTosign_B[this.building["type"]]]]["res_name"]);
    }
    public hide_building(){
        this.texture = RES.getRes(TerrainSymbols[this.terrain]["res_name"]);
    }
    public del_building(){
        this.hide_building();
        this.building = null;
    }
}