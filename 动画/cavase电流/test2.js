/**
 * 1、划定线条
 * 2、创建光点
 * 3、光点依照线条轨迹移动
 */

class Star {
    constructor({paths, ctx, speed, infinite = true}) {
        this.ctx = ctx;
        this.paths = paths; //across的路径
        this.speed = speed; //across的速度
        this.currentPathIndex = 0;
        this.x = paths[0].startPoint.x;
        this.y = paths[0].startPoint.y;
        this.translate = paths[0].translate;
        this.isArriveTarget = paths[0].isArriveTarget;
        this.infinite = infinite; //是否无限循环
    }
    isAcrossEnd (){
        let path = this.paths[this.currentPathIndex];
        if (this.isArriveTarget()) {
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
                this.x = path.startPoint.x;
                this.y = path.startPoint.y;
                this.translate = path.translate;
                this.isArriveTarget = path.isArriveTarget;
        }
        
        return false;
    }
    draw(){
        if (this.isAcrossEnd()) {
            return true;
        };
        // this.y = this.xMapY(this.x);
        let gra = this.ctx.createRadialGradient(
            this.x, this.y, 0,  this.x, this.y, 80)
        gra.addColorStop(0, '#16fcfd')
        gra.addColorStop(1, 'rgba(0,0,0,0)')
        this.ctx.save()
        this.ctx.fillStyle = gra
        this.ctx.beginPath()
        //流星头，二分之一圆
        // ctx.arc( i++, 100, 20, PI / 3, 5 * PI / 4)
        this.ctx.arc( this.x, this.y, 2, -Math.PI/2, Math.PI/2)
        //绘制流星尾，三角形
        this.ctx.lineTo(this.x-80, 100)
        this.ctx.closePath()
        this.ctx.fill()
        this.ctx.restore()
        this.translate(this.x, this.y, this.speed);
    }
 }
 

 (function(){
     //获取canvas
    var canvas = document.getElementsByTagName('canvas')[0];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext('2d');

    ctx.beginPath(); //起始一条路径，或重置当前路径
    ctx.moveTo(100, 100) //移动的起点 //坐标以左上角为原点
    ctx.lineTo(400, 100);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    let path1 = {
        startPoint:{
            x: 100,
            y: 100
        },
        endPoint: {
            x: 400,
            y: 100
        },
        isArriveTarget: function() {
            return this.x >= 400;
        }, //-1 endPoint 的x坐标比startPoint的X坐标小 , 1反之。 0为相等
        translate: function (x,y,speed) {
            this.x +=  speed;
            this.y = y;
            return {x: x + speed, y: y};
        },
    }
    let path2 = {
        startPoint:{
            x: 400,
            y: 100
        },
        endPoint: {
            x: 400,
            y: 400
        },
        isArriveTarget: function() {
            return this.y >= 400;
        }, //-1 endPoint 的x坐标比startPoint的X坐标小 , 1反之。 0为相等
        translate: function (x,y,speed) {
            this.x =x;
            this.y += speed;
            return {x: x, y: this.y};
        }
    }
    let star = new Star({paths:[path1, path2], ctx, speed:2});
    console.log(star);
    // var i = 100;
    function update() {
        ctx.clearRect(  0 , 0,canvas.width, canvas.height)
        // // ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath(); //起始一条路径，或重置当前路径
        ctx.moveTo(100, 100) //移动的起点 //坐标以左上角为原点
        ctx.lineTo(400, 100);
        ctx.strokeStyle = '#89ffff';
        ctx.stroke();
        // ctx.globalCompositeOperation = 'destination-in';
        // ctx.globalCompositeOperation = 'lighter'; //显示源图像 + 目标图像。
        //创建光点
        // ctx.beginPath(); //起始一条路径，或重置当前路径
        // var grd = ctx.createRadialGradient(i++, 100, 0, i++, 100,3); //创建放射状/圆形渐变对象。
        // grd.addColorStop(0, "#fff"); //设置渐变颜色段
        // //   grd.addColorStop(0.6, "#16fcfd"); //设置渐变颜色段
        // grd.addColorStop(1, "#16fcfd");
        // ctx.fillStyle = grd; //设置或返回用于填充绘画的颜色、渐变或模式
        // // ctx.arc(p[i].x, p[i].y, p[i].g, 0, 2 * Math.PI); //创建弧/曲线（用于创建圆形或部分圆）
        // // ctx.arc(i++, 100, 3, 0, 2 * Math.PI); //创建弧/曲线（用于创建圆形或部分圆）
        // ctx.fillRect(i++,98,4,4);
        // ctx.closePath(); //创建从当前点回到起始点的路径
        // ctx.fill();//填充当前绘图（路径）
        //径向渐变，从流星头尾圆心，半径越大，透明度越高
        // gra = ctx.createRadialGradient(
        //     i++, 100, 0,  i++, 100, 80)
        // const PI = Math.PI
        // gra.addColorStop(0, '#16fcfd')
        // gra.addColorStop(1, 'rgba(0,0,0,0)')
        // ctx.save()
        // ctx.fillStyle = gra
        // ctx.beginPath()
        // //流星头，二分之一圆
        // // ctx.arc( i++, 100, 20, PI / 3, 5 * PI / 4)
        // ctx.arc( i++, 100, 2, -PI/2, PI/2)
        // //绘制流星尾，三角形
        // ctx.lineTo( i-80, 100)
        // ctx.closePath()
        // ctx.fill()
        // ctx.restore()
        star.draw();
        var id = window.requestAnimationFrame(update);
        // if (i > 400) {
        //     window.cancelAnimationFrame(id )
        // };
    }


    window.requestAnimationFrame(update);
 })()

 