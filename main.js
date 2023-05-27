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
let color = "#f00";         // 方块颜色
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

// 展示下一个方块
function showNextShape(){
    let temp_shape = shapeSet[nextShape];
    for(let i = 0; i < temp_shape.length; i ++){
        for(let j = 0; j < temp_shape[i].length; j ++){
            if(temp_shape[i][j]){
                shape_li[i][j].style.backgroundColor = "#ff0";
            }
        }
    }
}
function clearShowNextShape(){
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 4; j ++){
            shape_li[i][j].style.backgroundColor = "chocolate";
        }
    }
}

// 获取得分
function getScore(s = 1){
    score += s;
    score_container.innerText = score;
}

// 创建方块
let initIndex = () => {
    index = [0, parseInt(mapSize.width / 2) - 2];
}
let paintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                map_li[index[0] + i][index[1] + j].style.backgroundColor = color;
            }
        }
    }
}
let clearPaintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                map_li[index[0] + i][index[1] + j].style.backgroundColor = backColor;
            }
        }
    }
}
let startGame = () => {    // index
    initIndex();
    let random = parseInt(Math.random() * 7);
    shape = shapeSet[random];
    paintShape();

    nextShape = parseInt(Math.random() * 7);
    clearShowNextShape();
    showNextShape();
    console.log("创建一个方块:", random, nextShape)
}
let createShape = () => {    // index
    initIndex();
    shape = shapeSet[nextShape];
    paintShape();
    if(judgeDown()){
        clearInterval(clock);
        clock = null;
        return
    }
    getScore();
    random = nextShape;
    nextShape = parseInt(Math.random() * 7);
    // nextShape = 7
    clearShowNextShape();
    showNextShape();
    console.log("创建一个方块:", random, nextShape)
}

// 判断是否消去
function judgeClear(){
    let i, j, flag = false;
    for(i = mapSize.height - 1; i >= 0; i --){
        for(j = 0; j < mapSize.width; j ++){
            if(map[i][j]){
                continue;
            }else{
                break;
            }
        }
        if(j >= mapSize.width){
            //消除
            for(let m = 0; m < mapSize.width; m ++){
                map[i][m] = false;
                map_li[i][m].style.backgroundColor = backColor;
            }
            flag = true;
            for(let m = i; m > 0; m --){
                for(let n = 0; n < mapSize.width; n ++){
                    map[m][n] = map[m - 1][n];
                    map_li[m][n].style.backgroundColor = map_li[m - 1][n].style.backgroundColor;
                }
            }
        }
    }
    return flag;
}

// 判断障碍物
function judgeDown(){
    // 先判断是否还能动
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + i + 1;
                col = index[1] + j;
                if(row > mapSize.height - 1 || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stopDown");
                    return true;
                } 
            }
        }
    }
    return false;
}
function judgeLeft(){
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
function judgeRight(){
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
function judgeRotate(shape){
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + i;
                col = index[1] + j;
                if(row > mapSize.height - 1 || row < 0 || col > mapSize.width - 1 || col < 0 || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stopRotate")
                    return true;
                }    
            }
        }
    }
    return false;
}

// 方块移动
function move(){
    // console.log(index[0], index[1]);
    // 先判断下方是否有障碍物
    if(judgeDown()){    // 有
        for(let i = 0; i < shape.length; i ++){
            for(let j = 0; j < shape[i].length; j ++){
                if(shape[i][j]){
                    map[index[0] + i][index[1] + j] = true;
                    map_li[index[0] + i][index[1] + j].style.backgroundColor = "#ff0";
                }
            }
        }
        createShape();
        judgeClear();
        return;
    }
    //如果能动，就动
    clearPaintShape();
    index[0] = index[0] + 1;
    paintShape();
}
clock = setInterval(move, period);

// 旋转方块
function deepClone(shape){
    let temp = [];
    for(let i = 0; i < shape.length; i ++)
        temp[i] = shape[i].concat();
    return temp;
}
function rotateShape(shape) {
    let temp = deepClone(shape);
    let tR = 0;
    let tC = 0;
    let dR = shape.length - 1;
    let dC = shape[0].length - 1;
    while(tR < dR) {
        rotateEdge(shape, tR++, tC++, dR--, dC--);
    }
    if(judgeRotate(shape)){     //转后有障碍物，则回退到原来的样子
        shape = temp;
    }
    return shape;
}
function rotateEdge(shape, tR, tC, dR, dC) {
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
                        map_li[index[0] + i][index[1] + j].style.backgroundColor = "#ff0";
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
    if(e.keyCode == 84){     // 旋转
        console.log("旋转")
        clearPaintShape();
        shape = rotateShape(shape);
        paintShape();
    }
    if(e.keyCode == 13){
        startGame();
    }
}, false);