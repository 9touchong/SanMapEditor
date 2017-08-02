/**
 * 六边形网格单元
 * 目前就用正的六边形，但以后看情况可能更换
 */
class HexagonGrid extends egret.Shape{
    private m_x:number;
    private m_y:number;
    private px_x:number;
    private px_y:number;
    private px_r:number;
    private terrain:number; //表示地形类别的数字
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
    private draw(x:number = this.px_x,y:number = this.px_y,radius:number = this.px_r,t_color:number = TerrainSymbols[this.terrain]["color"]){
        /**
         * x,y是相当于中心的位置
         * radius 就是半径，因为现在就用正的六边形
         */
        this.graphics.clear();
        this.graphics.lineStyle( 1, 0x888888 );
        this.graphics.beginFill( t_color, 0.5);
        this.graphics.moveTo(x-radius,y);
        this.graphics.lineTo(x-radius/2, y-Math.sqrt(3)/2*radius);
        this.graphics.lineTo(x+radius/2, y-Math.sqrt(3)/2*radius );
        this.graphics.lineTo(x+radius,y);
        this.graphics.lineTo(x+radius/2, y+Math.sqrt(3)/2*radius );
        this.graphics.lineTo(x-radius/2, y+Math.sqrt(3)/2*radius);
        this.graphics.lineTo(x-radius,y);
        this.graphics.endFill();
    }
    private onTap(e:egret.TouchEvent){
        this.terrain = (this.terrain + 1) % TerrainSymbols.length;
        this.draw();
    }
}