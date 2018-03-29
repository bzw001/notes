//1、可以使用:添加参数
//<p>date is {{data:"MM/dd/y"}}</p>

//2、链式管道   {{exp|pipe1|pipe2|...}}


//3、angular的内置管道
//不需要引入模块，直接使用
/**
 * date  纯管道    格式化日期
 * json  非纯管道   json格式化数据对象
 * UpperCase 纯管道  小写转大写
 * lowerCase 纯管道  大写转小写
 * decimapPipe   纯管道   将数值按特定格式显示
 * currencyPipe  纯管道   数值转成本地货币格式
 * percent       纯管道   将数值转成百分比
 * slice         非纯管道  将数组或者字符串裁剪成新子集
 * slice的管道是基于Array.prototype.slice()与String.prototype.slice()方法实现的
 * async         非纯管道  异步显示，可以指定该值是异步更新的，接受Promise或Observable最为输入
 */

 //4、自定义管道
 /**
  * 1、引入Pipe与PipeTransform,使用@Pipe指定管道名称
  */
  import {Pipe ,PipeTransform} from '@angular/core';
  @Pipe({
      name:'sexReform'
  })
  export class SexReform implements PipeTransform{

  }

  //2、继承接口类PipeTransform实现transform方法,第一个参数是需要被转换的值，后面多个可选转换参数,方法返回一个转换后的值
  export class SexReform implements PipeTransform{
    transform(val:string):string{
        switch(val){
            case 'male':return '男';
            case 'female':return '女';
            default:return '未知性别';
        }
    }    
}

//angular对于管道的变化监测机制
/**
 * 1、纯管道：监测策略被优化，会忽略检查内部数据的变化。加入一个数组添加一个值，但是它地址是没有变的，这里不会去检查，那么新添加的值不会体现出来
 * 纯管道只有当输入值发生纯变更时（基本数据类型值变更，复杂数据类型发生地址变更）
 * 2、非纯管道，angular在组件每一个变化周期都会调用非纯管道，并执行管道中的transform方法更新数据，
 * 定义非纯管道的方法：
 * @Pipe({
 *  name:'test',
 *  pure:false//将pure置false
 * });
 */