/**
 * 去重的多种方法与适用场景
 * 使用键值对去重的方式可以去重如NaN与对象这种特殊值 (使用JSON.stringify)
 * 其他方式去重不行
 * JSON.stringify: 对于undefined的处理(对象中会丢失,数组中会转为null),NaN会处理为Null
 */

///  使用双重循环
function unique(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (array[i] === res[j]) {
        break;
      }
      if (j === resLen) {
        res.push(array[i]);
      }
    }
  }
}

/// 使用indexOf 
function unique2(array) {
  var res = [];
  for (var i = 0, len = array.length; i < len; i++) {
    var current = array[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}

/// 排序后去重(减少循环次数)
function unique3(array) {
  var res = [];
  var sortedArray = array.concat().sort();
  var seen;
  for (var i = 0, len = sortedArray.length; i < len; i++) {
    //如果第一个元素或者相邻的元素不相同
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

/// 使用filter 方法
function unique4(array) {
  // 排序后的数组，如果当前索引值与前一个不同
  var res = array.concat().sort().filter(function (item, index, array) {
    return !index || item !== array[index - 1];
  })
}

/// 使用键值对，但是要注意键需要类型+值
function unique5(array) {
  var obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnproperty(typeof item + JSON.stringify(item)) ? false : (obj(typeof item + JSON.stringify(item)) = true);
  })
}

/// es6 set与map
function unique6(array) {
  return [...new Set(array)];
}

function unique7(array) {
  const seen = new Map();
  return array.filter((a) => !seen.has(a) && seen.set(a, 1))
}