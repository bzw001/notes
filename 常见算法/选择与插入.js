// 选择排序
// 每一次从待排序得数据元素中选出最小或最大得元素放到序列起始位置。直到所有元素排完
//不稳定 ,适合小数据，如1000条以下

function selectionSort(arr){
    var len = arr.length;
    var minIndex,temp;
    
    for (var i = 0; i <= len; i++) {
        minIndex = i;
        for (var j = i; j <= len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
}

console.log(selectionSort([1,2,13,2,1,32,4]))

//插入排序
//适合小数据
// 假设第一个数是最小数，然后从右边去最近一个数与之排序(这个数与其最左边数比较，如果左边数大于，那么就插进来得数
//就等于左边数...
//)，形成一个有序数列，然后再取右边最近一个数比较，依次循环
function insertionSort(arr){
    for(var i = 1; i< arr.length; i++){
        var temp = arr[i];
        var j = i - 1 ;
        while(arr[j] > temp){
            arr[j + 1] = arr[j] ;
            j --;
        }
        arr[j + 1] = temp;
    }
    return arr;
}




