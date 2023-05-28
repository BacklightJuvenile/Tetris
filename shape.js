// 初始化方块坐标
function initIndex(index){
    index = [0, parseInt(mapSize.width / 2) - 2];
    return index;
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
                    map_li[index[0] + i][index[1] + j].style.backgroundColor = color2;
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

// 初始化创建第一个随机形状的俄罗斯方块
let createFirstShape = () => {    // index
    index = initIndex();
    let random = parseInt(Math.random() * 7);
    shape = shapeSet[random];
    paintShape();

    nextShape = parseInt(Math.random() * 7);
    clearShowNextShape();
    showNextShape();
    console.log("创建一个方块:", random, nextShape);
}

// 创建随机形状的俄罗斯方块
let createShape = () => {    // index
    index = initIndex();
    shape = shapeSet[nextShape];
    paintShape();
    if(judgeDown()){    // 创建就遇到障碍，游戏结束
        if(clock){
            console.log("游戏结束");
            gamestart_flag = false;
            clearInterval(clock);
            clock = null;
        }
        return;
    }
    getScore();
    random = nextShape;
    nextShape = parseInt(Math.random() * 7);
    // nextShape = 7
    clearShowNextShape();
    showNextShape();
    console.log("创建一个方块:", random, nextShape);
}

// 90度旋转方块
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

// 画出俄罗斯方块
let paintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                map_li[index[0] + i][index[1] + j].style.backgroundColor = color1;
            }
        }
    }
}

// 清除画出的俄罗斯方块
let clearPaintShape = () => {
    for(let i = 0; i < shape.length; i ++){
        for(let j = 0; j < shape[i].length; j ++){
            if(shape[i][j]){
                map_li[index[0] + i][index[1] + j].style.backgroundColor = backColor;
            }
        }
    }
}

// 展示下一个方块
function showNextShape(){
    let temp_shape = shapeSet[nextShape];
    for(let i = 0; i < temp_shape.length; i ++){
        for(let j = 0; j < temp_shape[i].length; j ++){
            if(temp_shape[i][j]){
                shape_li[i][j].style.backgroundColor = color2;
            }
        }
    }
}

// 清除展示下一个方块
function clearShowNextShape(){
    for(let i = 0; i < 4; i ++){
        for(let j = 0; j < 4; j ++){
            shape_li[i][j].style.backgroundColor = "chocolate";
        }
    }
}