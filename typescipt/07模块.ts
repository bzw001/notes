//与es6一样，任何包含顶级import或者export文件都会被当成一个模块
//angular中，常用的模块加载器有SystemJS和Webpack

//模块导出方式
//模块可以导出变量，函数，类，类型别名，与接口给外部模块使用
//导出方式有三种

//1、将声明导出
//export const COMPANY="GF";

//export interface IndentityValidate{//导出接口
//    isGFStaff(s:string):boolean;
//}

//export class ErpIdentityValite implements  IdentityValite{  //导出类
//    isGFStaff(erp:string){
//        return erpService.contains(erp);
//    }
//}

// 导出语句，可以重命名

//export {ErpIdentityValite};
//export {ErpIdentityValite as ERP};

//模块包装

//export {ErpIdentityValite as ERP} from './ErpIdentityValite'


//模块的导入方式
//1、直接导入
//import {ErpIdentityValite} from './ErpIdentityValite'

//使用别名导入

//import {ErpIdentityValite as ERP} from 'ErpIdentityValite';

//使用default默认导出

export default function (s:string){
    return s;
}

//模块导入导出建议
/**
 * 1、尽量在顶部导出或者默认导出
 * 2、明确列出导入的名字
 * 3、模块功能扩展，推荐引入新的对象扩展
 */
