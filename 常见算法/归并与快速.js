// 快速排序
// 假定一个基数,然后左右的数一个个与之比较，得到新基数，这个
//基数能保证其左边的数都比它小，右边的数都比它打。然后以此基数为
// 分界线，左边的数与右边的数形成单独的数组，继续上轮循环，直到最后形成的
//左右数组的元素最有一个。由于左边的数组元素总是比右边的小，排序最后就会形成

function quickSort(arr,left,right){
    //返回条件，数据为单个元素
    if (left < right) {
        //找基数
        let virtualBase = arr[right]; //假定基数
        var baseIndex = left - 1; //用来得到真基数
        var temp;
        //循环比较
        for (var j = left; j <= right; j++) {
            if (arr[j] <= virtualBase) {
                baseIndex ++; //这里baseIndex必须先加,因为要紧跟left
                temp = arr[baseIndex];
                arr[baseIndex] = arr[j];
                arr[j] = temp;
            }
        }
        quickSort(arr,left,baseIndex - 1);//对基数左边数组排序
        quickSort(arr,baseIndex + 1,right);//对基数右边边数组排序
    }
    return arr;
}

function quickSort2(arr){
    if (arr.length <= 1) return arr;
    var halfIndex = Math.floor(arr.length / 2);
    var halfVal = arr.splice(halfIndex, 1);
    var right = [];
    var left = [];
    for(var i = 0; i<arr.length; i++) {
        if (arr[i] < halfVal) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort2(left).concat(halfVal,quickSort2(right))
}
console.log(quickSort2([1,2,123,2,3]))
console.log(quickSort([1,2,123,2,3], 0 , 4))