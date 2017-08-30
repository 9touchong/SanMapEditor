/**
 * 用于辅助指示的动画箭头
 */
class Arrow extends egret.MovieClip{
    private m_x:number = 0;
    private m_y:number = 0;
    private max_m_x:number = Default_Sizes.EW_grids;
    private max_m_y:number = Default_Sizes.SN_grids;
    private min_m_x:number = 0;
    private min_m_y:number = 0;
    constructor(){
        super();
        let data = RES.getRes("arrow_json");
        let txtr = RES.getRes("arrow_png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.movieClipData = mcFactory.generateMovieClipData();
        this.gotoAndPlay(1,-1);
        this.set_xy();
        //键盘怎么监听？
    }
    private set_xy(){
        this.x = this.m_x * Default_Sizes.grid_r * 1.5;
        if (this.m_x % 2 == 0){ //逻辑横坐标为偶数
            this.y = Math.sqrt(3) * Default_Sizes.grid_r * this.m_y;
        }else{
            this.y = Math.sqrt(3)/2 * Default_Sizes.grid_r + Math.sqrt(3) * Default_Sizes.grid_r * this.m_y;
        }
    }
    private move_up(){
        this.m_y -= 1;
        if (this.m_y < this.min_m_y){
            this.m_y = this.min_m_y;
        }
        this.set_xy();
    }
    private move_down(){
        this.m_y += 1;
        if (this.m_y > this.max_m_y){
            this.m_y = this.max_m_y;
        }
        this.set_xy();
    }
    private move_left(){
        this.m_x -= 1;
        if (this.m_x < this.min_m_x){
            this.m_x = this.min_m_x;
        }
        this.set_xy();
    }
    private move_right(){
        this.m_x += 1;
        if (this.m_x > this.max_m_x){
            this.m_x = this.max_m_x;
        }
        this.set_xy();
    }
}