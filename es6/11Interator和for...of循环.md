+ 1、Interator遍历器
> es6有四种数据集合，Interator能够提供统一的访问机制。而Interator主要为for...of服务

+ 2、遍历过程
> 遍历器对象本质是一个指针对象，首先指向数据结构的起始位置，然后调用指针对象的next方法，知道指向数据结构的结束位置。遍历器对象每次移动指针（next方法），都检查一下返回值的done属性。

+ 3、默认的Iterator接口
```
    1、数据结构只要部署了Iterator接口，该数据结构则“可遍历的”
    2、数据结构只要有Symbol.iterator属性，那么即代表可遍历,该属性返回Symbol对象iterator属性
    3、原生具备Iterator接口的数据结构：
      Array,Map,Set,String,TypedArray,函数的arguments对象，NodeList对象
    4、为什么对象没有部署Iterator接口？
       因为对象属性遍历顺序是不确定的，需要开发者指定。
       如果需要对象具备for...of循环调用的Iterator接口，就需要在其Symbol.iterator的属性上设置遍历器生产方法，原型链上也可。
       
       例 ：
       class RangeIterator{
           constructor(start,stop){
               this.valu=start;
               this.stop=stop;
           }
           [Symbol.iterator](){return this;};
           
           next(){
               var value=this.value;
               if(value<this.stop){
                   this.value++;
                   return{done:false,value:value}
               }
               return {done:true,value:undefined}
           }
       }
       
       function range(start,stop){
           return new RangeIterator(start,stop);
       }
       
       for(var value of range(0,3)){
           console.log(value);
       }
       
       例：给对象添加遍历接口的例子
       let obj={
           data:['hello','world'],
           [Symbol.iterator](){
               const self=this;
               let index=0;
               return {
                   next(){
                       if(index<self.data.length){
                           return {
                               value:self.data[index++],
                               done:false
                           }
                       }else{
                           return {value:undefined,done:true}
                       }
                   }
               }
           }
       }
       
    5、对类数组对象，部署遍历接口的方法:
      例: 
         NodeList.prototype[Symbol.iterator]=Array.prototype[Symbol.iterator];
         NodeList.prototype[Symbol.iterator]=[][Symbol.iterator];//这样也可
         
```

+ 4、默认会调用Iterator接口的场合
```
    1、对数组与Set解构进行解构赋值时，解构赋值
    2、扩展运算符(...)
       只要数据结构部署了Iterator接口，就可以对它使用扩展运算符，将其转换为数组。
    3、yeild* 后面跟是可遍历结构
    4、数组的操作

```

+ 5、字符串的Iterator接口
```
    字符串是类数组，也具有Iterator接口
        let test='hello';
        console.log(typeof test[Symbol.iterator]);
        let testIterator=test[Symbol.iterator]();
        console.log(testIterator.next());
    通过覆盖原生的Symbol.iterator方法，可以修改遍历器行为的目的
```

+ 6、遍历器对象其它方法 return().throw()
```
  当for ..of 循环提前退出（报错，有break,continue）就会调用return()。
  如一个对象在完成遍历前，需要清理或释放资源
    function readLinesSync(file){
        return{
            next(){
                return {done:false}
            },
            return(){
                file.close():
                return {done:true};
            }
        }
    }
    
    使用:
    for(let line of readLinesSync(fileName)){
        console.log(line);
        continue;
    }
```

+ 7、for...of循环
> 它可以遍历所有忽悠Iterator接口的数据结构
```
   1、数组
      for of可与得到键值,for in 可以得到键名,当然entries与keys方法一样可以得到
   2、类数组对象可以使用Array.from将对象转为数组，然后遍历
   
```

+ 8 总结
> Iterator接口本质是指针的指向遍历，可重写，可定制。为可遍历的数据结构统一访问机制。