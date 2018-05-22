(function() {

  var canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  var n = 1; //光点数
  var g = 100;  //圆点半径
  var p = [];
  var grd;
  var l = 0;

  while (p.length < n) {
      p.push({
          x: ~~(Math.random() * (canvas.width / g)) * g,
          y: ~~(Math.random() * (canvas.height / g)) * g,
          d: ~~(Math.random() * 4),  //0,1,2,3  移动方向
          g: g,
          l: ~~(Math.random() * 10) //0-9
      });


      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();


  }

  //f: requestAnimationFrame() 开始触发回调函数的当前时间
  function update(f) {
      // console.log(f); //21297.385


      ctx.globalCompositeOperation = 'source-over'; //在目标图像上显示源图像。
      ctx.fillStyle = 'rgba(0, 0, 0, .03)';
      // ctx.fillStyle = '#356a86';
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.globalCompositeOperation = 'lighter'; //显示源图像 + 目标图像。


      for (var i in p) {
          switch (p[i].d) {  //方向

              case 0:
                  p[i].x += 1;
                  if (p[i].x > canvas.width) p[i].x -= canvas.width;
                  break;

              case 1:
                  p[i].y += 1;
                  if (p[i].y > canvas.height) p[i].y -= canvas.height;
                  break;

              case 2:
                  p[i].x -= 1;
                  if (p[i].x < 0) p[i].x += canvas.width;
                  break;

              case 3:
                  p[i].y -= 1;
                  if (p[i].y < 0) p[i].y += canvas.height;
                  break;
          }

          p[i].l += 1;

          if (~~(~~(f) / 1000) % 1 == 0) { // every third second
              if (p[i].l == 20) {
                  p[i].d = ~~(Math.random() * 4);
                  p[i].l = 0;
              }
          }


          ctx.beginPath(); //起始一条路径，或重置当前路径
          grd = ctx.createRadialGradient(p[i].x, p[i].y, 0, p[i].x, p[i].y,2); //创建放射状/圆形渐变对象。
          grd.addColorStop(0, "#16fcfd"); //设置渐变颜色段
          grd.addColorStop(1, "#000");
          ctx.fillStyle = grd; //设置或返回用于填充绘画的颜色、渐变或模式
          // ctx.arc(p[i].x, p[i].y, p[i].g, 0, 2 * Math.PI); //创建弧/曲线（用于创建圆形或部分圆）
          ctx.arc(p[i].x, p[i].y,8, 0, 2 * Math.PI); //创建弧/曲线（用于创建圆形或部分圆）
          ctx.closePath(); //创建从当前点回到起始点的路径
          ctx.fill();//填充当前绘图（路径）


      }
      l = ~~(~~(f) / 1000);

      window.requestAnimationFrame(update);

  }


  window.requestAnimationFrame(update);

})()