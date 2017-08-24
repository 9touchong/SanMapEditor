/**
 * 六边形网格,用位图表示
 */
var last_HexagonGrid:HexagonGrid;
class HexagonGrid extends egret.Bitmap{
    private m_x:number;
    private m_y:number;
    private px_x:number;
    private px_y:number;
    private px_r:number;
    public terrain:number; //表示地形类别的数字
    constructor(m_x:number,m_y:number,x:number,y:number,radius:number = 50,terrain:number = 1){
        super();
        this.px_x = x;this.px_y = y;this.px_r = radius;
        this.m_x = m_x;
        this.m_y = m_y;
        this.terrain = terrain;
        this.draw();
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
    }
    private draw(x:number = this.px_x,y:number = this.px_y,radius:number = this.px_r,texture:string = TerrainSymbols[this.terrain]["res_name"]){
        this.texture = RES.getRes(texture);
        let WH_bi = this.width/this.height; this.width = 2*radius; this.height = this.width/WH_bi;
        this.anchorOffsetX = this.width/2; this.anchorOffsetY = this.width/2;  
        this.x = x; this.y = y;
        this.alpha = 0.5;
    }
    private onTap(e:egret.TouchEvent){
        if (this == last_HexagonGrid || !last_HexagonGrid){
            this.terrain = (this.terrain + 1) % TerrainSymbols.length;
            
        }else{
            this.terrain = last_HexagonGrid.terrain;
        };
        this.texture = RES.getRes(TerrainSymbols[this.terrain]["res_name"]);
        now_terrain_map[this.m_x][this.m_y] = this.terrain;
        last_HexagonGrid = this;
    }
}