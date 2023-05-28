//深拷贝
function deepClone(arr){
    let temp = [];
    for(let i = 0; i < arr.length; i ++)
        temp[i] = arr[i].concat();
    return temp;
}

// 获取得分
function getScore(s = 1){
    score += s;
    score_container.innerText = score;
}