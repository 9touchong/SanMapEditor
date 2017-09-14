/**
 * 本文件内是读取或写入各种地图文件的多个函数
 * 没有类
 * 其中要调用js脚本的方法
 * [注]那些js脚本在polyfill目录下
 */
declare function do_save_terrain_map(in_map:Array<Array<number>>,additional:string);
function Write_terrain_map(in_map:Array<Array<number>>){
    /**
     * 写入地形级地图文件
     * in_map 就是将要写入的数据 即terrain_map 一个数字为元素的二维数组
     * 这里还要生成附加信息
     */
    let city_arr = new Array();
    let guan_arr = new Array();
    let citadel_arr = new Array();
    let harbor_arr = new Array();
    for (let i = 0 ; i < in_map.length ; i++){
        for (let j = 0 ; j < in_map[0].length ; j++){
            let t = in_map[i][j];
            if (t == 5){
                city_arr.push(i+","+j);
            }else if (t == 7){
                guan_arr.push(i+","+j);
            }else if (t == 8){
                citadel_arr.push(i+","+j);
            }
        }
    };
    let additional:string = "";
    additional += city_arr.join(" ") + "\r\n";
    additional += guan_arr.join(" ") + "\r\n";
    additional += citadel_arr.join(" ") + "\r\n";
    additional += harbor_arr.join(" ");
    do_save_terrain_map(in_map,additional);
    console.log("it is Write_terrain_map function");
}
function Read_terrain_map(){
    /**
     * 读取地形级地图文件
     * 不接受参数 读固定文件
     * 读取成功 处理得到terrain_map 一个数字为元素的二维数组
     */
    let txt:string = RES.getRes("terrain_lmap");
    if (!txt){
        return 0;
    };
    let [size,content] = txt.split("\r\n");
    let [s_width,s_height] = size.split(",");let width = parseInt(s_width);let height = parseInt(s_height)
    let result = new Array();
    for (let i = 0; i < width; i++){
        result[i] = new Array();
        let t_arr:any = content.substr(i*height,height).split("");
        for (let s of t_arr){
            result[i].push(signalTOnum_T[s]);
            //t_arr[item] = parseInt(t_arr[item]);
        };
        //result[i] = t_arr;
    }
    return result;
}
function Read_building(){
    /**
     * 读取建筑信息
     * 目前的设定就是度一个格式正确的json文件
     * 之所以没有直接从一个同样形式的同时文件获取变量就是想尝试RES读取json的效果
     * 文件存储的是这种形式的{"city":[{"name":,...}...],"town"[...],...}
     * 在这里要为每一个建筑元素添加signal属性
     * 返回的是一个列表
     */
    let building = RES.getRes("Building_json");
    if (!building){
        return 0;
    }
    let result:Array<Object> = new Array();
    for (let t_city of building["city"]){
        t_city["signal"] = "5";
        result.push(t_city);
    };
    for (let t_town of building["town"]){
        t_town["signal"] = "8";
        result.push(t_town);
    };
    for (let t_gate of building["gate"]){
        t_gate["signal"] = "7";
        result.push(t_gate);
    };
    for (let t_harbor of building["harbor"]){
        t_harbor["signal"] = "b";
        result.push(t_harbor);
    };
    return result;
}