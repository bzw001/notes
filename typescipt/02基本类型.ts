//ts的基本数据类型
//与es6比较，增加静态类型检查，以及对于异常情况的处理

//boolean ,number,string ,array,元组类型tuple,enum,任意值类型any,null,undefined,void,never类型
//ts独有类型:元组，枚举，任意值，void类型，never类型

//ts声明变量必须声明类型

let flag:boolean=true;

let num1:number=0b1010;//二进制
let nu2:number=0o744;//八进制
let num3:number=6;
let num4:number=0xf00d;//十六进制

let aa:number|string;  //也可以让这个变量支持多种类型


//字符串支持反引号来定义多行文本与内嵌表达式，使用${expr}进行内嵌变量或者表达式
let name1:string='angular';
let years:number=5;
let words:string=`你好，今年是${name1}发布的第${years}年`;
console.log(words);


//声明数组,两种声明的方式，建议元素只使用一种类型
let arr:number[]=[1,2];//数组只放数字
let arr3:any[]=[1,'string'];//可以放任意类型
let arr2:Array<number>=[1,2];
console.log(arr3);

//特殊数组：元组类型，规定数组的元素个数以及类型
let x:[string,number];
x=['1',1];
//x=[1,'1'];//error
console.log(x[0]);

//enum枚举类型，一个可被命名的整型常数的集合，里面的集合成员可以被命名或者重赋值,不过只能被赋值为整型常数
enum color {red ,green,yellow};
console.log(color.red);//0

enum color1 {red=2,green=3};

//any 任意值类型， 相当于现在当js'类型',该类型可以在编译时不需类型检查
let any_x:any=3;
any_x='3';
let array_list:any[]=[1,2,3];
array_list=[1,'2','3'];
console.log(array_list);

//null与undefined 默认可以赋予给任意类型，但是启用strictNullChecks,它两只能被赋予给void或者本身类型
// -- strictNullChecks
let num5:number=1;
num5=undefined;//error

let y:number|undefined;
console.log(y);
//y=undefind;//正确


//void类型表示没有任何类型，在js中函数默认返回undefined，但是ts默认返回void

function hello():void{
    console.log(hello);
}

console.log(hello());
function func1(foo:()=>void){
    let f=foo();
    //f.doSth();//报错，换成返回任意值类型就不会报错
}

//never 类型，是其它类型的子类型（包括null与undefined），代表从来不会出现的值，一般用于表示函数中出现的异常

let var_never:never;
var_never=(()=>{throw new Error('exception occur')})();

function loop():never {//死循环这种无法执行到终点的函数
    while (true){

    }
}

