//二分搜索
function  binarySearchTargetIndex(source, target){
    if (!Array.isArray(source)) {
        return false;
    }
    return search(0,source.length-1,target);
    // 当前数据划分为一半，从左半边遍历，未得，则划分右半边，依次进行
    function search(rId, lId, val){
        let halfId = Math.floor((lId - rId) / 2);
        for(let i = rId; i <= halfId;i++) {
            if (source[i] === val) {
               return i ;
            } 
        }
        rId = halfId + 1;
        search(rId, lId, val);
    }
}

var arr = [1,2,3,4,1]
// console.log(binarySearchTargetIndex(arr,1))

// 冒泡排序
// 相邻元素两两对比
function bubbleSort(arr){
    var times = 0;
    var len = arr.length;
    for(var i = 0; i < len; i++){
        for(var j =0; j < len -1 -i; j++){
            if (arr[j] > arr[j + 1]) {
                var temp;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            times ++ ;
        }
    }
    console.log('运行次数',times)
    return arr;
}

//升级版
//跳过本来就有正确顺序得比较
function bubbleSort2(arr){
    var times = 0;
    var i = arr.length -1;
    while(i > 0) {
        var pos = 0;
        for ( var j = 0; j < i; j ++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                var temp;
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            times ++ ;
        }
        i = pos;
    }
    console.log('运行次数',times)
    return arr;
}
console.log(bubbleSort([1,3,2,2,1,4,5,6]))
console.log(bubbleSort2([1,3,2,2,1,4,5,6]))