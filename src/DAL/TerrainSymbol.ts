/**
 * 地形和数字符号的对照表
 * 一个array
 * 格子类用它获得地形对应戴白哦颜色
 */
var TerrainSymbols:Array<Object> = [
    {"label":"不可进入","color":0x999999},   //0,不可进入地形
    {"label":"一般地形","color":0x101010},   //1,普通的平地
    {"label":"主径","color":0xD6AC08},   //2，主径
    {"label":"水","color":0x00DDDD},   //3,水
    {"label":"森林","color":0x369636},   //4，森林
    {"label":"城池","color":0xCC3370},   //5,城池地基和城池扩建用地 城池可程度内损坏
    {"label":"关隘","color":0xE492B3},   //6,关隘 地基  关隘可摧毁不会消失
    {"label":"城塞","color":0xA4D3EE},   //7,城塞 用地  城塞一般处在主径或平地上 交通要道上 可被彻底摧毁消失
]