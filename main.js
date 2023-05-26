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
let shape = [];                         // 形状
let index = [0, parseInt(mapSize.width / 2) - 2];     // 形状起始位置：(行，列)
let color = "#f00";                     // 方块颜色
let backColor = "#fff";

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
createShape_O = () => {
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
    let random = parseInt(Math.random() * 7);
    random = 0;
    switch(random){
        case 0:
            createShape_O();
        break;
        default:
            createShape();
        break;
    }
    paintShape();
}
createShape();


// 方块移动
move = () => {
    // 先判断是否还能动
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){     //形状有效位置
                row = index[0] + 1 + i;
                col = index[1] + j;
                if(row >= mapSize.height || map[row][col]){    // 是否碰到下面的已存在的形状 
                    console.log("stop")
                    clearInterval(clock);
                    clock = null;
                    return;
                }    
            }
        }
    }
    //如果能动，就动
    clearPaintShape();
    console.log(index[0])
    index[0] = index[0] + 1;
    paintShape();
}
clock = setInterval(move, period);