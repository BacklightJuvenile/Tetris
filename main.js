/*

1 1       1 1 0          0 1 1         0 1 0        0 1 0         0 1 0         0 1 0 0
1 1       0 1 1          1 1 0         0 1 0        0 1 0         1 1 1         0 1 0 0
          0 0 0          0 0 0         1 1 0        0 1 1         0 0 0         0 1 0 0
                                                                                0 1 0 0
*/

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

let headerHeight = "50px";
let wrapper = document.getElementsByClassName("wrapper")[0];
let leftArea = document.getElementsByClassName("left")[0];
let rightArea = document.getElementsByClassName("right")[0];
let header = document.getElementsByClassName("header")[0];
let ul = document.createElement("ul");
let n = mapSize.width * mapSize.height;

// 地图
let li = [];
let map = [];
let shape = [];             // 形状
let index = [];             // 形状起始位置：(行，列)

//方块
let color = "#f00";         // 方块颜色
let backColor = "#fff";
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
rightArea.style.width = "300px";
rightArea.style.height = (mapSize.height * parseInt(size)) + "px";
leftArea.appendChild(ul);
for(let i = 0; i < mapSize.height; i ++){
    li[i] = new Array(mapSize.width);
    map[i] = new Array(mapSize.width);
    for(let j = 0; j < mapSize.width; j ++){
        li[i][j] = document.createElement('li');
        map[i][j] = false;
        li[i][j].style.fontSize = "2px";
        li[i][j].innerText = (i + "-" + j);
        li[i][j].style.width = size;
        li[i][j].style.height = size;
        ul.appendChild(li[i][j])
    }
}

// 创建方块
initIndex = () => {
    index = [0, parseInt(mapSize.width / 2) - 2];
}
createShape_0 = () => {
    shape = [
        [1, 1],
        [1, 1]
    ]
}
paintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                li[index[0] + i][index[1] + j].style.backgroundColor = color;
            }
        }
    }
}
clearPaintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                li[index[0] + i][index[1] + j].style.backgroundColor = backColor;
            }
        }
    }
}
createShape = () => {    // index
    console.log("创建一个方块")
    initIndex();
    let random = parseInt(Math.random() * 7);
    shape = shapeSet[random];
    paintShape();
}
createShape();

judgeDown = () => {
    // 先判断是否还能动
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + i + 1;
                col = index[1] + j;
                if(row > mapSize.height - 1 || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stopDown")
                    return true;
                } 
            }
        }
    }
    return false;
}
judgeLeft = () => {
    // 先判断是否还能动
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + i;
                col = index[1] + j - 1;
                if(col < 0 || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stopLeft")
                    return true;
                }
            }
        }
    }
    return false;
}
judgeRight = () => {
    // 先判断是否还能动
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + i;
                col = index[1] + j + 1;
                if(col > mapSize.width - 1 || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stopRight")
                    return true;
                }    
            }
        }
    }
    return false;
}

// 方块移动
move = () => {
    console.log(index[0], index[1]);
    // 先判断下方是否有障碍物
    if(judgeDown()){    // 有
        for(let i = 0; i < shape.length; i ++){
            for(let j = 0; j < shape[i].length; j ++){
                if(shape[i][j]){
                    map[index[0] + i][index[1] + j] = true;
                    li[index[0] + i][index[1] + j].style.backgroundColor = "#ff0";
                }
            }
        }
        createShape();
        return;
    }
    //如果能动，就动
    clearPaintShape();
    index[0] = index[0] + 1;
    paintShape();
}
clock = setInterval(move, period);

// 旋转
function rotateShape() {
    let tR = 0;
    let tC = 0;
    let dR = shape.length - 1;
    let dC = shape[0].length - 1;
    while(tR < dR) {
        rotateEdge(tR++, tC++, dR--, dC--);
    }
}
 
function rotateEdge(tR, tC, dR, dC) {
    let times = dC - tC;
    let temp = 0;
    for (let i = 0; i !== times; i++) {
        temp = shape[tR][tC + i];
        shape[tR][tC+i] = shape[dR-i][tC];
        shape[dR-i][tC] = shape[dR][dC-i];
        shape[dR][dC-i] = shape[tR+i][dC];
        shape[tR+i][dC] = temp;
    }
}

// 键盘监听
document.addEventListener("keydown", function(e){
    // console.log(e)
    if(e.keyCode == 37){     // 左
        if(judgeLeft()){
            return;
        }else{
            clearPaintShape();
            index[1] --;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 39){     // 右
        if(judgeRight()){
            return;
        }else{
            clearPaintShape();
            index[1] ++;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 40){     // 下
        if(judgeDown()){
            for(let i = 0; i < shape.length; i ++){
                for(let j = 0; j < shape[i].length; j ++){
                    if(shape[i][j]){
                        map[index[0] + i][index[1] + j] = true;
                        li[index[0] + i][index[1] + j].style.backgroundColor = "#ff0";
                    }
                }
            }
            createShape();
            return;
        }else{
            clearPaintShape();
            index[0] ++;
            paintShape();
        }
        return;
    }
    if(e.keyCode == 84){     // 旋转
        console.log("旋转")
        clearPaintShape();
        rotateShape();
        paintShape();
    }
}, false);