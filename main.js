// import {deepClone} from './tool';

// 地图长宽
const mapSize = {
    width: 15,
    height: 20
}
// 格子大小
let size = "28px";
// 分数
let score = 0;
// 时钟
let clock = null;
// 时钟周期
let period = 200;
// 游戏开始标志
let gamestart_flag = false;

let headerHeight = "50px";
let wrapper = document.getElementsByClassName("wrapper")[0];
let leftArea = document.getElementsByClassName("left")[0];
let rightArea = document.getElementsByClassName("right")[0];
let header = document.getElementsByClassName("header")[0];
let ul_map = document.createElement("ul");
let next_shape = document.getElementsByClassName("next-shape")[0];
let ul_next = document.createElement("ul");
let score_container = document.getElementsByClassName("get-score")[0];
let n = mapSize.width * mapSize.height;

// 地图
let map_li = [];
let map = [];
let shape = [];             // 形状
let index = [];             // 形状起始位置：(行，列)

//方块
let color1 = "#f00";        // 方块颜色
let color2 = "#f0f";        // 方块颜色
let backColor = "#fff";     // 方块背景颜色
let nextShape = 0;          // 下一个方块形状
let shape_li = [];
let shapeSet = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]
]

header.style.height = headerHeight;
header.style.lineHeight = headerHeight;
wrapper.style.width = 300 + (mapSize.width * parseInt(size)) + "px";
wrapper.style.height = parseInt(headerHeight) + (mapSize.height * parseInt(size))+ "px";
leftArea.style.width = (mapSize.width * parseInt(size)) + "px";
leftArea.style.height = (mapSize.height * parseInt(size)) + "px";
leftArea.appendChild(ul_map);
rightArea.style.width = "300px";
rightArea.style.height = (mapSize.height * parseInt(size)) + "px";
ul_next.style.width = (4 * parseInt(size)) + "px";
ul_next.style.height = (4 * parseInt(size)) + "px";
next_shape.appendChild(ul_next);
for(let i = 0; i < mapSize.height; i ++){          //创建地图
    map_li[i] = new Array(mapSize.width);
    map[i] = new Array(mapSize.width);
    for(let j = 0; j < mapSize.width; j ++){
        map_li[i][j] = document.createElement('li');
        map[i][j] = false;
        map_li[i][j].style.width = size;
        map_li[i][j].style.height = size;
        ul_map.appendChild(map_li[i][j])
    }
}
for(let i = 0; i < 4; i ++){         //创建下一个形状
    shape_li[i] = new Array(4);
    for(let j = 0; j < 4; j ++){
        shape_li[i][j] = document.createElement('li');
        shape_li[i][j].style.width = size;
        shape_li[i][j].style.height = size;
        ul_next.appendChild(shape_li[i][j])
    }
}

// 键盘监听
document.addEventListener("keydown", function(e){
    if(e.keyCode == 37 && gamestart_flag){     // 左
        if(judgeLeft()){
            return;

        }else{
            clearPaintShape();
            index[1] --;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 39 && gamestart_flag){     // 右
        if(judgeRight()){
            return;
        }else{
            clearPaintShape();
            index[1] ++;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 40 && gamestart_flag){     // 下
        if(judgeDown()){
            for(let i = 0; i < shape.length; i ++){
                for(let j = 0; j < shape[i].length; j ++){
                    if(shape[i][j]){
                        map[index[0] + i][index[1] + j] = true;
                        map_li[index[0] + i][index[1] + j].style.backgroundColor = color2;
                    }
                }
            }
            createShape();
            judgeClear();
            return;
        }else{
            clearPaintShape();
            index[0] ++;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 84 && gamestart_flag){     // 旋转
        console.log("旋转")
        clearPaintShape();
        shape = rotateShape(shape);
        paintShape();
    }
    if(e.keyCode == 13){     // 回车键开始
        if(!gamestart_flag){
            createFirstShape();
            clock = setInterval(move, period);
            gamestart_flag = true;
        }
    }
}, false);