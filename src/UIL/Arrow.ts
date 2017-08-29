/**
 * 用于辅助指示的动画箭头
 */
class Arrow extends egret.MovieClip{
    constructor(){
        super();
        let data = RES.getRes("arrow_json");
        let txtr = RES.getRes("arrow_png");
        let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        this.movieClipData = mcFactory.generateMovieClipData();
        this.gotoAndPlay(1,-1);
    }
}