/**
 * 地形和数字符号的对照表
 * 一个array
 * color和pngname是其对应的颜色和图片资源名；label是其名称标识
 */
var TerrainSymbols:Array<Object> = [
    {"label":"不可进入","color":0x999999,"res_name":"hexagon_white_png"},   //0,不可进入地形
    {"label":"一般地形","color":0x101010,"res_name":"hexagon_green_png"},   //1,普通的平地/草地
    {"label":"主径","color":0xD6AC08,"res_name":"hexagon_orange_png"},   //2，主径
    {"label":"水","color":0x00DDDD,"res_name":"hexagon_cyan_png"},   //3,水
    {"label":"森林","color":0x369636,"res_name":"hexagon_darkgreen_png"},   //4，森林
    {"label":"城池","color":0xCC3370,"res_name":"hexagon_red_png"},   //5,城池地基中心， 城池可程度内损坏
    {"label":"城池","color":0xCC3370,"res_name":"hexagon_pink_png"},   //6,城池占地，中心周围的一圈
    {"label":"关隘","color":0xE492B3,"res_name":"hexagon_purple_png"},   //7,关隘地基中心，但一般其相邻或南北或东西要有一对不可进入的地形 关隘可摧毁不会消失
    {"label":"城塞","color":0xA4D3EE,"res_name":"hexagon_yellow_png"},   //8,城塞 用地  城塞一般处在主径或平地上 交通要道上 可被彻底摧毁消失
    {"label":"城塞","color":0xA4D3EE,"res_name":"hexagon_blue_png"} //9,高地
];
var now_terrain_map = new Array();