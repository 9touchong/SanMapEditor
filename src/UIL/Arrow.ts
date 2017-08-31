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
    private grids_index:Array<Array<HexagonGrid>>;  //箭头实际的工作就是指示格子变色，必须要有一个格子索引
    constructor(grids_index){
        super();
        this.grids_index = grids_index;
        let data = RES.getRes("arrow_json");
        let txtr = RES.getRes("arrow_png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.movieClipData = mcFactory.generateMovieClipData();

        this.scaleX = 0.5;  //这里只是示意一下，这种动画不能直接用width、height赋值来拉伸或挤压，这种scale缩放倒可以
        this.scaleX = 0.5;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height;

        this.gotoAndPlay(1,-1);
        this.set_xy();
        this.set_KeyboardListener();
        
    }
    private set_xy(){
        this.x = this.m_x * Default_Sizes.grid_r * 1.5;
        if (this.m_x % 2 == 0){ //逻辑横坐标为偶数
            this.y = Math.sqrt(3) * Default_Sizes.grid_r * this.m_y;
        }else{
            this.y = Math.sqrt(3)/2 * Default_Sizes.grid_r + Math.sqrt(3) * Default_Sizes.grid_r * this.m_y;
        }
    }
    private set_KeyboardListener(){
        /**
         * 键盘监听
         * egert2d没有自带成套键盘功能库，只能通过document。既然监听主体是document那么this的使用就不太一样了 要通过变量将自己传到回调函数中
         */
        let that = this;
        document.addEventListener("keydown",function(evt:KeyboardEvent){
            switch (evt.key){
                case "a":
                    that.move_left();
                    break;
                case "d":
                    that.move_right();
                    break;
                case "w":
                    that.move_up();
                    break;
                case "s":
                    that.move_down();
                    break;
                case " ":
                    //that.grids_index[that.m_x][that.m_y].change();
                    that.grids_index[that.m_x][that.m_y].dispatchEvent(new egret.TouchEvent("touchTap"));       //虽然不建议 但是这样可以发送触摸事件
                    break;
                default:
                    console.log("haha",evt.key);
                    return 0;
            };
        });
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