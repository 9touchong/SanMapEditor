/**
 * 本文件内是读取或写入各种地图文件的多个函数
 * 没有类
 * 其中要调用js脚本的方法
 * [注]那些js脚本在polyfill目录下
 */
declare function do_save_terrain_map(in_map:Array<Array<number>>);
function Write_terrain_map(in_map:Array<Array<number>>){
    /**
     * 写入地形级地图文件
     * in_map 就是将要写入的数据 即terrain_map 一个数字为元素的二维数组
     */
    do_save_terrain_map(in_map);
    console.log("it is Write_terrain_map function");
}
function Read_terrain_map(){
    /**
     * 读取地形级地图文件
     * 不接受参数 读固定文件
     * 读取成功 处理得到terrain_map 一个数字为元素的二维数组
     */
    console.log("it is in Read_terrain_map");
    let txt:string = RES.getRes("terrain_lmap");
    let [size,content] = txt.split("\r\n");
    let [s_width,s_height] = size.split(",");let width = parseInt(s_width);let height = parseInt(s_height)
    let result = new Array();
    for (let i = 0; i < width; i++){
        result[i] = new Array();
        let t_arr:any = content.substr(i*height,height).split("");
        for (let item in t_arr){t_arr[item] = parseInt(t_arr[item])};
        result[i] = t_arr;
    }
    return result;
}