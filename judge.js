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
            getScore(10);
        }
    }
    return flag;
}

// 判断下方是否有障碍物
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

// 判断左边是否有障碍物
function judgeLeft(){
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

// 判断右边是否有障碍物
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


// 判断旋转是否会遇到障碍物
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
