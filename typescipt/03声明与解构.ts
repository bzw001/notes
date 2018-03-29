//1、在ts中，支持let,const,var三种声明变量方式
//注意块级变量声明必须在使用之前
//对于函数入参，如果函数体内没有一个函数段({...})包裹，那么参数不可以被let再次同名声明
//const如果声明的是对象，该对象里的值是可以再次被赋值的

//解构的重要作用
/**
 * 声明与赋值变量更加容易，函数参数与函数返回值处理也更加方便
 * ts与es6的解构基本一致
 */
//2、解构,ts支持数组型与对象型解构

//数组型

let input=[1,2];
let [first,second]=input;
console.log(first);
console.log(second);

//也可以作用于函数的参数使用
function func([first,second]:[number,number]){
    console.log(first+second)
}

func([1,2]);
console.log('ts');

//rest参数语法(...变量名)

let [a,b,...c]=[1,2,34,5];
console.log(c);

//对象的解构

let var_obj={a1:1,b1:2,c1:[1,2]};
let {a1,b1,c1}=var_obj;
console.log(a1,b1,c1);