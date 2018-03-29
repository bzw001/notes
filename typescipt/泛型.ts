//泛型    处理未知数据类型数据，但是不使用any，这样函数根据输入就可推断出函数的处理与返回
//语法 <T>  使用T  相当于T指代该数据类型

class MinHeap<T>{
    list:T[]=[];
    add(element:T) :void{

    }

    min():T{
        return this.list.length?this.list[0]:null;
    }
}

let heap1=new MinHeap<number>();

let heap2=new MinHeap<string>();

//泛型也支持函数

//可以使用extends来约束泛型

interface  hasPropertyLenth{
    length:number;
}

function login<T extends hasPropertyLenth>(len:T):T{
    console.log(len.length);
    return len;
}