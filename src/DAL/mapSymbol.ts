/**
 * 地图标识，分为地形和建筑两大类
 * 分别是一个array
 * res_name是其对应的图片资源名；label是其名称标识
 * signal 是单字符标识，和两个Symbols中的序号是对应的。之所以要有这个标识是因为当地形类别超过十个时单用数字标识写入文件时就要写入更多字符，用单字符的省文件空间。
 * 标识signal比较乱世历史遗留问题，之前TerrainSymbols和BuildingSymbols是在一起的，并且已经做了一部分地图数据，就先保留原signal了。在下面提出的signalTOnum表中标好久行了。
 * 两个signalTOnum signal和其Symbols中的索引的反向对照表、
 */
var TerrainSymbols:Array<Object> = [
    {"signal":"0","label":"不可进入","res_name":"hexagon_white_png"},   //0,不可进入地形
    {"signal":"1","label":"一般地形","res_name":"hexagon_green_png"},   //1,普通的平地/草地
    {"signal":"2","label":"主径","res_name":"hexagon_orange_png"},   //2，主径
    {"signal":"3","label":"水","res_name":"hexagon_cyan_png"},   //3,水
    {"signal":"4","label":"森林","res_name":"hexagon_darkgreen_png"},   //4，森林
    {"signal":"9","label":"高地","res_name":"hexagon_blue_png"}, //9,高地
    {"signal":"a","label":"湿地","res_name":"hexagon_darkcyan_png"}, //10,湿地 浅水 水陆两兼
];
var BuildingSymbols:Array<Object> = [
    {"signal":"5","label":"城池","res_name":"hexagon_red_png"},   //5,城池地基中心， 城池可程度内损坏
    {"signal":"6","label":"城池","res_name":"hexagon_pink_png"},   //6,城池占地，中心周围的一圈，但现在暂时不用它，城池只用
    {"signal":"7","label":"关隘","res_name":"hexagon_purple_png"},   //7,关隘地基中心，但一般其相邻或南北或东西要有一对不可进入的地形 关隘可摧毁不会消失
    {"signal":"8","label":"城镇","res_name":"hexagon_yellow_png"},   //8,城镇
    {"signal":"b","label":"港口","res_name":"hexagon_huilv_png"} //11,港口
];
//var signalTOnum = {"0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"a":10,"b":11};
var signalTOnum_T:Object = {"0":0,"1":1,"2":2,"3":3,"4":4,"9":5,"a":6};
var signalTOnum_B = {"5":0,"6":1,"7":2,"8":3,"b":4};
var typeTosign_B = {"city":"5","gate":"7","harbor":"b"};//类别名称和单字符代表标识的对照
var now_terrain_map = new Array();
var now_building; //所有建筑的列表