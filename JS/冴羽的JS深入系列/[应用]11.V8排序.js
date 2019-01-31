/**
 * V8 的排序采用的算法于数组的长度相关,数组长度小于等于10.采用插入排序，大于10的时候，采用快速排序
 */

 /**
  * 插入排序
  * 第一有序余比较
  *  将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中
  * 时间复杂度：
  *   最好的情况: 数组已经升序排列,时间复杂度O(n)
  *   最坏的情况: 数组是降序排列，时间复杂度O(n^2);
  * 稳定性： 相同的元素在排序后是否还会保持相对的位置
  * 很明显，插入排序是稳定的
  * 适合： 当数组还要排序好或者规模小时，插入排序效率比较高，所以V8在数组长度小于等于10的时候采用插入【【排序。
  */
function insertionSort(arr) {
  var len = arr.length;
  for(var i = 1; i < len; i++ ) {
    var ele = arr[i];
    for(var j = i -1; j >= 0 ; j--) {
      var tmp = arr[j];
      if(tmp > ele) {
        arr[j + 1] = tmp;
        break;
      }
    }
    arr[j + 1] = ele;
  }
} 

/**
 * 快速排序
 * 选基比较排左右
 * 1、选择一个元素作为基准
 * 2、小于基准的元素，放到基准的左边，大于基准的元素，都移动到基准的右边
 * 3、对基准的左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩一个元素。
 * 快速排序时不稳定的排序
 * 时间复杂度： 最好为O(nlogn), 最坏为o(n^2)
 * 最好：每一次partition都是平分数组，递归深度为log2n + 1, 一个循环,O(n)(log2n+1) -> o(nlogn)
 * 最坏: 对于一个排好序的数组，每次基准元素都是选择第一个元素或者最后一个元素，那么每次都有一个自己是空的，
 * 递归的层数时n, 从而导致时间复杂度为O(n^2);
 */

 function swap(arr, a, b) {
   var tmp = arr[a];
   arr[b] = arr[a];
   arr[a] = tmp;
   // [arr[a],arr[b]] = [arr[b],arr[a]];
 }

 function partition(arr, left, right) {
   var pivot = arr[left];
   var storeIndex = left;
   for(var i = left + 1; i <= right; i++) {
     if(arr[i] < pivot) {
       swap(arr, storeIndex, i);
     }
   }
   swap(arr, left, storeIndex);
   return storeIndex;
 }

 function quickSort(arr) {
   function sort(arr, left, right) {
     if(left < right) {
       var index = partition(arr, left, right);
       sort(arr, 0, index - 1);
       sort(arr, index + 1, arr.length -1);
     }
   }
   sort(arr, 0 , arr.length);
   return arr;
 }

 /**
  * 谷歌v8优化:
  * 当数组长度大于10的时候，v8采用了快速排序于插入排序的混合排序的方法。
  * 对于子集比较大(如长度大于5)时使用快速排序，当子集比较小时，使用插入排序
  */