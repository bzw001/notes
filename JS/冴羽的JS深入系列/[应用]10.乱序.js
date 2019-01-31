/**
 * 乱序： 将数组乱序
 * 使用sort 于Math.random - 0.5的结合
 * 由于sort实现排序算法原因，将会导致以上乱序是不均匀的。
 */

 /// 插入排序
 /**
  * ECMAScript只规定了效果，但是没有规定实现的方式，所以不同浏览器实现的方式还不一样
  * 以v8为例，处理sort方法时，当目标数组长度小于10使用插入排序，反之使用快速排序和插入排序的混合排序
  */

/// 插入排序源码
/// 将第一个元素视为有序序列，遍历数组，将之后的元素依次插入到这个构建的有序序列中
function InsertionSort(a, from, to) {
  for(var i = from + 1; i < to; i++) {
    var element = a[i];
    for(var j = i - 1; j >= from; j--) {
      var temp = a[j];
      var order = comparefn(tmp, element);
      if(order > 0) {
        a[j + 1] = tmp;
      } else {
        break;
      }
    }
    a[j + 1] = element;
  }
}
/// 插入排序中，当待排序元素于有序元素进行比较时，一旦确定了位置，就不会跟位置前面的有序元素进行比较，所以乱序不彻底
var arr = [1 ,2,3,4,5];
arr.sort(() => Math.random() - 0.5);


/// 真正乱序的实现, 经典的Fisher-Yates算法
// 遍历数组元素，将当前元素于以后随机位置的元素进行交换
function shuffle(a) {
  var j, x , i;
  for(i = a.length; i; i --) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i -1] = a[j];
    a[j] = x;
  }
  return a;
}
/// es6

function shuffle(a) {
  for(let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i-1]];
  }
  return a;
}