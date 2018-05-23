function getAngle(x1, y1, x2, y2) {
  // 直角的边长
  var x = Math.abs(x1 - x2);
  var y = Math.abs(y1 - y2);
  // 斜边长
  var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  // 余弦
  var cos = y / z;
  // 弧度
  var radina = Math.acos(cos);
  // 角度
  // var angle =  180 / (Math.PI / radina);
  return radina;
}

//当前只针对直线路径
function generatePath({startPoint, endPoint}) {
  let path = {};
  let isArriveTarget, translate, angle;
  path.startPoint = startPoint;
  path.endPoint = endPoint;
  // 如果x/y起始点与结束点相等，那么只判断x/y就能知道是否到达终点
  if (startPoint.x != endPoint.x && startPoint.y == endPoint.y) {
      //水平右向移动
      if(endPoint.x >= startPoint.x) {
          isArriveTarget =  (function (currentX, currentY) {
            return currentX >= this.endPoint.x;
        }).bind(path)
        angle = 0;
      } else {
          //水平左向移动
          isArriveTarget = ( function (currentX, currentY) {
            return currentX < this.endPoint.x;
        }).bind(path)
        angle = Math.PI;
      }
      translate = function (currentX, currentY, speed) {
          return {x: currentX + speed, y: currentY};
      }
  } else if (startPoint.y != endPoint.y && startPoint.x == endPoint.x) {
      //垂直向下运动
      if(endPoint.y >= startPoint.y) {
          isArriveTarget =  (function (currentX, currentY) {
            return currentY >= this.endPoint.y;
          }).bind(path)
          angle = Math.PI/2;
      } else {
      //垂直向上运动
          isArriveTarget = ( function (currentX, currentY) {
            return currentY < this.endPoint.y;
        }).bind(path)
        angle = 3 * Math.PI/2;
      }
      translate = function (currentX, currentY, speed) {
          return {x: currentX , y: currentY + speed};
      }
  } else if (startPoint.y != endPoint.y && startPoint.x != endPoint.x){
      //斜线运动
      if(endPoint.x >= startPoint.x) {
          isArriveTarget =  (function (currentX, currentY) {
            return currentX >= this.endPoint.x;
        }).bind(path)
      } else {
          isArriveTarget = ( function (currentX, currentY) {
            return currentX < this.endPoint.x;
        }).bind(path)
      }
      let ratio = (endPoint.y- startPoint.y)/(endPoint.x - startPoint.x);
      path.ratio = ratio;
      translate = (function(currentX, currentY, speed) {
          let x = currentX + speed;
          let y = speed * this.ratio + currentY;
          return {x, y}
      }).bind(path);
      angle = getAngle(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
  } else {
      //不动
      isArriveTarget = function() {return true};
      translate = function (currentX, currentY, speed) {
          return {x: currentX , y: currentY};
      }
      angle = 0;
  }
  path.isArriveTarget = isArriveTarget;
  path.translate = translate;
  path.angle = angle;
  return path;
}

let path1 = generatePath({startPoint:{x: 100, y:100}, endPoint: {x:200, y: 200}});

console.log(path1);