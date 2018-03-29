//ts在函数方面增加一些额外的功能

//函数的写法,声明与表达式
//声明
//       函数名   函数参数       函数返回值类型
function func2(x:number,y:number):number{
    return x>y?x:y;
}
//表达式
let func3=function (x:number,y:number) :number{return x;};

//可选参数
// 不将参数声明为可选参数(使用在?，并且要放到必选参数后面)，那么这个参数就必须传入值，而在js中，每一个参数都是可选的。

function  func4(x:number) :number{
    console.log(x);
    return x;
}
func4(1);
//func4();//error
function func5(x:number,y?:number) :string{
    console.log(y);
    if(y!=0) return `${x+y}${y}`;
    return `${x}`;
}

console.log(func5(1,1));

//设置默认参数
//ts支持函数默认参数
//放在必选参数后面，那么这个值没传或者值为undefined时y=4
function func6(x:number,y=4):number{
    return x;
}
//放在必选参数前面，那么这个参数值必须为undefined才会触发默认值
function func7(y=4,x:number) :number{
    return x;
}

//剩余参数
//对于未知的参数个数，多余的参数个数可以放到一个参数里，...变量
function  sum(x:number,...restOfNumber:number[]):number{
    let result=x;
    //这里也可使用es6的遍历赋值方法
    for(let i=0;i<restOfNumber.length;i++){
        result+=restOfNumber[i];
    }
    return result;
}

//函数重载
//ts的函数重载的方式是直接写同名函数，ts会根据参数个数与参数类型进行来匹配函数
//前面只写参数声明，最后面写函数体，同时需要判断函数参数类型
function css(config:{});
function css(config:string,value:string):object;
function css(config:any,value?:any):any{
    if(typeof config==='object') return{};
    else if(typeof value==='string') return ''
}

//箭头函数的this，其实它本身没有this,它会就近去上级作用域的this
