function getAngle(x1, y1, x2, y2) {
    // 直角的边长
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    // 斜边长
    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    // 余弦
    // var cos = y / z;
    var cos = x / z;
    // 弧度
    var radina = Math.acos(cos);
    // 角度
    // var angle =  180 / (Math.PI / radina);
    return radina;
}
var frameId;
/**
 * 
 * @param  
 * startPoint  起点坐标 {x, y}
 * endPoint    终点坐标 {x,y}
 * delay       延时n毫秒才开始绘制
 */
function generatePath({startPoint, endPoint, delay = 0 ,arriveTargetCb }) {
    let path = {};
    let isArriveTarget, translate, angle,ratio, direction;``
    path.startPoint = startPoint;
    path.endPoint = endPoint;
    path.delay = delay;
    path.arriveTargetCb = arriveTargetCb;
    // 如果x/y起始点与结束点相等，那么只判断x/y就能知道是否到达终点
    if (startPoint.x != endPoint.x && startPoint.y == endPoint.y) {
        //水平右向移动
        if(endPoint.x >= startPoint.x) {
            isArriveTarget =  (function (currentX, currentY) {
              return currentX >= this.endPoint.x;
          }).bind(path)
          angle = 0;
          ratio = 0;
          direction = 'right';
          translate = function (currentX, currentY, speed) {
            return {x: currentX + speed, y: currentY};
        }
        } else {
            //水平左向移动
            isArriveTarget = ( function (currentX, currentY) {
              return currentX < this.endPoint.x;
          }).bind(path)
          angle = Math.PI;
          ratio = 0;
          direction = 'left';
          translate = function (currentX, currentY, speed) {
            return {x: currentX - speed, y: currentY};
        }
        }
        
    } else if (startPoint.y != endPoint.y && startPoint.x == endPoint.x) {
        //垂直向下运动
        if(endPoint.y > startPoint.y) {
            isArriveTarget =  (function (currentX, currentY) {
              return currentY >= this.endPoint.y;
            }).bind(path)
            angle = Math.PI/2;
            ratio = 0;
            direction = 'down'
            translate = function (currentX, currentY, speed) {
                return {x: currentX , y: currentY + speed};
            }
        } else {
        //垂直向上运动
            isArriveTarget = ( function (currentX, currentY) {
              return currentY < this.endPoint.y;
          }).bind(path)
          angle = 3 * Math.PI/2;
          ratio = 0;
          direction = 'up'
          translate = function (currentX, currentY, speed) {
            return {x: currentX , y: currentY - speed};
          }
        }
        
    } else if (startPoint.y != endPoint.y && startPoint.x != endPoint.x){
        ratio = (endPoint.y- startPoint.y)/(endPoint.x - startPoint.x);
        angle = getAngle(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        //右上方
        if(endPoint.x > startPoint.x && endPoint.y < startPoint.y) {
          direction = 'right-up';
          isArriveTarget =  (function (currentX, currentY) {
              return currentX >= this.endPoint.x && currentY <= this.endPoint.y; 
          }).bind(path)
          translate = (function(currentX, currentY, speed) {
            let x = Math.sqrt(Math.pow(speed, 2) / (Math.pow(this.ratio,2) + 1)) + currentX;
            // let x = currentX + speed;
            let y = -Math.sqrt(Math.pow(speed, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + currentY;
            return {x, y}
          }).bind(path);
        } else if (endPoint.x > startPoint.x && endPoint.y > startPoint.y)  {
            //右下方
            direction = 'right-down';
            isArriveTarget = ( function (currentX, currentY) {
             return currentX >= this.endPoint.x && currentY >= this.endPoint.y; 
          }).bind(path);
          translate = (function(currentX, currentY, speed) {
            let x = Math.sqrt(Math.pow(speed, 2) / (Math.pow(this.ratio,2) + 1)) + currentX;
            // let y = speed * this.ratio + currentY;
            let y = Math.sqrt(Math.pow(speed, 2)/ (1/Math.pow(this.ratio, 2) + 1)) +  currentY;
            return {x, y}
          }).bind(path);
        } else if(endPoint.x < startPoint.x && endPoint.y < startPoint.y) {
            //左上方
            direction = 'left-up';
            isArriveTarget = ( function (currentX, currentY) {
                return currentX <= this.endPoint.x && currentY <= this.endPoint.y; 
             }).bind(path);
             translate = (function(currentX, currentY, speed) {
                // let x = currentX - speed;
                let x = -Math.sqrt(Math.pow(speed, 2) / (Math.pow(this.ratio,2) + 1)) + currentX;
                // let y = currentY - speed * this.ratio;
                let y = -Math.sqrt(Math.pow(speed, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + currentY;
                return {x, y}
              }).bind(path);
        } else if (endPoint.x < startPoint.x && endPoint.y > startPoint.y) {
            //左下方
            direction = 'left-down';
            console.log('left-dwon');
            isArriveTarget = ( function (currentX, currentY) {
                return currentX <= this.endPoint.x && currentY >= this.endPoint.y; 
             }).bind(path);
             translate = (function(currentX, currentY, speed) {
                let x = -Math.sqrt(Math.pow(speed, 2) / (Math.pow(this.ratio,2) + 1)) + currentX;
                // let x = currentX + speed * this.ratio;
                // let y = currentY - speed * this.ratio;
                let y = Math.sqrt(Math.pow(speed, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + currentY;
                return {x, y}
              }).bind(path);
        }
       
    } else {
        //不动
        isArriveTarget = function(currentX, currentY) {return true};
        translate = function (currentX, currentY, speed) {
            return {x: currentX , y: currentY};
        }
        angle = 0;
        ratio = 0;
        direction = false;
    }
    path.isArriveTarget = isArriveTarget;
    path.translate = translate;
    path.angle = angle;
    path.ratio = ratio;
    path.direction = direction;
    return path;
  }

/**
 * 1、划定线条
 * 2、创建光点
 * 3、光点依照线条轨迹移动
 */
class Star {
    constructor({paths, ctx, speed, infinite = true, radius = 4}) {
        this.ctx = ctx;
        this.paths = paths; //across的路径
        this.speed = speed; //across的速度
        this.currentPathIndex = 0;
        this.x = paths[0].startPoint.x;
        this.y = paths[0].startPoint.y;
        this.translate = paths[0].translate;
        this.isArriveTarget = paths[0].isArriveTarget;
        this.angle = paths[0].angle;
        this.ratio = paths[0].ratio;
        this.direction = paths[0].direction;
        this.infinite = infinite; //是否无限循环
        this.radius = radius;
        this.delay = paths[0].delay;
        this.arriveTargetCb = paths[0].arriveTargetCb;
        this.timeStamp = 0;
        this.stopDraw = false; //停止动画
        this.distance = 0;
        this.starLineLen = 20;
    }
    isAcrossEnd (){
        if (this.delay && !this.timeStamp) {
            this.timeStamp = new Date();
        }
        let path = this.paths[this.currentPathIndex];
        if (this.isArriveTarget(this.x , this.y)) {
                if (this.arriveTargetCb) {
                    let {stop} = this.arriveTargetCb(this.ctx);
                    this.stopDraw = !!stop;
                };
                this.currentPathIndex ++ ;
                if (this.currentPathIndex >= this.paths.length) {
                    if(this.infinite) {
                        this.currentPathIndex = 0;
                    } else {
                        return true;
                    }
                }
                let path = this.paths[this.currentPathIndex];
                // debugger;
                this.distance = 0;
                this.x = path.startPoint.x;
                this.y = path.startPoint.y;
                this.translate = path.translate;
                this.isArriveTarget = path.isArriveTarget;
                this.angle  = path.angle;
                this.ratio  = path.ratio;
                this.direction  = path.direction;
                this.delay  = path.delay;
                this.arriveTargetCb  = path.arriveTargetCb;
        }
        return false;
    }
    getStarEndLinePosAndArc(len) {
        let x ,y, startAngle, endAngle;
        if (!this.direction) {
            return {x: this.x , y: this.y};
        }
        switch(this.direction) {
            case 'up':
                x = this.x;
                y = this.y + len;
                startAngle = this.angle - Math.PI/2;
                endAngle = this.angle + Math.PI/2;
                break;
            case 'down':
                x = this.x;
                y = this.y - len;
                startAngle = this.angle - Math.PI/2;
                endAngle = this.angle + Math.PI/2;
                break;
            case 'left':
                x = this.x + len;
                y = this.y;
                startAngle = this.angle - Math.PI/2;
                endAngle = this.angle + Math.PI/2;
                break;
            case 'right':
                x = this.x - len;
                y = this.y;
                startAngle = this.angle - Math.PI/2;
                endAngle = this.angle + Math.PI/2;
                break;
            case 'right-up':
                x = -Math.sqrt(Math.pow(len, 2) / (Math.pow(this.ratio,2) + 1)) + this.x;
                y = Math.sqrt(Math.pow(len, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + this.y;
                startAngle = -Math.PI/2 - this.angle;
                endAngle =  Math.PI/2 - this.angle;
                break;
            case 'right-down':
                x = -Math.sqrt(Math.pow(len, 2) / (Math.pow(this.ratio,2) + 1)) + this.x;
                y = -Math.sqrt(Math.pow(len, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + this.y;
                startAngle = this.angle - Math.PI/2 ;
                endAngle =  Math.PI/2 + this.angle;
                break;
            case 'left-up':
                x = Math.sqrt(Math.pow(len, 2) / (Math.pow(this.ratio,2) + 1)) + this.x;
                y = Math.sqrt(Math.pow(len, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + this.y;
                // console.log('left-up', this.angle);
                startAngle = Math.PI/2 + this.angle;
                // endAngle = this.angle - Math.PI/2;
                endAngle = 3 * Math.PI /2 + this.angle;
                break;
            case 'left-down':
                x = Math.sqrt(Math.pow(len, 2) / (Math.pow(this.ratio,2) + 1)) + this.x;
                y = - Math.sqrt(Math.pow(len, 2)/ (1/Math.pow(this.ratio, 2) + 1)) + this.y;
                startAngle = Math.PI/2 - this.angle;
                endAngle =  3 * Math.PI /2 - this.angle ;
                break;
        }
        return {x, y,startAngle , endAngle}
    }
    //是否处于滞停中
    isDelaying(){
        if (this.delay) {
            let now = new Date();
            if (((now - this.timeStamp) >= this.delay) && this.timeStamp) {
                this.delay = 0;
                this.timeStamp = 0;
                return false;
            }
            return true;
        }
        return false;
    }
    draw(){
        if (this.stopDraw) {
            return true;
        }
         if (this.isAcrossEnd()) {
            return true;
        };
        if( this.isDelaying()) {
            return false;
        }
        var starLineLen = this.distance >= this.starLineLen ? this.starLineLen : this.distance;
        let gra = this.ctx.createRadialGradient(
            this.x, this.y, 0,  this.x, this.y, 80)
        gra.addColorStop(0, '#16fcfd')
        gra.addColorStop(1, 'rgba(0,0,0,0)')
        this.ctx.save()
        this.ctx.fillStyle = gra
        this.ctx.beginPath();
        //流星头，二分之一圆
        let {x, y,startAngle , endAngle} = this.getStarEndLinePosAndArc(starLineLen);
        this.ctx.arc( this.x, this.y, this.radius, startAngle  ,endAngle)
        //绘制流星尾，三角形
        this.ctx.lineTo(x,y);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
        let pos = this.translate(this.x, this.y, this.speed);
        this.x = pos.x;
        this.y = pos.y;
        this.distance += this.speed;
        return false;
    }
 }
 
 class Line{
     constructor({paths, ctx}){
        this.paths = paths;
        this.ctx = ctx;
     }
     draw(){
         this.paths.forEach(ele => {
            this.ctx.beginPath(); //起始一条路径，或重置当前路径
            this.ctx.lineWidth = 1;
            this.ctx.moveTo(ele.startPoint.x, ele.startPoint.y) //移动的起点 //坐标以左上角为原点
            this.ctx.lineTo(ele.endPoint.x, ele.endPoint.y);
            this.ctx.strokeStyle = '#355a6f';
            this.ctx.stroke();
         });
     }
 }

 (function(){
     let drawers = [];
     let drawers1 = []; 
     //获取canvas
    var canvas = document.getElementsByTagName('canvas')[0];
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');
    // let path1 = generatePath({startPoint: {x: 100, y: 500}, endPoint: {x:500, y: 500}, delay: 1000,
    //     arriveTargetCb: function(ctx){
    //         let path1 = generatePath({startPoint: {x: 500, y: 500}, endPoint: {x:900, y: 100}});
    //         let path2 = generatePath({startPoint: {x: 500, y: 500}, endPoint: {x:900, y: 900}});
    //         let path3 = generatePath({startPoint: {x: 500, y: 500}, endPoint: {x:900, y: 500}})
    //         let star1 = new Star({paths:[path1], ctx, speed:4, radius:4, infinite: false});
    //         let star2 = new Star({paths:[path2], ctx, speed:4, radius:4, infinite: false});
    //         let star3 = new Star({paths:[path3], ctx, speed:4, radius:4, infinite: false});
    //         drawers.push(star1,star2,star3 );
    //         drawers1 = drawers.slice(0);
    //         return {stop: true};
    // }});
    let path1 = generatePath({startPoint: {x: 635, y: 583}, endPoint: {x:158, y: 407}, delay: 0}  )
    let path2 = generatePath({startPoint: {x: 158, y: 407}, endPoint: {x:205, y: 383}, delay: 0}  )
    let path3 = generatePath({startPoint: {x: 209, y: 319}, endPoint: {x:213, y: 309}, delay: 500})
    let path4 = generatePath({startPoint: {x: 213, y: 309}, endPoint: {x:278, y: 334}, delay: 0}  )
    let path5 = generatePath({startPoint: {x: 373, y: 373}, endPoint: {x:419, y: 391}, delay: 500,
        arriveTargetCb: function(ctx) {
            let star1 = new Star({paths:[path9,path19,path20,path21,path22], ctx, speed:0.5, radius:2, infinite: false});
            let star2 = new Star({paths:[path9,path14,path15,path16,path17,path18], ctx, speed:0.5, radius:2, infinite: false});
            let star3 = new Star({paths:[path9,path10,path11,path12,path13], ctx, speed:0.5, radius:2, infinite: false});
            drawers.push(star1,star2,star3);
            return {stop: false};
        }
    })
    let path6 = generatePath( {startPoint: {x: 148, y: 414}, endPoint: {x:205, y: 383}, delay: 0});
    
    let path7 = generatePath( {startPoint: {x: 539, y: 435}, endPoint: {x:484, y: 415}, delay: 1000});
    let path8 = generatePath( {startPoint: {x: 187, y: 267}, endPoint: {x:410, y: 351}, delay: 800});
    
    let path9 = generatePath( {startPoint: {x: 467, y: 342}, endPoint: {x:475, y: 336}, delay: 400});
    let path10 = generatePath({startPoint: {x: 475, y: 336}, endPoint: {x:592, y: 379}, delay: 0});
    let path11 = generatePath({startPoint: {x: 592, y: 379}, endPoint: {x:595, y: 339}, delay: 0});
    let path12 = generatePath({startPoint: {x: 595, y: 339}, endPoint: {x:645, y: 349}, delay: 0});
    let path13 = generatePath({startPoint: {x: 645, y: 349}, endPoint: {x:690, y: 320}, delay: 0});
    
    let path14 = generatePath({startPoint: {x: 475, y: 336}, endPoint: {x:496, y: 323}, delay: 0});
    let path15 = generatePath({startPoint: {x: 496, y: 323}, endPoint: {x:487, y: 319}, delay: 0});
    let path16 = generatePath({startPoint: {x: 487, y: 319}, endPoint: {x:486, y: 294}, delay: 0});
    let path17 = generatePath({startPoint: {x: 486, y: 294}, endPoint: {x:506, y: 293}, delay: 0});
    let path18 = generatePath({startPoint: {x: 506, y: 293}, endPoint: {x:547, y: 270}, delay: 0});
    
    
    let path19 = generatePath({startPoint: {x: 475, y: 336}, endPoint: {x:355, y: 293}, delay: 0});
    let path20 = generatePath({startPoint: {x: 355, y: 293}, endPoint: {x:354, y: 239}, delay: 0});
    let path21 = generatePath({startPoint: {x: 354, y: 239}, endPoint: {x:364, y: 245}, delay: 0});
    let path22 = generatePath({startPoint: {x: 364, y: 245}, endPoint: {x:413, y: 217}, delay: 0});
    function generateStars() {
        let stars = [];
        let start_r_d =  new Star({paths:[path1, path2, path3,path4,path5], ctx, speed:2, radius:2});
        let start_r_m =  new Star({paths:[path7], ctx, speed:1, radius:2});
        let start_l_d =  new Star({paths:[path3,path4,path5,path6], ctx, speed:1, radius:2});
        let start_l_m =  new Star({paths:[path8], ctx, speed:1, radius:2});
        stars.push(start_r_d);
        stars.push(start_r_m);
        stars.push(start_l_d);
        stars.push(start_l_m);
        return stars;
    }
    let line = new Line({paths:[path1, path2, path3,path4,path5,path6,path7,path8,path9,path10,path11,path12,path13,path14,path15,path16,path17,path18,path19,path20,path21,path22], ctx});
    drawers = generateStars();
    function update() {
        ctx.clearRect(  0, 0, canvas.width, canvas.height);
        line.draw();
        drawers.forEach((star, index, arr) => {
            if (star.draw()) {
                arr.splice(index, 1);
            }
        })
        // if (!drawers.length) {
        // }
        frameId = window.requestAnimationFrame(update);
  
    }


    window.requestAnimationFrame(update);
 })()

 